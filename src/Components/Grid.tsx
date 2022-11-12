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
    const [{currentlyDraggingItem}, dropRef] = useDrop(() => ({
      accept: ['start', 'end'],
      drop: (item,monitor) => { 
        updateMouseClick(prevState => !prevState)
        if (handleChangeStartPosition && monitor.getItemType() === "start")
          handleChangeStartPosition(coordinate)
        if (handleChangeEndPosition && monitor.getItemType() === "end")
          handleChangeEndPosition(coordinate)
      },
      collect: (monitor) => ({
        currentlyDraggingItem: monitor.getItem()
      })
    }))
  
		const handleWallChange = () => {
			if (( isClicking && currentlyDraggingItem === null ) && ( isClicking && !!!children ))
				 setNodeClass(prev => prev.concat(' wall'));
		};

		return (
			<div
        onDragStart={() => {return false;}} //Disable accidentally dragging the grid
        onDragEnd={() => {return false;}}
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
        onMouseOver={handleWallChange}>
        {children}
			</div>
      )
})

export default Grid;
