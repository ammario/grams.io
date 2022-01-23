import type {NextPage} from 'next'
import {useEffect, useMemo, useState} from "react";
import {useRouter} from "next/router";
import DeleteIcon from '@mui/icons-material/Delete';
import '../node_modules/react-vis/dist/style.css';
import {AreaSeries, FlexibleWidthXYPlot, HorizontalGridLines, VerticalGridLines, XAxis, XYPlot, YAxis} from 'react-vis';
import {unit} from 'mathjs';
import ColorHash from 'color-hash';


interface ingestion {
    offset: string
    drugName: string
    halfLife: string
    dosage: string
}

const emptyIngestion: ingestion = {
    offset: "0min",
    drugName: "",
    halfLife: "",
    dosage: "",
}

interface parsedIngestion {
    offset: number
    drugName: string
    halfLife: number
    dosage: number
}

interface point {
    x: number
    y: number
}

// plotIngestion returns 1000 points representing the metabolism of the ingestion.
const plotIngestion = (i: parsedIngestion): point[] => {
    // The amount of hours by which less than 1/33 of the original dose is present.
    const endTime = i.halfLife * Math.log2(33)
    let points: point[] = [];
    for (let x = 0; x <= endTime; x += (endTime / 50)) {
        points.push({
            x: x,
            y: i.dosage / Math.pow(2, (x / i.halfLife)),
        })
    }
    return points
}

const drugColor = new ColorHash()

