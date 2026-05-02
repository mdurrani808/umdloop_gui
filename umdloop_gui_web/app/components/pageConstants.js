"use client";

export const MODES = ["Operator", "Technician", "Drone", "Navigation", "Map"];
export const MODE_ICONS = ["camera.png", "sensor.png", "camera.png", "navigation.png", "map.png"];
export const SUBSYSTEMS = ["Drive", "Arm", "Science"];
export const NAVIGATION_BUTTONS = ["Object Detection", "Control Panel", "Placeholder2"];

export const CAMERA_IDS = {
  DRIVE_FRONT: 15,
  DRIVE_BACK: 16,
  DRIVE_LEFT: 17,
  DRIVE_RIGHT: 18,
  DRIVE_WHEEL_FL: [0, 1],
  DRIVE_WHEEL_FR: [2, 3],
  DRIVE_WHEEL_RL: [4, 5],
  DRIVE_WHEEL_RR: [6, 7],
  ARM_BASE: 8,
  ARM_JOINT: 9,
  ARM_END_EFFECTOR: 10,
  ARM_GRIPPER: 11,
  SCIENCE_1: 12,
  SCIENCE_2: 13,
  SCIENCE_3: 14,
  DRONE_SECONDARY: 15,
};
