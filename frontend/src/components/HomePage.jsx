import { useState, useEffect } from 'react';
import NavBar from "./NavBar";
import { Link } from "react-router-dom";
import axios from 'axios';

const HomePage = ({getAll}) => {
    const [tasks, setTasks] = useState([])
    const [test, setTest] = useState()

    useEffect(() => {
        getAll().then(initalTasks => setTasks(initalTasks)) //from ../services/tasks
        const request = axios.get('https://studies.cs.helsinki.fi/restcountries/api/all')
        request.then(response => {
            setTest(response.data[0].capital)
        })
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
                        <div key={task.id} >
                            <Link to="/view-task" state={{from: task.id}}>
                                <div className="task">
                                    <h2>{task.title}</h2>
                                    <b><p style={{color: priorityStyle}}>{task.priority}</p></b>
                                </div>
                            </Link>
                        </div>
                    )
                })
            }
            <div>
                {test}
            </div>
        </>
    )
}

export default HomePage;