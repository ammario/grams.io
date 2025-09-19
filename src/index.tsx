import "./styles.css";
import { h, Fragment, render } from "preact";
import { useState } from "preact/hooks";
import { Chart, type ChartData } from "./components/chart/chart.tsx";
import { Button } from "./components/button/button.tsx";
import { Input } from "./components/input/input.tsx";
import { Ingestion } from "./platform/ingestion.ts";

function App() {
  const [ingestions, setIngestions] = useState<Array<Ingestion>>([]);

  function addIngestion(ingestion: Ingestion) {
    setIngestions([...ingestions, ingestion]);
  }

  function updateIngestion(i: number, ingestion: Partial<Ingestion>) {
    ingestions[i].merge(ingestion);
    setIngestions([...ingestions]);
  }

  function removeIngestion(i: number) {
    ingestions.splice(i, 1);
    setIngestions([...ingestions]);
  }

  return (
    <Fragment>
      <nav className="content-max-width">
        <div className="logo">
          <img src="icon.svg" />
          <div>
            <h1>grams.io</h1>
            <h2>How long do drugs stay in your body?</h2>
          </div>
        </div>
      </nav>

      <section className="content-max-width">
        <p>
          Grams works by calculating the{" "}
          <a href="https://en.wikipedia.org/wiki/Elimination_(pharmacology)">
            half-life elimination
          </a>{" "}
          timeline of ingested drugs. Some drugs (notably alcohol and THC)
          cannot be accurately modeled this way. All drugs metabolize
          differently in different people. For example, caffeine's half-life is
          97 hours in infants but only 5 hours in adults. Research drugs before
          you consume them. This site is not medical advice.
        </p>
      </section>

      <section className="content-max-width">
        <Chart data={Ingestion.intoChartData(ingestions)} />
      </section>

      <section className="content-max-width">
        <div className="ingestion-table">
          <div>
            <div>Offset</div>
            <div>Drug name</div>
            <div>Dosage</div>
            <div>Half-life</div>
          </div>
          {ingestions.map((ingestion, i) => (
            <div>
              <Input
                value={ingestion.offset}
                placeholder="0days"
                onInput={(e: any) =>
                  updateIngestion(i, { offset: e.target.value })
                }
              />
              <Input
                value={ingestion.drugName}
                placeholder="Caffeine"
                onInput={(e: any) => updateIngestion(i, { drugName: e.target.value })}
              />
              <Input
                value={ingestion.dosage}
                placeholder="80mg"
                onInput={(e: any) => (updateIngestion(i, { dosage: e.target.value }))}
              />
              <Input
                value={ingestion.halfLife}
                placeholder="5h"
                onInput={(e: any) => (updateIngestion(i, { halfLife: e.target.value }))}
              />
              <Button onClick={() => removeIngestion(i)}>X</Button>
            </div>
          ))}
        </div>

        <div className="buttons">
          <Button onClick={() => addIngestion(Ingestion.empty())}>
            Add Ingestion
          </Button>
          <Button>Copy URL</Button>
        </div>
      </section>
    </Fragment>
  );
}

render(<App />, document.body);
