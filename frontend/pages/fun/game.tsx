// pages/fun/game.tsx
import React, { useEffect, useRef, useState } from "react";

type Star = {
  x: number;
  y: number;
  r: number;
  speed: number;
  angle: number;
  hue: number;
  id: number;
};

type Particle = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  size: number;
  hue: number;
};

type Powerup = {
  x: number;
  y: number;
  r: number;
  type: "gold" | "freeze";
  id: number;
};

export default function GamePage() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const rafRef = useRef<number | null>(null);
  const resizeObserverRef = useRef<ResizeObserver | null>(null);

  // Game state (React state for UI)
  const [score, setScore] = useState(0);
  const [lives, setLives] = useState(3);
  const [level, setLevel] = useState(1);
  const [running, setRunning] = useState(false);
  const [started, setStarted] = useState(false);
  const [muted, setMuted] = useState(false);
  const [paused, setPaused] = useState(false);

  // Refs for values accessed in animation loop (to avoid stale closures)
  const runningRef = useRef(running);
  const pausedRef = useRef(paused);
  const livesRef = useRef(lives);
  const startedRef = useRef(started);

  useEffect(() => { runningRef.current = running; }, [running]);
  useEffect(() => { pausedRef.current = paused; }, [paused]);
  useEffect(() => { livesRef.current = lives; }, [lives]);
  useEffect(() => { startedRef.current = started; }, [started]);

  // internals
  const starsRef = useRef<Star[]>([]);
  const particlesRef = useRef<Particle[]>([]);
  const powerupsRef = useRef<Powerup[]>([]);
  const nextStarId = useRef(1);
  const nextPowerupId = useRef(1);
  const difficultyRef = useRef(1);

  const spawnIntervalRef = useRef<number | null>(null);
  const rampIntervalRef = useRef<number | null>(null);
  const powerupIntervalRef = useRef<number | null>(null);

  // Sounds
  const collectSound = useRef<HTMLAudioElement | null>(null);
  const missSound = useRef<HTMLAudioElement | null>(null);
  const bgMusic = useRef<HTMLAudioElement | null>(null);
  const startSound = useRef<HTMLAudioElement | null>(null);
  const powerupSound = useRef<HTMLAudioElement | null>(null);

  // combo multiplier
  const comboRef = useRef({ multiplier: 1, lastHit: 0, streak: 0 });

  // freeze effect
  const freezeUntilRef = useRef<number | null>(null);

  // helpful constants
  const COMBO_WINDOW = 800; // ms
  const COMBO_TIME_DECAY = 1500; // ms to reset streak if no hits
  const BASE_SPAWN_MS = 900;

  // util to resize canvas for DPR
  function resizeCanvas(canvas: HTMLCanvasElement) {
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

  function spawnStar(canvasWidth: number) {
  const r = 14 + Math.random() * 18;

  // clamp spawn so star is NEVER outside the screen
  const x = Math.max(
    r,
    Math.min(canvasWidth - r, Math.random() * canvasWidth)
  );

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
    id,
  });
}


  function spawnPowerup(canvasWidth: number) {
    const r = 16;
    const x = Math.random() * (canvasWidth - r * 2) + r;
    const type = Math.random() < 0.65 ? "gold" : "freeze";
    const id = nextPowerupId.current++;
    powerupsRef.current.push({ x, y: -r * 2, r, type, id });
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
    spawnIntervalRef.current = window.setInterval(() => {
      spawnStar(canvas.clientWidth)
    }, spawnMs) as unknown as number;
  }

  // init effect (runs only once)
  useEffect(() => {
    const canvas = canvasRef.current!;
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

    const onResizeReal = () => resizeCanvas(canvas);
    window.addEventListener("resize", onResizeReal);

    // spawn loops
    setSpawnInterval();
    rampIntervalRef.current = window.setInterval(rampDifficulty, 7000) as unknown as number;
    powerupIntervalRef.current = window.setInterval(() => {
      spawnPowerup(canvas.getBoundingClientRect().width);
    }, 9000) as unknown as number;

    // resize observer for container size
    resizeObserverRef.current = new ResizeObserver(() => resizeCanvas(canvas));
    resizeObserverRef.current.observe(canvas);

    const ctx = canvas.getContext("2d")!;
    let last = performance.now();

    function loop(now: number) {
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
      for (let i = 0; i < 40; i++) {
        ctx.fillStyle = `rgba(255,255,255,${0.02 + (i % 5) * 0.01})`;
        const sx = (i * 97) % w;
        const sy = ((i * 53) % h) * (1 + Math.sin(now / 5000 + i) * 0.03);
        ctx.fillRect(sx % w, sy % h, 1, 1);
      }

      if (runningRef.current && !pausedRef.current) {
        // Update stars
        const stars = starsRef.current;
        for (const s of stars) {
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
        for (const p of powerupsRef.current) {
          const speedFactor = freezeUntilRef.current && Date.now() < freezeUntilRef.current ? 0.45 : 1;
          p.y += 1.2 * (dt / 16) * speedFactor;
        }

        // update particles
        for (let i = particlesRef.current.length - 1; i >= 0; i--) {
          const part = particlesRef.current[i];
          part.x += part.vx * (dt / 16);
          part.y += part.vy * (dt / 16);
          part.vy += 0.06 * (dt / 16); // gravity
          part.life -= dt;
          if (part.life <= 0) particlesRef.current.splice(i, 1);
        }
      }

      // Draw powerups
      for (const p of powerupsRef.current) {
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
      for (const s of starsRef.current) {
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
      for (const p of particlesRef.current) {
        ctx.beginPath();
        ctx.fillStyle = `hsl(${p.hue},90%,60%)`;
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
      }

      // remove missed stars
      if (runningRef.current && !pausedRef.current) {
        let missed = 0;
        for (let i = starsRef.current.length - 1; i >= 0; i--) {
          if (starsRef.current[i].y > h + starsRef.current[i].r) {
            starsRef.current.splice(i, 1);
            missed++;
          }
        }
        if (missed > 0) {
          // play miss sound once per miss (could be throttled)
          for (let i = 0; i < missed; i++) {
            if (missSound.current) {
                missSound.current.currentTime = 0; // rewind to start
                missSound.current.play();
            }
        }

          // update lives both in state and ref
          setLives((l) => {
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
    function getXYFromEvent(ev: any) {
      const rect = canvas.getBoundingClientRect();
      let x = 0,
        y = 0;
      if (ev.clientX !== undefined) {
        x = ev.clientX - rect.left;
        y = ev.clientY - rect.top;
      } else if (ev.touches && ev.touches.length) {
        const t = ev.touches[0];
        x = t.clientX - rect.left;
        y = t.clientY - rect.top;
      }
      return { x, y };
    }

    function handleInput(ev: any) {
      if (!runningRef.current || pausedRef.current) return;
      const { x, y } = getXYFromEvent(ev);

      // check powerups first
      for (let i = powerupsRef.current.length - 1; i >= 0; i--) {
        const p = powerupsRef.current[i];
        if (Math.hypot(p.x - x, p.y - y) <= p.r) {
          powerupsRef.current.splice(i, 1);
          powerupSound.current?.play();
          if (p.type === "gold") {
            setScore((s) => s + 5);
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
      for (let i = starsRef.current.length - 1; i >= 0; i--) {
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
          setScore((sc) => sc + points);

          spawnParticles(s.x, s.y, Math.min(20, Math.floor(s.r)), 8, s.hue);
          return;
        }
      }
    }

    canvas.addEventListener("pointerdown", handleInput as EventListener);
    canvas.addEventListener("touchstart", handleInput as EventListener);

    // cleanup
    return () => {
      window.removeEventListener("resize", onResizeReal);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      if (spawnIntervalRef.current) clearInterval(spawnIntervalRef.current);
      if (rampIntervalRef.current) clearInterval(rampIntervalRef.current);
      if (powerupIntervalRef.current) clearInterval(powerupIntervalRef.current);
      resizeObserverRef.current?.disconnect();
      canvas.removeEventListener("pointerdown", handleInput as EventListener);
      canvas.removeEventListener("touchstart", handleInput as EventListener);
    };
    // run only once
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function spawnParticles(x: number, y: number, count = 12, size = 6, hue?: number) {
    for (let i = 0; i < count; i++) {
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
        hue: typeof hue === "number" ? hue : Math.floor(Math.random() * 360),
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
    comboRef.current = { multiplier: 1, lastHit: 0, streak: 0 };
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
      bgMusic.current?.play().catch(() => {});
    }
    startSound.current?.play().catch(() => {});
  }

  function restartGame() {
    startGame();
  }

  function toggleMute() {
    const next = !muted;
    setMuted(next);
    if (bgMusic.current) {
      if (next) bgMusic.current.pause();
      else bgMusic.current.play().catch(() => {});
      bgMusic.current.muted = next;
    }
    [collectSound, missSound, startSound, powerupSound].forEach((sRef) => {
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
  const [comboLabel, setComboLabel] = useState<string | null>(null);
  useEffect(() => {
    const interval = window.setInterval(() => {
      if (comboRef.current.streak >= 2) {
        setComboLabel(`x${comboRef.current.multiplier} combo!`);
        window.setTimeout(() => setComboLabel(null), 900);
      }
    }, 200);
    return () => clearInterval(interval);
  }, []);

  // UI JSX
  return (
    <div style={{ position: "relative", width: "100%", height: "100vh", overflow: "hidden" }}>
      <canvas ref={canvasRef} />

      {/* top-left HUD (shows only when started and alive) */}
      {started && lives > 0 && (
        <div style={hudStyleLeft}>
          <div style={{ fontSize: 16, fontWeight: 600 }}>⭐ {score}</div>
          <div style={{ fontSize: 14, opacity: 0.9 }}>❤️ {lives}</div>
          <div style={{ fontSize: 14, opacity: 0.85 }}>⚡ Lvl {level}</div>
        </div>
      )}

      {/* top-right controls */}
      <div style={hudStyleRight}>
        <button style={smallBtn} onClick={toggleMute} title="Toggle sound">
          {muted ? "🔇" : "🔊"}
        </button>
        <button style={smallBtn} onClick={togglePause} title="Pause / Resume">
          {paused ? "▶️" : "⏸️"}
        </button>
        <button
          style={smallBtn}
          onClick={() => {
            restartGame();
          }}
          title="Restart"
        >
          ↻
        </button>
      </div>

      {/* Combo label */}
      {comboLabel && <div style={comboStyle}>{comboLabel}</div>}

      {/* START SCREEN */}
      {!started && (
        <div style={overlayStyle}>
          <h1 style={{ fontSize: 44, margin: 6 }}>Star Catcher</h1>
          <p style={{ fontSize: 18, margin: "6px 0 18px 0", opacity: 0.9 }}>
            Tap the falling stars before they escape. Collect powerups for bonus effects!
          </p>

          <div style={{ display: "flex", gap: 12, alignItems: "center", flexDirection: "column" }}>
            <button style={bigBtn} onClick={startGame}>
              Start Game
            </button>
            <div style={{ fontSize: 14, color: "rgba(255,255,255,0.85)" }}>
              Tip: Use multiple taps fast to build combos
            </div>
            <div style={{ marginTop: 10 }}>
              <label style={{ marginRight: 8 }}>
                <input type="checkbox" checked={!muted} onChange={() => setMuted((m) => !m)} /> Sound
              </label>
            </div>
            
          </div>
        </div>
      )}

      {/* PAUSED overlay */}
      {started && paused && lives > 0 && (
        <div style={overlayStyle}>
          <h2 style={{ fontSize: 36 }}>Paused</h2>
          <div style={{ display: "flex", gap: 12, marginTop: 12 }}>
            <button style={bigBtn} onClick={() => togglePause()}>
              Resume
            </button>
            <button
              style={bigBtnSecondary}
              onClick={() => {
                restartGame();
              }}
            >
              Restart
            </button>
          </div>
        </div>
      )}

      {/* GAME OVER */}
      {started && lives <= 0 && (
        <div style={overlayStyle}>
          <h2 style={{ fontSize: 36 }}>Game Over</h2>
          <p style={{ fontSize: 18, marginTop: 6 }}>Score: {score}</p>
          <div style={{ display: "flex", gap: 12, marginTop: 16 }}>
            <button style={bigBtn} onClick={() => restartGame()}>
              Play Again
            </button>
            <button
              style={bigBtnSecondary}
              onClick={() => {
                setStarted(false);
                setRunning(false);
                setPaused(false);
                if (bgMusic.current) {
                  bgMusic.current.pause();
                  bgMusic.current.currentTime = 0;
                }
              }}
            >
              Menu
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

/* -------------------------
   Styles
   ------------------------- */
const hudStyleLeft: React.CSSProperties = {
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
  fontFamily: "system-ui, -apple-system, 'Segoe UI', Roboto",
};

const smallBtn: React.CSSProperties = {
  border: "none",
  background: "rgba(255,255,255,0.06)",
  color: "white",
  padding: "6px 8px",
  borderRadius: 8,
  cursor: "pointer",
  fontSize: 16,
};

const hudStyleRight: React.CSSProperties = {
  position: "fixed",
  top: 12,
  right: 12,
  padding: 6,
  borderRadius: 10,
  display: "flex",
  gap: 8,
  zIndex: 40,
};

const overlayStyle: React.CSSProperties = {
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
  padding: 20,
};

const bigBtn: React.CSSProperties = {
  padding: "12px 26px",
  background: "#2ec4b6",
  color: "white",
  border: "none",
  borderRadius: 12,
  fontSize: 18,
  cursor: "pointer",
  boxShadow: "0 8px 20px rgba(46,196,182,0.18)",
};

const bigBtnSecondary: React.CSSProperties = {
  ...bigBtn,
  background: "transparent",
  border: "1px solid rgba(255,255,255,0.12)",
};

const comboStyle: React.CSSProperties = {
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
  fontSize: 16,
};
