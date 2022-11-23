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
			handleChangeEndPosition,
			children,
		},
		nodeRef: any
	) => {
		const [nodeClass, setNodeClass] = useState(className);
		const [{ currentlyDraggingItem, isHovering }, dropRef] = useDrop(
			() => ({
				accept: ['start', 'end'], drop: (item, monitor) => {
					updateMouseClick((prevState) => !prevState);
					if (
						handleChangeStartPosition &&
						monitor.getItemType() === 'start'
					)
						handleChangeStartPosition(coordinate);
					if (
						handleChangeEndPosition &&
						monitor.getItemType() === 'end'
					)
						handleChangeEndPosition(coordinate);
				},
				collect: (monitor) => ({
					currentlyDraggingItem: monitor.getItem(),
					isHovering: !!monitor.isOver(),
				}),
			})
		);

		const hoveringStyle = isHovering
			? {
				border: '1px solid blue',
			}
			: {
				border: '1px solid rgba(19, 17, 17, 0.15)',
			};

		const handleWallChange = () => {
			if (isClicking && !!!currentlyDraggingItem && !!!children) //Draw will if there is no item being dragged
				setNodeClass((prev) => prev.concat(' wall')); //and there is no children inside
		};

		return (
			<div
				onDragStart={() => {
					return false;
				}} //Disable accidentally dragging the grid
				onDragEnd={() => {
					return false;
				}}
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
