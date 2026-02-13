#!/usr/bin/env python3
"""
Download satellite map tiles for offline use at competition.

Grabs MapTiler satellite tiles for a bounding box around the MDRS site
and saves them to public/tiles/{z}/{x}/{y}.jpg so Next.js can serve them
as static assets.

Usage:
    python3 scripts/download_tiles.py

Customize the bounding box, zoom range, or API key below as needed.
"""

import math
import os
import sys
import time
import urllib.request

# ── Configuration ──────────────────────────────────────────────────────────────

MAPTILER_KEY = "DDQqKsPBfdOZOVxgcoy5"

# MDRS site bounding box (~5 km around the origin)
MIN_LAT = 38.400
MAX_LAT = 38.450
MIN_LON = -110.810
MAX_LON = -110.760

# Zoom levels to download.  12-13 give context, 14-18 give detail for driving.
# Zoom 19 quadruples the tile count vs 18 — only enable if you need sub-meter
# detail and have time/disk for it.
MIN_ZOOM = 12
MAX_ZOOM = 18

OUTPUT_DIR = os.path.join(os.path.dirname(__file__), "..", "public", "tiles")

# ── Tile math ──────────────────────────────────────────────────────────────────

def lat_lon_to_tile(lat, lon, zoom):
    """Convert lat/lon to slippy-map tile x, y at a given zoom level."""
    n = 2 ** zoom
    x = int((lon + 180.0) / 360.0 * n)
    lat_rad = math.radians(lat)
    y = int((1.0 - math.asinh(math.tan(lat_rad)) / math.pi) / 2.0 * n)
    return x, y


def tile_range(min_lat, min_lon, max_lat, max_lon, zoom):
    """Return (x_min, x_max, y_min, y_max) tile indices for a bounding box."""
    x_min, y_max = lat_lon_to_tile(min_lat, min_lon, zoom)  # SW corner
    x_max, y_min = lat_lon_to_tile(max_lat, max_lon, zoom)  # NE corner
    return x_min, x_max, y_min, y_max

# ── Download ───────────────────────────────────────────────────────────────────

def download_tiles():
    os.makedirs(OUTPUT_DIR, exist_ok=True)

    # Count total tiles first for progress display
    total = 0
    for z in range(MIN_ZOOM, MAX_ZOOM + 1):
        x_min, x_max, y_min, y_max = tile_range(MIN_LAT, MIN_LON, MAX_LAT, MAX_LON, z)
        total += (x_max - x_min + 1) * (y_max - y_min + 1)

    print(f"Downloading {total} tiles (zoom {MIN_ZOOM}-{MAX_ZOOM}) to {os.path.abspath(OUTPUT_DIR)}")
    print(f"Bounding box: ({MIN_LAT}, {MIN_LON}) to ({MAX_LAT}, {MAX_LON})\n")

    downloaded = 0
    skipped = 0
    errors = 0

    for z in range(MIN_ZOOM, MAX_ZOOM + 1):
        x_min, x_max, y_min, y_max = tile_range(MIN_LAT, MIN_LON, MAX_LAT, MAX_LON, z)
        z_dir = os.path.join(OUTPUT_DIR, str(z))
        count_at_zoom = (x_max - x_min + 1) * (y_max - y_min + 1)
        print(f"Zoom {z}: {count_at_zoom} tiles  (x {x_min}-{x_max}, y {y_min}-{y_max})")

        for x in range(x_min, x_max + 1):
            x_dir = os.path.join(z_dir, str(x))
            os.makedirs(x_dir, exist_ok=True)

            for y in range(y_min, y_max + 1):
                out_path = os.path.join(x_dir, f"{y}.jpg")

                # Skip tiles we already have
                if os.path.exists(out_path) and os.path.getsize(out_path) > 0:
                    skipped += 1
                    continue

                url = (
                    f"https://api.maptiler.com/tiles/satellite/"
                    f"{z}/{x}/{y}.jpg?key={MAPTILER_KEY}"
                )
                try:
                    urllib.request.urlretrieve(url, out_path)
                    downloaded += 1
                except Exception as e:
                    print(f"  ERROR {z}/{x}/{y}: {e}")
                    errors += 1

                # Progress
                done = downloaded + skipped + errors
                if done % 50 == 0 or done == total:
                    print(f"  Progress: {done}/{total} ({downloaded} new, {skipped} cached, {errors} errors)")

                # Be polite to the API — slight delay
                time.sleep(0.05)

    print(f"\nDone. {downloaded} downloaded, {skipped} already cached, {errors} errors.")
    size_mb = sum(
        os.path.getsize(os.path.join(dp, f))
        for dp, _, fns in os.walk(OUTPUT_DIR)
        for f in fns
    ) / (1024 * 1024)
    print(f"Total size: {size_mb:.1f} MB")


if __name__ == "__main__":
    download_tiles()
