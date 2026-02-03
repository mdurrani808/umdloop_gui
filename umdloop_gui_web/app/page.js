"use client";

import React, { useState, useEffect } from 'react';


import ROSLIB from "roslib";

export const modes = ["Drone", "Cameras", "Sensors", "ROS2 Entities", "Navigation", "Mission"];
export const icons = ["drone.png", "camera.png", "sensor.png", "ros2.png", "navigation.png", "mission.png"];
export const subsystems = ["Drive", "Arm", "Science"];

function NavigationBar( {selectedMode, setSelectedMode} ) {
    const [hoveredButtonId, setHoveredButtonId] = useState(null);
    const [selectedButton, setSelectedButton] = useState(0);
    let buttonColor;
    return (
        <nav style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          alignItems: "center",
          gap: "6px",
          padding: "12px 8px",
          background: "#3d3d3d"}}>
            {icons.map((mode, idx) => {
              if (hoveredButtonId === idx) {
                buttonColor = "#353535ff";
              } else if (selectedButton === idx) {
                buttonColor = "#262626ff";
              } else {
                buttonColor = "#3d3d3d";
              }
              return(
                <button
                  key={mode}
                  style={{
                    background: buttonColor,
                    border: "2px solid #1f1e1eff",
                    borderRadius: "10px",
                    padding: "12px 8px",
                    cursor: "pointer",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    gap: "6px",
                    flex: 1,
                    minWidth: "0",
                  }}
                  onMouseEnter={() => setHoveredButtonId(idx)}
                  onMouseLeave={() => setHoveredButtonId(null)}
                  onClick={() => {
                    setSelectedMode(modes[idx])
                    setSelectedButton(idx)
                  }}
                >
                  <img src={`/${mode}`} alt={mode.replace('.png', '')} style={{ width: "36px", height: "36px" }} />
                  <span style={{ color: "white", fontSize: "10px", whiteSpace: "nowrap" }}>{modes[idx]}</span>
                </button>
              );
            })}
        </nav>
    );
}

function Subsystem({ buttons, selected, setSelected }) {
  const [hoveredButtonId, setHoveredButtonId] = useState(null);
  const [selectedButton, setSelectedButton] = useState(0);
  let buttonColor;

  return (
    <div style={{
      display: "flex",
      flexDirection: "column",
      alignItems: "start",
      justifyContent: "center",
      minHeight: "100vh",
      gap: "20px",
      marginTop: "-100px",
      marginLeft: "-50px",
    }}>
      {buttons.map((label, idx) => {
        if (hoveredButtonId === idx) {
          buttonColor = "#960303ff";
        } else if (selectedButton === idx) {
          buttonColor = "#530000ff";
        } else {
          buttonColor = "#c90202ff";
        }

        return (
          <div
            key={label}
            style={{
              background: buttonColor,
              border: "2px solid #360101ff",
              width: "400px",
              height: "80px",
              borderRadius: "9999px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
            }}
            onMouseEnter={() => setHoveredButtonId(idx)}
            onMouseLeave={() => setHoveredButtonId(null)}
            onClick={() => {
              setSelected(label);
              setSelectedButton(idx);
            }}
          >
            <span style={{ fontFamily: "Arial Black", color: "white", fontSize: "20px" }}>
              {label}
            </span>
          </div>
        );
      })}
    </div>
  );
}

// Horizontal subsystem bar for vertical monitor layout
function SubsystemBar({ buttons, selected, setSelected }) {
  const [hoveredButtonId, setHoveredButtonId] = useState(null);

  return (
    <div style={{
      display: "flex",
      flexDirection: "row",
      justifyContent: "center",
      alignItems: "center",
      gap: "12px",
      padding: "12px 20px",
      background: "#2b2b2b",
      borderBottom: "2px solid #1f1e1eff",
    }}>
      {buttons.map((label, idx) => {
        let buttonColor;
        if (hoveredButtonId === idx) {
          buttonColor = "#960303ff";
        } else if (selected === label) {
          buttonColor = "#530000ff";
        } else {
          buttonColor = "#c90202ff";
        }

        return (
          <div
            key={label}
            style={{
              background: buttonColor,
              border: "2px solid #360101ff",
              padding: "10px 32px",
              borderRadius: "9999px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
              transition: "background 0.15s ease",
            }}
            onMouseEnter={() => setHoveredButtonId(idx)}
            onMouseLeave={() => setHoveredButtonId(null)}
            onClick={() => setSelected(label)}
          >
            <span style={{ fontFamily: "Arial Black", color: "white", fontSize: "14px" }}>
              {label}
            </span>
          </div>
        );
      })}
    </div>
  );
}


