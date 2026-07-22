"use client";
import { useEffect, useRef, useCallback } from "react";

const CELL = 20;
const TICK_MS = 65;
const RESTART_DELAY_MS = 1200;

type Point = { x: number; y: number };
type Dir = { x: number; y: number };

const DIRS: Dir[] = [
  { x: 1, y: 0 },
  { x: -1, y: 0 },
  { x: 0, y: 1 },
  { x: 0, y: -1 },
];

function randFood(snake: Point[], cols: number, rows: number): Point {
  const occupied = new Set(snake.map((p) => `${p.x},${p.y}`));
  let p: Point;
  do {
    p = { x: Math.floor(Math.random() * cols), y: Math.floor(Math.random() * rows) };
  } while (occupied.has(`${p.x},${p.y}`));
  return p;
}

/** BFS to find next direction toward food, avoiding snake body. */
function aiDir(snake: Point[], food: Point, cols: number, rows: number): Dir {
  const head = snake[0];
  const bodySet = new Set(snake.slice(1).map((p) => `${p.x},${p.y}`));
  const key = (p: Point) => `${p.x},${p.y}`;
  const target = key(food);

  // BFS
  const queue: Array<{ pos: Point; firstDir: Dir }> = [];
  const visited = new Set<string>();
  visited.add(key(head));

  for (const d of DIRS) {
    const nx = (head.x + d.x + cols) % cols;
    const ny = (head.y + d.y + rows) % rows;
    const nk = `${nx},${ny}`;
    if (!bodySet.has(nk) && !visited.has(nk)) {
      visited.add(nk);
      queue.push({ pos: { x: nx, y: ny }, firstDir: d });
    }
  }

  while (queue.length) {
    const { pos, firstDir } = queue.shift()!;
    if (key(pos) === target) return firstDir;
    for (const d of DIRS) {
      const nx = (pos.x + d.x + cols) % cols;
      const ny = (pos.y + d.y + rows) % rows;
      const nk = `${nx},${ny}`;
      if (!bodySet.has(nk) && !visited.has(nk)) {
        visited.add(nk);
        queue.push({ pos: { x: nx, y: ny }, firstDir });
      }
    }
  }

  // No path found — pick any safe direction
  for (const d of DIRS) {
    const nx = (head.x + d.x + cols) % cols;
    const ny = (head.y + d.y + rows) % rows;
    if (!bodySet.has(`${nx},${ny}`)) return d;
  }
  return DIRS[0];
}

export default function SnakeGame() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const stateRef = useRef({
    snake: [{ x: 5, y: 5 }] as Point[],
    dir: { x: 1, y: 0 } as Dir,
    food: { x: 10, y: 10 } as Point,
    cols: 0,
    rows: 0,
    dead: false,
    score: 0,
    deadAt: 0,
  });

  const reset = useCallback((cols: number, rows: number) => {
    const s = stateRef.current;
    const start = { x: Math.floor(cols / 2), y: Math.floor(rows / 2) };
    s.snake = [start];
    s.dir = { x: 1, y: 0 };
    s.food = randFood(s.snake, cols, rows);
    s.dead = false;
    s.score = 0;
    s.deadAt = 0;
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d")!;

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
      const s = stateRef.current;
      s.cols = Math.floor(canvas.width / CELL);
      s.rows = Math.floor(canvas.height / CELL);
      reset(s.cols, s.rows);
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    let last = 0;
    let raf: number;

    const draw = (ts: number) => {
      const s = stateRef.current;
      const { cols, rows } = s;
      if (!cols || !rows) { raf = requestAnimationFrame(draw); return; }

      if (ts - last > TICK_MS) {
        last = ts;

        if (s.dead) {
          // auto-restart after delay
          if (ts - s.deadAt > RESTART_DELAY_MS) reset(cols, rows);
        } else {
          s.dir = aiDir(s.snake, s.food, cols, rows);
          const head = s.snake[0];
          const next: Point = {
            x: (head.x + s.dir.x + cols) % cols,
            y: (head.y + s.dir.y + rows) % rows,
          };
          if (s.snake.some((p) => p.x === next.x && p.y === next.y)) {
            s.dead = true;
            s.deadAt = ts;
          } else {
            s.snake.unshift(next);
            if (next.x === s.food.x && next.y === s.food.y) {
              s.score++;
              s.food = randFood(s.snake, cols, rows);
            } else {
              s.snake.pop();
            }
          }
        }

        // --- render ---
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // grid dots
        ctx.fillStyle = "rgba(255,255,255,0.04)";
        for (let cx = 0; cx < cols; cx++) {
          for (let cy = 0; cy < rows; cy++) {
            ctx.fillRect(cx * CELL + CELL / 2 - 1, cy * CELL + CELL / 2 - 1, 2, 2);
          }
        }

        // food — pulsing glow
        const fx = s.food.x * CELL + CELL / 2;
        const fy = s.food.y * CELL + CELL / 2;
        const glow = ctx.createRadialGradient(fx, fy, 1, fx, fy, CELL);
        glow.addColorStop(0, "rgba(34,211,238,0.6)");
        glow.addColorStop(1, "rgba(34,211,238,0)");
        ctx.beginPath();
        ctx.arc(fx, fy, CELL, 0, Math.PI * 2);
        ctx.fillStyle = glow;
        ctx.fill();
        ctx.beginPath();
        ctx.arc(fx, fy, CELL / 2 - 3, 0, Math.PI * 2);
        ctx.fillStyle = "#67e8f9";
        ctx.fill();

        // snake
        s.snake.forEach((p, i) => {
          const t = i / Math.max(s.snake.length - 1, 1);
          const alpha = s.dead ? 0.25 : 1 - t * 0.65;
          ctx.fillStyle = s.dead
            ? `rgba(239,68,68,${alpha})`
            : `rgba(34,211,238,${alpha})`;
          const pad = i === 0 ? 2 : 3;
          ctx.beginPath();
          ctx.roundRect(p.x * CELL + pad, p.y * CELL + pad, CELL - pad * 2, CELL - pad * 2, 4);
          ctx.fill();
        });

        // score
        ctx.fillStyle = "rgba(255,255,255,0.4)";
        ctx.font = "13px monospace";
        ctx.textAlign = "right";
        ctx.fillText(`${s.score}`, canvas.width - 12, 22);

        // dead flash
        if (s.dead) {
          const fade = Math.min((ts - s.deadAt) / RESTART_DELAY_MS, 1);
          ctx.fillStyle = `rgba(239,68,68,${0.15 * (1 - fade)})`;
          ctx.fillRect(0, 0, canvas.width, canvas.height);
        }
      }

      raf = requestAnimationFrame(draw);
    };

    raf = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
    };
  }, [reset]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full"
      style={{ display: "block" }}
    />
  );
}
