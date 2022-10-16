import React, { useEffect, useRef, useState } from "react";

interface GridProps {
    coordinate: number[],
    isClicking: boolean,
    isStart: boolean,
    isEnd: boolean,
    isVisited?: boolean,
    isShortestPath?: boolean,
    onMouseDown?: (coordinate: number[]) => void,
    onMouseEnter?: (coordinate: number[]) => void,
    onMouseUp?: () => void
}

const Grid: React.FC<GridProps> = ({ coordinate, isClicking, isEnd, isStart }) => {
    const [x, y] = coordinate;
    const [nodeClass, setNodeClass] = useState(isEnd ? 'end' : isStart ? 'start' : '');

    const handleWallChange = () => {
        if (isClicking)
            nodeClass === 'end' || nodeClass === 'start' ? '' : setNodeClass('wall');
    }

    return (
        <div
            className={'grid '.concat(nodeClass)}
            id={x + " " + y}
            onMouseOver={handleWallChange}
            onMouseDown={handleWallChange}
        >
        </div>
    )
};

export default Grid;