const Home: NextPage = () => {
    const router = useRouter()
    // TODO: store the state in the URL
    const [ingestions, setIngestions] = useState<ingestion[]>(() => {
        console.log(router.query.toString())
        if (typeof window === "undefined") {
            // I have no idea how to grab URL params within a useState with NextJS.
            return [emptyIngestion]
        }

        const params = new URLSearchParams(window.location.search);
        if (!params.has("ingestions")) {
            return [emptyIngestion]
        }
        try {
            const ingestions = JSON.parse(params.get("ingestions"))
            console.log(ingestions)
            return ingestions
        } catch (e) {
            console.log("oops at the url", e)
            return [emptyIngestion]
        }
    })

    useEffect(() => {
        router.query.ingestions = JSON.stringify(ingestions)
        router.replace(router)
    }, [ingestions])


    // const graphData: Omit<FunctionPlotOptions, "target"> = useMemo(() => {
    //         let maxDosage = 0;
    //         let maxTime = 0;
    //         const data = ingestions.map((ingestion): FunctionPlotDatum | undefined => {
    //             try {
    //                 const dosage = unit(ingestion.dosage).toNumeric('mg') as number
    //                 if (dosage > maxDosage) {
    //                     maxDosage = dosage
    //                 }
    //                 const halfLife = unit(ingestion.halfLife).toNumber('hours') as number
    //                 const offset = unit(ingestion.offset).toNumber('hours') as number
    //                 const fn = dosage.toString() + "/(2^(x/" + halfLife.toString() + "))"
    //                 for (let t = 1; t *= 1.3;) {
    //                     const residuals = compile(fn).eval({x: t})
    //                     if (residuals < 0.03 * dosage) {
    //                         if (t > maxTime) {
    //                             maxTime = t
    //                         }
    //                         break
    //                     }
    //                 }
    //                 console.log("offset", offset)
    //                 return {
    //                     fnType: "linear",
    //                     fn: fn,
    //                     offset: [2000, 20],
    //                     graphType: "polyline",
    //                     closed: false,
    //                 }
    //             } catch (e) {
    //                 console.log(e)
    //                 return undefined
    //             }
    //
    //         }).filter(e => e) as FunctionPlotDatum[]
    //
    //         return {
    //             grid: true,
    //             disableZoom: true,
    //             yAxis: {domain: [0, maxDosage * 1.1], label: "Sum of residuals (mg)"},
    //             xAxis: {domain: [0, maxTime], label: "Time (hours)"},
    //             data: data,
    //         }
    //     }, [ingestions]
    // )

    const graphData = useMemo((): JSX.Element => {
        const parsedIngestions = ingestions.map((ingestion): parsedIngestion | undefined => {
            try {
                const dosage = unit(ingestion.dosage).toNumeric('mg') as number
                const halfLife = unit(ingestion.halfLife).toNumber('hours') as number
                const offset = unit(ingestion.offset).toNumber('hours') as number
                return {
                    drugName: ingestion.drugName,
                    dosage: dosage,
                    halfLife: halfLife,
                    offset: offset,
                }
            } catch (e) {
                console.log("parse exception", e)
                return undefined
            }
        }).filter(v => v) as parsedIngestion[]
        const lines = parsedIngestions.map((i): point[] => {
            return plotIngestion(i)
        })
        console.log("lines", lines)
        return (
            <div className="App">
                <FlexibleWidthXYPlot height={300}>
                    <VerticalGridLines/>
                    <HorizontalGridLines/>
                    <XAxis/>
                    <YAxis/>
                    {
                        lines.map((lines, i) => {
                            return <AreaSeries color={(new ColorHash).hex((parsedIngestions[i].drugName))} data={lines} opacity={0.5}/>
                        })
                    }
                </FlexibleWidthXYPlot>
            </div>
        );
    }, [ingestions])

    return (
        <div className="h-screen w-screen flex flex-col md:container md:mx-auto py-2 md:py-10">
            <title>grams.io drug half-life calculator</title>
            <h1>grams.io</h1>
            <hr/>
            <div id="ingestions" className="container py-4 px-0">
                <h2>Ingestions</h2>
                <div className={"ingest-container grid gap-4"}>
                    <span>Offset</span>
                    <span>Drug name</span>
                    <span>Dosage</span>
                    <span>Half-life</span>
                    <span> </span>
                </div>
                <hr className={"py-1"}/>
                <form>
                    {
                        ingestions.map((ingestion, index) => {
                            function edit(editedIngestion: Partial<ingestion>) {
                                const newIngestions = [...ingestions]
                                const newIngestion = {
                                    ...ingestion,
                                    ...editedIngestion,
                                }
                                newIngestions[index] = newIngestion
                                setIngestions(newIngestions)
                            }

                            return <div key={index} className="ingest-container grid gap-4 py-1">
                                <input type="text" id="offset"
                                       placeholder="0m"
                                       value={ingestion.offset} onChange={(e) => {
                                    edit({
                                        offset: e.target.value,
                                    })
                                }} required/>
                                <input type="text" id="drug-name" list="known-drugs"
                                       placeholder="Caffeine" value={ingestion.drugName} onChange={(e) => {
                                    const knownHalfLife = knownDrugs[e.target.value]
                                    edit({
                                        halfLife: knownHalfLife ? knownHalfLife : ingestion.halfLife,
                                        drugName: e.target.value,
                                    })
                                }} required/>

                                <input type="text" value={ingestion.dosage} placeholder="0mg" id="dosage"
                                       placeholder="50mg" onChange={e => edit({dosage: e.target.value})} required/>
                                <input type="text" id="half-life"
                                       placeholder="4.5h" value={ingestion.halfLife}
                                       onChange={(e => edit({halfLife: e.target.value}))} required/>
                                <button className="trash" onClick={() => {
                                    const copy = [...ingestions]
                                    copy.splice(index, 1)
                                    setIngestions(copy)
                                }}><DeleteIcon/></button>
                            </div>
                        })
                    }
                </form>
                <datalist id="known-drugs">
                    {
                        Object.keys(knownDrugs).map(key => <option value={key}>{knownDrugs[key]}</option>)
                    }
                </datalist>
                <div className={"py-4"}>
                    <button
                        className="" onClick={() => setIngestions([...ingestions, emptyIngestion])}>
                        Add ingestion
                    </button>
                </div>
            </div>
            <div id="results" className="container py-4 px-0">
                <h2>Results</h2>
                {graphData}
            </div>
        </div>
    )
}

const knownDrugs: Record<string, string> = {
    "Amphetamine (Adderall)": "10h",
    "Caffeine": "5h",
    "LSD": "5.1h",
}

export default Home
