"use client";

import React, { useEffect, useCallback } from "react";

export default function Notifications() {
  const sendNotification = () => {
    if ("Notification" in window && Notification.permission === "granted") {
      const notification = new Notification("Hello Welcome", {
        body: "Join our telegram page for more information.",
        icon: "/favicon-16x16.png",
      });
      notification.onclick = () => {
        window.open("https://t.me/+mQ4RF188nBo5ZThk");
      };
    }
  };
  const requestNotificationPermission = useCallback(() => {
    if ("Notification" in window) {
      Notification.requestPermission().then(function (permission) {
        if (permission === "granted") {
          console.log("Notification permission granted");
          sendNotification();
        }
      });
    }
  }, []);
  useEffect(() => {
    if ("Notification" in window) {
      requestNotificationPermission();
    }
  }, [requestNotificationPermission]);
}
