"use client";

import { useEffect, useRef } from "react";

// --- Spatial Hash Grid for O(1) Neighbor Lookups ---
class SpatialHashGrid {
  cellSize: number;
  cols: number;
  rows: number;
  cells: Map<number, Particle[]>;

  constructor(width: number, height: number, cellSize: number) {
    this.cellSize = cellSize;
    this.cols = Math.ceil(width / cellSize) + 1;
    this.rows = Math.ceil(height / cellSize) + 1;
    this.cells = new Map();
  }

  clear() {
    this.cells.clear();
  }

  private _hash(x: number, y: number) {
    const col = Math.floor(x / this.cellSize);
    const row = Math.floor(y / this.cellSize);
    return row * this.cols + col;
  }

  insert(particle: Particle) {
    const key = this._hash(particle.x, particle.y);
    if (!this.cells.has(key)) {
      this.cells.set(key, []);
    }
    this.cells.get(key)!.push(particle);
  }

  getNearby(x: number, y: number): Particle[] {
    const col = Math.floor(x / this.cellSize);
    const row = Math.floor(y / this.cellSize);
    const nearby: Particle[] = [];

    // Check center + 8 surrounding cells
    for (let i = -1; i <= 1; i++) {
      for (let j = -1; j <= 1; j++) {
        const key = (row + i) * this.cols + (col + j);
        const cell = this.cells.get(key);
        if (cell) {
          for (let k = 0; k < cell.length; k++) {
             nearby.push(cell[k]);
          }
        }
      }
    }
    return nearby;
  }
}

// --- Particle ---
class Particle {
  x: number;
  y: number;
  size: number;
  density: number;
  colorIndex: number;
  vx: number;
  vy: number;
  baseVx: number;
  baseVy: number;

  constructor(canvasWidth: number, canvasHeight: number) {
    this.x = Math.random() * canvasWidth;
    this.y = Math.random() * canvasHeight;
    this.size = (Math.random() * 2 + 0.5) * 0.95; // Reduced size by 5%
    this.density = Math.random() * 20 + 1;
    this.colorIndex = Math.floor(Math.random() * 2);

    this.baseVx = (Math.random() - 0.5) * 0.5;
    this.baseVy = (Math.random() - 0.5) * 0.5;
    this.vx = this.baseVx;
    this.vy = this.baseVy;
  }

  update(mouse: { x: number; y: number }, grid: SpatialHashGrid, canvasWidth: number, canvasHeight: number) {
    // 1. Mouse Interaction (Attraction)
    const dx = mouse.x - this.x;
    const dy = mouse.y - this.y;
    // Math optimization: use squared distance
    const distSq = dx * dx + dy * dy;
    const maxDistSq = 400 * 400; // 400px radius squared

    if (distSq < maxDistSq) {
      // Only calculate Math.sqrt if we are inside the attraction radius!
      const distance = Math.sqrt(distSq); 
      const force = (400 - distance) / 400;
      const dirX = dx / distance;
      const dirY = dy / distance;
      
      this.vx += dirX * force * (this.density * 0.02);
      this.vy += dirY * force * (this.density * 0.02);
    } else {
      this.vx += (this.baseVx - this.vx) * 0.05;
      this.vy += (this.baseVy - this.vy) * 0.05;
    }

    // 2. Particle Repulsion (O(1) lookup via grid)
    const neighbors = grid.getNearby(this.x, this.y);
    for (let i = 0; i < neighbors.length; i++) {
      const neighbor = neighbors[i];
      if (neighbor === this) continue;

      const ndx = this.x - neighbor.x;
      const ndy = this.y - neighbor.y;
      const ndistSq = ndx * ndx + ndy * ndy;
      const repulsionRadius = 15;
      const repRadSq = repulsionRadius * repulsionRadius;

      if (ndistSq < repRadSq && ndistSq > 0) {
        // Fast approximation to avoid Math.sqrt for tiny repulsions
        const force = (repRadSq - ndistSq) / repRadSq;
        this.vx += ndx * force * 0.01;
        this.vy += ndy * force * 0.01;
      }
    }

    // Brownian motion & Friction
    this.vx += (Math.random() - 0.5) * 0.1;
    this.vy += (Math.random() - 0.5) * 0.1;
    this.vx *= 0.92;
    this.vy *= 0.92;

    this.x += this.vx;
    this.y += this.vy;

    // Wrap around screen
    if (this.x < -10) this.x = canvasWidth + 10;
    if (this.x > canvasWidth + 10) this.x = -10;
    if (this.y < -10) this.y = canvasHeight + 10;
    if (this.y > canvasHeight + 10) this.y = -10;
  }

