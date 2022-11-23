import React from 'react';
import { useDrag } from 'react-dnd';
import startPinSVG from '../Assets/startPin.svg';

const Start: React.FC = () => {
	const [{ isDragging }, dragRef] = useDrag(() => ({
		type: 'start',
		item: { type: 'start' },
		collect: (monitor) => ({
			isDragging: !!monitor.isDragging(),
		}),
	}));

	return (
		<div ref={dragRef} className='svg-icon'>
			<img src={startPinSVG} />
		</div>
	);
};

export default Start;
