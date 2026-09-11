"use client";

import { useEffect, useRef, useState } from "react";

// Missile Defense - tiny canvas game for the hero "game slot". Ported from
// game.js: falling targets, click-to-intercept with an eased traveling
// projectile + fading trail that homes toward the live target position,
// explosions, lives/score/game-over/reset state machine, HUD.
export function HeroGame() {
  const canvasRef = useRef(null);
  const [score, setScore] = useState(0);
  const [message, setMessage] = useState("Click anywhere to intercept");
  const [gameOverVisual, setGameOverVisual] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");

    const rootStyle = getComputedStyle(document.documentElement);
    const colorAccent = rootStyle.getPropertyValue("--brand").trim() || "#7f97c2";
    const colorRed = rootStyle.getPropertyValue("--cat-red").trim() || "#e66767";
    const colorMuted = rootStyle.getPropertyValue("--muted-foreground").trim() || "#8a90a3";

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

    function spawnTarget() {
      const r = 6 + Math.random() * 3;
      targets.push({
        x: r + Math.random() * (width - r * 2),
        y: -r,
        r,
        speed: 28 + Math.random() * 18 + Math.min(40, score * 1.2),
        spawnT: 0,
      });
    }

    function reset() {
      targets = [];
      explosions = [];
      streaks = [];
      score = 0;
      lives = 3;
      gameOver = false;
      timeSinceSpawn = 0;
      setScore(0);
      setMessage("Click anywhere to intercept");
      setGameOverVisual(false);
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
        ctx.fillStyle = colorRed;
        ctx.beginPath();
        ctx.arc(t.x, t.y, t.r * (0.7 + 0.3 * t.spawnT), 0, Math.PI * 2);
        ctx.fill();
        ctx.strokeStyle = colorRed;
        ctx.globalAlpha = 0.35 * t.spawnT;
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(t.x, t.y - t.r);
        ctx.lineTo(t.x, t.y - t.r - 10);
        ctx.stroke();
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
  }, []);

  return (
    <div className="hero-game-slot relative z-[1] shrink-0 w-[400px] h-[400px] max-w-[40vw] max-h-[400px] aspect-square border border-border rounded-lg overflow-hidden flex flex-col bg-card transition-colors hover:border-brand">
      <div className="flex items-center justify-between px-3 py-2.5 border-b border-border">
        <span className="font-mono text-[0.7rem] font-bold tracking-[0.06em] text-brand">
          MISSILE DEFENSE
        </span>
        <span className="font-mono text-[0.75rem] text-muted-foreground">
          Score: <span>{score}</span>
        </span>
      </div>
      <canvas ref={canvasRef} className="flex-1 w-full block cursor-crosshair" />
      <div
        className={`absolute left-0 right-0 bottom-2.5 text-center text-[0.78rem] pointer-events-none transition-opacity ${
          gameOverVisual ? "text-brand font-semibold" : "text-muted-foreground"
        }`}
      >
        {message}
      </div>
    </div>
  );
}