  // Rendering optimization: Draw using pre-rendered canvas instead of ctx.arc
  draw(ctx: CanvasRenderingContext2D, colorCanvases: HTMLCanvasElement[]) {
    const sourceCanvas = colorCanvases[this.colorIndex];
    const scale = this.size / 2;
    // ctx.drawImage is heavily hardware accelerated
    ctx.drawImage(sourceCanvas, this.x - 4 * scale, this.y - 4 * scale, 8 * scale, 8 * scale);
  }
}

// --- Pre-render helper ---
function createParticleCanvas(color: string): HTMLCanvasElement {
  const canvas = document.createElement("canvas");
  canvas.width = 8;
  canvas.height = 8;
  const ctx = canvas.getContext("2d");
  if (ctx) {
    ctx.beginPath();
    ctx.arc(4, 4, 3, 0, Math.PI * 2);
    ctx.fillStyle = color;
    ctx.fill();
  }
  return canvas;
}

export default function InteractiveBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    // Pre-render particles to memory (Opacity increased by 5% -> 0.63)
    const greenCanvas = createParticleCanvas("rgba(0, 234, 100, 0.63)"); // HackerRank Green
    const limeCanvas = createParticleCanvas("rgba(163, 230, 53, 0.63)");  // Lime 400
    const colorCanvases = [greenCanvas, limeCanvas];

    let animationFrameId: number;
    let particlesArray: Particle[] = [];
    let grid: SpatialHashGrid;
    
    const mouse = {
      x: window.innerWidth / 2,
      y: window.innerHeight / 2,
    };

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      initSystem();
    };

    const initSystem = () => {
      particlesArray = [];
      // 50px cells for spatial hashing
      grid = new SpatialHashGrid(canvas.width, canvas.height, 50);
      
      // Because we optimized it so heavily, we can increase the particle count!
      const numberOfParticles = Math.floor(Math.min(window.innerWidth / 2, 800) * 1.1); 
      for (let i = 0; i < numberOfParticles; i++) {
        particlesArray.push(new Particle(canvas.width, canvas.height));
      }
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.globalCompositeOperation = 'screen';

      // 1. Insert all particles into the Spatial Hash Grid
      grid.clear();
      for (let i = 0; i < particlesArray.length; i++) {
        grid.insert(particlesArray[i]);
      }

      // 2. Update and draw using grid lookups
      for (let i = 0; i < particlesArray.length; i++) {
        particlesArray[i].update(mouse, grid, canvas.width, canvas.height);
        particlesArray[i].draw(ctx, colorCanvases);
      }
      
      animationFrameId = requestAnimationFrame(animate);
    };

    const handleMouseMove = (e: MouseEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };

    window.addEventListener("resize", handleResize);
    window.addEventListener("mousemove", handleMouseMove);
    
    handleResize();
    animate();

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div className="fixed inset-0 z-[-2] overflow-hidden bg-[#030303] pointer-events-none">
      {/* ─── Static Ambient Glows ─── */}
      <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] rounded-full bg-[#00ea64]/10 blur-[120px]" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[60%] h-[60%] rounded-full bg-[#a3e635]/10 blur-[150px]" />

      {/* ─── Interactive Particle Canvas ─── */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full pointer-events-none"
      />
    </div>
  );
}
