import confetti from 'canvas-confetti';

export function fireConfetti() {
  confetti({
    particleCount: 60,
    spread: 70,
    origin: { y: 0.6 },
    colors: ['#38bdf8', '#fbbf24', '#34d399', '#a78bfa', '#f43f5e'],
  });
}

export function fireGrandConfetti() {
  const duration = 2.5 * 1000;
  const animationEnd = Date.now() + duration;

  const frame = () => {
    confetti({
      particleCount: 4,
      angle: 60,
      spread: 55,
      origin: { x: 0 },
      colors: ['#38bdf8', '#fbbf24', '#34d399', '#a78bfa'],
    });
    confetti({
      particleCount: 4,
      angle: 120,
      spread: 55,
      origin: { x: 1 },
      colors: ['#38bdf8', '#fbbf24', '#34d399', '#a78bfa'],
    });

    if (Date.now() < animationEnd) {
      requestAnimationFrame(frame);
    }
  };
  frame();
}
