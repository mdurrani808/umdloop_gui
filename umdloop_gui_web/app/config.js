/**
 * Client-side config for UMD Loop GUI.
 * Base station has internet; rover does not. GUI runs on base and connects to rover over radio.
 *
 * Set in .env.local or at build time:
 *   NEXT_PUBLIC_ROSBRIDGE_WS_URL - WebSocket URL for Rosbridge on the rover (default: ws://localhost:9090).
 *                                  In the field, set to e.g. ws://192.168.1.100:9090 (rover's IP on radio network).
 *   NEXT_PUBLIC_USE_LOCAL_TILES  - Set to "true" to use offline tiles from public/tiles/ instead of MapTiler CDN.
 *                                  Run `python3 scripts/download_tiles.py` first to populate the tiles.
 */

export function getRosbridgeUrl() {
  if (typeof window !== "undefined") {
    return window.__ROSBRIDGE_WS_URL__ ?? "ws://localhost:9090";
  }
  return process.env.NEXT_PUBLIC_ROSBRIDGE_WS_URL || "ws://localhost:9090";
}

export function useLocalTiles() {
  return process.env.NEXT_PUBLIC_USE_LOCAL_TILES === "true";
}
