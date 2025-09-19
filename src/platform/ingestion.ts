export class Ingestion {
  offset?: string;
  drugName?: string;
  dosage?: string;
  halfLife?: string;

  static empty(): Ingestion {
    const ingestion = new Ingestion()
    ingestion.offset = undefined
    ingestion.drugName = undefined
    ingestion.dosage = undefined
    ingestion.halfLife = undefined
    return ingestion
  }

  merge(ingestion: Partial<Ingestion>): Ingestion {
    Object.assign(this,ingestion)
    return this
  }
}
