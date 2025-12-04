import { useState } from "react";
import axios from "axios";

export default function PredictionForm() {
  const [form, setForm] = useState({
    is_neo: false,
    is_pha: false,
    absolute_magnitude: "6.90",
    albedo: "0.2740",
    eccentricity: "0.1909",
    perihelion_distance: "2.0826",
    inclination: "5.3674",
    aphelion_distance: "3.0654",
    mean_motion: "0.2386",
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
      const res = await axios.post("http://127.0.0.1:8000/predict", payload);
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
                className="opacity-0 w-0 h-0"
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
        {[
          ["absolute_magnitude", "Absolute Magnitude"],
          ["albedo", "Albedo"],
          ["eccentricity", "Eccentricity"],
          ["perihelion_distance", "Perihelion (AU)"],
          ["inclination", "Inclination (°)"],
          ["aphelion_distance", "Aphelion (AU)"],
          ["mean_motion", "Mean Motion"],
        ].map(([name, label]) => (
          <label key={name} className="flex flex-col gap-1">
            <span className="text-xs text-[#aef9de] tracking-wide">
              {label}
            </span>
            <input
              name={name}
              type="number"
              step="any"
              value={form[name]}
              onChange={handleChange}
              className="
                px-2 py-1 rounded-md text-sm
                bg-[rgba(0,20,40,0.65)] border border-[rgba(0,255,200,0.12)]
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
            <option value="AMO">AMO</option>
            <option value="APO">APO</option>
            <option value="ATE">ATE</option>
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
          <strong>Prediction:</strong> {result} km
        </div>
      )}
    </div>
  );
}
