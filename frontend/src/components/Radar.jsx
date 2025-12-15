export default function Radar() {
  return (
    <div className="flex flex-col items-center my-6">
      {/* Radar Container */}
      <div
        className="
        relative w-full md:w-[390px] aspect-square rounded-full overflow-hidden
        bg-[rgba(5,10,20,0.85)] border border-[#00ffc8]
        shadow-[0_0_20px_rgba(0,255,200,0.3),inset_0_0_25px_rgba(0,255,180,0.2)]
      "
      >
        {/* Grid layer */}
        <div
          className="
          absolute inset-0 
          bg-[radial-gradient(circle,rgba(0,255,200,0.09)_1px,transparent_1px),
              linear-gradient(to_right,rgba(0,255,200,0.07)_1px,transparent_1px),
              linear-gradient(to_bottom,rgba(0,255,200,0.07)_1px,transparent_1px)]
          bg-[size:30px_30px]
          [mask:radial-gradient(circle,white_60%,transparent_100%)]
        "
        ></div>

        {/* Glow circle */}
        <div
          className="
          absolute inset-0 rounded-full 
          border-2 border-[rgba(0,255,200,0.35)]
          shadow-[0_0_25px_rgba(0,255,200,0.25)]
        "
        ></div>

        {/* Rotating sweep */}
        <div
          className="
          absolute inset-0 rounded-full blur-[2px]
          bg-[conic-gradient(rgba(0,255,200,0.4),rgba(0,255,200,0.05)_45deg,transparent_90deg)]
          animate-radarRotate
        "
        ></div>

        {/* Blips */}
        <div
          className="
          absolute top-[25%] left-[60%] w-2 h-2 rounded-full bg-[#00ffc8]
          shadow-[0_0_10px_#00ffc8] animate-blipPulse
        "
        ></div>

        <div
          className="
          absolute top-[65%] left-[30%] w-2 h-2 rounded-full bg-[#00ffc8]
          shadow-[0_0_10px_#00ffc8] animate-blipPulse
        "
        ></div>

        <div
          className="
          absolute top-[45%] left-[45%] w-2 h-2 rounded-full bg-[#00ffc8]
          shadow-[0_0_10px_#00ffc8] animate-blipPulse
        "
        ></div>
      </div>
    </div>
  );
}
