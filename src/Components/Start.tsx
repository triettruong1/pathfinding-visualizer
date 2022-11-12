import React from 'react';
import './Start.css';
import { useDrag } from 'react-dnd';

const Start: React.FC = () => {
  const [{isDragging}, dragRef] = useDrag(() => ({
    type: "start",
    item: { type: "start" },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }))
  
	return <div ref={dragRef}className='start'></div>; };

export default Start;
