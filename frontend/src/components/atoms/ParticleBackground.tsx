import { useEffect, useRef } from "react";

interface ParticleBackgroundProps {
  className?: string;
}

export const ParticleBackground = ({
  className = "",
}: ParticleBackgroundProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;

    // Pobieramy realne wymiary rodzica
    let width = (canvas.width =
      canvas.offsetWidth || canvas.parentElement?.clientWidth || 300);
    let height = (canvas.height =
      canvas.offsetHeight || canvas.parentElement?.clientHeight || 150);

    const mouse = {
      x: null as number | null,
      y: null as number | null,
      radius: 120,
    };

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = canvas.offsetWidth;
      height = canvas.height = canvas.offsetHeight;
    };

    window.addEventListener("resize", handleResize);

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
    };

    const handleMouseLeave = () => {
      mouse.x = null;
      mouse.y = null;
    };

    window.addEventListener("mousemove", handleMouseMove);
    canvas.addEventListener("mouseleave", handleMouseLeave);

    class Particle {
      x: number = Math.random() * width;
      y: number = Math.random() * height;
      vx: number = (Math.random() - 0.5) * 0.5;
      vy: number = (Math.random() - 0.5) * 0.5;
      radius: number = 2;

      update(w: number, h: number) {
        this.x += this.vx;
        this.y += this.vy;

        if (this.x < 0 || this.x > w) this.vx *= -1;
        if (this.y < 0 || this.y > h) this.vy *= -1;
      }

      draw(context: CanvasRenderingContext2D) {
        context.beginPath();
        context.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        //context.fillStyle = "#6366f1";
        context.fillStyle = "#e826eb";
        context.fill();
      }
    }

    const particles = Array.from({ length: 40 }, () => new Particle());

    const animate = () => {
      ctx.clearRect(0, 0, width, height);

      particles.forEach((p, index) => {
        p.update(width, height);
        p.draw(ctx);

        for (let j = index + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dist = Math.hypot(p.x - p2.x, p.y - p2.y);

          if (dist < 100) {
            ctx.beginPath();
            ctx.strokeStyle = `rgba(199, 210, 254, ${0.4 * (1 - dist / 100)})`;
            ctx.lineWidth = 0.5;
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.stroke();
          }
        }

        if (mouse.x !== null && mouse.y !== null) {
          const dist = Math.hypot(p.x - mouse.x, p.y - mouse.y);

          if (dist < mouse.radius) {
            ctx.beginPath();
            ctx.strokeStyle = `rgba(199, 210, 254, ${1 - dist / mouse.radius})`;
            ctx.lineWidth = 0.8;
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(mouse.x, mouse.y);
            ctx.stroke();
          }
        }
      });

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
      canvas.removeEventListener("mouseleave", handleMouseLeave);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className={`absolute inset-0 w-full h-full pointer-events-none block ${className}`}
    />
  );
};
