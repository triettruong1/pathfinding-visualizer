import React, {
	ForwardedRef,
	forwardRef,
	MutableRefObject,
	useEffect,
	useRef,
	useState,
} from 'react';
import './Grid.css';
import Start from './Start';
import { FactoryOrInstance, useDrop } from 'react-dnd';

interface GridProps {
	coordinate: [number, number];
	isClicking: boolean;
	isStart: boolean;
	isEnd: boolean;
	isWall: boolean;
	isShortestPath?: boolean;
	handleChangeStartPosition: (coodinate: [number, number]) => void;
}

const Grid = forwardRef<HTMLDivElement, GridProps>(
	(
		{
			coordinate,
			isClicking,
			isEnd,
			isStart,
			isWall,
			handleChangeStartPosition,
		},
		nodeRef: ForwardedRef<HTMLDivElement>
	) => {
		const [, dropRef] = useDrop(() => ({
			accept: 'start',
			drop: () => handleDrop(),
		}));
		const [nodeClass, setNodeClass] = useState(
			isEnd ? 'end' : isWall ? 'wall' : ''
		);

		useEffect(() => {
			setNodeClass(isEnd ? 'end' : isWall ? 'wall' : '');
		}, [isWall]);

		const handleWallChange = () => {
			if (isClicking)
				nodeClass === 'end' || nodeClass === 'start'
					? ''
					: setNodeClass('wall');
		};

		const handleDrop = () => {
			handleChangeStartPosition(coordinate);
		};

		return isStart ? (
			<div
				ref={nodeRef}
				className={'grid '.concat(nodeClass)}
				id={coordinate.join(' ')}>
				<Start />
			</div>
		) : isEnd ? (
			<div
				ref={nodeRef}
				className={'grid '.concat(nodeClass)}
				id={coordinate.join(' ')}></div>
		) : (
			<div
				ref={(element: HTMLDivElement) => {
					if (typeof nodeRef === 'function') {
						nodeRef(element);
					} else if (nodeRef) {
						(
							nodeRef as MutableRefObject<HTMLDivElement | null>
						).current = element;
					}
					dropRef(element);
				}}
				className={'grid '}
				id={coordinate.join(' ')}
				onMouseEnter={handleWallChange}
				onMouseOver={handleWallChange}></div>
		);
	}
);

export default Grid;
