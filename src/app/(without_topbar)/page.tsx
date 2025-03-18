"use client";
import React from "react";

const colors = ["#FFFFFF", "#F0F8FF", "#E6E6FA", "#D8BFD8", "#ADD8E6", "#B0E0E6"];

export default function HomePage() {
  return (
    <div className="relative h-screen w-full overflow-hidden">
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-700 via-purple-500 to-pink-500 opacity-80 z-0 animate-pulse duration-10000" />

      {/* Particle Effect */}
      {[...Array(20)].map((_, i) => {
        const size = Math.random() * 20 + 5;
        const color = colors[Math.floor(Math.random() * colors.length)];
        const speedFloat = Math.random() * 6 + 6;
        const speedDrift = Math.random() * 4 + 4;
        const delay = Math.random() * -10;

        return (
          <div
            key={i}
            className="absolute rounded-full opacity-40"
            style={{
              width: `${size}px`,
              height: `${size}px`,
              backgroundColor: color,
              left: `${Math.random() * 100}vw`,
              top: `${Math.random() * 100}vh`,
              animation: `float ${speedFloat}s infinite linear, drift ${speedDrift}s infinite alternate`,
              animationDelay: `${delay}s`,
            }}
          />
        );
      })}

      {/* Define Keyframes for Animations */}
      <style jsx global>{`
        @keyframes float {
          0% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-15px);
          }
          100% {
            transform: translateY(0);
          }
        }

        @keyframes drift {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(calc(${Math.random() * 40 + 20}vw - 50%));
          }
        }
      `}</style>
    </div>
  );
}
