import { Link } from "react-router-dom";

const NavBar = () => {
    return (
        <nav className="navbar">
            <h1>Task Planner App</h1>
            <div className="links">
            <Link to="/">Home</Link>
            <Link to="/new-task">New Task</Link>
            </div>
        </nav>
    )
    
}

export default NavBar;