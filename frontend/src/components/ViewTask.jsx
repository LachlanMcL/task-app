import NavBar from "./NavBar";
import { useLocation, Link, useNavigate } from 'react-router-dom'
import axios from 'axios';
import { useState, useEffect } from "react";

const ViewTask = ({getOne, remove}) => {
    const [task, setTask] = useState({})
    const location = useLocation()
    const { from } = location.state
    const [styleColor, setStyleColor] = useState('') //priority color
    const navigate = useNavigate()

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

    const handleDelete = (e) => {
        remove(task.id).then(() => { // remove() is in ../services/tasks
            navigate('/')
        })
    }


    //whiteSpace: "pre-wrap" so that \n can be represented correctly (with line breaks).
    return (
        <>
            <NavBar />
            <div className="task-details">
                <h1>{task.title}</h1>
                <h3 style={{whiteSpace: "pre-wrap"}}>{task.details}</h3>
                <h3>Priority: <span style={{color: styleColor}}>{task.priority}</span></h3>
                <button onClick={handleDelete}>COMPLETE ✔</button>
            </div>
        </>
    )
}

export default ViewTask;