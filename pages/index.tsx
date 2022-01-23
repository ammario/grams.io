import type {NextPage} from 'next'
import {useEffect, useMemo, useState} from "react";
import {useRouter} from "next/router";
import DeleteIcon from '@mui/icons-material/Delete';
// @ts-ignore
import compile from "built-in-math-eval";
// @ts-ignore
import JSXGraph from "../components/JSXGraph";
import jsxgraph from "jsxgraph";


interface ingestion {
    offset: string
    drugName: string
    halfLife: string
    dosage: string
}

const emptyIngestion: ingestion = {
    offset: "0m",
    drugName: "",
    halfLife: "",
    dosage: "",
}

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
        return <JSXGraph attributes={{
            boundingBox: [-5, 500, 50, -50],
            axis: true,
            showCopyright: false,
            showNavigation: false,
            defaultAxes: {
                x: {
                    name: 'Hours',
                    withLabel: true,
                    label: {
                        position: "md",
                        offset: [-20, -25],
                    },
                },
                y: {
                    name: 'Sum of residuals',
                    withLabel: true,
                    label: {
                        position: "rt",
                        offset: [5, -5],
                    },
                }
            },
        }} render={(b) => {
            b.create('point', [1, 4], {size: 4, name: 'A'});
            // console.log(Object.keys(b))
            // console.log("content", Object.keys(b.defaultAxes.y.label.content).sort())
            // b.defaultAxes.y.label.content.setAttribute({rotate: 90})
            b.create('functiongraph', [
                    function (x) {
                        return Math.sin(x);
                    }, 0, 50,
                ]
            );
        }}/>
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
