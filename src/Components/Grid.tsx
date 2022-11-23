import { forwardRef, ReactNode, SetStateAction, useState } from 'react';
import './Grid.css';
import { useDrop } from 'react-dnd';
import React from 'react';

interface GridProps {
	coordinate: [number, number];
	isClicking?: boolean;
	updateMouseClick: React.Dispatch<SetStateAction<boolean>>;
	isWall?: boolean;
	className: string;
	isShortestPath?: boolean;
	handleChangeStartPosition?: (coodinate: [number, number]) => void;
	handleChangeEndPosition?: (coordinate: [number, number]) => void;
	children?: ReactNode;
}

const Grid = forwardRef<HTMLDivElement, GridProps>(
	(
		{
			coordinate,
			isClicking,
			updateMouseClick,
			className,
			handleChangeStartPosition,
			handleChangeEndPosition, children,
		},
		nodeRef: any
	) => {
		const [nodeClass, setNodeClass] = useState(className);
		const [{ isCurrentlyDragging, isHovering }, dropRef] = useDrop(() => ({
			accept: ['start', 'end'],
			drop: (item, monitor) => {
				if (handleChangeStartPosition && monitor.getItemType() === 'start')
					handleChangeStartPosition(coordinate);
				if (handleChangeEndPosition && monitor.getItemType() === 'end')
					handleChangeEndPosition(coordinate);
        updateMouseClick(prevState => !prevState);
			},
			collect: (monitor) => ({
				isHovering: !!monitor.isOver(),
        isCurrentlyDragging: !!monitor.getItem(),
			}),
		}));

		const hoveringStyle = isHovering
			? { border: '1px solid blue' }
			: { border: '1px solid rgba(19, 17, 17, 0.15)' };

		const handleWallChange = () => {
			if (isClicking && !!!children && !!!isCurrentlyDragging)
				setNodeClass((prev) => prev.concat(' wall')); 
		};

		return (
			<div
        draggable="false"
				onMouseOver={handleWallChange}
				id={coordinate.join(' ')}
				className={nodeClass}
				style={hoveringStyle}
				ref={(element) => {
					if (typeof nodeRef === 'function') {
						nodeRef(element);
					} else if (nodeRef !== null) {
						nodeRef.current = element;
					}
					dropRef(element);
				}}>
				{children}
			</div>
		);
	}
);

export default Grid;
