import type {NextPage} from 'next'
import {useEffect, useState} from "react";
import {useRouter} from "next/router";

const Home: NextPage = () => {
    const router = useRouter()
    // TODO: store the state in the URL

    return (
        <div className="h-screen w-screen flex flex-col md:container md:mx-auto py-2 md:py-10">
            <title>grams.io drug half-life calculator</title>
            <h1>grams.io</h1>
            <hr/>
            <div id="ingests" className="container py-4 px-0">
                <h2>Ingests</h2>
                <div className={"ingest-container grid gap-4"}>
                    <span >Time offset</span>
                    <span >Drug name</span>
                    <span >Dosage</span>
                    <span >Half-life</span>
                </div>
                <hr className={"py-1"}/>
                <form>
                    <div className="ingest-container grid gap-4">
                        <input type="text" id="time"
                               value="T+0" required/>
                        <input type="text" id="name"
                               placeholder="Caffeine" required/>
                        <input type="text" id="dosage"
                               placeholder="50mg" required/>
                        <input type="text" id="half-life"
                               placeholder="Half-life" required/>

                    </div>
                </form>
            </div>
        </div>
    )
}

export default Home
