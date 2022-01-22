import type {NextPage} from 'next'
import {useEffect, useState} from "react";
import {useRouter} from "next/router";
import DeleteIcon from '@mui/icons-material/Delete';

interface ingestion {
    offset: string
    drugName: string
    halfLife: string
    dosage: string
}

const emptyIngestion: ingestion = {
    offset: "",
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
                                newIngestions[index] = {
                                    ...ingestion,
                                    ...editedIngestion,
                                }
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
                                <input type="text" id="name"
                                       placeholder="Caffeine" value={ingestion.drugName} onChange={(e) => {
                                    edit({
                                        drugName: e.target.value,
                                    })
                                }} required/>
                                <input type="text" value={ingestion.dosage} placeholder="0mg" id="dosage"
                                       placeholder="50mg" required/>
                                <input type="text" id="half-life"
                                       placeholder="4.5h" required/>
                                <button className="trash" onClick={() => {
                                    const copy = [...ingestions]
                                    copy.splice(index, 1)
                                    setIngestions(copy)
                                }}><DeleteIcon/></button>
                            </div>
                        })
                    }
                </form>
                <div className={"py-4"}>
                    <button
                        className="" onClick={() => setIngestions([...ingestions, emptyIngestion])}>
                        Add ingestion
                    </button>
                </div>
            </div>
        </div>
    )
}

export default Home
