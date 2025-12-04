export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      backgroundImage: {
        stars: `
          radial-gradient(2px 2px at 20% 30%, rgba(255,255,255,0.8), transparent 40%),
          radial-gradient(2px 2px at 80% 70%, rgba(255,255,255,0.8), transparent 40%),
          radial-gradient(1.5px 1.5px at 50% 50%, rgba(255,255,255,0.6), transparent 40%),
          radial-gradient(1px 1px at 10% 80%, rgba(255,255,255,0.5), transparent 40%),
          radial-gradient(1px 1px at 90% 20%, rgba(255,255,255,0.5), transparent 40%)
        `,
        nebula:
          "radial-gradient(circle at 50% 50%, rgba(0,100,255,0.25), transparent 70%)",
        grid: `
          linear-gradient(rgba(0,255,200,0.1) 1px, transparent 1px),
          linear-gradient(to right, rgba(0,255,200,0.1) 1px, transparent 1px)
        `,
      },
      backgroundSize: {
        grid: "80px 80px",
      },
      keyframes: {
        starsFloat: {
          "0%": { backgroundPosition: "0px 0px" },
          "100%": { backgroundPosition: "200px 500px" },
        },
        radarRotate: {
          "0%": { transform: "rotate(0deg)" },
          "100%": { transform: "rotate(360deg)" },
        },
        blipPulse: {
          "0%": { opacity: "0", transform: "scale(0.3)" },
          "50%": { opacity: "1", transform: "scale(1)" },
          "100%": { opacity: "0", transform: "scale(0.3)" },
        },
      },
      animation: {
        radarRotate: "radarRotate 3.8s linear infinite",
        blipPulse: "blipPulse 2s infinite",
        starsFloat: "starsFloat 12s linear infinite",
      },
    },
  },
  plugins: [],
};
