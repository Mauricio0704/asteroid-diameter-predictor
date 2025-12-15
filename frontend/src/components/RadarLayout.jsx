import Radar from "./Radar";
import PredictionForm from "./PredictionForm";

export default function RadarLayout() {
  return (
    <div className="w-full flex items-center justify-center px-4">
      <div className="w-full max-w-4xl grid grid-cols-1 md:grid-cols-2 gap-6 items-center mb-4">
        <div className="flex items-center justify-center">
          <div className="w-full">
            <Radar />
          </div>
        </div>

        <div className="flex items-center justify-center">
          <div className="w-full">
            <PredictionForm />
          </div>
        </div>
      </div>
    </div>
  );
}
