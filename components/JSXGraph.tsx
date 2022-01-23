import React, { useEffect, useRef } from "react"
// @ts-ignore
import jsxgraph from "jsxgraph"

const JSXGraph: React.FC<{
    render: (graph: any) => void
    attributes: Record<any, any>,
}> = (props) => {
    const ref = useRef()
    useEffect(() => {
        if (!ref.current) {
            return
        }
        const board = jsxgraph.JSXGraph.initBoard("graph", props.attributes)
        props.render(board)
    }, [props, ref])

    return (
        <div id="graph" style={{width: "400px", height: "400px"}} ref={ref}></div>
    )
}

export default JSXGraph