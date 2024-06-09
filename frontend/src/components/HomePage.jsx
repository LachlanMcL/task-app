import { useState, useEffect } from 'react';
import NavBar from "./NavBar";
import { Link } from "react-router-dom";

const HomePage = ({getAll}) => {
    const [tasks, setTasks] = useState([])

    useEffect(() => {
        getAll().then(initalTasks => setTasks(initalTasks)) //from ../services/tasks
    }, [])

    const setPriority = (taskPriority) => {
        switch (taskPriority) {
            case "low":
                return "#00FF00" //green
            case "medium":
                return "#FFD700" //yellow
            case "high":
                return "#FF043E" //red
        }
    }

    return (
        <>
            <NavBar/>
            {tasks.length != 0 && <h1>All Tasks</h1>}
            {
                tasks.map(task => {
                    const priorityStyle = setPriority(task.priority)
                    return (
                        <div key={task.id} className="task">
                            <span>
                            <Link to="/view-task" state={{from: task.id}}>
                                <h2>{task.title}</h2>
                                <b><p style={{color: priorityStyle}}>{task.priority}</p></b>
                            </Link>
                            </span>
                        </div>
                    )
                })
            }
        </>
    )
}

export default HomePage;