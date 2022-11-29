import { forwardRef, ReactNode, SetStateAction, useEffect, useState } from 'react';
import './Grid.css';
import { useDrop } from 'react-dnd';
import React from 'react';

interface GridProps {
	coordinate: [number, number];
	isClicking?: boolean;
	updateMouseClick: React.Dispatch<SetStateAction<boolean>>;
	className: string;
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
		const [{ isHovering }, dropRef] = useDrop(() => ({
			accept: ['start', 'end'],
			drop: (item, monitor) => {
				if (handleChangeStartPosition && monitor.getItemType() === 'start')
					handleChangeStartPosition(coordinate);
				if (handleChangeEndPosition && monitor.getItemType() === 'end')
					handleChangeEndPosition(coordinate);
				updateMouseClick((prevState) => !prevState);
			},
			canDrop: (_, monitor) => {
				return !nodeClass.includes('wall');
			},
			collect: (monitor) => ({
				isHovering: !!monitor.isOver(),
			}),
		}));

		const hoveringStyle = isHovering
			? { border: '1px solid blue' }
			: { border: '1px solid rgba(19, 17, 17, 0.15)' };

		const handleWallChange = () => {
			if (isClicking && !!!children) {
				setNodeClass((prev) => {
					if (prev.includes('wall')) return prev;
					return prev.concat(' wall');
				});
			}
		};

		useEffect(() => {
			setNodeClass(className);
		}, [className]);

		return (
			<div
				draggable='false'
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
