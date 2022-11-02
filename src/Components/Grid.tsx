import React, { forwardRef, useEffect, useRef, useState } from 'react';
import './Grid.css';
interface GridProps {
    coordinate: number[];
    isClicking: boolean;
    isStart: boolean;
    isEnd: boolean;
    isWall: boolean;
    isShortestPath?: boolean;
}

const Grid = forwardRef<HTMLDivElement, GridProps>(({
    coordinate,
    isClicking,
    isEnd,
    isStart,
    isWall
}, nodeRef) => {
    const [x, y] = coordinate;
    const [nodeClass, setNodeClass] = useState(
        isEnd ? 'end' : isStart ? 'start' : isWall ? 'wall' : ''
    );

    const handleWallChange = () => {
        if (isClicking)
            nodeClass === 'end' || nodeClass === 'start' ? '' : setNodeClass('wall');
    };

    return (
        isStart ?
            (
                <div
                    ref={nodeRef}
                    className={'grid '.concat(nodeClass)}
                    id={x + ' ' + y}
                >
                </div>
            ) : isEnd ?
                (
                    <div
                        ref={nodeRef}
                        className={'grid '.concat(nodeClass)}
                        id={x + ' ' + y}
                    >
                    </div>
                ) :
                (
                    <div
                        ref={nodeRef}
                        className={'grid '.concat(nodeClass)}
                        id={x + ' ' + y}
                        onMouseOver={handleWallChange}
                        onMouseUp={handleWallChange}
                    >
                    </div>
                )
    );
});

export default Grid;
