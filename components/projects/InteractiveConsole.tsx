"use client";

import React, { useState, useEffect, useRef } from "react";

interface InteractiveConsoleProps {
  logs: string[];
  command: string;
}

export function InteractiveConsole({ logs, command }: InteractiveConsoleProps) {
  const [displayedLogs, setDisplayedLogs] = useState<string[]>([]);
  const [isRunning, setIsRunning] = useState(false);
  const [currentLine, setCurrentLine] = useState(0);
  const [inputVal, setInputVal] = useState("");
  const [customOutputs, setCustomOutputs] = useState<string[]>([]);
  const [glitchActive, setGlitchActive] = useState(false);
  const [matrixActive, setMatrixActive] = useState(false);
  
  const scrollRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [displayedLogs, isRunning, customOutputs, matrixActive]);

  const runSimulation = () => {
    setIsRunning(true);
    setDisplayedLogs([]);
    setCurrentLine(0);
    setCustomOutputs([]);
    setMatrixActive(false);
    setGlitchActive(false);
  };

  useEffect(() => {
    if (!isRunning) return;

    let timer: NodeJS.Timeout;
    if (currentLine < logs.length) {
      timer = setTimeout(() => {
        setDisplayedLogs((prev) => [...prev, logs[currentLine]]);
        setCurrentLine((prev) => prev + 1);
      }, Math.random() * 200 + 80); // random lag
    } else {
      setIsRunning(false);
    }

    return () => {
      if (timer) clearTimeout(timer);
    };
  }, [isRunning, currentLine, logs]);

  // Matrix falling code animation
  useEffect(() => {
    if (!matrixActive) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resizeCanvas = () => {
      if (!canvas) return;
      canvas.width = canvas.parentElement?.clientWidth || 600;
      canvas.height = canvas.parentElement?.clientHeight || 230;
    };
    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    const katakana = "ｱｲｳｴｵｶｷｸｹｺｻｼｽｾｿﾀﾁﾂﾃﾄﾅﾆﾇﾈﾉﾊﾋﾌﾍﾎﾏﾐﾑﾒﾓﾔﾕﾖﾗﾘﾙﾚﾛﾜﾝ1234567890ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const alphabet = katakana.split("");
    const fontSize = 11;
    const columns = Math.floor(canvas.width / fontSize);

    const rainDrops: number[] = [];
    for (let x = 0; x < columns; x++) {
      rainDrops[x] = Math.floor(Math.random() * -20); // offset start positions
    }

    let animationId: number;
    const draw = () => {
      ctx.fillStyle = "rgba(0, 0, 0, 0.06)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.fillStyle = "#00ff00";
      ctx.font = fontSize + "px monospace";

      for (let i = 0; i < rainDrops.length; i++) {
        const text = alphabet[Math.floor(Math.random() * alphabet.length)];
        const yPos = rainDrops[i] * fontSize;
        ctx.fillText(text, i * fontSize, yPos);

        if (yPos > canvas.height && Math.random() > 0.975) {
          rainDrops[i] = 0;
        }
        rainDrops[i]++;
      }
      animationId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("resize", resizeCanvas);
    };
  }, [matrixActive]);

  const handleCommandSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputVal.trim()) return;

    const cmd = inputVal.trim().toLowerCase();
    let response = "";

    // Intercept if matrix is active
    if (matrixActive) {
      if (cmd === "exit" || cmd === "clear") {
        setMatrixActive(false);
        setInputVal("");
        return;
      }
    }

    if (cmd === "help") {
      response = "Available commands: help, status, restart, clear, neofetch, fastfetch, whoami, matrix, stacks, sudo rm -rf /";
    } else if (cmd === "status") {
      response = "SYSTEM: STABLE // CONTAINERS: ACTIVE (3/3) // HEALTH: 100%";
    } else if (cmd === "restart") {
      setInputVal("");
      runSimulation();
      return;
    } else if (cmd === "clear") {
      setDisplayedLogs([]);
      setCustomOutputs([]);
      setInputVal("");
      setMatrixActive(false);
      return;
    } else if (cmd === "whoami") {
      response = "guest@jessvega.me // Role: Tech Explorer";
    } else if (cmd === "neofetch" || cmd === "fastfetch") {
      response = `  .---.      jessvega@homelab
 /     \\     OS: Fedora Server 41 (Server Edition)
 \\   🖳 /     Host: Ryzen 5 2600X Bare-Metal
  \`---\`      Kernel: 6.12.11-fc41.x86_64
             Shell: bash 5.2.32
             Containers: 14 (Docker Swarm)
             CPU: AMD Ryzen 5 2600X (12) @ 3.60GHz
             Memory: 15.61 GiB / 31.28 GiB (50%)`;
    } else if (cmd === "stacks" || cmd === "docker compose" || cmd === "docker-compose") {
      response = `🐳 DOCKER COMPOSE VAULT: 14 active stacks detected.
- Work: Outline Wiki, Planka Kanban, Central Services (NPM, Nextcloud, Gitea, BookStack, Homepage)
- HomeLab: Immich, MySQL, RustDesk, FileBrowser, Gitea, Uptime Kuma, OwnCloud, Dashy, HomeAssistant, NPM Gateway, AdGuard Home

[ACTION] Scroll down to the "DOCKER COMPOSE REPOSITORY" section below to inspect files interactively!`;
    } else if (cmd === "matrix") {
      setMatrixActive(true);
      response = "LINKING TO MATRIX GRID... INITIALIZING STREAM.";
    } else if (inputVal.trim() === "sudo rm -rf /") {
      setGlitchActive(true);
      setTimeout(() => {
        setGlitchActive(false);
        setCustomOutputs([]);
        setDisplayedLogs([
          "[SYSTEM ALERT] ROOT COMPROMISE DETECTED.",
          "[WARN] Automatic self-repair protocol initiated...",
          "[INFO] Restoring /bin, /etc, /var from bare-metal snapshot...",
          "[SUCCESS] OS recovery completed successfully.",
          "[OK] Console session restored. Type 'help' for list of commands."
        ]);
      }, 4000);
      setInputVal("");
      return;
    } else {
      response = `bash: command not found: ${cmd}. Type 'help' for suggestions.`;
    }

    setCustomOutputs((prev) => [...prev, `guest@homelab$ ${inputVal}`, response]);
    setInputVal("");
  };

  return (
    <div className="relative border-2 border-brutal-black bg-brutal-black text-brutal-green font-mono p-4 text-xs rounded-brutal shadow-inner h-[280px] flex flex-col justify-between overflow-hidden">
      {/* Glitch screen overlay */}
      {glitchActive && (
        <div className="absolute inset-0 bg-brutal-red/25 z-40 animate-pulse flex flex-col items-center justify-center text-center p-4">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-xs z-0 pointer-events-none" />
          <div className="relative z-10 space-y-3 text-brutal-red font-black tracking-widest text-sm animate-bounce">
            <p>⚠️ CRITICAL CORRUPTION ALERT ⚠️</p>
            <p className="text-brutal-white bg-brutal-red px-2 py-1 select-none text-xs">SUDO RM -RF / EXECUTED</p>
            <p className="text-[10px] text-yellow-400 font-mono animate-pulse">DELETING ROOT SECTOR DIRECTORY...</p>
          </div>
          {/* CRT scanline simulation */}
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-brutal-white/10 to-transparent bg-[length:100%_4px] pointer-events-none z-50 animate-[pulse-brutal_0.1s_infinite]" />
        </div>
      )}

      {/* Console Header */}
      <div className="flex justify-between items-center text-[10px] text-brutal-gray pb-2 border-b border-brutal-dark/50 select-none z-20">
        <div>TERMINAL SIMULATOR // PROJECT_SHELL</div>
        <div className="flex gap-1">
          <span className="w-2 h-2 rounded-full bg-brutal-red" />
          <span className="w-2 h-2 rounded-full bg-yellow-400" />
          <span className="w-2 h-2 rounded-full bg-brutal-green" />
        </div>
      </div>

      {/* Console Outputs & Matrix screen */}
      <div className="flex-1 relative overflow-hidden my-2 flex flex-col justify-between">
        {matrixActive ? (
          <div className="absolute inset-0 z-10 w-full h-[180px] overflow-hidden">
            <canvas ref={canvasRef} className="w-full h-full bg-black" />
            <button
              onClick={() => setMatrixActive(false)}
              className="absolute top-2 right-2 z-20 bg-brutal-red text-brutal-white border border-brutal-white font-mono text-[9px] px-2 py-0.5 hover:bg-brutal-white hover:text-brutal-red transition-all cursor-pointer font-bold"
            >
              EXIT_MATRIX
            </button>
          </div>
        ) : null}

        <div ref={scrollRef} className="flex-1 overflow-y-auto space-y-1.5 scrollbar-thin scrollbar-thumb-brutal-dark z-0">
          <div className="text-brutal-gray select-none">
            Click "RUN SIMULATION" to execute the project orchestrator or type commands below.
          </div>

          {/* Display logs */}
          {displayedLogs.map((log, idx) => {
            let color = "text-brutal-green";
            if (log.includes("[ERROR]") || log.includes("failed=") || log.includes("CRITICAL") || log.includes("ALERT")) color = "text-brutal-red";
            if (log.includes("[WARN]") || log.includes("changed=")) color = "text-yellow-400";
            if (log.includes("guest@homelab$")) color = "text-brutal-white font-bold";
            
            return (
              <div key={idx} className={`${color} whitespace-pre-wrap leading-relaxed`}>
                {log}
              </div>
            );
          })}

          {/* Custom manual inputs/outputs */}
          {customOutputs.map((out, idx) => {
            const isCmd = out.startsWith("guest@homelab$");
            return (
              <div key={idx} className={isCmd ? "text-brutal-white font-bold" : "text-brutal-light whitespace-pre-wrap"}>
                {out}
              </div>
            );
          })}

          {isRunning && (
            <div className="text-brutal-white flex items-center gap-2">
              <span className="animate-spin">🔄</span>
              <span>Executing orchestration script...</span>
            </div>
          )}
        </div>
      </div>

      {/* Console Input / Control bar */}
      <div className="pt-2 border-t border-brutal-dark/50 flex flex-col sm:flex-row gap-2 items-stretch sm:items-center z-20">
        {!isRunning && displayedLogs.length === 0 && (
          <button
            onClick={runSimulation}
            className="bg-brutal-green text-brutal-black px-3 py-1 font-bold rounded-brutal hover:bg-brutal-white transition-colors cursor-pointer text-center text-[10px]"
          >
            ▷ RUN SIMULATION ({command})
          </button>
        )}

        {displayedLogs.length > 0 && !isRunning && (
          <button
            onClick={runSimulation}
            className="bg-brutal-red text-brutal-white px-3 py-1 font-bold rounded-brutal hover:bg-brutal-white hover:text-brutal-black transition-colors cursor-pointer text-center text-[10px]"
          >
            ↻ RESTART SIMULATION
          </button>
        )}

        {isRunning && (
          <div className="text-[10px] text-brutal-gray flex items-center">
            [ SIMULATION RUNNING ]
          </div>
        )}

        <form onSubmit={handleCommandSubmit} className="flex-1 flex gap-2">
          <span className="text-brutal-white flex items-center select-none font-bold">$</span>
          <input
            type="text"
            value={inputVal}
            onChange={(e) => setInputVal(e.target.value)}
            placeholder={matrixActive ? "type 'exit' to quit matrix..." : "type 'help', 'neofetch', 'matrix'..."}
            disabled={glitchActive || isRunning}
            className="flex-1 bg-transparent border-0 outline-none text-brutal-white font-mono placeholder:text-brutal-dark/80 text-xs py-0.5"
          />
          <button type="submit" className="hidden" />
        </form>
      </div>
    </div>
  );
}
