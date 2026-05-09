## Getting Started

### Prerequisites
- [uv](https://docs.astral.sh/uv/getting-started/installation/) (Python package manager)
- Node.js and npm
- ROS2 Humble

### Setup

Navigate into the web gui folder:

```bash
cd umdloop_gui_web
```

Install Python dependencies with uv (creates a virtual environment automatically):

```bash
uv sync
```

Install Node dependencies:

```bash
npm install
```

### Development (localhost)

For local development, run the Next.js dev server and the Python backend (simulating the Jetson) each in a separate terminal:

```bash
npm run dev
```

```bash
uv run python server.py
```

This uses `.env.development`, which points all services at `localhost`:

```
NEXT_PUBLIC_ROSBRIDGE_WS_URL=ws://localhost:9090
NEXT_PUBLIC_GUI_API_URL=http://localhost:5000
NEXT_PUBLIC_WEBRTC_WS_URL=ws://localhost:8081
NEXT_PUBLIC_RAMAN_WS_URL=ws://localhost:5001/ws/spectrum
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

### Production / Field deployment (base station ↔ rover)

Everything runs on the **Jetson (rover)** — the Next.js frontend, the Python backend, and all ROS services. The base station just opens a browser and navigates to the Jetson's IP.

`.env.production` points all services at the Jetson's static IP (`192.168.88.90`):

```
NEXT_PUBLIC_ROSBRIDGE_WS_URL=ws://192.168.88.90:9090
NEXT_PUBLIC_GUI_API_URL=http://192.168.88.90:5000
NEXT_PUBLIC_WEBRTC_WS_URL=ws://192.168.88.90:8081
NEXT_PUBLIC_RAMAN_WS_URL=ws://192.168.88.90:5001/ws/spectrum
```

**On the Jetson**, run the following:

```bash
# Build and serve the GUI
npm run build
npm run start
```

```bash
# Python backend
uv run python server.py
```

```bash
# ROS bridge
ros2 launch rosbridge_server rosbridge_websocket_launch.xml
```

**On the base station**, open a browser and go to `http://192.168.88.90:3000`.

The Map view subscribes to `/gps/fix` (NavSatFix) from the rover and shows the rover as a green marker.

For UMDLOOP-Native
To Build, go to /build

$env:CMAKE_PREFIX_PATH="C:\Qt\6.10.0\msvc2022_64"
cmake ..
cmake --build . --config Release

# Copy Qt DLLs to your exe
cd Release
C:\Qt\6.10.0\msvc2022_64\bin\windeployqt.exe LoopGui.exe

# Run the application
.\LoopGui.exe
