interface GridProps {
    coordinate: number[]
}

const Grid: React.FC<GridProps> = ({ coordinate }) => {
    const [x, y] = coordinate;
    return <div className='grid' id={x + " " + y}></div>;
};

export default Grid;
