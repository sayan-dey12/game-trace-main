module.exports = [
"[externals]/react/jsx-dev-runtime [external] (react/jsx-dev-runtime, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("react/jsx-dev-runtime", () => require("react/jsx-dev-runtime"));

module.exports = mod;
}),
"[project]/pages/fun/game.tsx [ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

// pages/fun/game.tsx
__turbopack_context__.s([
    "default",
    ()=>GamePage
]);
var __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/react/jsx-dev-runtime [external] (react/jsx-dev-runtime, cjs)");
var __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/react [external] (react, cjs)");
;
;
function GamePage() {
    const canvasRef = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useRef"])(null);
    const rafRef = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useRef"])(null);
    const resizeObserverRef = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useRef"])(null);
    // Game state (React state for UI)
    const [score, setScore] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])(0);
    const [lives, setLives] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])(3);
    const [level, setLevel] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])(1);
    const [running, setRunning] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])(false);
    const [started, setStarted] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])(false);
    const [muted, setMuted] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])(false);
    const [paused, setPaused] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])(false);
    // Refs for values accessed in animation loop (to avoid stale closures)
    const runningRef = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useRef"])(running);
    const pausedRef = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useRef"])(paused);
    const livesRef = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useRef"])(lives);
    const startedRef = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useRef"])(started);
    (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useEffect"])(()=>{
        runningRef.current = running;
    }, [
        running
    ]);
    (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useEffect"])(()=>{
        pausedRef.current = paused;
    }, [
        paused
    ]);
    (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useEffect"])(()=>{
        livesRef.current = lives;
    }, [
        lives
    ]);
    (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useEffect"])(()=>{
        startedRef.current = started;
    }, [
        started
    ]);
    // internals
    const starsRef = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useRef"])([]);
    const particlesRef = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useRef"])([]);
    const powerupsRef = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useRef"])([]);
    const nextStarId = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useRef"])(1);
    const nextPowerupId = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useRef"])(1);
    const difficultyRef = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useRef"])(1);
    const spawnIntervalRef = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useRef"])(null);
    const rampIntervalRef = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useRef"])(null);
    const powerupIntervalRef = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useRef"])(null);
    // Sounds
    const collectSound = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useRef"])(null);
    const missSound = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useRef"])(null);
    const bgMusic = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useRef"])(null);
    const startSound = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useRef"])(null);
    const powerupSound = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useRef"])(null);
    // combo multiplier
    const comboRef = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useRef"])({
        multiplier: 1,
        lastHit: 0,
        streak: 0
    });
    // freeze effect
    const freezeUntilRef = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useRef"])(null);
    // helpful constants
    const COMBO_WINDOW = 800; // ms
    const COMBO_TIME_DECAY = 1500; // ms to reset streak if no hits
    const BASE_SPAWN_MS = 900;
    // util to resize canvas for DPR
    function resizeCanvas(canvas) {
        const dpr = Math.max(1, window.devicePixelRatio || 1);
        const rect = canvas.getBoundingClientRect();
        const width = Math.round(rect.width * dpr);
        const height = Math.round(rect.height * dpr);
        if (canvas.width !== width || canvas.height !== height) {
            canvas.width = width;
            canvas.height = height;
            const ctx = canvas.getContext("2d");
            if (ctx) ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
        }
    }
    function spawnStar(canvasWidth) {
        const r = 14 + Math.random() * 18;
        // clamp spawn so star is NEVER outside the screen
        const x = Math.max(r, Math.min(canvasWidth - r, Math.random() * canvasWidth));
        const speed = 1.2 * difficultyRef.current + Math.random() * 2;
        const angle = (Math.random() - 0.5) * 0.6;
        const hue = Math.floor(Math.random() * 360);
        const id = nextStarId.current++;
        starsRef.current.push({
            x,
            y: -r * 2,
            r,
            speed,
            angle,
            hue,
            id
        });
    }
    function spawnPowerup(canvasWidth) {
        const r = 16;
        const x = Math.random() * (canvasWidth - r * 2) + r;
        const type = Math.random() < 0.65 ? "gold" : "freeze";
        const id = nextPowerupId.current++;
        powerupsRef.current.push({
            x,
            y: -r * 2,
            r,
            type,
            id
        });
    }
    function rampDifficulty() {
        difficultyRef.current += 0.12;
        setLevel(Math.max(1, Math.floor(difficultyRef.current)));
        setSpawnInterval();
    }
    function setSpawnInterval() {
        const canvas = canvasRef.current;
        if (!canvas) return;
        if (spawnIntervalRef.current) {
            clearInterval(spawnIntervalRef.current);
            spawnIntervalRef.current = null;
        }
        // If freeze active, spawn slower
        const frozen = !!(freezeUntilRef.current && Date.now() < freezeUntilRef.current);
        const ms = Math.max(220, BASE_SPAWN_MS - difficultyRef.current * 60);
        const spawnMs = frozen ? Math.max(600, ms * 1.8) : ms;
        spawnIntervalRef.current = window.setInterval(()=>{
            spawnStar(canvas.clientWidth);
        }, spawnMs);
    }
    // init effect (runs only once)
    (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useEffect"])(()=>{
        const canvas = canvasRef.current;
        if (!canvas) return;
        // load sounds
        collectSound.current = new Audio("/sounds/collect.mp3");
        missSound.current = new Audio("/sounds/miss.mp3");
        bgMusic.current = new Audio("/sounds/bg.mp3");
        startSound.current = new Audio("/sounds/start.mp3");
        powerupSound.current = new Audio("/sounds/powerup.mp3");
        // common settings
        if (bgMusic.current) {
            bgMusic.current.loop = true;
            bgMusic.current.volume = 0.2;
        }
        if (collectSound.current) collectSound.current.volume = 0.75;
        if (missSound.current) missSound.current.volume = 0.6;
        if (startSound.current) startSound.current.volume = 0.7;
        if (powerupSound.current) powerupSound.current.volume = 0.8;
        // canvas style
        canvas.style.width = "100%";
        canvas.style.height = "100vh";
        canvas.style.touchAction = "none";
        resizeCanvas(canvas);
        const onResizeReal = ()=>resizeCanvas(canvas);
        window.addEventListener("resize", onResizeReal);
        // spawn loops
        setSpawnInterval();
        rampIntervalRef.current = window.setInterval(rampDifficulty, 7000);
        powerupIntervalRef.current = window.setInterval(()=>{
            spawnPowerup(canvas.getBoundingClientRect().width);
        }, 9000);
        // resize observer for container size
        resizeObserverRef.current = new ResizeObserver(()=>resizeCanvas(canvas));
        resizeObserverRef.current.observe(canvas);
        const ctx = canvas.getContext("2d");
        let last = performance.now();
        function loop(now) {
            const dt = now - last;
            last = now;
            const w = canvas.clientWidth;
            const h = canvas.clientHeight;
            // clear
            ctx.clearRect(0, 0, w, h);
            // background gradient
            const g = ctx.createLinearGradient(0, 0, 0, h);
            g.addColorStop(0, "#020024");
            g.addColorStop(1, "#090979");
            ctx.fillStyle = g;
            ctx.fillRect(0, 0, w, h);
            // ambient twinkle background stars (very subtle)
            for(let i = 0; i < 40; i++){
                ctx.fillStyle = `rgba(255,255,255,${0.02 + i % 5 * 0.01})`;
                const sx = i * 97 % w;
                const sy = i * 53 % h * (1 + Math.sin(now / 5000 + i) * 0.03);
                ctx.fillRect(sx % w, sy % h, 1, 1);
            }
            if (runningRef.current && !pausedRef.current) {
                // Update stars
                const stars = starsRef.current;
                for (const s of stars){
                    const frozen = !!(freezeUntilRef.current && Date.now() < freezeUntilRef.current);
                    const speedFactor = frozen ? 0.45 : 1;
                    // Movement
                    s.y += s.speed * (dt / 16) * speedFactor;
                    s.x += s.angle * (dt / 16);
                    // ⭐ Fix: stop stars drifting off-screen on mobile
                    if (s.x - s.r < 0) {
                        s.x = s.r;
                        s.angle *= -1;
                    } else if (s.x + s.r > w) {
                        s.x = w - s.r;
                        s.angle *= -1;
                    }
                }
                // update powerups
                for (const p of powerupsRef.current){
                    const speedFactor = freezeUntilRef.current && Date.now() < freezeUntilRef.current ? 0.45 : 1;
                    p.y += 1.2 * (dt / 16) * speedFactor;
                }
                // update particles
                for(let i = particlesRef.current.length - 1; i >= 0; i--){
                    const part = particlesRef.current[i];
                    part.x += part.vx * (dt / 16);
                    part.y += part.vy * (dt / 16);
                    part.vy += 0.06 * (dt / 16); // gravity
                    part.life -= dt;
                    if (part.life <= 0) particlesRef.current.splice(i, 1);
                }
            }
            // Draw powerups
            for (const p of powerupsRef.current){
                ctx.beginPath();
                if (p.type === "gold") {
                    ctx.fillStyle = `hsl(45, 90%, 55%)`;
                    ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
                    ctx.fill();
                    ctx.strokeStyle = "rgba(255,255,255,0.25)";
                    ctx.stroke();
                } else {
                    ctx.fillStyle = `hsl(200, 80%, 65%)`;
                    ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
                    ctx.fill();
                }
            }
            // draw stars
            for (const s of starsRef.current){
                ctx.beginPath();
                ctx.fillStyle = `hsl(${s.hue},90%,60%)`;
                ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
                ctx.fill();
                // soft glow
                ctx.beginPath();
                ctx.fillStyle = `rgba(255,255,255,0.03)`;
                ctx.arc(s.x, s.y, s.r * 2.2, 0, Math.PI * 2);
                ctx.fill();
            }
            // draw particles on top
            for (const p of particlesRef.current){
                ctx.beginPath();
                ctx.fillStyle = `hsl(${p.hue},90%,60%)`;
                ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
                ctx.fill();
            }
            // remove missed stars
            if (runningRef.current && !pausedRef.current) {
                let missed = 0;
                for(let i = starsRef.current.length - 1; i >= 0; i--){
                    if (starsRef.current[i].y > h + starsRef.current[i].r) {
                        starsRef.current.splice(i, 1);
                        missed++;
                    }
                }
                if (missed > 0) {
                    // play miss sound once per miss (could be throttled)
                    for(let i = 0; i < missed; i++){
                        if (missSound.current) {
                            missSound.current.currentTime = 0; // rewind to start
                            missSound.current.play();
                        }
                    }
                    // update lives both in state and ref
                    setLives((l)=>{
                        const next = Math.max(0, l - missed);
                        livesRef.current = next;
                        if (next <= 0) {
                            setRunning(false);
                            runningRef.current = false;
                        }
                        return next;
                    });
                }
            }
            // end condition
            if (livesRef.current <= 0 && runningRef.current) {
                setRunning(false);
                runningRef.current = false;
            }
            rafRef.current = requestAnimationFrame(loop);
        }
        rafRef.current = requestAnimationFrame(loop);
        // Pointer interactions (typed as any to avoid DOM typing friction)
        function getXYFromEvent(ev) {
            const rect = canvas.getBoundingClientRect();
            let x = 0, y = 0;
            if (ev.clientX !== undefined) {
                x = ev.clientX - rect.left;
                y = ev.clientY - rect.top;
            } else if (ev.touches && ev.touches.length) {
                const t = ev.touches[0];
                x = t.clientX - rect.left;
                y = t.clientY - rect.top;
            }
            return {
                x,
                y
            };
        }
        function handleInput(ev) {
            if (!runningRef.current || pausedRef.current) return;
            const { x, y } = getXYFromEvent(ev);
            // check powerups first
            for(let i = powerupsRef.current.length - 1; i >= 0; i--){
                const p = powerupsRef.current[i];
                if (Math.hypot(p.x - x, p.y - y) <= p.r) {
                    powerupsRef.current.splice(i, 1);
                    powerupSound.current?.play();
                    if (p.type === "gold") {
                        setScore((s)=>s + 5);
                        spawnParticles(x, y, 18, 6);
                    } else {
                        // freeze: slow spawns for 5s
                        freezeUntilRef.current = Date.now() + 5000;
                        setSpawnInterval();
                    }
                    return;
                }
            }
            // then check stars
            for(let i = starsRef.current.length - 1; i >= 0; i--){
                const s = starsRef.current[i];
                if (Math.hypot(s.x - x, s.y - y) <= s.r) {
                    starsRef.current.splice(i, 1);
                    collectSound.current?.play();
                    // combo logic
                    const now = Date.now();
                    const diff = now - comboRef.current.lastHit;
                    if (diff <= COMBO_WINDOW) {
                        comboRef.current.streak += 1;
                        comboRef.current.multiplier = Math.min(4, 1 + Math.floor(comboRef.current.streak / 2));
                    } else if (now - comboRef.current.lastHit > COMBO_TIME_DECAY) {
                        comboRef.current.streak = 1;
                        comboRef.current.multiplier = 1;
                    } else {
                        comboRef.current.streak = 1;
                        comboRef.current.multiplier = 1;
                    }
                    comboRef.current.lastHit = now;
                    const points = 1 * comboRef.current.multiplier;
                    setScore((sc)=>sc + points);
                    spawnParticles(s.x, s.y, Math.min(20, Math.floor(s.r)), 8, s.hue);
                    return;
                }
            }
        }
        canvas.addEventListener("pointerdown", handleInput);
        canvas.addEventListener("touchstart", handleInput);
        // cleanup
        return ()=>{
            window.removeEventListener("resize", onResizeReal);
            if (rafRef.current) cancelAnimationFrame(rafRef.current);
            if (spawnIntervalRef.current) clearInterval(spawnIntervalRef.current);
            if (rampIntervalRef.current) clearInterval(rampIntervalRef.current);
            if (powerupIntervalRef.current) clearInterval(powerupIntervalRef.current);
            resizeObserverRef.current?.disconnect();
            canvas.removeEventListener("pointerdown", handleInput);
            canvas.removeEventListener("touchstart", handleInput);
        };
    // run only once
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    function spawnParticles(x, y, count = 12, size = 6, hue) {
        for(let i = 0; i < count; i++){
            const angle = Math.random() * Math.PI * 2;
            const speed = 1 + Math.random() * 3;
            const vx = Math.cos(angle) * speed;
            const vy = Math.sin(angle) * speed * 0.8;
            particlesRef.current.push({
                x,
                y,
                vx,
                vy,
                life: 600 + Math.random() * 400,
                size: Math.random() * size + 1,
                hue: typeof hue === "number" ? hue : Math.floor(Math.random() * 360)
            });
        }
    }
    // Start the game (reset state)
    function startGame() {
        // stop music to re-trigger play policy
        bgMusic.current?.pause();
        if (bgMusic.current) bgMusic.current.currentTime = 0;
        starsRef.current = [];
        particlesRef.current = [];
        powerupsRef.current = [];
        setScore(0);
        setLives(3);
        livesRef.current = 3;
        difficultyRef.current = 1;
        setLevel(1);
        comboRef.current = {
            multiplier: 1,
            lastHit: 0,
            streak: 0
        };
        freezeUntilRef.current = null;
        setStarted(true);
        startedRef.current = true;
        setRunning(true);
        runningRef.current = true;
        setPaused(false);
        pausedRef.current = false;
        // spawn intervals refreshed
        setSpawnInterval();
        // try play bg (user gesture required in some browsers)
        if (!muted) {
            bgMusic.current?.play().catch(()=>{});
        }
        startSound.current?.play().catch(()=>{});
    }
    function restartGame() {
        startGame();
    }
    function toggleMute() {
        const next = !muted;
        setMuted(next);
        if (bgMusic.current) {
            if (next) bgMusic.current.pause();
            else bgMusic.current.play().catch(()=>{});
            bgMusic.current.muted = next;
        }
        [
            collectSound,
            missSound,
            startSound,
            powerupSound
        ].forEach((sRef)=>{
            if (sRef.current) sRef.current.muted = next;
        });
    }
    function togglePause() {
        if (!startedRef.current) return;
        if (!runningRef.current) return;
        const next = !pausedRef.current;
        setPaused(next);
        pausedRef.current = next;
    }
    // small UI helper to show combo label briefly (derived from comboRef)
    const [comboLabel, setComboLabel] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])(null);
    (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useEffect"])(()=>{
        const interval = window.setInterval(()=>{
            if (comboRef.current.streak >= 2) {
                setComboLabel(`x${comboRef.current.multiplier} combo!`);
                window.setTimeout(()=>setComboLabel(null), 900);
            }
        }, 200);
        return ()=>clearInterval(interval);
    }, []);
    // UI JSX
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
        style: {
            position: "relative",
            width: "100%",
            height: "100vh",
            overflow: "hidden"
        },
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("canvas", {
                ref: canvasRef
            }, void 0, false, {
                fileName: "[project]/pages/fun/game.tsx",
                lineNumber: 524,
                columnNumber: 7
            }, this),
            started && lives > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                style: hudStyleLeft,
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                        style: {
                            fontSize: 16,
                            fontWeight: 600
                        },
                        children: [
                            "⭐ ",
                            score
                        ]
                    }, void 0, true, {
                        fileName: "[project]/pages/fun/game.tsx",
                        lineNumber: 529,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                        style: {
                            fontSize: 14,
                            opacity: 0.9
                        },
                        children: [
                            "❤️ ",
                            lives
                        ]
                    }, void 0, true, {
                        fileName: "[project]/pages/fun/game.tsx",
                        lineNumber: 530,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                        style: {
                            fontSize: 14,
                            opacity: 0.85
                        },
                        children: [
                            "⚡ Lvl ",
                            level
                        ]
                    }, void 0, true, {
                        fileName: "[project]/pages/fun/game.tsx",
                        lineNumber: 531,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/pages/fun/game.tsx",
                lineNumber: 528,
                columnNumber: 9
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                style: hudStyleRight,
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("button", {
                        style: smallBtn,
                        onClick: toggleMute,
                        title: "Toggle sound",
                        children: muted ? "🔇" : "🔊"
                    }, void 0, false, {
                        fileName: "[project]/pages/fun/game.tsx",
                        lineNumber: 537,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("button", {
                        style: smallBtn,
                        onClick: togglePause,
                        title: "Pause / Resume",
                        children: paused ? "▶️" : "⏸️"
                    }, void 0, false, {
                        fileName: "[project]/pages/fun/game.tsx",
                        lineNumber: 540,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("button", {
                        style: smallBtn,
                        onClick: ()=>{
                            restartGame();
                        },
                        title: "Restart",
                        children: "↻"
                    }, void 0, false, {
                        fileName: "[project]/pages/fun/game.tsx",
                        lineNumber: 543,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/pages/fun/game.tsx",
                lineNumber: 536,
                columnNumber: 7
            }, this),
            comboLabel && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                style: comboStyle,
                children: comboLabel
            }, void 0, false, {
                fileName: "[project]/pages/fun/game.tsx",
                lineNumber: 555,
                columnNumber: 22
            }, this),
            !started && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                style: overlayStyle,
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("h1", {
                        style: {
                            fontSize: 44,
                            margin: 6
                        },
                        children: "Star Catcher"
                    }, void 0, false, {
                        fileName: "[project]/pages/fun/game.tsx",
                        lineNumber: 560,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("p", {
                        style: {
                            fontSize: 18,
                            margin: "6px 0 18px 0",
                            opacity: 0.9
                        },
                        children: "Tap the falling stars before they escape. Collect powerups for bonus effects!"
                    }, void 0, false, {
                        fileName: "[project]/pages/fun/game.tsx",
                        lineNumber: 561,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                        style: {
                            display: "flex",
                            gap: 12,
                            alignItems: "center",
                            flexDirection: "column"
                        },
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("button", {
                                style: bigBtn,
                                onClick: startGame,
                                children: "Start Game"
                            }, void 0, false, {
                                fileName: "[project]/pages/fun/game.tsx",
                                lineNumber: 566,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                style: {
                                    fontSize: 14,
                                    color: "rgba(255,255,255,0.85)"
                                },
                                children: "Tip: Use multiple taps fast to build combos"
                            }, void 0, false, {
                                fileName: "[project]/pages/fun/game.tsx",
                                lineNumber: 569,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                style: {
                                    marginTop: 10
                                },
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("label", {
                                    style: {
                                        marginRight: 8
                                    },
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("input", {
                                            type: "checkbox",
                                            checked: !muted,
                                            onChange: ()=>setMuted((m)=>!m)
                                        }, void 0, false, {
                                            fileName: "[project]/pages/fun/game.tsx",
                                            lineNumber: 574,
                                            columnNumber: 17
                                        }, this),
                                        " Sound"
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/pages/fun/game.tsx",
                                    lineNumber: 573,
                                    columnNumber: 15
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/pages/fun/game.tsx",
                                lineNumber: 572,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/pages/fun/game.tsx",
                        lineNumber: 565,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/pages/fun/game.tsx",
                lineNumber: 559,
                columnNumber: 9
            }, this),
            started && paused && lives > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                style: overlayStyle,
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("h2", {
                        style: {
                            fontSize: 36
                        },
                        children: "Paused"
                    }, void 0, false, {
                        fileName: "[project]/pages/fun/game.tsx",
                        lineNumber: 585,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                        style: {
                            display: "flex",
                            gap: 12,
                            marginTop: 12
                        },
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("button", {
                                style: bigBtn,
                                onClick: ()=>togglePause(),
                                children: "Resume"
                            }, void 0, false, {
                                fileName: "[project]/pages/fun/game.tsx",
                                lineNumber: 587,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("button", {
                                style: bigBtnSecondary,
                                onClick: ()=>{
                                    restartGame();
                                },
                                children: "Restart"
                            }, void 0, false, {
                                fileName: "[project]/pages/fun/game.tsx",
                                lineNumber: 590,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/pages/fun/game.tsx",
                        lineNumber: 586,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/pages/fun/game.tsx",
                lineNumber: 584,
                columnNumber: 9
            }, this),
            started && lives <= 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                style: overlayStyle,
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("h2", {
                        style: {
                            fontSize: 36
                        },
                        children: "Game Over"
                    }, void 0, false, {
                        fileName: "[project]/pages/fun/game.tsx",
                        lineNumber: 605,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("p", {
                        style: {
                            fontSize: 18,
                            marginTop: 6
                        },
                        children: [
                            "Score: ",
                            score
                        ]
                    }, void 0, true, {
                        fileName: "[project]/pages/fun/game.tsx",
                        lineNumber: 606,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                        style: {
                            display: "flex",
                            gap: 12,
                            marginTop: 16
                        },
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("button", {
                                style: bigBtn,
                                onClick: ()=>restartGame(),
                                children: "Play Again"
                            }, void 0, false, {
                                fileName: "[project]/pages/fun/game.tsx",
                                lineNumber: 608,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("button", {
                                style: bigBtnSecondary,
                                onClick: ()=>{
                                    setStarted(false);
                                    setRunning(false);
                                    setPaused(false);
                                    if (bgMusic.current) {
                                        bgMusic.current.pause();
                                        bgMusic.current.currentTime = 0;
                                    }
                                },
                                children: "Menu"
                            }, void 0, false, {
                                fileName: "[project]/pages/fun/game.tsx",
                                lineNumber: 611,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/pages/fun/game.tsx",
                        lineNumber: 607,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/pages/fun/game.tsx",
                lineNumber: 604,
                columnNumber: 9
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/pages/fun/game.tsx",
        lineNumber: 523,
        columnNumber: 5
    }, this);
}
/* -------------------------
   Styles
   ------------------------- */ const hudStyleLeft = {
    position: "fixed",
    top: 14,
    left: 14,
    padding: "8px 12px",
    borderRadius: 10,
    background: "rgba(0,0,0,0.35)",
    color: "white",
    zIndex: 40,
    display: "flex",
    gap: 10,
    alignItems: "center",
    flexDirection: "column",
    minWidth: 68,
    textAlign: "center",
    fontFamily: "system-ui, -apple-system, 'Segoe UI', Roboto"
};
const smallBtn = {
    border: "none",
    background: "rgba(255,255,255,0.06)",
    color: "white",
    padding: "6px 8px",
    borderRadius: 8,
    cursor: "pointer",
    fontSize: 16
};
const hudStyleRight = {
    position: "fixed",
    top: 12,
    right: 12,
    padding: 6,
    borderRadius: 10,
    display: "flex",
    gap: 8,
    zIndex: 40
};
const overlayStyle = {
    position: "fixed",
    inset: 0,
    background: "linear-gradient(to bottom, rgba(2,2,36,0.6), rgba(9,9,121,0.6))",
    color: "white",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
    zIndex: 100,
    padding: 20
};
const bigBtn = {
    padding: "12px 26px",
    background: "#2ec4b6",
    color: "white",
    border: "none",
    borderRadius: 12,
    fontSize: 18,
    cursor: "pointer",
    boxShadow: "0 8px 20px rgba(46,196,182,0.18)"
};
const bigBtnSecondary = {
    ...bigBtn,
    background: "transparent",
    border: "1px solid rgba(255,255,255,0.12)"
};
const comboStyle = {
    position: "fixed",
    left: "50%",
    transform: "translateX(-50%)",
    top: 84,
    zIndex: 45,
    padding: "6px 12px",
    background: "rgba(0,0,0,0.45)",
    borderRadius: 8,
    color: "white",
    fontWeight: 700,
    fontSize: 16
};
}),
"[externals]/next/dist/shared/lib/no-fallback-error.external.js [external] (next/dist/shared/lib/no-fallback-error.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/shared/lib/no-fallback-error.external.js", () => require("next/dist/shared/lib/no-fallback-error.external.js"));

module.exports = mod;
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__43538807._.js.map