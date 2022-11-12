import React from "react";

import { useDrag } from 'react-dnd';

const End: React.FC = () => {
  const [{isDragging}, dragRef] = useDrag(() => ({
    type: "end",
      item: { type:  "end"}, collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }))
  
	return <div ref={dragRef}className='start'></div>; };

export default End;

