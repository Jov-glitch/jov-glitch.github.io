"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface BrutalWindowProps {
  title: string;
  isOpen: boolean;
  onClose: () => void;
  className?: string;
  statusBarText?: string;
  menuItems?: string[];
  children: React.ReactNode;
}

export function BrutalWindow({
  title,
  isOpen,
  onClose,
  className,
  statusBarText = "STATUS: ACTIVE // USER: ADMIN",
  menuItems = ["File", "Edit", "Run", "Help"],
  children,
}: BrutalWindowProps) {
  const [isMaximized, setIsMaximized] = useState(false);
  const [activeMenu, setActiveMenu] = useState<string | null>(null);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      {/* Overlay click to close */}
      <div className="absolute inset-0" onClick={onClose} />

      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9, y: 20 }}
        transition={{ type: "spring", damping: 25, stiffness: 350 }}
        className={cn(
          "relative bg-brutal-white border-4 border-brutal-black shadow-brutal flex flex-col overflow-hidden w-full z-10 select-none",
          isMaximized ? "h-[95vh] max-w-[95vw]" : "max-h-[90vh] max-w-3xl",
          className
        )}
      >
        {/* Title Bar */}
        <div className="bg-brutal-black text-brutal-white px-3 py-2 flex items-center justify-between border-b-2 border-brutal-black">
          <div className="flex items-center gap-2 font-mono text-sm font-bold tracking-wider">
            <span className="animate-pulse-brutal text-brutal-red">⬤</span>
            <span className="truncate">{title.toUpperCase()}</span>
          </div>

          <div className="flex gap-1.5">
            {/* Minimize */}
            <button
              onClick={() => {
                alert("Task minimized to the background console.");
              }}
              className="w-6 h-6 flex items-center justify-center border border-brutal-white bg-brutal-dark hover:bg-brutal-red text-brutal-white font-mono text-xs font-bold transition-all cursor-pointer"
              title="Minimize"
            >
              _
            </button>
            {/* Maximize */}
            <button
              onClick={() => setIsMaximized(!isMaximized)}
              className="w-6 h-6 flex items-center justify-center border border-brutal-white bg-brutal-dark hover:bg-brutal-red text-brutal-white font-mono text-xs font-bold transition-all cursor-pointer"
              title={isMaximized ? "Restore" : "Maximize"}
            >
              {isMaximized ? "⧉" : "🗖"}
            </button>
            {/* Close */}
            <button
              onClick={onClose}
              className="w-6 h-6 flex items-center justify-center border border-brutal-white bg-brutal-red hover:bg-brutal-white hover:text-brutal-red text-brutal-white font-mono text-xs font-bold transition-all cursor-pointer"
              title="Close"
            >
              ✕
            </button>
          </div>
        </div>

        {/* Menu Bar */}
        <div className="border-b-2 border-brutal-black bg-brutal-light px-2 py-1 flex items-center gap-4 text-xs font-mono font-bold select-none relative">
          {menuItems.map((item) => (
            <div key={item} className="relative">
              <button
                onClick={() => setActiveMenu(activeMenu === item ? null : item)}
                className={cn(
                  "px-2 py-0.5 hover:bg-brutal-black hover:text-brutal-white transition-colors cursor-pointer",
                  activeMenu === item && "bg-brutal-black text-brutal-white"
                )}
              >
                {item}
              </button>
              {activeMenu === item && (
                <>
                  <div
                    className="fixed inset-0 z-10"
                    onClick={() => setActiveMenu(null)}
                  />
                  <div className="absolute left-0 mt-1 bg-brutal-white border-2 border-brutal-black shadow-brutal-sm p-1 min-w-[120px] z-20 flex flex-col">
                    <button
                      onClick={() => {
                        setActiveMenu(null);
                        alert(`Action triggered from ${item} menu!`);
                      }}
                      className="text-left px-2 py-1 hover:bg-brutal-red hover:text-brutal-white transition-colors cursor-pointer"
                    >
                      ▷ Execute Task
                    </button>
                    <button
                      onClick={() => {
                        setActiveMenu(null);
                        onClose();
                      }}
                      className="text-left px-2 py-1 hover:bg-brutal-red hover:text-brutal-white transition-colors cursor-pointer border-t border-brutal-black mt-1"
                    >
                      ✕ Terminate
                    </button>
                  </div>
                </>
              )}
            </div>
          ))}
          <div className="ml-auto text-[10px] text-brutal-gray uppercase tracking-wider hidden sm:block">
            VER: 2.0.4 // LOCALHOST
          </div>
        </div>

        {/* Window Content */}
        <div className="flex-1 overflow-y-auto p-6 bg-brutal-white font-sans text-brutal-black">
          {children}
        </div>

        {/* Status Bar */}
        <div className="bg-brutal-light border-t-2 border-brutal-black px-3 py-1 flex justify-between items-center text-[10px] font-mono font-bold text-brutal-dark">
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 bg-brutal-green border border-brutal-black rounded-full inline-block animate-pulse"></span>
            <span>{statusBarText.toUpperCase()}</span>
          </div>
          <div>SYSTEM_OK</div>
        </div>
      </motion.div>
    </div>
  );
}
