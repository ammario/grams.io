import ColorHash from "color-hash";
import DeleteIcon from "@mui/icons-material/Delete";
// @ts-expect-error
import drugs from "../drugs.yaml";

type DrugsManifest = Record<
  string,
  {
    names: string[];
    half_life: string;
  }
>;

export interface Ingestion {
  offset: string;
  drugName: string;
  dosage: string;
  halfLife: string;
  id: string;
}

export const DrugColor = new ColorHash({ lightness: 0.6, saturation: 0.7 });

// export const KnownDrugs: Record<string, string> = {
//   Amphetamine: "10h",
//   Caffeine: "5h",
//   LSD: "5.1h",
//   Alprazolam: "12h",
//   Atorvastatin: "7h",
//   Hydrocodone: "3.8h",
//   Metaprolol: "3.5h",
//   Gabapentin: "6h",
//   Sertraline: "26h",
// };

// KnownDrugs was generated using GPT-4 and may contain errors.
export const KnownDrugs: Record<string, string> = {};
for (const [_, { names, half_life }] of Object.entries(
  drugs as DrugsManifest
)) {
  let name = names.shift();
  if (!name) continue;
  if (names.length) {
    name += ` (${names.join(", ")})`;
  }
  KnownDrugs[name] = half_life;
}

const IngestionInput: React.FC<{
  ingestion: Ingestion;
  edit: (ing: Partial<Ingestion> | undefined) => void;
}> = ({ ingestion, edit }) => {
  return (
    <div className="ingest-container grid gap-4 py-1">
      <input
        type="text"
        id="offset"
        placeholder="0m"
        value={ingestion.offset}
        onChange={(e) => {
          edit({
            offset: e.target.value,
          });
        }}
        required
      />
      <input
        type="text"
        className={"drug-name"}
        list="known-drugs"
        style={{
          borderColor:
            ingestion.drugName === ""
              ? "rgba(0, 0, 0, 0.07)"
              : DrugColor.hex(ingestion.drugName),
        }}
        placeholder="Caffeine"
        value={ingestion.drugName}
        onChange={(e) => {
          const knownHalfLife = KnownDrugs[e.target.value];
          edit({
            halfLife: knownHalfLife ? knownHalfLife : ingestion.halfLife,
            drugName: e.target.value,
          });
        }}
        required
      />

      <input
        type="text"
        value={ingestion.dosage}
        placeholder="0mg"
        id="dosage"
        onChange={(e) => edit({ dosage: e.target.value })}
        required
      />
      <input
        type="text"
        id="half-life"
        placeholder="4.5h"
        value={ingestion.halfLife}
        onChange={(e) => edit({ halfLife: e.target.value })}
        required
      />
      <button
        className="trash"
        tabIndex={-1}
        onClick={() => {
          edit(undefined);
        }}
      >
        <DeleteIcon />
      </button>
      <datalist id="known-drugs">
        {Object.keys(KnownDrugs).map((key) => (
          <option key={key} value={key}>
            {KnownDrugs[key]}
          </option>
        ))}
      </datalist>
    </div>
  );
};

export default IngestionInput;
