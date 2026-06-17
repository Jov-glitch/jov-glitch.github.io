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
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [displayedLogs, isRunning, customOutputs]);

  const runSimulation = () => {
    setIsRunning(true);
    setDisplayedLogs([]);
    setCurrentLine(0);
    setCustomOutputs([]);
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

  const handleCommandSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputVal.trim()) return;

    const cmd = inputVal.trim().toLowerCase();
    let response = "";

    if (cmd === "help") {
      response = "Available commands: help, status, restart, clear, neofetch, whoami";
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
      return;
    } else if (cmd === "whoami") {
      response = "guest@jessvega.me // Role: Tech Explorer";
    } else if (cmd === "neofetch") {
      response = `  .---.      jessvega@homelab
 /     \\     OS: Fedora Server 41 (Server Edition)
 \\   🖳 /     Host: Ryzen 5 2600X Bare-Metal
  \`---\`      Kernel: 6.12.11-fc41.x86_64
             Shell: bash 5.2.32
             Containers: 14 (Docker Swarm)
             CPU: AMD Ryzen 5 2600X (12) @ 3.60GHz
             Memory: 15.61 GiB / 31.28 GiB (50%)`;
    } else {
      response = `bash: command not found: ${cmd}. Type 'help' for suggestions.`;
    }

    setCustomOutputs((prev) => [...prev, `guest@homelab$ ${inputVal}`, response]);
    setInputVal("");
  };

  return (
    <div className="border-2 border-brutal-black bg-brutal-black text-brutal-green font-mono p-4 text-xs rounded-brutal shadow-inner h-[280px] flex flex-col justify-between overflow-hidden">
      {/* Console Header */}
      <div className="flex justify-between items-center text-[10px] text-brutal-gray pb-2 border-b border-brutal-dark/50 select-none">
        <div>TERMINAL SIMULATOR // PROJECT_SHELL</div>
        <div className="flex gap-1">
          <span className="w-2 h-2 rounded-full bg-brutal-red" />
          <span className="w-2 h-2 rounded-full bg-yellow-400" />
          <span className="w-2 h-2 rounded-full bg-brutal-green" />
        </div>
      </div>

      {/* Console Outputs */}
      <div ref={scrollRef} className="flex-1 overflow-y-auto py-2 space-y-1.5 scrollbar-thin scrollbar-thumb-brutal-dark">
        <div className="text-brutal-gray select-none">
          Click "RUN SIMULATION" to execute the project orchestrator or type commands below.
        </div>

        {/* Display logs */}
        {displayedLogs.map((log, idx) => {
          let color = "text-brutal-green";
          if (log.includes("[ERROR]") || log.includes("failed=")) color = "text-brutal-red";
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

      {/* Console Input / Control bar */}
      <div className="pt-2 border-t border-brutal-dark/50 flex flex-col sm:flex-row gap-2 items-stretch sm:items-center">
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
            placeholder="type 'help', 'neofetch', 'status'..."
            disabled={isRunning}
            className="flex-1 bg-transparent border-0 outline-none text-brutal-white font-mono placeholder:text-brutal-dark/80 text-xs py-0.5"
          />
          <button type="submit" className="hidden" />
        </form>
      </div>
    </div>
  );
}
