import './Header.css';

interface HeaderProps {
    beginAnimation: () => void,
    handleResetBoard: () => void
}

const Header: React.FC<HeaderProps> = ({ beginAnimation, handleResetBoard }) => {
    return (
        <header>
            <h1>Path-finding visualizer</h1>
            <button onClick={beginAnimation}>Animate</button>
            <button onClick={handleResetBoard}>Reset</button>
        </header>
    )
}

export default Header;