"use client";

import { useEffect, useRef } from "react";
import { twMerge } from "tailwind-merge";

export function Globe({ className }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    let width = canvas.offsetWidth;
    let height = canvas.offsetHeight;
    let rotation = 0;

    // --- CONFIGURATION ---
    const GLOBE_RADIUS = width * 0.4; // 40% of container
    const LATITUDE_COUNT = 8;  // Number of horizontal rings
    const LONGITUDE_COUNT = 10; // Number of vertical lines
    const ROTATION_SPEED = 0.005;
    const COLOR_FRONT = "rgba(99, 102, 241, 1)"; // Indigo-500
    const COLOR_BACK = "rgba(99, 102, 241, 0.1)"; // Faded Indigo

    // Handle high-res screens
    const dpr = window.devicePixelRatio || 1;
    canvas.width = width * dpr;
    canvas.height = height * dpr;
    ctx.scale(dpr, dpr);

    const project = (x, y, z) => {
      // Simple weak perspective projection
      const scale = 300 / (300 + z); 
      const px = x * scale + width / 2;
      const py = y * scale + height / 2;
      return { x: px, y: py, scale };
    };

    const drawGlobe = () => {
      ctx.clearRect(0, 0, width, height);
      
      // Update rotation
      rotation += ROTATION_SPEED;
      
      const cx = width / 2;
      const cy = height / 2;

      // 1. Draw "Core" Glow
      const gradient = ctx.createRadialGradient(cx, cy, GLOBE_RADIUS * 0.5, cx, cy, GLOBE_RADIUS);
      gradient.addColorStop(0, "rgba(79, 70, 229, 0.2)"); // Inner glow
      gradient.addColorStop(1, "rgba(0, 0, 0, 0)");
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, width, height);

      ctx.lineWidth = 1.5;

      // --- DRAW LONGITUDES (Vertical Lines) ---
      for (let i = 0; i < LONGITUDE_COUNT; i++) {
        const phi = (Math.PI * 2 * i) / LONGITUDE_COUNT + rotation;
        
        ctx.beginPath();
        // Calculate opacity based on Z-depth of the "middle" of the line
        // sin(phi) tells us if the line is facing us (positive) or away (negative)
        const isFront = Math.sin(phi) > 0;
        ctx.strokeStyle = isFront ? COLOR_FRONT : COLOR_BACK;

        // Draw the circle for this longitude
        for (let j = 0; j <= 20; j++) {
            const theta = (Math.PI * j) / 20; // 0 to PI
            const x = GLOBE_RADIUS * Math.sin(theta) * Math.cos(phi);
            const z = GLOBE_RADIUS * Math.sin(theta) * Math.sin(phi);
            const y = GLOBE_RADIUS * Math.cos(theta); // Up/Down

            const projected = project(x, y, z);
            if (j === 0) ctx.moveTo(projected.x, projected.y);
            else ctx.lineTo(projected.x, projected.y);
        }
        ctx.stroke();
      }

      // --- DRAW LATITUDES (Horizontal Rings) ---
      for (let i = 1; i < LATITUDE_COUNT; i++) {
        const theta = (Math.PI * i) / LATITUDE_COUNT; // 0 to PI
        const ringRadius = GLOBE_RADIUS * Math.sin(theta);
        const y = GLOBE_RADIUS * Math.cos(theta);

        ctx.beginPath();
        // Since ring is horizontal, we can't just pick one color. 
        // We draw it in segments to handle depth fading.
        for (let j = 0; j <= 40; j++) {
            const phi = (Math.PI * 2 * j) / 40 + rotation;
            const x = ringRadius * Math.cos(phi); // Note: rotating the ring points
            // Actually, for latitudes, the ring itself doesn't rotate visibly unless it has texture,
            // but the segments move behind/in-front.
            
            // Correction: To match longitude rotation
            // The latitude ring is stationary in space, but the 'view' of it doesn't change much.
            // However, to match the aesthetic, let's keep rings static but change opacity? 
            // Actually, simpler: Let's just draw static rings that look like a cage.
            
            // Let's rotate the ring points so knots align with longitudes
            const knotPhi = (Math.PI * 2 * j) / 40 + rotation;
            
            const rX = ringRadius * Math.cos(knotPhi); // Standard circle X
            const rZ = ringRadius * Math.sin(knotPhi); // Standard circle Z
            
            const projected = project(rX, y, rZ);
            
            // Tricky part: Canvas strokeStyle can't change mid-path easily without multiple paths.
            // Optimization: Just draw the back part then the front part? 
            // Or simpler: Draw the whole ring in semi-transparent color, 
            // then overlay the front arc?
            
            // Let's use a simpler approach for performance:
            // Just draw the ring as "Front Color" but with variable Alpha?
            // No, let's just make Latitudes static "Scanners".
        }
        
        // --- SIMPLIFIED LATITUDE RENDER ---
        // Draw the back half of the ring
        ctx.strokeStyle = COLOR_BACK;
        ctx.beginPath();
        ctx.ellipse(cx, cy + y, ringRadius, ringRadius * 0.3, 0, Math.PI, 0); // Faked perspective ellipse
        ctx.stroke();

        // Draw the front half of the ring
        ctx.strokeStyle = COLOR_FRONT;
        ctx.beginPath();
        ctx.ellipse(cx, cy + y, ringRadius, ringRadius * 0.3, 0, 0, Math.PI);
        ctx.stroke();
      }

      requestAnimationFrame(drawGlobe);
    };

    const animId = requestAnimationFrame(drawGlobe);

    return () => cancelAnimationFrame(animId);
  }, []);

  return (
    <div className={twMerge("w-full h-full flex items-center justify-center", className)}>
      <canvas
        ref={canvasRef}
        className="w-full h-full max-w-[300px] max-h-[300px]"
        style={{ width: '100%', height: '100%' }}
      />
    </div>
  );
}