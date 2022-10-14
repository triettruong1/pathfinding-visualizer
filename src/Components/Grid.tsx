import { useEffect, useRef, useState } from "react";

interface GridProps {
    coordinate: number[],
    type: string,
    mouseRef: React.MutableRefObject<boolean>,
    isVisited?: boolean,
    isShortestPath?: boolean,
    onMouseDown?: (coordinate: number[]) => void,
    onMouseEnter?: (coordinate: number[]) => void,
    onMouseUp?: () => void
}

const Grid: React.FC<GridProps> = ({ coordinate, type, mouseRef }) => {
    const [x, y] = coordinate;

    return (<div
        className={type.concat(' grid')}
        id={x + " " + y}

        onMouseEnter={(event) => {
            mouseRef ? event.target.classList.add("wall") : "";
        }}
    >
    </div>)
};

export default Grid;
