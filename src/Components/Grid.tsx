import {
	forwardRef,
	ReactNode,
	SetStateAction,
	useState,
} from 'react';
import './Grid.css';
import {useDrop} from 'react-dnd';
import React from 'react';

interface GridProps {
	coordinate: [number, number];
	isClicking?: boolean;
  updateMouseClick: React.Dispatch<SetStateAction<boolean>>,
	isWall?: boolean;
  className: string;
	isShortestPath?: boolean;
	handleChangeStartPosition: (coodinate: [number, number]) => void;
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
      children,
		},
    nodeRef: any
	) => {
		const [nodeClass, setNodeClass] = useState(className);
    const [{hover}, dropRef] = useDrop(() => ({
      accept: "start",
      drop: () => { 
        updateMouseClick(prevState => !prevState)
        handleChangeStartPosition(coordinate) 
      },
      collect: (monitor) => ({
        hover: monitor.isOver()
      })
    }))
  
		const handleWallChange = () => {
			if (isClicking)
				 setNodeClass(prev => prev.concat(' wall'));
		};

		return (
			<div
				ref={(element) => {
            if (typeof(nodeRef) === 'function'){
              nodeRef(element);
          } else if (nodeRef !== null){
              nodeRef.current = element;
          }
          dropRef(element)
        }}
				className={nodeClass}
				id={coordinate.join(' ')}
        onMouseLeave={handleWallChange}>
        {children}
			</div>
      )
})

export default Grid;
