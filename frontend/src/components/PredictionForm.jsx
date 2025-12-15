import { useState } from "react";
import axios from "axios";
const API_URL = import.meta.env.VITE_API_URL;

const FEATURE_CONFIG = {
  absolute_magnitude: {
    label: "Absolute Magnitude",
    min: 3,
    max: 30,
    step: 0.01,
    info: "Intrinsic brightness of the asteroid. Higher values mean dimmer objects."
  },
  albedo: {
    label: "Albedo",
    min: 0,
    max: 1,
    step: 0.001,
    info: "Reflectivity of the asteroid surface. 0 = very dark, 1 = perfectly reflective."
  },
  eccentricity: {
    label: "Eccentricity",
    min: 0,
    max: 1,
    step: 0.001,
    info: "How elongated the orbit is. 0 = circular, values near 1 are very elongated."
  },
  perihelion_distance: {
    label: "Perihelion (AU)",
    min: 0,
    step: 0.01,
    info: "Closest distance from the asteroid to the Sun."
  },
  inclination: {
    label: "Inclination (°)",
    min: 0,
    max: 180,
    step: 0.1,
    info: "Tilt of the asteroid's orbit relative to the ecliptic plane."
  },
  aphelion_distance: {
    label: "Aphelion (AU)",
    min: 0,
    step: 0.01,
    info: "Farthest distance from the asteroid to the Sun."
  },
  mean_motion: {
    label: "Mean Motion",
    min: 0,
    step: 0.0001,
    info: "Average angular speed of the asteroid along its orbit."
  }
};

