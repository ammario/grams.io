import { useMemo, useState } from "react";
import ContentEditable from "react-contenteditable";
import { tryParseUnit } from "../utils/parse";
import { string, unit } from "mathjs";

interface parsedIngestion {
  offset: number;
  drugName: string;
  halfLife: number;
  dosage: number;
}

const eliminatedAfter = (halfLife: number, threshold: number) => {
  return -halfLife * Math.log2(threshold);
};

export const SteadyState: React.FC<{ ingestions: parsedIngestion[] }> = ({
  ingestions,
}) => {
  const [repeatEvery, setRepeatEvery] = useState<number>(24);
  const [threshold, setThreshold] = useState<number>(95);

  const ingestion = ingestions.length == 1 ? ingestions[0] : null;

  const [doseNumber, sscMin, sscMax] = useMemo(() => {
    if (!ingestion || repeatEvery == null || repeatEvery <= 0) {
      return [Infinity, Infinity, Infinity];
    }

    let lastResiduals = 0;
    let residuals = 0;
    let hoursElapsed = 0;
    for (let doseNumber = 1; doseNumber < 1000; doseNumber++) {
      lastResiduals = residuals;
      residuals *= 2 ** (-repeatEvery / ingestion.halfLife);
      residuals += ingestion.dosage;
      hoursElapsed += repeatEvery;
      if (Math.abs(residuals - lastResiduals) / residuals < 0.01) {
        return [doseNumber, residuals - ingestion.dosage, residuals];
      }
    }
    return [Infinity, Infinity, Infinity];
  }, [ingestion, repeatEvery]);

  if (ingestions.length == 0) {
    return <></>;
  }
  if (ingestion == null) {
    return (
      <p>Enter only a single ingestion to see the steady-state calculator.</p>
    );
  }

  const formatMgs = (mgs: number) => {
    return unit(mgs, "mg").format({ precision: 4 });
  };

  return (
    <>
      <p className="mt-0">
        If repeated every{" "}
        <ContentEditable
          className="inline-input"
          html={repeatEvery?.toString() || ""}
          onChange={(e) => setRepeatEvery(e.currentTarget.textContent)}
        />
        {"h "}
        you will achieve steady-state in{" "}
        {`${doseNumber} doses or ${unit(doseNumber * repeatEvery, "hrs").format(
          {
            precision: 2,
          }
        )}`}
        , with plasma levels fluctuating from{" "}
        {`${formatMgs(sscMin)} to ${formatMgs(sscMax)} and an average
        concentration of ${formatMgs((sscMin + sscMax) / 2)}.`}
        <br /> <br />
        If you quit cold turkey, you will eliminate{" "}
        <ContentEditable
          className="inline-input"
          html={threshold.toString()}
          onChange={(e) => setThreshold(e.currentTarget.textContent)}
        />
        % of the drug in
        {` ${unit(
          eliminatedAfter(ingestion.halfLife, 1 - threshold / 100),
          "hrs"
        )
          .to("days")
          .format({
            precision: 2,
          })} `}
      </p>
    </>
  );
};
