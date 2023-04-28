import ColorHash from "color-hash";

import DeleteIcon from "@mui/icons-material/Delete";

export interface Ingestion {
  offset: string;
  drugName: string;
  dosage: string;
  halfLife: string;
  id: string;
}

export const DrugColor = new ColorHash({ lightness: 0.5 });

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
export const KnownDrugs: Record<string, string> = {
  "Acetaminophen (Tylenol)": "2.5h",
  "Alprazolam (Xanax)": "12h",
  "Amphetamine (Adderall)": "10h",
  "Aripiprazole (Abilify)": "75h",
  Aspirin: "15m",
  "Atorvastatin (Lipitor)": "14h",
  "Buprenorphine (Subutex)": "37h",
  Caffeine: "5h",
  "Cannabidiol (CBD)": "18h",
  "Cannabis (THC)": "1.3h",
  "Cetirizine (Zyrtec)": "8.3h",
  "Citalopram (Celexa)": "35h",
  "Clonazepam (Klonopin)": "34h",
  Codeine: "3h",
  Cocaine: "1h",
  "Dextromethorphan (Robitussin DM)": "2.9h",
  "Diazepam (Valium)": "100h",
  "Diclofenac (Voltaren)": "2h",
  "Doxycycline (Vibramycin)": "18h",
  "Escitalopram (Lexapro)": "27h",
  "Esomeprazole (Nexium)": "1.5h",
  "Fentanyl (Duragesic)": "7h",
  "Fluoxetine (Prozac)": "96h",
  "Gabapentin (Neurontin)": "6h",
  Heroin: "30m",
  "Hydrochlorothiazide (HCTZ)": "6h",
  "Hydrocodone (Vicodin)": "3.8h",
  "Ibuprofen (Advil)": "2h",
  Ketamine: "2.5h",
  "Lansoprazole (Prevacid)": "1.5h",
  "Levothyroxine (Synthroid)": "7d",
  "Lisdexamfetamine (Vyvanse)": "12h",
  "Loratadine (Claritin)": "8h",
  "Lorazepam (Ativan)": "12h",
  LSD: "5.1h",
  Methadone: "24h",
  "Methamphetamine (Desoxyn)": "10h",
  "Methylphenidate (Ritalin)": "3.5h",
  "Metoprolol (Lopressor)": "3.5h",
  "Modafinil (Provigil)": "15h",
  Morphine: "3h",
  "Naproxen (Aleve)": "12h",
  Nicotine: "2h",
  "Omeprazole (Prilosec)": "1h",
  "Oxycodone (OxyContin)": "4.5h",
  "Paroxetine (Paxil)": "21h",
  "Phenylephrine (Sudafed PE)": "2.5h",
  "Pregabalin (Lyrica)": "6.3h",
  "Sertraline (Zoloft)": "26h",
  "Sildenafil (Viagra)": "4h",
  "Simvastatin (Zocor)": "3h",
  "Tadalafil (Cialis)": "17h",
  "Tamsulosin (Flomax)": "14h",
  "Telmisartan (Micardis)": "24h",
  "Temazepam (Restoril)": "11h",
  "Trazodone (Desyrel)": "7h",
  "Tramadol (Ultram)": "6.3h",
  "Triazolam (Halcion)": "2h",
  "Venlafaxine (Effexor)": "5h",
  "Warfarin (Coumadin)": "40h",
  "Zaleplon (Sonata)": "1h",
  "Zolpidem (Ambien)": "2.5h",
  "Zopiclone (Imovane)": "5h",
};

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
