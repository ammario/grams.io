import React, { useEffect, useRef } from "react"
import functionPlot from "function-plot"
import { FunctionPlotOptions } from "function-plot/dist/types"

const FunctionPlot: React.FC<Omit<FunctionPlotOptions, "target">> = (props) => {
    const ref = useRef()
    useEffect(() => {
        if (!ref.current) {
            return
        }
        functionPlot({
            ...props,
            target: "#graph",
        })
    }, [props, ref])

    return (
        <div id="graph" ref={ref}></div>
    )
}

export default FunctionPlot