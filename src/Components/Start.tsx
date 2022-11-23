import React from 'react';
import { useDrag } from 'react-dnd';
import startPinSVG from '../Assets/startPin.svg';

const Start: React.FC = () => {
	const [{ }, dragRef] = useDrag(() => ({
		type: 'start',
		item: { type: 'start' },
		collect: (monitor) => ({
			isDragging: !!monitor.isDragging(),
		}),
	}));

	return (
		<div draggable="false" ref={dragRef} className='svg-icon'>
			<img draggable="false" src={startPinSVG} />
		</div>
	);
};

export default Start;
