import './Header.css';
import React, { Dispatch, SetStateAction, useRef } from 'react';

interface HeaderProps {
    setAnimate: Dispatch<SetStateAction<boolean>>,
    setResetBoard: Dispatch<SetStateAction<boolean>>,
    setAlgo: Dispatch<SetStateAction<string>>
}

const Header: React.FC<HeaderProps> = ({ setAnimate, setResetBoard, setAlgo }) => {
    const selectRef = useRef<HTMLSelectElement>(null);
    const beginAnimation = () => {
        setAlgo(selectRef.current!.value)
        setAnimate(prevState => !prevState);
    }

    const handleResetBoard = () => {
        setResetBoard(prevState => !prevState);
    }
    return (
        <header>
            <h1>Path-finding visualizer</h1>
            <button onClick={beginAnimation}>Animate</button>
            <button onClick={handleResetBoard}>Reset</button>
            <select ref={selectRef} >
                <option>BFS</option>
                <option>Dijkstra</option>
            </select>
        </header >
    )
}

export default Header;