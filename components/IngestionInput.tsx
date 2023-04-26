export interface Ingestion {
  offset: string;
  drugName: string;
  dosage: string;
  halfLife: string;
  id: string;
}

const IngestionInput: React.FC<Ingestion> = (ingestion: Ingestion) => {
  return (
    <div key={ingestion.id} className="ingest-container grid gap-4 py-1">
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
              : drugColor.hex(ingestion.drugName),
        }}
        placeholder="Caffeine"
        value={ingestion.drugName}
        onChange={(e) => {
          const knownHalfLife = knownDrugs[e.target.value];
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
          const copy = [...ingestions];
          copy.splice(index, 1);
          console.log(
            "trash",
            JSON.stringify(ingestions),
            JSON.stringify(copy)
          );
          setIngestions(copy);
        }}
      >
        <DeleteIcon />
      </button>
    </div>
  );
};

export default IngestionInput;
