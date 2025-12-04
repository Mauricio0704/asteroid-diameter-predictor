import RadarLayout from "./components/RadarLayout";
import SpaceBackground from "./components/SpaceBackground";

export default function App() {
  return (
    <div className="relative min-h-screen w-full overflow-hidden">
      <SpaceBackground />

      <div className="relative z-10">
        <h1
          className="
      text-center 
      text-cyan-300 
      text-3xl 
      md:text-4xl 
      font-extrabold 
      tracking-widest 
      drop-shadow-[0_0_12px_rgba(0,255,200,0.45)]
      mt-6 mb-6 md:mb-20
      font-orbitron
    "
        >
          ASTEROID DIAMETER PREDICTION SYSTEM
        </h1>
        <RadarLayout />
      </div>
    </div>
  );
}
