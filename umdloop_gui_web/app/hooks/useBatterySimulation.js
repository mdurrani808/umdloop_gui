"use client";

import { useState, useEffect } from "react";

export function useBatterySimulation({ initialDrive = 94, initialArm = 88 } = {}) {
  const [batteryDrive, setBatteryDrive] = useState(initialDrive);
  const [batteryArm, setBatteryArm] = useState(initialArm);

  useEffect(() => {
    const id = setInterval(() => {
      setBatteryDrive((prev) => Math.max(10, prev - 0.04));
      setBatteryArm((prev) => Math.max(10, prev - 0.03));
    }, 1200);
    return () => clearInterval(id);
  }, []);

  return { batteryDrive, batteryArm };
}
