"use client";

import { useState, useEffect, useRef } from "react";
import ROSLIB from "roslib";
import { getRosbridgeUrl } from "../config";

export function useRosConnection() {
  const [rosStatus, setRosStatus] = useState("connecting...");
  const rosRef = useRef(null);

  useEffect(() => {
    const ros = new ROSLIB.Ros({ url: getRosbridgeUrl() });
    rosRef.current = ros;
    ros.on("connection", () => setRosStatus("connected"));
    ros.on("error", () => setRosStatus("error"));
    ros.on("close", () => setRosStatus("disconnected"));
    return () => {
      ros.close();
      if (rosRef.current === ros) rosRef.current = null;
    };
  }, []);

  return { rosRef, rosStatus };
}
