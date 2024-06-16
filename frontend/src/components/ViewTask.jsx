import NavBar from "./NavBar";
import { useLocation, Link } from 'react-router-dom'
import axios from 'axios';
import { useState, useEffect } from "react";

const ViewTask = ({getOne, remove}) => {
    const [task, setTask] = useState({})
    const location = useLocation()
    const { from } = location.state
    const [styleColor, setStyleColor] = useState('') //priority color

    useEffect(() => {
        getOne(from) //from == task.id // getOne() is in ../services/tasks
        .then(newTask => {
            setTask(newTask)
            switch (newTask.priority) {
                case "low":
                    setStyleColor("#00FF00")
                    break
                case "medium":
                    setStyleColor("#FFD700")
                    break
                case "high":
                    setStyleColor("#FF043E")
                    break
                default:
                    setStyleColor("#00FF00")
            }
        })
    }, [])

    const handleDelete = () => {
        remove(task.id) // remove() is in ../services/tasks
    }


    //whiteSpace: "pre-wrap" so that \n can be represented correctly (with line breaks).
    return (
        <>
            <NavBar />
            <div className="task-details">
                <h1>{task.title}</h1>
                <h3 style={{whiteSpace: "pre-wrap"}}>{task.details}</h3>
                <h3>Priority: <span style={{color: styleColor}}>{task.priority}</span></h3>
                <Link reloadDocument to="/">
                    <button onClick={handleDelete}>COMPLETE ✔</button>
                </Link>
            </div>
        </>
    )
}

export default ViewTask;