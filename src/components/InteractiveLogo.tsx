import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles } from 'lucide-react';

interface InteractiveLogoProps {
  size?: 'hero' | 'nav' | 'footer';
  className?: string;
  onClick?: () => void;
}

export const InteractiveLogo: React.FC<InteractiveLogoProps> = ({
  size = 'hero',
  className = '',
  onClick,
}) => {
  const [clickCount, setClickCount] = useState(0);
  const [isSpinning, setIsSpinning] = useState(false);
  const [ripples, setRipples] = useState<{ id: number; x: number; y: number }[]>([]);
  const [particles, setParticles] = useState<{ id: number; angle: number; speed: number; color: string }[]>([]);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  // Play sci-fi audio chime synthesis on click
  const playClickChime = () => {
    try {
      const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (!AudioContextClass) return;
      const ctx = new AudioContextClass();
      
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      // Escalating frequencies based on click count
      const baseFreq = 523.25 + (clickCount % 5) * 110; // C5 pitch shifts up
      osc.type = 'sine';
      osc.frequency.setValueAtTime(baseFreq, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(baseFreq * 2, ctx.currentTime + 0.2);

      gain.gain.setValueAtTime(0.2, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.25);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start();
      osc.stop(ctx.currentTime + 0.25);
    } catch {
      // Graceful fallback if browser audio context requires user gesture
    }
  };

  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    setClickCount((prev) => prev + 1);
    setIsSpinning(true);
    playClickChime();

    // Create ripple effect at click coordinates
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const newRipple = { id: Date.now(), x, y };
    setRipples((prev) => [...prev.slice(-3), newRipple]);

    // Generate burst particles
    const newParticles = Array.from({ length: 8 }).map((_, i) => ({
      id: Date.now() + i,
      angle: (i * 360) / 8,
      speed: 30 + Math.random() * 25,
      color: i % 2 === 0 ? '#38bdf8' : '#06b6d4',
    }));
    setParticles(newParticles);

    // Reset spinning lock after animation
    setTimeout(() => {
      setIsSpinning(false);
    }, 700);

    // Clear particles
    setTimeout(() => {
      setParticles([]);
    }, 800);

    if (onClick) {
      onClick();
    }
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (size !== 'hero') return;
    const rect = e.currentTarget.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const rotateX = (e.clientY - centerY) / 6;
    const rotateY = (centerX - e.clientX) / 6;
    setMousePos({ x: rotateY, y: rotateX });
  };

  const handleMouseLeave = () => {
    setMousePos({ x: 0, y: 0 });
  };

  // Dimensions based on size preset - Pure logo emblem without dark box frame
  const sizeClasses = {
    hero: 'w-40 h-40 sm:w-48 sm:h-48 p-1',
    nav: 'w-10 h-10 p-0.5',
    footer: 'w-12 h-12 p-1',
  }[size];

  // Node relative coordinates (%) inside the 'D' emblem
  const nodes = [
    { id: 'center', x: 52, y: 50, size: 8, delay: 0 },
    { id: 'top', x: 52, y: 27, size: 6, delay: 0.3 },
    { id: 'bottom', x: 52, y: 73, size: 6, delay: 0.6 },
    { id: 'right', x: 63, y: 50, size: 6, delay: 0.4 },
    { id: 'left', x: 42, y: 50, size: 6, delay: 0.2 },
    { id: 'topRight', x: 59, y: 36, size: 5, delay: 0.5 },
    { id: 'bottomRight', x: 59, y: 64, size: 5, delay: 0.7 },
    { id: 'topLeft', x: 45, y: 37, size: 5, delay: 0.4 },
    { id: 'bottomLeft', x: 45, y: 63, size: 5, delay: 0.8 },
  ];

  // Connections radiating from center hub to peripheral nodes
  const connections = [
    { from: { x: 52, y: 50 }, to: { x: 52, y: 27 }, delay: 0 },
    { from: { x: 52, y: 50 }, to: { x: 52, y: 73 }, delay: 0.4 },
    { from: { x: 52, y: 50 }, to: { x: 63, y: 50 }, delay: 0.2 },
    { from: { x: 52, y: 50 }, to: { x: 42, y: 50 }, delay: 0.6 },
    { from: { x: 52, y: 50 }, to: { x: 59, y: 36 }, delay: 0.3 },
    { from: { x: 52, y: 50 }, to: { x: 59, y: 64 }, delay: 0.5 },
    { from: { x: 52, y: 50 }, to: { x: 45, y: 37 }, delay: 0.1 },
    { from: { x: 52, y: 50 }, to: { x: 45, y: 63 }, delay: 0.7 },
  ];

  return (
    <div className={`relative flex flex-col items-center justify-center select-none ${className}`}>
      
      {/* Click Counter / Supercharge Floating Indicator Badge (Hero mode) */}
      {size === 'hero' && clickCount > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 10, scale: 0.8 }}
          animate={{ opacity: 1, y: -8, scale: 1 }}
          exit={{ opacity: 0, y: -20 }}
          key={clickCount}
          className="absolute -top-10 z-30 bg-cyan-950/90 text-cyan-300 border border-cyan-400/60 text-[11px] font-mono font-bold px-3 py-1 rounded-full shadow-lg shadow-cyan-500/30 flex items-center gap-1.5 backdrop-blur-md pointer-events-none"
        >
          <Sparkles className="w-3.5 h-3.5 text-cyan-400 animate-spin" />
          <span>Core Supercharged x{clickCount}</span>
        </motion.div>
      )}

      {/* Main Interactive Floating Motion Container */}
      <motion.div
        className="relative group cursor-pointer"
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        onClick={handleClick}
        animate={
          size === 'hero'
            ? {
                y: [0, -8, 0, 8, 0],
                rotateX: mousePos.y,
                rotateY: mousePos.x,
              }
            : {
                y: [0, -3, 0, 3, 0],
              }
        }
        transition={{
          y: {
            duration: size === 'hero' ? 4.5 : 3.5,
            repeat: Infinity,
            ease: 'easeInOut',
          },
          rotateX: { duration: 0.2, ease: 'easeOut' },
          rotateY: { duration: 0.2, ease: 'easeOut' },
        }}
        style={{ perspective: 1000 }}
      >
        
        {/* Soft Ambient Radial Light Aura (White & Cyan Glow) */}
        <motion.div
          className={`absolute -inset-6 rounded-full bg-cyan-400/15 blur-3xl opacity-80 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none ${
            size === 'hero' ? 'block' : 'opacity-40'
          }`}
          animate={{
            scale: [0.9, 1.15, 0.9],
            opacity: [0.5, 0.85, 0.5],
          }}
          transition={{
            duration: 3.5,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />

        {/* Pure Logo Emblem Container */}
        <motion.div
          className={`relative flex items-center justify-center transition-all duration-300 ${sizeClasses}`}
          animate={
            isSpinning
              ? {
                  scale: [1, 1.15, 0.95, 1],
                }
              : {
                  scale: 1,
                }
          }
          transition={{
            duration: 0.6,
            ease: [0.34, 1.56, 0.64, 1],
          }}
        >
          {/* Core Image Emblem with Natural Organic Luminescence */}
          <motion.img
            src="https://res.cloudinary.com/pzkb4rca/image/upload/v1785072393/ChatGPT_Image_Jul_26_2026_06_55_53_PM_nnm7ln.png"
            alt="Digital Evolution Journal Logo"
            referrerPolicy="no-referrer"
            className="w-full h-full object-contain pointer-events-none relative z-10"
            style={{
              WebkitMaskImage: 'radial-gradient(circle at center, black 75%, transparent 100%)',
              maskImage: 'radial-gradient(circle at center, black 75%, transparent 100%)',
            }}
            animate={{
              filter: [
                'drop-shadow(0 0 14px rgba(255,255,255,0.6)) drop-shadow(0 0 28px rgba(6,182,212,0.35))',
                'drop-shadow(0 0 24px rgba(255,255,255,0.9)) drop-shadow(0 0 40px rgba(56,189,248,0.65))',
                'drop-shadow(0 0 14px rgba(255,255,255,0.6)) drop-shadow(0 0 28px rgba(6,182,212,0.35))',
              ],
            }}
            transition={{
              duration: 3.2,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />

          {/* Expand Click Ripples */}
          {ripples.map((ripple) => (
            <motion.span
              key={ripple.id}
              initial={{ scale: 0, opacity: 0.9 }}
              animate={{ scale: 3.5, opacity: 0 }}
              transition={{ duration: 0.6, ease: 'easeOut' }}
              className="absolute w-12 h-12 rounded-full border-2 border-cyan-300 bg-cyan-400/20 pointer-events-none"
              style={{
                left: ripple.x - 24,
                top: ripple.y - 24,
              }}
            />
          ))}
        </motion.div>

        {/* Bursting Particle Explosion on Click */}
        <AnimatePresence>
          {particles.map((p) => {
            const rad = (p.angle * Math.PI) / 180;
            const targetX = Math.cos(rad) * p.speed * (size === 'hero' ? 2 : 1.2);
            const targetY = Math.sin(rad) * p.speed * (size === 'hero' ? 2 : 1.2);

            return (
              <motion.div
                key={p.id}
                initial={{ x: 0, y: 0, scale: 1, opacity: 1 }}
                animate={{
                  x: targetX,
                  y: targetY,
                  scale: 0,
                  opacity: 0,
                }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.65, ease: 'easeOut' }}
                className="absolute left-1/2 top-1/2 w-2 h-2 rounded-full pointer-events-none shadow-[0_0_8px_currentColor]"
                style={{
                  backgroundColor: p.color,
                  color: p.color,
                }}
              />
            );
          })}
        </AnimatePresence>

      </motion.div>
    </div>
  );
};
