"use client";

import { twMerge } from "tailwind-merge";
import React, { useEffect, useRef } from "react";

function hexToRgb(hex) {
  hex = hex.replace("#", "");
  if (hex.length === 3) {
    hex = hex.split("").map((char) => char + char).join("");
  }
  const hexInt = parseInt(hex, 16);
  const red = (hexInt >> 16) & 255;
  const green = (hexInt >> 8) & 255;
  const blue = hexInt & 255;
  return [red, green, blue];
}

export const Particles = ({
  className = "",
  quantity = 100,
  staticity = 50,
  ease = 50,
  size = 0.4,
  refresh = false,
  color = "#ffffff",
  vx = 0,
  vy = 0,
  shape = "circle",
  ...props
}) => {
  const canvasRef = useRef(null);
  const canvasContainerRef = useRef(null);
  const context = useRef(null);
  const circles = useRef([]);
  const mouse = useRef({ x: 0, y: 0 });
  const canvasSize = useRef({ w: 0, h: 0 });
  
  // 1. OPTIMIZATION: Cap DPR to 1 on mobile to prevent overheating/lag on high-res screens
  const dpr = typeof window !== "undefined" 
    ? (window.innerWidth < 768 ? 1 : Math.min(window.devicePixelRatio, 2)) 
    : 1;
    
  const rafID = useRef(null);
  const resizeTimeout = useRef(null);

  useEffect(() => {
    const onMouseMove = (e) => {
      if (canvasContainerRef.current) {
        const rect = canvasContainerRef.current.getBoundingClientRect();
        const { w, h } = canvasSize.current;
        const x = e.clientX - rect.left - w / 2;
        const y = e.clientY - rect.top - h / 2;
        
        const inside = x < w / 2 && x > -w / 2 && y < h / 2 && y > -h / 2;
        if (inside) {
          mouse.current.x = x;
          mouse.current.y = y;
        }
      }
    };

    // Only add mouse listeners on desktop to save resources
    if (window.matchMedia("(pointer: fine)").matches) {
        window.addEventListener("mousemove", onMouseMove);
    }
    
    return () => window.removeEventListener("mousemove", onMouseMove);
  }, []);

  useEffect(() => {
    if (canvasRef.current) {
      context.current = canvasRef.current.getContext("2d");
    }
    initCanvas();
    animate();

    const handleResize = () => {
      if (resizeTimeout.current) clearTimeout(resizeTimeout.current);
      resizeTimeout.current = setTimeout(() => {
        initCanvas();
      }, 200);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      if (rafID.current != null) window.cancelAnimationFrame(rafID.current);
      if (resizeTimeout.current) clearTimeout(resizeTimeout.current);
      window.removeEventListener("resize", handleResize);
    };
  }, [color, shape, refresh]);

  const initCanvas = () => {
    resizeCanvas();
    drawParticles();
  };

  const resizeCanvas = () => {
    if (canvasContainerRef.current && canvasRef.current && context.current) {
      canvasSize.current.w = canvasContainerRef.current.offsetWidth;
      canvasSize.current.h = canvasContainerRef.current.offsetHeight;

      canvasRef.current.width = canvasSize.current.w * dpr;
      canvasRef.current.height = canvasSize.current.h * dpr;
      canvasRef.current.style.width = `${canvasSize.current.w}px`;
      canvasRef.current.style.height = `${canvasSize.current.h}px`;
      
      context.current.scale(dpr, dpr);

      // 2. OPTIMIZATION: Aggressive reduction for mobile (30% of total)
      const isMobile = window.innerWidth < 768;
      const targetQuantity = isMobile ? Math.floor(quantity * 0.3) : quantity;

      circles.current = [];
      for (let i = 0; i < targetQuantity; i++) {
        circles.current.push(circleParams());
      }
    }
  };

  const circleParams = () => {
    const x = Math.floor(Math.random() * canvasSize.current.w);
    const y = Math.floor(Math.random() * canvasSize.current.h);
    const translateX = 0;
    const translateY = 0;
    const pSize = Math.random() * 2 + size;
    const alpha = 0;
    const targetAlpha = parseFloat((Math.random() * 0.6 + 0.1).toFixed(1));
    const dx = (Math.random() - 0.5) * 0.1;
    const dy = (Math.random() - 0.5) * 0.1;
    const magnetism = 0.1 + Math.random() * 4;
    return {
      x, y, translateX, translateY, size: pSize, alpha, targetAlpha, dx, dy, magnetism,
    };
  };

  const rgb = hexToRgb(color);

  const drawCircle = (circle) => {
    if (context.current) {
      const { x, y, translateX, translateY, size, alpha } = circle;
      const drawX = x + translateX;
      const drawY = y + translateY;

      context.current.beginPath();
      
      if (shape === "square") {
        context.current.rect(drawX, drawY, size, size);
      } else {
        context.current.arc(drawX, drawY, size, 0, 2 * Math.PI);
      }
      
      context.current.fillStyle = `rgba(${rgb.join(", ")}, ${alpha})`;
      context.current.fill();
    }
  };

  const drawParticles = () => {
    if (context.current) {
      context.current.clearRect(0, 0, canvasSize.current.w, canvasSize.current.h);
      circles.current.forEach(drawCircle);
    }
  };

  // 3. OPTIMIZATION: Pure math function, no strings attached
  const remapValue = (value, start1, end1, start2, end2) => {
    const remapped = ((value - start1) * (end2 - start2)) / (end1 - start1) + start2;
    return remapped > 0 ? remapped : 0;
  };

  const animate = () => {
    if (context.current) {
      context.current.clearRect(0, 0, canvasSize.current.w, canvasSize.current.h);
      
      // Check for mobile once per frame instead of per particle
      // We assume mobile if screen width < 768
      const isMobile = canvasSize.current.w < 768; 
      
      circles.current.forEach((circle) => {
        // Edge Detection
        const edge = [
          circle.x + circle.translateX - circle.size,
          canvasSize.current.w - circle.x - circle.translateX - circle.size,
          circle.y + circle.translateY - circle.size,
          canvasSize.current.h - circle.y - circle.translateY - circle.size,
        ];
        
        // 4. OPTIMIZATION: Removed toFixed/parseFloat inside the loop
        const closestEdge = Math.min(...edge);
        const remapClosestEdge = remapValue(closestEdge, 0, 20, 0, 1);

        if (remapClosestEdge > 1) {
          circle.alpha += 0.02;
          if (circle.alpha > circle.targetAlpha) circle.alpha = circle.targetAlpha;
        } else {
          circle.alpha = circle.targetAlpha * remapClosestEdge;
        }

        circle.x += circle.dx + vx;
        circle.y += circle.dy + vy;

        // 5. OPTIMIZATION: Skip Mouse Physics entirely on mobile
        if (!isMobile) {
            const mouseX = mouse.current.x + canvasSize.current.w / 2;
            const mouseY = mouse.current.y + canvasSize.current.h / 2;
            const dx = mouseX - (circle.x + circle.translateX);
            const dy = mouseY - (circle.y + circle.translateY);
            const distance = Math.sqrt(dx * dx + dy * dy);
            const interactionRadius = 120;

            if (distance < interactionRadius) {
                const forceDirectionX = dx / distance;
                const forceDirectionY = dy / distance;
                const force = (interactionRadius - distance) / interactionRadius;
                const repulsionStrength = 5;
                circle.translateX -= forceDirectionX * force * repulsionStrength;
                circle.translateY -= forceDirectionY * force * repulsionStrength;
            }
        }

        circle.translateX -= circle.translateX * 0.05;
        circle.translateY -= circle.translateY * 0.05;

        if (
          circle.x < -circle.size ||
          circle.x > canvasSize.current.w + circle.size ||
          circle.y < -circle.size ||
          circle.y > canvasSize.current.h + circle.size
        ) {
          circle.x = Math.random() * canvasSize.current.w;
          circle.y = Math.random() * canvasSize.current.h;
          circle.alpha = 0;
        }

        drawCircle(circle);
      });
      
      rafID.current = window.requestAnimationFrame(animate);
    }
  };

  return (
    <div
      className={twMerge("pointer-events-none", className)}
      ref={canvasContainerRef}
      aria-hidden="true"
      {...props}
    >
      <canvas ref={canvasRef} className="size-full" />
    </div>
  );
};