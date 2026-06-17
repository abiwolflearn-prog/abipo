import { useEffect, useRef, useState } from 'react';

interface InteractiveBgProps {
  isDarkMode?: boolean;
}

export default function InteractiveBg({ isDarkMode = true }: InteractiveBgProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  // Handle dimensions using ResizeObserver with continuous reactivity
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let resizeTimeout: NodeJS.Timeout;

    const observer = new ResizeObserver((entries) => {
      for (const entry of entries) {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(() => {
          const { width, height } = entry.contentRect;
          setDimensions({ width, height });
        }, 80);
      }
    });

    observer.observe(container);

    return () => {
      observer.disconnect();
      clearTimeout(resizeTimeout);
    };
  }, []);

  // Main canvas animation logic
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || dimensions.width === 0 || dimensions.height === 0) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const dpr = window.devicePixelRatio || 1;
    canvas.width = dimensions.width * dpr;
    canvas.height = dimensions.height * dpr;
    ctx.scale(dpr, dpr);

    // Active center of the galaxy swirl
    let centerX = dimensions.width * 0.5;
    let centerY = dimensions.height * 0.5;
    const maxRadius = Math.max(dimensions.width, dimensions.height) * 0.75;

    // Define Keplerian star class for 3-arm spiral galaxy
    class GalaxyStar {
      r: number; // orbital radius
      baseTheta: number; // baseline orbital angle
      theta: number; // active orbital angle
      omega: number; // orbital angular velocity
      radius: number;
      opacity: number;
      color: string;
      trailLength: number;
      history: { x: number; y: number }[];

      constructor() {
        // Star clustering closer to center
        const randRange = Math.random();
        this.r = Math.pow(randRange, 2.2) * maxRadius + 15;
        
        // Assign to 3 primary spiral arms
        const armIndex = Math.floor(Math.random() * 3);
        const spiralFactor = 2.4; // pitch angle of arms
        this.baseTheta = (armIndex * Math.PI * 2) / 3 + (this.r / maxRadius) * spiralFactor + (Math.random() - 0.5) * 0.32;
        this.theta = this.baseTheta;

        // Decaying orbital angular velocity
        this.omega = (0.58 / (this.r + 30)) * (0.9 + Math.random() * 0.5);

        this.radius = Math.random() * 2.2 + 0.8; // Star size
        this.opacity = Math.random() * 0.45 + (isDarkMode ? 0.45 : 0.25); // Lower opacity in light mode to keep clean
        this.trailLength = Math.floor(Math.random() * 8) + 6; // Paths
        this.history = [];

        // Colors centered around blue/cyan/indigo/emerald hues
        const colorRoll = Math.random();
        if (this.r < maxRadius * 0.18) {
          // core stars
          this.color = isDarkMode 
            ? `rgba(224, 242, 254, ${this.opacity})` 
            : `rgba(30, 41, 59, ${this.opacity * 0.8})`;
        } else if (colorRoll < 0.5) {
          // electric blue
          this.color = isDarkMode 
            ? `rgba(59, 130, 246, ${this.opacity})` 
            : `rgba(29, 78, 216, ${this.opacity})`;
        } else if (colorRoll < 0.85) {
          // turquoise
          this.color = isDarkMode 
            ? `rgba(6, 182, 212, ${this.opacity})` 
            : `rgba(3, 105, 124, ${this.opacity})`;
        } else {
          // violet
          this.color = isDarkMode 
            ? `rgba(139, 92, 246, ${this.opacity * 0.85})` 
            : `rgba(109, 40, 217, ${this.opacity})`;
        }
      }

      update() {
        // Orbit progression
        this.theta += this.omega;

        // Current coordinates
        const curX = centerX + this.r * Math.cos(this.theta);
        const curY = centerY + this.r * Math.sin(this.theta);

        // Keep trail path history
        this.history.push({ x: curX, y: curY });
        if (this.history.length > this.trailLength) {
          this.history.shift();
        }
      }

      draw(c: CanvasRenderingContext2D) {
        if (this.history.length < 2) return;

        // Draw orbital trail
        c.beginPath();
        c.moveTo(this.history[0].x, this.history[0].y);
        for (let i = 1; i < this.history.length; i++) {
          c.lineTo(this.history[i].x, this.history[i].y);
        }
        c.strokeStyle = this.color;
        c.lineWidth = this.radius * 0.75;
        c.lineCap = 'round';
        c.lineJoin = 'round';
        c.stroke();

        // Draw core star body
        c.beginPath();
        c.arc(this.history[this.history.length - 1].x, this.history[this.history.length - 1].y, this.radius, 0, Math.PI * 2);
        c.fillStyle = this.color;
        c.fill();
      }
    }

    interface GridNode {
      origX: number;
      origY: number;
      x: number;
      y: number;
      vx: number;
      vy: number;
      glowIntensity: number;
    }

    // Spawn Galaxy with increased star count for rich density
    const starCount = Math.min(320, Math.floor((dimensions.width * dimensions.height) / 8000));
    const galaxyStars: GalaxyStar[] = [];
    for (let i = 0; i < starCount; i++) {
      galaxyStars.push(new GalaxyStar());
    }

    // Spawn Grid Nodes
    const gridSpacing = 72;
    const gridNodes: GridNode[] = [];
    const cols = Math.ceil(dimensions.width / gridSpacing) + 1;
    const rows = Math.ceil(dimensions.height / gridSpacing) + 1;

    for (let col = 0; col < cols; col++) {
      for (let row = 0; row < rows; row++) {
        const origX = col * gridSpacing;
        const origY = row * gridSpacing;
        gridNodes.push({
          origX,
          origY,
          x: origX,
          y: origY,
          vx: 0,
          vy: 0,
          glowIntensity: 0,
        });
      }
    }

    // Cursor tracking
    const mouse: { x: number | null; y: number | null; targetX: number | null; targetY: number | null } = {
      x: null,
      y: null,
      targetX: null,
      targetY: null,
    };

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouse.targetX = e.clientX - rect.left;
      mouse.targetY = e.clientY - rect.top;
    };

    const handleMouseLeave = () => {
      mouse.targetX = null;
      mouse.targetY = null;
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseleave', handleMouseLeave);

    let animationFrameId: number;
    let time = 0;

    const animate = () => {
      time += 0.005;
      ctx.clearRect(0, 0, dimensions.width, dimensions.height);

      if (mouse.targetX !== null && mouse.targetY !== null) {
        if (mouse.x === null || mouse.y === null) {
          mouse.x = mouse.targetX;
          mouse.y = mouse.targetY;
        } else {
          mouse.x += (mouse.targetX - mouse.x) * 0.15;
          mouse.y += (mouse.targetY - mouse.y) * 0.15;
        }
      } else {
        mouse.x = null;
        mouse.y = null;
      }

      // Slightly drift the core center of universe
      centerX = dimensions.width * 0.5 + Math.sin(time * 2.5) * 45;
      centerY = dimensions.height * 0.5 + Math.cos(time * 1.8) * 35;

      // Draw background ambient nebula galactic core glow which adapts to theme
      const coreGradient = ctx.createRadialGradient(centerX, centerY, 5, centerX, centerY, maxRadius * 0.45);
      if (isDarkMode) {
        coreGradient.addColorStop(0, 'rgba(30, 41, 59, 0.45)');
        coreGradient.addColorStop(0.3, 'rgba(59, 130, 246, 0.15)');
        coreGradient.addColorStop(0.7, 'rgba(16, 185, 129, 0.05)');
        coreGradient.addColorStop(1, 'rgba(0, 0, 0, 0)');
      } else {
        coreGradient.addColorStop(0, 'rgba(59, 130, 246, 0.1)');
        coreGradient.addColorStop(0.4, 'rgba(14, 165, 233, 0.04)');
        coreGradient.addColorStop(0.8, 'rgba(16, 185, 129, 0.01)');
        coreGradient.addColorStop(1, 'rgba(0, 0, 0, 0)');
      }
      
      ctx.fillStyle = coreGradient;
      ctx.beginPath();
      ctx.arc(centerX, centerY, maxRadius * 0.7, 0, Math.PI * 2);
      ctx.fill();

      // Ensure galaxy stars update and render
      for (const star of galaxyStars) {
        star.update();
        star.draw(ctx);
      }

      // Physics variables
      const springK = 0.065; 
      const damping = 0.82; 
      const mousePower = 180; 

      // Update tech grid
      for (const node of gridNodes) {
        const forceAnchorX = (node.origX - node.x) * springK;
        const forceAnchorY = (node.origY - node.y) * springK;

        node.vx += forceAnchorX;
        node.vy += forceAnchorY;

        if (mouse.x !== null && mouse.y !== null) {
          const dx = mouse.x - node.x;
          const dy = mouse.y - node.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < mousePower) {
            const proximityFactor = (mousePower - dist) / mousePower; 
            const attractForce = proximityFactor * 14.5;
            
            node.vx += (dx / (dist + 5)) * attractForce;
            node.vy += (dy / (dist + 5)) * attractForce;

            node.glowIntensity += (proximityFactor - node.glowIntensity) * 0.2;
          } else {
            node.glowIntensity *= 0.88; 
          }
        } else {
          node.glowIntensity *= 0.85;
        }

        node.vx *= damping;
        node.vy *= damping;
        node.x += node.vx;
        node.y += node.vy;
      }

      // Render tech grid interconnects
      ctx.lineWidth = 0.85;
      for (let i = 0; i < gridNodes.length; i++) {
        const nodeA = gridNodes[i];
        const col = Math.floor(i / rows);
        const row = i % rows;

        const baseOpacity = isDarkMode ? 0.045 : 0.035;

        // Right neighbor
        if (col < cols - 1) {
          const rightIdx = (col + 1) * rows + row;
          const nodeB = gridNodes[rightIdx];
          const combinedGlow = (nodeA.glowIntensity + nodeB.glowIntensity) / 2;
          ctx.strokeStyle = isDarkMode
            ? `rgba(59, 130, 246, ${baseOpacity + combinedGlow * 0.22})`
            : `rgba(37, 99, 235, ${baseOpacity + combinedGlow * 0.15})`;
          ctx.beginPath();
          ctx.moveTo(nodeA.x, nodeA.y);
          ctx.lineTo(nodeB.x, nodeB.y);
          ctx.stroke();
        }

        // Down neighbor
        if (row < rows - 1) {
          const downIdx = col * rows + (row + 1);
          const nodeB = gridNodes[downIdx];
          const combinedGlow = (nodeA.glowIntensity + nodeB.glowIntensity) / 2;
          ctx.strokeStyle = isDarkMode
            ? `rgba(59, 130, 246, ${baseOpacity + combinedGlow * 0.22})`
            : `rgba(37, 99, 235, ${baseOpacity + combinedGlow * 0.15})`;
          ctx.beginPath();
          ctx.moveTo(nodeA.x, nodeA.y);
          ctx.lineTo(nodeB.x, nodeB.y);
          ctx.stroke();
        }

        // Intersections
        if (nodeA.glowIntensity > 0.05) {
          ctx.save();
          ctx.strokeStyle = isDarkMode 
            ? `rgba(6, 182, 212, ${nodeA.glowIntensity * 0.25})`
            : `rgba(3, 105, 124, ${nodeA.glowIntensity * 0.18})`;
          ctx.lineWidth = 0.55;
          ctx.beginPath();
          ctx.arc(nodeA.x, nodeA.y, 4 + nodeA.glowIntensity * 6, 0, Math.PI * 2);
          ctx.stroke();

          ctx.strokeStyle = isDarkMode 
            ? `rgba(255, 255, 255, ${nodeA.glowIntensity * 0.6})`
            : `rgba(15, 23, 42, ${nodeA.glowIntensity * 0.75})`;
          ctx.lineWidth = 0.8;
          ctx.beginPath();
          ctx.moveTo(nodeA.x - 2, nodeA.y);
          ctx.lineTo(nodeA.x + 2, nodeA.y);
          ctx.moveTo(nodeA.x, nodeA.y - 2);
          ctx.lineTo(nodeA.x, nodeA.y + 2);
          ctx.stroke();
          ctx.restore();
        } else {
          ctx.fillStyle = isDarkMode 
            ? 'rgba(255, 255, 255, 0.11)' 
            : 'rgba(15, 23, 42, 0.07)';
          ctx.fillRect(nodeA.x - 0.5, nodeA.y - 0.5, 1, 1);
        }
      }

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseleave', handleMouseLeave);
      cancelAnimationFrame(animationFrameId);
    };
  }, [dimensions, isDarkMode]);

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 pointer-events-none"
      id="canvas-background-container"
    >
      <canvas
        ref={canvasRef}
        style={{ width: '100%', height: '100%', display: 'block' }}
        className="opacity-100 transition-opacity duration-1000"
      />
    </div>
  );
}