function PageContent({ selectedMode, selectedSubsystem, selectedNavItem, setSelectedNavItem, sharedRos, setSharedRos }) {
  if (selectedMode === "Cameras") {
    return <Cameras selectedSubsystem={selectedSubsystem} />;
  }
  else if (selectedMode === "Drone") {
    return <Drone />;
  }
  else if (selectedMode === "Sensors") {
    return <Sensors selectedSubsystem={selectedSubsystem} />;
  }
  else if (selectedMode === "ROS2 Entities") {
    return <ROS2Entities
        selectedSubsystem={selectedSubsystem}
        sharedRos={sharedRos}
        setSharedRos={setSharedRos}
      />;
  }
  else if (selectedMode === "Navigation") {
    return <Navigation selectedNavItem={selectedNavItem} />;
  }
  else if (selectedMode === "Mission") {
    return <Mission selectedSubsystem={selectedSubsystem} />;
  }
}

function Drone() {
  return (
    <div style={{
      display: "flex",
      flexDirection: "column",
      height: "calc(100vh - 145px)",
      padding: "8px",
      background: "#1a1a1a",
    }}>
      <div style={{
        background: "#2b2b2b",
        borderRadius: "24px",
        border: "2px solid #3d3d3d",
        padding: "8px",
        flex: 1,
        display: "flex",
        flexDirection: "column",
      }}>
        <h3 style={{ color: "white", fontSize: "14px", fontWeight: "bold", textAlign: "center", marginBottom: "8px" }}>
          Drone OSD - UMD Campus
        </h3>
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d12419.932642047048!2d-76.94697!3d38.9869!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89b7c6a3842e16f1%3A0x7e2a6e8d1e7a8e9e!2sUniversity%20of%20Maryland!5e0!3m2!1sen!2sus!4v1700000000000!5m2!1sen!2sus"
          style={{
            flex: 1,
            width: "100%",
            border: "none",
            borderRadius: "20px",
          }}
          allowFullScreen=""
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
      </div>
    </div>
  );
}

