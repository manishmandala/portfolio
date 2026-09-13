"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { defaultBubbleConfig } from "@/lib/game-bubbles";

const RESPAWN_COOLDOWN_MS = 12000;
const MISS_COOLDOWN_MS = 4000;
const FILLER_CHANCE = 0.7; // fraction of spawns that stay plain filler in Explore mode
const CARD_DISMISS_MS = 5000;

// Missile Defense / bubble-nav hybrid for the hero "game slot". Two modes:
// "classic" is the original filler-only reflex game; "explore" mixes in
// content bubbles (projects, about-me) that pop into a confirm card instead
// of navigating instantly. Canvas/physics loop stays a single ref-driven
// requestAnimationFrame effect (unchanged in spirit from the original);
// the mode toggle and confirm card are real React state rendered as actual
// DOM, not canvas-drawn or injected HTML.
export function HeroGame({ bubbleConfig = defaultBubbleConfig }) {
  const router = useRouter();
  const canvasRef = useRef(null);
  const bubbleConfigRef = useRef(bubbleConfig);
  const [score, setScore] = useState(0);
  const [message, setMessage] = useState("Click anywhere to intercept");
  const [gameOverVisual, setGameOverVisual] = useState(false);
  const [mode, setMode] = useState("explore");
  const [activeCard, setActiveCard] = useState(null);

  useEffect(() => {
    bubbleConfigRef.current = bubbleConfig;
  }, [bubbleConfig]);

  // Auto-dismiss the confirm card if the player ignores it.
  useEffect(() => {
    if (!activeCard) return;
    const timer = setTimeout(() => setActiveCard(null), CARD_DISMISS_MS);
    return () => clearTimeout(timer);
  }, [activeCard]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");

    const rootStyle = getComputedStyle(document.documentElement);
    const colorAccent = rootStyle.getPropertyValue("--brand").trim() || "#7f97c2";
    const colorRed = rootStyle.getPropertyValue("--cat-red").trim() || "#e66767";
    const colorMuted = rootStyle.getPropertyValue("--muted-foreground").trim() || "#8a90a3";
    const colorCache = {};
    function resolveColor(cssVar) {
      if (!colorCache[cssVar]) {
        colorCache[cssVar] = rootStyle.getPropertyValue(cssVar).trim() || colorAccent;
      }
      return colorCache[cssVar];
    }

    let width = 0;
    let height = 0;
    const dpr = Math.max(1, window.devicePixelRatio || 1);

    function resize() {
      const rect = canvas.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    }

    const ro = new ResizeObserver(resize);
    ro.observe(canvas);
    resize();

    let targets = [];
    let explosions = [];
    let streaks = [];
    let score = 0;
    let lives = 3;
    let gameOver = false;
    let started = false;
    const spawnEvery = 1300;
    let timeSinceSpawn = 0;
    let lastTime = null;
    let rafId = null;

    // content-bubble bookkeeping: cooldowns per id, and ids currently live
    // on screen (so the same project never has two bubbles falling at once)
    const respawnAt = new Map();
    const activeContentIds = new Set();

    function pickContent() {
      const now = performance.now();
      const pool = bubbleConfigRef.current.filter(
        (c) => !activeContentIds.has(c.id) && (respawnAt.get(c.id) ?? 0) <= now
      );
      if (!pool.length) return null;
      return pool[Math.floor(Math.random() * pool.length)];
    }

    function fitLabel(text, maxWidth) {
      if (ctx.measureText(text).width <= maxWidth) return text;
      let t = text;
      while (t.length > 1 && ctx.measureText(t + "…").width > maxWidth) {
        t = t.slice(0, -1);
      }
      return t + "…";
    }

    function spawnTarget() {
      let content = null;
      if (mode === "explore" && Math.random() > FILLER_CHANCE) {
        content = pickContent();
      }

      if (content) {
        const r = Math.max(30, Math.min(46, width * 0.09));
        activeContentIds.add(content.id);
        targets.push({
          x: r + Math.random() * (width - r * 2),
          y: -r,
          r,
          speed: 16 + Math.random() * 8,
          spawnT: 0,
          content,
        });
      } else {
        const r = 6 + Math.random() * 3;
        targets.push({
          x: r + Math.random() * (width - r * 2),
          y: -r,
          r,
          speed: 28 + Math.random() * 18 + Math.min(40, score * 1.2),
          spawnT: 0,
          content: null,
        });
      }
    }

    function reset() {
      targets = [];
      explosions = [];
      streaks = [];
      score = 0;
      lives = 3;
      gameOver = false;
      timeSinceSpawn = 0;
      activeContentIds.clear();
      setScore(0);
      setMessage("Click anywhere to intercept");
      setGameOverVisual(false);
      setActiveCard(null);
    }

    reset();

    function handleClick(e) {
      if (!started) {
        started = true;
      }
      if (gameOver) {
        reset();
        started = true;
        return;
      }
      const rect = canvas.getBoundingClientRect();
      const cx = e.clientX - rect.left;
      const cy = e.clientY - rect.top;

      const hitRadius = 16;
      let hitTarget = null;
      for (let i = targets.length - 1; i >= 0; i--) {
        const t = targets[i];
        const dx = t.x - cx;
        const dy = t.y - cy;
        if (Math.sqrt(dx * dx + dy * dy) <= t.r + hitRadius) {
          hitTarget = t;
          t.targeted = true;
          break;
        }
      }

      const x1 = width / 2;
      const y1 = height;
      const dist = Math.hypot(cx - x1, cy - y1);
      const dur = Math.min(0.22, Math.max(0.08, dist / 900));
      streaks.push({
        x1,
        y1,
        x2: cx,
        y2: cy,
        t: 0,
        dur,
        hitTarget,
        resolved: false,
      });
    }

    canvas.addEventListener("click", handleClick);

    function endGame() {
      gameOver = true;
      setMessage(`Game over - Score: ${score} - Click to retry`);
      setGameOverVisual(true);
    }

    function update(dt) {
      if (gameOver) return;

      timeSinceSpawn += dt * 1000;
      const interval = Math.max(500, spawnEvery - score * 25);
      if (timeSinceSpawn >= interval) {
        timeSinceSpawn = 0;
        spawnTarget();
      }

      for (let i = targets.length - 1; i >= 0; i--) {
        const t = targets[i];
        t.spawnT = Math.min(1, t.spawnT + dt / 0.25);
        if (!t.targeted) {
          t.y += t.speed * dt;
          if (t.y - t.r > height) {
            targets.splice(i, 1);
            if (t.content) {
              activeContentIds.delete(t.content.id);
              respawnAt.set(t.content.id, performance.now() + MISS_COOLDOWN_MS);
            }
            lives--;
            if (lives <= 0) {
              endGame();
            }
          }
        } else {
          t.y += t.speed * dt * 0.4;
        }
      }

      for (let i = explosions.length - 1; i >= 0; i--) {
        const ex = explosions[i];
        ex.r += (ex.maxR - ex.r) * 0.3;
        ex.life -= dt * 3;
        if (ex.life <= 0) explosions.splice(i, 1);
      }

      for (let i = streaks.length - 1; i >= 0; i--) {
        const s = streaks[i];
        s.t += dt;
        const progress = s.t / s.dur;
        if (progress >= 1 && !s.resolved) {
          s.resolved = true;
          if (s.hitTarget) {
            const idx = targets.indexOf(s.hitTarget);
            if (idx !== -1) {
              explosions.push({ x: s.hitTarget.x, y: s.hitTarget.y, r: 2, maxR: 24, life: 1 });
              targets.splice(idx, 1);
              score++;
              setScore(score);
              if (s.hitTarget.content) {
                const c = s.hitTarget.content;
                activeContentIds.delete(c.id);
                respawnAt.set(c.id, performance.now() + RESPAWN_COOLDOWN_MS);
                setActiveCard({
                  label: c.label,
                  description: c.description,
                  route: c.route,
                  x: s.hitTarget.x,
                  y: s.hitTarget.y,
                });
              }
            }
          } else {
            explosions.push({ x: s.x2, y: s.y2, r: 1, maxR: 8, life: 1, faint: true });
          }
        }
        if (progress >= 1.25) streaks.splice(i, 1);
      }
    }

    function drawLives() {
      ctx.fillStyle = colorMuted;
      ctx.font = "11px monospace";
      ctx.textAlign = "right";
      ctx.fillText("Lives: " + "*".repeat(Math.max(0, lives)), width - 8, 16);
    }

    function render() {
      ctx.clearRect(0, 0, width, height);

      ctx.strokeStyle = colorMuted;
      ctx.globalAlpha = 0.3;
      ctx.beginPath();
      ctx.moveTo(0, height - 1);
      ctx.lineTo(width, height - 1);
      ctx.stroke();
      ctx.globalAlpha = 1;

      streaks.forEach((s) => {
        const progress = Math.min(1, s.t / s.dur);
        const ease = 1 - Math.pow(1 - progress, 2);
        const targetX = s.hitTarget ? s.hitTarget.x : s.x2;
        const targetY = s.hitTarget ? s.hitTarget.y : s.y2;
        const curX = s.x1 + (targetX - s.x1) * ease;
        const curY = s.y1 + (targetY - s.y1) * ease;
        const fadeOut = progress >= 1 ? Math.max(0, 1 - (s.t - s.dur) / (s.dur * 0.25)) : 1;

        const trailStart = Math.max(0, ease - 0.35);
        const trailX = s.x1 + (targetX - s.x1) * trailStart;
        const trailY = s.y1 + (targetY - s.y1) * trailStart;

        ctx.strokeStyle = colorAccent;
        ctx.globalAlpha = 0.55 * fadeOut;
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.moveTo(trailX, trailY);
        ctx.lineTo(curX, curY);
        ctx.stroke();

        if (progress < 1) {
          ctx.fillStyle = colorAccent;
          ctx.globalAlpha = 1;
          ctx.beginPath();
          ctx.arc(curX, curY, 2.2, 0, Math.PI * 2);
          ctx.fill();
        }
        ctx.globalAlpha = 1;
      });

      targets.forEach((t) => {
        ctx.globalAlpha = t.spawnT;
        const scaleR = t.r * (0.7 + 0.3 * t.spawnT);

        if (t.content) {
          const color = resolveColor(t.content.cssVar);
          ctx.fillStyle = color;
          ctx.beginPath();
          ctx.arc(t.x, t.y, scaleR, 0, Math.PI * 2);
          ctx.fill();
          ctx.lineWidth = 2;
          ctx.strokeStyle = "rgba(255,255,255,0.3)";
          ctx.stroke();

          const fontSize = Math.max(9, Math.min(12, scaleR * 0.32));
          ctx.font = `700 ${fontSize}px system-ui, sans-serif`;
          ctx.textAlign = "center";
          ctx.textBaseline = "middle";
          const label = fitLabel(t.content.label, scaleR * 1.7);
          ctx.lineWidth = 3;
          ctx.strokeStyle = "rgba(0,0,0,0.55)";
          ctx.strokeText(label, t.x, t.y);
          ctx.fillStyle = "#fff";
          ctx.fillText(label, t.x, t.y);
        } else {
          ctx.fillStyle = colorRed;
          ctx.beginPath();
          ctx.arc(t.x, t.y, scaleR, 0, Math.PI * 2);
          ctx.fill();
          ctx.strokeStyle = colorRed;
          ctx.globalAlpha = 0.35 * t.spawnT;
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.moveTo(t.x, t.y - t.r);
          ctx.lineTo(t.x, t.y - t.r - 10);
          ctx.stroke();
        }
        ctx.globalAlpha = 1;
      });

      explosions.forEach((ex) => {
        ctx.strokeStyle = ex.faint ? colorMuted : colorAccent;
        ctx.globalAlpha = Math.max(0, ex.life);
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.arc(ex.x, ex.y, ex.r, 0, Math.PI * 2);
        ctx.stroke();
        ctx.globalAlpha = 1;
      });

      drawLives();
    }

    function loop(t) {
      if (lastTime === null) lastTime = t;
      const dt = Math.min(0.05, (t - lastTime) / 1000);
      lastTime = t;
      update(dt);
      render();
      rafId = requestAnimationFrame(loop);
    }

    rafId = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(rafId);
      canvas.removeEventListener("click", handleClick);
      ro.disconnect();
    };
  }, [mode]);

  function goToCard() {
    if (!activeCard) return;
    router.push(activeCard.route);
    setActiveCard(null);
  }

  return (
    <div className="hero-game-slot relative z-[1] shrink-0 w-[460px] h-[420px] max-w-[42vw] max-h-[420px] border border-border rounded-lg overflow-hidden flex flex-col bg-card transition-colors hover:border-brand">
      <div className="flex items-center justify-between px-3 py-2 border-b border-border">
        <div className="flex items-center gap-1 rounded-full border border-border bg-secondary p-0.5">
          <button
            type="button"
            onClick={() => setMode("classic")}
            className={`rounded-full px-2.5 py-1 font-mono text-[0.65rem] font-bold tracking-[0.05em] transition-colors ${
              mode === "classic" ? "bg-brand text-primary-foreground" : "text-muted-foreground hover:text-foreground"
            }`}
          >
            CLASSIC
          </button>
          <button
            type="button"
            onClick={() => setMode("explore")}
            className={`rounded-full px-2.5 py-1 font-mono text-[0.65rem] font-bold tracking-[0.05em] transition-colors ${
              mode === "explore" ? "bg-brand text-primary-foreground" : "text-muted-foreground hover:text-foreground"
            }`}
          >
            EXPLORE
          </button>
        </div>
        <span className="font-mono text-[0.75rem] text-muted-foreground">
          Score: <span>{score}</span>
        </span>
      </div>

      <div className="relative flex-1 w-full">
        <canvas ref={canvasRef} className="h-full w-full block cursor-crosshair" />

        {activeCard && (
          <div
            className="absolute z-10 w-[210px] rounded-lg border border-brand bg-card p-3 shadow-[0_10px_28px_rgba(0,0,0,0.5)]"
            style={{
              left: Math.min(
                Math.max(activeCard.x - 105, 8),
                (canvasRef.current?.clientWidth ?? 460) - 210 - 8
              ),
              top: Math.min(
                Math.max(activeCard.y - 40, 8),
                (canvasRef.current?.clientHeight ?? 380) - 140 - 8
              ),
            }}
          >
            <p className="mb-1 font-display text-[0.9rem] font-bold text-foreground">{activeCard.label}</p>
            {activeCard.description && (
              <p className="mb-2 line-clamp-2 text-[0.75rem] text-muted-foreground">{activeCard.description}</p>
            )}
            <div className="flex items-center justify-between gap-2">
              <button
                type="button"
                onClick={goToCard}
                className="rounded-md bg-brand px-2.5 py-1 font-mono text-[0.7rem] font-semibold text-primary-foreground hover:bg-brand-hover"
              >
                View &rarr;
              </button>
              <button
                type="button"
                onClick={() => setActiveCard(null)}
                className="font-mono text-[0.7rem] text-muted-foreground hover:text-foreground"
              >
                Dismiss
              </button>
            </div>
          </div>
        )}

        <div
          className={`pointer-events-none absolute left-0 right-0 bottom-2.5 text-center text-[0.78rem] transition-opacity ${
            gameOverVisual ? "text-brand font-semibold" : "text-muted-foreground"
          }`}
        >
          {message}
        </div>
      </div>
    </div>
  );
}