export default function PredictionForm() {
  const [form, setForm] = useState({
    is_neo: false,
    is_pha: false,
    absolute_magnitude: "15.13",
    albedo: "0.131",
    eccentricity: "0.146",
    perihelion_distance: "2.40",
    inclination: "10.2",
    aphelion_distance: "3.06",
    mean_motion: "0.2191",
    class_: "MBA",
  });

  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleToggle = (name) => {
    setForm((prev) => ({ ...prev, [name]: !prev[name] }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setResult(null);

    const payload = {
      ...form,
      is_neo: form.is_neo ? "Y" : "N",
      is_pha: form.is_pha ? "Y" : "N",
    };

    try {
      const res = await axios.post(`${API_URL}/predict`, payload);
      setResult(res.data.diameter_prediction ?? res.data);
    } catch (error) {
      console.error(error);
      setResult("Error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="
      w-full max-w-[420px]
      p-4 rounded-xl 
      bg-[rgba(5,10,20,0.85)] text-[#c8fff0]
      border border-[rgba(0,255,200,0.18)]
      shadow-[0_0_18px_rgba(0,255,180,0.08),inset_0_0_14px_rgba(0,255,180,0.03)]
      font-[Orbitron] 
      mx-auto
    "
    >
      <h2
        className="
          text-center text-[#00ffc8] text-sm mb-2 
          tracking-[1.6px] drop-shadow-[0_0_6px_rgba(0,255,200,0.12)]
        "
      >
        ASTEROID CONTROL PANEL
      </h2>

      <form
        onSubmit={handleSubmit}
        className="
          grid grid-cols-2 gap-x-3 gap-y-2
          max-[480px]:grid-cols-1
        "
      >
        <div className="flex justify-between items-center col-span-2 py-1">
          {/* NEO Toggle */}
          <div className="flex items-center gap-2">
            <span className="text-xs text-[#aef9de]">NEO</span>
            <label className="relative inline-block w-10 h-5">
              <input
                type="checkbox"
                checked={form.is_neo}
                onChange={() => handleToggle("is_neo")}
                className="opacity-0 w-0 h-0 peer"
              />
              <span
                className="
                absolute inset-0 rounded-full cursor-pointer
                bg-[rgba(0,255,150,0.12)] border border-[rgba(0,255,160,0.18)]
                transition
              "
              ></span>
              <span
                className="
                absolute h-4 w-4 top-[2px] left-[2px] rounded-full
                bg-[#002b27] shadow-[0_0_6px_rgba(0,255,160,0.06)]
                transition transform

                peer-checked:translate-x-5 peer-checked:bg-[#00ffd0]
              "
              ></span>
            </label>
          </div>

          {/* PHA Toggle */}
          <div className="flex items-center gap-2">
            <span className="text-xs text-[#aef9de]">PHA</span>
            <label className="relative inline-block w-10 h-5">
              <input
                type="checkbox"
                checked={form.is_pha}
                onChange={() => handleToggle("is_pha")}
                className="opacity-0 w-0 h-0 peer"
              />
              <span
                className="
                absolute inset-0 rounded-full cursor-pointer
                bg-[rgba(0,255,150,0.12)] border border-[rgba(0,255,160,0.18)]
                peer-checked:bg-[rgba(0,255,150,0.34)]
                peer-checked:border-[rgba(0,255,160,0.4)]
                transition
              "
              ></span>
              <span
                className="
                absolute h-4 w-4 top-[2px] left-[2px] rounded-full
                bg-[#002b27]
                transition transform
                peer-checked:translate-x-5 peer-checked:bg-[#00ffd0]
              "
              ></span>
            </label>
          </div>
        </div>

        {/* INPUT FIELDS */}
        {Object.entries(FEATURE_CONFIG).map(([name, cfg]) => (
        <label key={name} className="flex flex-col gap-1 relative">
          
          <span className="text-xs text-[#aef9de] tracking-wide flex items-center gap-1">
            {cfg.label}

            {/* Info icon */}
            <span className="group relative cursor-pointer text-[#6fffe0]">
              ⓘ
              <span
                className="
                  absolute left-1/2 -translate-x-1/2 mt-1
                  w-56 text-[11px] leading-snug
                  bg-[rgba(0,20,40,0.95)]
                  border border-[rgba(0,255,200,0.15)]
                  text-[#d7fff2]
                  px-2 py-1 rounded-md
                  opacity-0 group-hover:opacity-100
                  pointer-events-none
                  transition-opacity
                  z-10
                "
              >
                {cfg.info}
              </span>
            </span>
          </span>

          <input
            name={name}
            type="number"
            min={cfg.min}
            max={cfg.max}
            step={cfg.step}
            value={form[name]}
            onChange={handleChange}
            className="
              px-2 py-1 rounded-md text-sm
              bg-[rgba(0,20,40,0.65)]
              border border-[rgba(0,255,200,0.12)]
              focus:outline-none focus:border-[#00ff9f]
              focus:shadow-[0_0_8px_rgba(0,255,160,0.12)]
            "
          />
        </label>
      ))}

        {/* Class Select */}
        <label className="flex flex-col gap-1">
          <span className="text-xs text-[#aef9de] tracking-wide">Class</span>
          <select
            name="class_"
            value={form.class_}
            onChange={handleChange}
            className="
              px-2 py-1 rounded-md text-sm
              bg-[rgba(0,20,40,0.65)] border border-[rgba(0,255,200,0.12)]
              focus:outline-none focus:border-[#00ff9f]
              focus:shadow-[0_0_8px_rgba(0,255,160,0.12)]
            "
          >
            <option value="MBA">MBA</option>
            <option value="TJN">TJN</option>
            <option value="IMB">IMB</option>
            <option value="OMB">OMB</option>
            <option value="APO">APO</option>
          </select>
        </label>

        {/* ACTIONS */}
        <div className="flex gap-2 col-span-2 pt-2">
          <button
            type="submit"
            disabled={loading}
            className="
              px-3 py-2 rounded-lg text-sm font-bold
              bg-[rgba(0,255,160,0.12)]
              border border-[rgba(0,255,160,0.12)]
              shadow-[0_0_8px_rgba(0,255,160,0.04)]
              hover:-translate-y-1 hover:shadow-[0_0_12px_rgba(0,255,160,0.12)]
              transition
            "
          >
            {loading ? "SCANNING..." : "RUN SCAN"}
          </button>

          <button
            type="button"
            onClick={() => {
              setForm({
                is_neo: false,
                is_pha: false,
                absolute_magnitude: "",
                albedo: "",
                eccentricity: "",
                perihelion_distance: "",
                inclination: "",
                aphelion_distance: "",
                mean_motion: "",
                class_: "MBA",
              });
              setResult(null);
            }}
            className="
              px-3 py-2 rounded-lg text-sm font-bold
              bg-transparent text-[#bfffdc]
              border border-[rgba(255,255,255,0.05)]
              hover:-translate-y-1 hover:shadow-[0_0_12px_rgba(0,255,160,0.12)]
              transition
            "
          >
            RESET
          </button>
        </div>
      </form>

      {result && (
        <div
          className="
            mt-2 p-2 rounded-md text-sm
            bg-[rgba(0,255,160,0.04)]
            border border-[rgba(0,255,160,0.06)]
            text-[#c8fff0]
          "
        >
          <strong>Prediction:</strong>{" "} {result != null ? Math.max(0.01, Number(result)).toFixed(2) : "--"} km
        </div>
      )}
    </div>
  );
}
