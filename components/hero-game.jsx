"use client";

import { useEffect, useRef, useState } from "react";
import { homepageProjects } from "@/lib/projects-data";
import { CATEGORY_CLASSES } from "@/lib/categories";
import { ProjectModal } from "@/components/project-modal";

const RESPAWN_COOLDOWN_MS = 12000;
const MISS_COOLDOWN_MS = 4000;

// Missile Defense / project-nav hybrid for the hero "game slot". Two modes:
// "classic" is the original filler-only reflex game; "explore" mixes in
// project bubbles (drawn straight from lib/projects-data.js) among the
// regular filler targets. Popping a project bubble opens the exact same
// ProjectModal used on the homepage Projects grid - same preview, same
// "View Full Case Study" link into the real case-study page. Canvas/physics
// loop stays a single ref-driven requestAnimationFrame effect (unchanged in
// spirit from the original); the mode toggle and modal are real React state
// rendered as actual DOM, not canvas-drawn or injected HTML.
export function HeroGame({ bubbleConfig = homepageProjects }) {
  const canvasRef = useRef(null);
  const bubbleConfigRef = useRef(bubbleConfig);
  const [score, setScore] = useState(0);
  const [message, setMessage] = useState("Click anywhere to intercept");
  const [gameOverVisual, setGameOverVisual] = useState(false);
  const [mode, setMode] = useState("explore");
  const [activeProject, setActiveProject] = useState(null);

  useEffect(() => {
    bubbleConfigRef.current = bubbleConfig;
  }, [bubbleConfig]);

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

    // project-bubble bookkeeping: cooldowns per slug, and slugs currently
    // live on screen (so the same project never has two bubbles falling
    // at once)
    const respawnAt = new Map();
    const activeSlugs = new Set();

    function pickProject() {
      const now = performance.now();
      const pool = bubbleConfigRef.current.filter(
        (p) => !activeSlugs.has(p.slug) && (respawnAt.get(p.slug) ?? 0) <= now
      );
      if (!pool.length) return null;
      return pool[Math.floor(Math.random() * pool.length)];
    }

    function wrapLabel(text, maxWidth, maxLines = 2) {
      const words = text.split(" ");
      const lines = [];
      let current = "";
      for (const word of words) {
        const test = current ? `${current} ${word}` : word;
        if (ctx.measureText(test).width <= maxWidth) {
          current = test;
        } else {
          if (current) lines.push(current);
          current = word;
          if (lines.length >= maxLines) break;
        }
      }
      if (current && lines.length < maxLines) lines.push(current);
      if (lines.length > maxLines) lines.length = maxLines;
      if (lines.length === 0) lines.push(text);

      const lastIdx = lines.length - 1;
      if (ctx.measureText(lines[lastIdx]).width > maxWidth) {
        let t = lines[lastIdx];
        while (t.length > 1 && ctx.measureText(t + "…").width > maxWidth) {
          t = t.slice(0, -1);
        }
        lines[lastIdx] = t + "…";
      }
      return lines;
    }

    function pickSpawnX(r) {
      for (let attempt = 0; attempt < 10; attempt++) {
        const x = r + Math.random() * (width - r * 2);
        const collides = targets.some((t) => {
          if (t.y > height * 0.6) return false; // already well clear of the spawn zone
          return Math.abs(t.x - x) < r + t.r + 16;
        });
        if (!collides) return x;
      }
      return r + Math.random() * (width - r * 2); // give up after 10 tries, place it anyway
    }

    function spawnTarget() {
      if (mode === "explore") {
        const project = pickProject();
        if (!project) return; // everything's on cooldown/live - skip this tick, no filler fallback
        const r = Math.max(24, Math.min(36, width * 0.075));
        activeSlugs.add(project.slug);
        targets.push({
          x: pickSpawnX(r),
          y: -r,
          r,
          speed: 22 + Math.random() * 12,
          spawnT: 0,
          project,
        });
      } else {
        const r = 6 + Math.random() * 3;
        targets.push({
          x: r + Math.random() * (width - r * 2),
          y: -r,
          r,
          speed: 28 + Math.random() * 18 + Math.min(40, score * 1.2),
          spawnT: 0,
          project: null,
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
      activeSlugs.clear();
      setScore(0);
      setMessage("Click anywhere to intercept");
      setGameOverVisual(false);
      setActiveProject(null);
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
            if (t.project) {
              activeSlugs.delete(t.project.slug);
              respawnAt.set(t.project.slug, performance.now() + MISS_COOLDOWN_MS);
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
              if (s.hitTarget.project) {
                const p = s.hitTarget.project;
                activeSlugs.delete(p.slug);
                respawnAt.set(p.slug, performance.now() + RESPAWN_COOLDOWN_MS);
                setActiveProject(p);
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

        if (t.project) {
          const cssVar = (CATEGORY_CLASSES[t.project.category] ?? CATEGORY_CLASSES.blue).cssVar;
          const color = resolveColor(cssVar);
          ctx.fillStyle = color;
          ctx.beginPath();
          ctx.arc(t.x, t.y, scaleR, 0, Math.PI * 2);
          ctx.fill();
          ctx.lineWidth = 2;
          ctx.strokeStyle = "rgba(255,255,255,0.3)";
          ctx.stroke();

          const fontSize = Math.max(8, Math.min(10, scaleR * 0.32));
          ctx.font = `700 ${fontSize}px system-ui, sans-serif`;
          ctx.textAlign = "center";
          ctx.textBaseline = "middle";
          const lines = wrapLabel(t.project.shortTitle, scaleR * 1.7);
          const lineHeight = fontSize * 1.15;
          const startY = t.y - ((lines.length - 1) * lineHeight) / 2;
          ctx.lineWidth = 3;
          ctx.strokeStyle = "rgba(0,0,0,0.55)";
          lines.forEach((line, i) => ctx.strokeText(line, t.x, startY + i * lineHeight));
          ctx.fillStyle = "#fff";
          lines.forEach((line, i) => ctx.fillText(line, t.x, startY + i * lineHeight));
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

        <div
          className={`pointer-events-none absolute left-0 right-0 bottom-2.5 text-center text-[0.78rem] transition-opacity ${
            gameOverVisual ? "text-brand font-semibold" : "text-muted-foreground"
          }`}
        >
          {message}
        </div>
      </div>

      <ProjectModal project={activeProject} onClose={() => setActiveProject(null)} />
    </div>
  );
}