function Cameras({ selectedSubsystem }) {
  const [fullscreenCam, setFullscreenCam] = useState(null);

  useEffect(() => {
    const handleKey = (e) => { if (e.key === "Escape") setFullscreenCam(null); };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, []);

  // Reusable big camera card
  const BigCameraCard = ({ camera, style = {} }) => (
    <div
      onClick={() => setFullscreenCam(camera)}
      style={{
        background: "#2b2b2b",
        borderRadius: "24px",
        border: "2px solid #3d3d3d",
        padding: "8px",
        cursor: "pointer",
        display: "flex",
        flexDirection: "column",
        ...style,
      }}
      onMouseEnter={(e) => e.currentTarget.style.borderColor = "#c90202"}
      onMouseLeave={(e) => e.currentTarget.style.borderColor = "#3d3d3d"}
    >
      <h3 style={{ color: "white", fontSize: "12px", fontWeight: "bold", textAlign: "center", marginBottom: "4px" }}>
        {camera.label}
      </h3>
      <img
        src={`http://localhost:5000/camera/${camera.id}`}
        alt={camera.label}
        style={{
          width: "100%",
          flex: 1,
          objectFit: "cover",
          borderRadius: "20px",
          background: "black",
        }}
      />
    </div>
  );

  // Small camera card
  const SmallCameraCard = ({ camera }) => (
    <div
      onClick={() => setFullscreenCam(camera)}
      style={{
        background: "#2b2b2b",
        borderRadius: "12px",
        border: "2px solid #3d3d3d",
        padding: "6px",
        cursor: "pointer",
        display: "flex",
        flexDirection: "column",
      }}
      onMouseEnter={(e) => e.currentTarget.style.borderColor = "#c90202"}
      onMouseLeave={(e) => e.currentTarget.style.borderColor = "#3d3d3d"}
    >
      <h4 style={{ color: "white", fontSize: "10px", fontWeight: "bold", textAlign: "center", marginBottom: "4px" }}>
        {camera.label}
      </h4>
      <img
        src={`http://localhost:5000/camera/${camera.id}`}
        alt={camera.label}
        style={{
          width: "100%",
          flex: 1,
          objectFit: "cover",
          borderRadius: "8px",
          background: "black",
        }}
      />
    </div>
  );

  // Fullscreen overlay component
  const FullscreenOverlay = () => fullscreenCam && (
    <div
      onClick={() => setFullscreenCam(null)}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: "rgba(0, 0, 0, 0.95)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 1000,
        padding: "20px",
      }}
    >
      <h2 style={{ color: "white", fontSize: "24px", fontWeight: "bold", marginBottom: "16px" }}>
        {fullscreenCam.label}
      </h2>
      <img
        src={`http://localhost:5000/camera/${fullscreenCam.id}`}
        alt={fullscreenCam.label}
        style={{
          maxWidth: "100%",
          maxHeight: "80vh",
          objectFit: "contain",
          borderRadius: "12px",
          background: "black",
        }}
      />
      <p style={{ color: "#888", marginTop: "16px", fontSize: "14px" }}>
        Click anywhere or press ESC to close
      </p>
    </div>
  );

  // ========== DRIVE CAMERAS LAYOUT ==========
  if (selectedSubsystem === "Drive") {
    const frontCamera = { label: "Front Camera", id: 15 };
    const backCamera = { label: "Back Camera", id: 16 };
    const sideViews = [
      { label: "Left Side", id: 17 },
      { label: "Right Side", id: 18 },
    ];
    const wheelCameras = [
      { label: "Top Left Wheel", cams: [0, 1] },
      { label: "Top Right Wheel", cams: [2, 3] },
      { label: "Bottom Left Wheel", cams: [4, 5] },
      { label: "Bottom Right Wheel", cams: [6, 7] },
    ];

    return (
      <div style={{
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        gridTemplateRows: "1fr 1fr",
        gap: "8px",
        padding: "8px",
        height: "calc(100vh - 145px)",
        background: "#1a1a1a",
      }}>
        {/* Top Left - Front Camera (big) */}
        <BigCameraCard camera={frontCamera} />

        {/* Top Right - 2x2 Wheel Grid */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gridTemplateRows: "1fr 1fr",
          gap: "6px",
          background: "#2b2b2b",
          borderRadius: "12px",
          border: "2px solid #3d3d3d",
          padding: "6px",
        }}>
          {wheelCameras.map((wheel) => (
            <div
              key={wheel.label}
              style={{
                background: "#1a1a1a",
                borderRadius: "8px",
                padding: "4px",
                display: "flex",
                flexDirection: "column",
              }}
            >
              <h4 style={{ color: "white", fontSize: "9px", fontWeight: "bold", textAlign: "center", marginBottom: "2px" }}>
                {wheel.label}
              </h4>
              <div style={{ display: "flex", gap: "4px", flex: 1 }}>
                {wheel.cams.map((camId) => (
                  <img
                    key={camId}
                    src={`http://localhost:5000/camera/${camId}`}
                    alt={`Camera ${camId}`}
                    onClick={() => setFullscreenCam({ label: `${wheel.label} - Cam ${camId}`, id: camId })}
                    style={{
                      flex: 1,
                      objectFit: "cover",
                      borderRadius: "4px",
                      background: "black",
                      cursor: "pointer",
                      border: "1px solid #3d3d3d",
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.borderColor = "#c90202"}
                    onMouseLeave={(e) => e.currentTarget.style.borderColor = "#3d3d3d"}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Left - Back Camera (big) */}
        <BigCameraCard camera={backCamera} />

        {/* Bottom Right - 1x2 Side Views */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "6px",
          background: "#2b2b2b",
          borderRadius: "12px",
          border: "2px solid #3d3d3d",
          padding: "6px",
        }}>
          {sideViews.map((side) => (
            <SmallCameraCard key={side.label} camera={side} />
          ))}
        </div>

        <FullscreenOverlay />
      </div>
    );
  }

  // ========== ARM CAMERAS LAYOUT ==========
  if (selectedSubsystem === "Arm") {
    const baseCamera = { label: "Base of Arm", id: 8 };
    const endEffectorCamera = { label: "End Effector", id: 10 };
    const jointCamera = { label: "Joint of Arm", id: 9 };
    const gripperCamera = { label: "Gripper Cam", id: 11 };

    return (
      <div style={{
        display: "grid",
        gridTemplateColumns: "1.2fr 1fr",
        gridTemplateRows: "1fr 1fr",
        gap: "8px",
        padding: "8px",
        height: "calc(100vh - 145px)",
        background: "#1a1a1a",
      }}>
        {/* Top Left - Big view (Base of Arm) */}
        <BigCameraCard camera={baseCamera} />

        {/* Top Right - Medium view (Joint) */}
        <SmallCameraCard camera={jointCamera} />

        {/* Bottom Left - Big view (End Effector) */}
        <BigCameraCard camera={endEffectorCamera} />

        {/* Bottom Right - Medium view (Gripper) */}
        <SmallCameraCard camera={gripperCamera} />

        <FullscreenOverlay />
      </div>
    );
  }

  // ========== SCIENCE CAMERAS LAYOUT ==========
  if (selectedSubsystem === "Science") {
    const scienceCams = [
      { label: "Science Cam 1", id: 12 },
      { label: "Science Cam 2", id: 13 },
      { label: "Science Cam 3", id: 14 },
    ];

    return (
      <div style={{
        display: "flex",
        flexDirection: "column",
        gap: "8px",
        padding: "8px",
        height: "calc(100vh - 145px)",
        background: "#1a1a1a",
      }}>
        {/* Science cams stacked vertically */}
        {scienceCams.map((cam) => (
          <BigCameraCard key={cam.label} camera={cam} style={{ flex: 1 }} />
        ))}

        <FullscreenOverlay />
      </div>
    );
  }

  return null;
}

function Sensors( {selectedSubsystem} ) {
  return (
    <div style={{ padding: "20px" }}>
      <h1>{selectedSubsystem} - Sensors Mode</h1>
    </div>
  );
}

function ROS2Entities({ selectedSubsystem, sharedRos, setSharedRos }) {
  const [rosStatus, setRosStatus] = useState("connecting...");
  const [messages, setMessages] = useState([]);
  const [rosInstance, setRosInstance] = useState(null);

  // Publisher state
  const [pubTopic, setPubTopic] = useState("/cmd_vel");
  const [pubMessageType, setPubMessageType] = useState("geometry_msgs/msg/Twist");
  const [pubPayload, setPubPayload] = useState('{\n  "linear": {"x": 0.0, "y": 0.0, "z": 0.0},\n  "angular": {"x": 0.0, "y": 0.0, "z": 0.0}\n}');
  const [publishStatus, setPublishStatus] = useState("");

  useEffect(() => {
    const ros = sharedRos || new ROSLIB.Ros({ url: "ws://localhost:9090" });
    setRosInstance(ros);
    if (!sharedRos) setSharedRos(ros);

    ros.on("connection", () => setRosStatus("✅ connected"));
    ros.on("error", (error) => setRosStatus(`❌ error: ${error}`));
    ros.on("close", () => setRosStatus("🔴 closed"));

    let subscription_topics = [];
    let subscription_msg_type = [];

    if (selectedSubsystem === "Arm") {
      subscription_topics = ["/joint_states", "/controller_input", "/can_tx", "/can_rx"];
      subscription_msg_type = [
        "sensor_msgs/msg/JointState",
        "sensor_msgs/msg/Joy",
        "umdloop_athena_can_messages/msg/CANA",
        "umdloop_athena_can_messages/msg/CANA",
      ];
    } else if (selectedSubsystem === "Drive") {
      subscription_topics = ["/cmd_vel", "/odom"];
      subscription_msg_type = ["geometry_msgs/msg/Twist", "nav_msgs/msg/Odometry"];
    }

    const listeners = subscription_topics.map((topic, i) => {
      const listener = new ROSLIB.Topic({ ros, name: topic, messageType: subscription_msg_type[i] });
      listener.subscribe((msg) => {
        setMessages((prev) => [
          { topic, msg: JSON.stringify(msg, null, 2) },
          ...prev.slice(0, 20),
        ]);
      });
      return listener;
    });

    return () => {
      listeners.forEach((l) => l.unsubscribe());
      ros.close();
    };
  }, [selectedSubsystem]);

  const publishMessage = () => {
    if (!rosInstance) {
      setPublishStatus("❌ ROS not connected");
      return;
    }

    try {
      const message = JSON.parse(pubPayload);
      const topic = new ROSLIB.Topic({
        ros: rosInstance,
        name: pubTopic,
        messageType: pubMessageType,
      });

      topic.publish(new ROSLIB.Message(message));
      setPublishStatus(`✅ Published to ${pubTopic}`);

      // Clear status after 3 seconds
      setTimeout(() => setPublishStatus(""), 3000);
    } catch (error) {
      setPublishStatus(`❌ Error: ${error.message}`);
    }
  };

  const loadPreset = (preset) => {
    const presets = {
      cmd_vel: {
        topic: "/cmd_vel",
        type: "geometry_msgs/msg/Twist",
        payload: '{\n  "linear": {"x": 0.5, "y": 0.0, "z": 0.0},\n  "angular": {"x": 0.0, "y": 0.0, "z": 0.0}\n}'
      },
      stop: {
        topic: "/cmd_vel",
        type: "geometry_msgs/msg/Twist",
        payload: '{\n  "linear": {"x": 0.0, "y": 0.0, "z": 0.0},\n  "angular": {"x": 0.0, "y": 0.0, "z": 0.0}\n}'
      },
      joint_states: {
        topic: "/joint_states",
        type: "sensor_msgs/msg/JointState",
        payload: '{\n  "name": ["joint1", "joint2"],\n  "position": [0.0, 0.0],\n  "velocity": [0.0, 0.0],\n  "effort": [0.0, 0.0]\n}'
      },
      nav_goal: {
        topic: "/goal_pose",
        type: "geometry_msgs/msg/PoseStamped",
        payload: '{\n  "header": {"frame_id": "map"},\n  "pose": {\n    "position": {"x": 0.0, "y": 0.0, "z": 0.0},\n    "orientation": {"x": 0.0, "y": 0.0, "z": 0.0, "w": 1.0}\n  }\n}'
      }
    };

    if (presets[preset]) {
      setPubTopic(presets[preset].topic);
      setPubMessageType(presets[preset].type);
      setPubPayload(presets[preset].payload);
    }
  };

  return (
    <div className="py-4">
      <h2 className="text-2xl font-semibold text-center">{selectedSubsystem} - ROS2 Entities Mode</h2>
      <p className="mt-2 text-center">ROS Connection: {rosStatus}</p>

      <div className="max-w-7xl mx-auto mt-6 grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* PUBLISH SECTION */}
        <div className="bg-zinc-900 p-6 rounded-xl border border-zinc-700">
          <h3 className="text-xl font-bold mb-4 text-white">Publish ROS2 Command</h3>

          {/* Presets */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-white mb-2">Quick Presets:</label>
            <div className="flex gap-2 flex-wrap">
              <button
                onClick={() => loadPreset('cmd_vel')}
                className="px-3 py-1 bg-blue-600 hover:bg-blue-700 text-white rounded text-sm"
              >
                Move Forward
              </button>
              <button
                onClick={() => loadPreset('stop')}
                className="px-3 py-1 bg-red-600 hover:bg-red-700 text-white rounded text-sm"
              >
                Stop
              </button>
              <button
                onClick={() => loadPreset('joint_states')}
                className="px-3 py-1 bg-green-600 hover:bg-green-700 text-white rounded text-sm"
              >
                Joint States
              </button>
              <button
                onClick={() => loadPreset('nav_goal')}
                className="px-3 py-1 bg-purple-600 hover:bg-purple-700 text-white rounded text-sm"
              >
                Nav Goal
              </button>
            </div>
          </div>

          {/* Navigation Integration
          <div className="mb-4 p-3 bg-zinc-800 rounded-lg border border-zinc-600">
            <label className="block text-sm font-medium text-white mb-2">Navigation Integration:</label>
            <div className="flex gap-2 items-center">
              <button
                onClick={sendWaypointsToNav}
                className="px-3 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded text-sm flex-1"
              >
                Sync Waypoints ({navigationWaypoints.length})
              </button>
              <div className="text-xs text-gray-400">
                Rover: ({Math.round(roverPosition.x)}, {Math.round(roverPosition.y)})
              </div>
            </div>
          </div> */}

          {/* Topic Name */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-white mb-2">Topic Name:</label>
            <input
              type="text"
              value={pubTopic}
              onChange={(e) => setPubTopic(e.target.value)}
              className="w-full px-3 py-2 bg-zinc-800 text-white rounded border border-zinc-600 focus:border-blue-500 focus:outline-none"
              placeholder="/cmd_vel"
            />
          </div>

          {/* Message Type */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-white mb-2">Message Type:</label>
            <input
              type="text"
              value={pubMessageType}
              onChange={(e) => setPubMessageType(e.target.value)}
              className="w-full px-3 py-2 bg-zinc-800 text-white rounded border border-zinc-600 focus:border-blue-500 focus:outline-none"
              placeholder="geometry_msgs/msg/Twist"
            />
          </div>

          {/* Message Payload */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-white mb-2">Message Payload (JSON):</label>
            <textarea
              value={pubPayload}
              onChange={(e) => setPubPayload(e.target.value)}
              className="w-full px-3 py-2 bg-zinc-800 text-white rounded border border-zinc-600 focus:border-blue-500 focus:outline-none font-mono text-sm"
              rows="10"
              placeholder='{"linear": {"x": 0.0, "y": 0.0, "z": 0.0}}'
            />
          </div>

          {/* Publish Button */}
          <button
            onClick={publishMessage}
            className="w-full py-3 bg-green-600 hover:bg-green-700 text-white font-bold rounded-lg transition"
          >
            Publish Message
          </button>

          {/* Status */}
          {publishStatus && (
            <div className={`mt-3 p-3 rounded ${publishStatus.startsWith('✅') ? 'bg-green-900 text-green-200' : 'bg-red-900 text-red-200'}`}>
              {publishStatus}
            </div>
          )}
        </div>

        {/* SUBSCRIBE SECTION */}
        <div className="bg-zinc-900 p-6 rounded-xl border border-zinc-700">
          <h3 className="text-xl font-bold mb-4 text-white">Incoming Messages</h3>
          <div className="bg-black text-green-400 p-3 rounded-lg text-left h-[500px] overflow-y-scroll">
            {messages.length === 0
              ? <p className="text-zinc-500">No messages received yet...</p>
              : messages.map((m, i) => (
                  <pre key={i} className="mb-3 text-xs"><b className="text-yellow-400">{m.topic}</b> →\n{m.msg}</pre>
                ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export const NAVIGATION_BUTTONS = [
  "Object Detection",
  "Control Panel",
  "Placeholder2",
];

function Navigation({selectedNavItem}) {
  const [running, setRunning] = useState(false);
  const [pid, setPid] = useState(null);
  const [error, setError] = useState("");

  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");
  const [navMode, setNavMode] = useState("GNSS");

  const [pathPlanStatus, setPathPlanStatus] = useState("");

  const fetchStatus = async () => {
    try {
      setError("");
      const res = await fetch("http://127.0.0.1:5000/object-detection/status");
      const data = await res.json();
      setRunning(Boolean(data.running));
      setPid(data.pid ?? null);
    } catch (e) {
      setError("Backend unreachable");
      setRunning(false);
      setPid(null);
    }
  };

  const startDetection = async () => {
    try {
      setError("");
      await fetch("http://127.0.0.1:5000/object-detection/start", { method: "POST" });
      await fetchStatus();
    } catch (e) {
      setError("Failed to start");
    }
  };

  const stopDetection = async () => {
    try {
      setError("");
      await fetch("http://127.0.0.1:5000/object-detection/stop", { method: "POST" });
      await fetchStatus();
    } catch (e) {
      setError("Failed to stop");
    }
  };

  const onPathPlan = async () => {
    console.log("Path plan clicked", { latitude, longitude, navMode });
    try {

      setError("");
      setPathPlanStatus("Sending...");

      const res = await fetch("http://127.0.0.1:5000/navigation/path-plan", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          latitude: Number(latitude),
          longitude: Number(longitude),
          position_tolerance: 0.0,
          mode: navMode,
        }),
      });

      const data = await res.json();

      if (!res.ok || data.ok === false) {
        setPathPlanStatus("");
        setError(data.error || data.message || "Path plan failed");
        return;
      }

      setPathPlanStatus(data.message || "Request sent");
    } catch (e) {
      setPathPlanStatus("");
      setError("Backend unreachable");
    }
  };

  // When you enter Object Detection tab, start polling status
  useEffect(() => {
    if (selectedNavItem !== "Object Detection") return;

    fetchStatus(); // initial fetch
    const id = setInterval(fetchStatus, 1000);
    return () => clearInterval(id);
  }, [selectedNavItem]);

  // Optional: auto-start when tab is selected
  useEffect(() => {
    if (selectedNavItem !== "Object Detection") return;
    startDetection();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedNavItem]);

  return (
    <div>
      <h1>{selectedNavItem} - Navigation Mode</h1>

      {selectedNavItem === "Object Detection" && (
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "16px" }}>
          {/* Status Row */}
          <div
            style={{
              display: "flex",
              gap: "12px",
              alignItems: "center",
              padding: "12px 16px",
              borderRadius: "14px",
              border: "2px solid #1f1e1eff",
              background: "#2b2b2b",
              color: "white",
              width: "fit-content",
            }}
          >
            <div
              style={{
                padding: "6px 12px",
                borderRadius: "9999px",
                fontWeight: 800,
                background: running ? "#1f7a1f" : "#8a1f1f",
              }}
            >
              {running ? "RUNNING ✅" : "STOPPED ❌"}
            </div>

            <div style={{ opacity: 0.9 }}>
              PID: <span style={{ fontWeight: 700 }}>{pid ?? "—"}</span>
            </div>

            {error && (
              <div style={{ color: "#ffb3b3", fontWeight: 700 }}>
                {error}
              </div>
            )}
          </div>

          {/* Controls */}
          <div style={{ display: "flex", gap: "10px" }}>
            <button
              onClick={startDetection}
              style={{
                cursor: "pointer",
                padding: "10px 16px",
                borderRadius: "9999px",
                border: "2px solid #1f1e1eff",
                background: "#3d3d3d",
                color: "white",
                fontWeight: 800,
              }}
            >
              Start
            </button>

            <button
              onClick={stopDetection}
              style={{
                cursor: "pointer",
                padding: "10px 16px",
                borderRadius: "9999px",
                border: "2px solid #1f1e1eff",
                background: "#3d3d3d",
                color: "white",
                fontWeight: 800,
              }}
            >
              Stop
            </button>

            <button
              onClick={fetchStatus}
              style={{
                cursor: "pointer",
                padding: "10px 16px",
                borderRadius: "9999px",
                border: "2px solid #1f1e1eff",
                background: "#3d3d3d",
                color: "white",
                fontWeight: 800,
              }}
            >
              Refresh
            </button>
          </div>

          {/* Camera */}
          <div style={{ textAlign: "center" }}>
            <h2>Object Detection Stream</h2>
            <img
              src="http://127.0.0.1:5000/object-detection/stream/0"
              alt="Object Detection Stream"
              style={{ width: "640px", height: "480px" }}
            />
          </div>
        </div>
      )}

      {selectedNavItem === "Control Panel" && (
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "16px" }}>
          <div
            style={{
              padding: "18px 20px",
              borderRadius: "14px",
              border: "2px solid #1f1e1eff",
              background: "#2b2b2b",
              color: "white",
              width: "520px",
              textAlign: "left",
            }}
          >
            <h2 style={{ marginTop: 0 }}>Control Panel</h2>

            {/* Latitude / Longitude */}
            <div style={{ display: "flex", gap: "12px" }}>
              <div style={{ flex: 1 }}>
                <label style={{ fontWeight: 800, display: "block", marginBottom: 6 }}>Latitude</label>
                <input
                  value={latitude}
                  onChange={(e) => setLatitude(e.target.value)}
                  placeholder="e.g. 38.4239116"
                  style={{
                    width: "100%",
                    padding: "10px 12px",
                    borderRadius: "10px",
                    border: "2px solid #1f1e1eff",
                    background: "#3d3d3d",
                    color: "white",
                    outline: "none",
                  }}
                />
              </div>

              <div style={{ flex: 1 }}>
                <label style={{ fontWeight: 800, display: "block", marginBottom: 6 }}>Longitude</label>
                <input
                  value={longitude}
                  onChange={(e) => setLongitude(e.target.value)}
                  placeholder="e.g. -110.7849055"
                  style={{
                    width: "100%",
                    padding: "10px 12px",
                    borderRadius: "10px",
                    border: "2px solid #1f1e1eff",
                    background: "#3d3d3d",
                    color: "white",
                    outline: "none",
                  }}
                />
              </div>
            </div>

            {/* Radio Options */}
            <div style={{ marginTop: 16 }}>
              <div style={{ fontWeight: 800, marginBottom: 8 }}>Mode</div>

              {["GNSS", "Object Detection", "Aruco Tag"].map((opt) => (
                <label
                  key={opt}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "10px",
                    padding: "8px 10px",
                    borderRadius: "12px",
                    border: "2px solid #1f1e1eff",
                    background: navMode === opt ? "#262626ff" : "#3d3d3d",
                    cursor: "pointer",
                    marginBottom: 10,
                  }}
                >
                  <input
                    type="radio"
                    name="navMode"
                    value={opt}
                    checked={navMode === opt}
                    onChange={() => setNavMode(opt)}
                    style={{ transform: "scale(1.2)" }}
                  />
                  <span style={{ fontWeight: 800 }}>{opt}</span>
                </label>
              ))}
            </div>

            {/* Optional: show what's selected */}
            <div style={{ marginTop: 6, opacity: 0.9 }}>
              {/* Path Plan Button */}
              <button
                onClick={onPathPlan}
                style={{
                  marginTop: "18px",
                  width: "100%",
                  padding: "12px 16px",
                  borderRadius: "9999px",
                  border: "2px solid #1f1e1eff",
                  background: "#530000ff",
                  color: "white",
                  fontWeight: 900,
                  fontSize: "16px",
                  cursor: "pointer",
                }}
              >
                Path Plan
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
  }

function Mission( {selectedSubsystem} ) {
  return (
    <div style={{ padding: "20px" }}>
      <h1>{selectedSubsystem} - Mission Mode</h1>
    </div>
  );
}

export default function LoopGui() {
  console.log("🔥 LOOP GUI RENDERED");
  const [selectedMode, setSelectedMode] = useState(modes[0]);
  const [selectedSubsystem, setSelectedSubsystem] = useState(subsystems[0]);
  const [selectedNavItem, setSelectedNavItem] = useState(NAVIGATION_BUTTONS[0]);
  const [sharedRos, setSharedRos] = useState(null);

  // Determine which buttons to show based on mode
  const showSubsystemBar = true; // Always show subsystem bar

  return (
    <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh", background: "#1a1a1a" }}>
      {/* Top Navigation Bar */}
      <NavigationBar selectedMode={selectedMode} setSelectedMode={setSelectedMode} />

      {/* Subsystem Bar (horizontal) - only show when not in Cameras mode */}
      {showSubsystemBar && (
        selectedMode === "Navigation" ? (
          <SubsystemBar
            buttons={NAVIGATION_BUTTONS}
            selected={selectedNavItem}
            setSelected={setSelectedNavItem}
          />
        ) : (
          <SubsystemBar
            buttons={subsystems}
            selected={selectedSubsystem}
            setSelected={setSelectedSubsystem}
          />
        )
      )}

      {/* Main Content Area - full width for vertical monitors */}
      <div style={{ flex: 1, overflow: "hidden" }}>
        <PageContent
          selectedMode={selectedMode}
          selectedSubsystem={selectedSubsystem}
          selectedNavItem={selectedNavItem}
          setSelectedNavItem={setSelectedNavItem}
          sharedRos={sharedRos}
          setSharedRos={setSharedRos}
        />
      </div>
    </div>
  );
}
