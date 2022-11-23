import React from 'react';
import { useDrag } from 'react-dnd';
import endPinSVG from '../Assets/endPin.svg';

const End: React.FC = () => {
	const [{ isDragging }, dragRef] = useDrag(() => ({
		type: 'end',
		item: { type: 'end' },
		collect: (monitor) => ({
			isDragging: !!monitor.isDragging(),
		}),
	}));

	return (
		<div ref={dragRef} className='svg-icon'>
			<img src={endPinSVG} />
		</div>
	);
};

export default End;
