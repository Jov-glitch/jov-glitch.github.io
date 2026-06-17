"use client";

import React, { useEffect, useRef } from "react";

interface RetroBackgroundProps {
  mode: "creativo" | "serio";
  dossierTheme?: "light" | "dark";
}

export function RetroBackground({ mode, dossierTheme = "light" }: RetroBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: -1000, y: -1000, active: false });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    // DevOps / Cloud Engineering Node labels
    const labels = [
      "k8s", "docker", "terraform", "aws", "gcp", "dns", "vpn", "diana-api",
      "rto", "rpo", "yaml", "bash", "ssh", "opnsense", "tailscale", "prometheus",
      "grafana", "git", "ci/cd", "envoy", "nginx", "rest-api", "postgres", "redis"
    ];

    interface Node {
      x: number;
      y: number;
      vx: number;
      vy: number;
      radius: number;
      label: string;
    }

    interface Packet {
      fromNode: Node;
      toNode: Node;
      progress: number; // 0 to 1
      speed: number;
    }

    // Generate nodes
    const nodeCount = Math.min(Math.floor((width * height) / 40000), 30);
    const nodes: Node[] = [];
    for (let i = 0; i < nodeCount; i++) {
      nodes.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
        radius: Math.random() * 2 + 1.5,
        label: labels[i % labels.length]
      });
    }

    const packets: Packet[] = [];

    // Resize handler
    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", handleResize);

    // Mouse position tracker (viewport-relative, matches fixed canvas position)
    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current.x = e.clientX;
      mouseRef.current.y = e.clientY;
      mouseRef.current.active = true;
    };

    const handleMouseLeave = () => {
      mouseRef.current.active = false;
    };

    window.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseleave", handleMouseLeave);

    // Animation Loop
    const draw = () => {
      ctx.clearRect(0, 0, width, height);

      // Determine styling colors based on mode and dossierTheme
      let gridColor = "rgba(0, 0, 0, 0.02)";
      let nodeColor = "rgba(0, 0, 0, 0.06)";
      let textColor = "rgba(0, 0, 0, 0.12)";
      let lineColor = "rgba(0, 0, 0, 0.025)";
      let packetColor = "rgba(255, 0, 0, 0.25)";
      let mouseLineColor = "rgba(255, 0, 0, 0.06)";
      let mouseTextColor = "rgba(255, 0, 0, 0.2)";

      if (mode === "creativo") {
        gridColor = "rgba(0, 0, 0, 0.025)";
        nodeColor = "rgba(0, 0, 0, 0.15)";
        textColor = "rgba(0, 0, 0, 0.25)";
        lineColor = "rgba(0, 0, 0, 0.04)";
        packetColor = "rgba(255, 0, 0, 0.4)";
        mouseLineColor = "rgba(255, 0, 0, 0.08)";
        mouseTextColor = "rgba(255, 0, 0, 0.4)";
      } else {
        // Serious Mode / Dossier
        if (dossierTheme === "dark") {
          gridColor = "rgba(255, 255, 255, 0.012)";
          nodeColor = "rgba(255, 255, 255, 0.05)";
          textColor = "rgba(255, 255, 255, 0.12)";
          lineColor = "rgba(255, 255, 255, 0.015)";
          packetColor = "rgba(0, 255, 0, 0.15)";
          mouseLineColor = "rgba(255, 255, 255, 0.03)";
          mouseTextColor = "rgba(255, 255, 255, 0.12)";
        } else {
          gridColor = "rgba(0, 0, 0, 0.012)";
          nodeColor = "rgba(0, 0, 0, 0.05)";
          textColor = "rgba(0, 0, 0, 0.12)";
          lineColor = "rgba(0, 0, 0, 0.015)";
          packetColor = "rgba(255, 0, 0, 0.15)";
          mouseLineColor = "rgba(0, 0, 0, 0.03)";
          mouseTextColor = "rgba(0, 0, 0, 0.12)";
        }
      }

      // 1. Draw Grid Lines
      const gridSpacing = 100;
      ctx.strokeStyle = gridColor;
      ctx.lineWidth = 1;
      
      // Vertical grid lines
      for (let x = 0; x < width; x += gridSpacing) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();
      }
      // Horizontal grid lines
      for (let y = 0; y < height; y += gridSpacing) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
      }

      // 2. Draw Mouse Radar & Coordinates (only in creative mode for maximum fidelity)
      const mouse = mouseRef.current;
      if (mode === "creativo" && mouse.active && mouse.x > 0 && mouse.y > 0) {
        // Draw coordinate text
        ctx.font = '9px "JetBrains Mono", Courier, monospace';
        ctx.fillStyle = mouseTextColor;
        ctx.fillText(`SYS_LOC: [${Math.floor(mouse.x)}, ${Math.floor(mouse.y)}]`, mouse.x + 15, mouse.y - 15);
        ctx.fillText(`NET_PING: ${(12 + (Math.floor(mouse.x + mouse.y) % 10))}ms`, mouse.x + 15, mouse.y - 5);

        // Draw crosshair lines
        ctx.strokeStyle = mouseLineColor;
        ctx.beginPath();
        ctx.moveTo(mouse.x, 0);
        ctx.lineTo(mouse.x, height);
        ctx.moveTo(0, mouse.y);
        ctx.lineTo(width, mouse.y);
        ctx.stroke();

        // Draw radar concentric circles
        ctx.beginPath();
        ctx.arc(mouse.x, mouse.y, 45, 0, Math.PI * 2);
        ctx.stroke();
      }

      // 3. Update & Draw Nodes
      nodes.forEach((node) => {
        // Move
        node.x += node.vx;
        node.y += node.vy;

        // Bounce on borders
        if (node.x < 0 || node.x > width) node.vx *= -1;
        if (node.y < 0 || node.y > height) node.vy *= -1;

        // Repel from mouse pointer
        if (mouse.active) {
          const dx = node.x - mouse.x;
          const dy = node.y - mouse.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 130) {
            const force = (130 - dist) / 130;
            const angle = Math.atan2(dy, dx);
            node.x += Math.cos(angle) * force * 0.6;
            node.y += Math.sin(angle) * force * 0.6;
          }
        }

        // Draw node (small brutalist squares)
        ctx.fillStyle = nodeColor;
        ctx.fillRect(node.x - node.radius, node.y - node.radius, node.radius * 2, node.radius * 2);

        // Label
        ctx.font = '8px "JetBrains Mono", Courier, monospace';
        ctx.fillStyle = textColor;
        ctx.fillText(node.label.toUpperCase(), node.x + 6, node.y + 3);
      });

      // 4. Draw Connections (faint dashed lines between close nodes)
      const connectionDist = 180;
      ctx.strokeStyle = lineColor;
      ctx.lineWidth = 1;
      
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x;
          const dy = nodes[i].y - nodes[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < connectionDist) {
            ctx.beginPath();
            ctx.setLineDash([2, 5]);
            ctx.moveTo(nodes[i].x, nodes[i].y);
            ctx.lineTo(nodes[j].x, nodes[j].y);
            ctx.stroke();
            ctx.setLineDash([]); // Reset line dash

            // Randomly spawn a packet on this connection
            if (packets.length < 12 && Math.random() < 0.0003) {
              packets.push({
                fromNode: nodes[i],
                toNode: nodes[j],
                progress: 0,
                speed: 0.003 + Math.random() * 0.005
              });
            }
          }
        }
      }

      // 5. Update & Draw Packets
      for (let i = packets.length - 1; i >= 0; i--) {
        const p = packets[i];
        p.progress += p.speed;

        if (p.progress >= 1) {
          packets.splice(i, 1);
          continue;
        }

        // Linear interpolation for coordinates
        const px = p.fromNode.x + (p.toNode.x - p.fromNode.x) * p.progress;
        const py = p.fromNode.y + (p.toNode.y - p.fromNode.y) * p.progress;

        // Draw packet (small glowing square)
        ctx.fillStyle = packetColor;
        ctx.fillRect(px - 1.5, py - 1.5, 3, 3);
      }

      animationFrameId = requestAnimationFrame(draw);
    };

    draw();

    // Clean up
    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [mode, dossierTheme]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full pointer-events-none z-0 print:hidden"
    />
  );
}
