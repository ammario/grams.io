import { useState } from "react";

export const SteadyState: React.FC = () => {
  const [repeatEvery, setRepeatEvery] = useState<string | null>("24h");
  return (
    <>
      <div className="flex">
        <h2>Steady-state </h2>
      </div>
      <hr />
      <p className="mt-4">
        {" "}
        If repeated every{" "}
        <span
          id="repeat-every"
          contentEditable
          onChange={(e) => setRepeatEvery(e.currentTarget.textContent)}
        >
          {repeatEvery}
        </span>
      </p>
    </>
  );
};
