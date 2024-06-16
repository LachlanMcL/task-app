import { useState } from "react";
import axios from 'axios';
import NavBar from "./NavBar";
import { useNavigate } from "react-router-dom";


const NewTask = ({create}) => {
    const [name, setName] = useState('')
    const [details, setDetails] = useState('')
    const [priority, setPriority] = useState('low')
    const navigate = useNavigate()

    const handleSubmit = (e) => {
        e.preventDefault()
        const task = {
            title: name,
            details,
            priority,
        }

        create(task).then(response => { //from ../services/tasks
            navigate('/')
        }).catch((e) => {
            if (e.response.data.error == 'task name must be unique') alert(e.response.data.error)
        })
    }

    return (
        <>
            <NavBar />
            <div className="create-task">
                <h1>Add New Task</h1>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label>Task Name:</label>
                        <input 
                            type="text"
                            required
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </div>
                    <div className="form-group">
                        <label>Task Details:</label>
                        <textarea
                            value={details}
                            onChange={(e) => setDetails(e.target.value)}
                            rows={10}
                        />
                    </div>
                    <div className="form-group">
                        <label>Priority:</label>
                        <select 
                            value={priority}
                            onChange={(e) => setPriority(e.target.value)}
                        >
                            <option value="low">low</option>
                            <option value="medium">medium</option>
                            <option value="high">high</option>
                        </select>
                    </div>
                    <button>Add Task</button>
                    
                </form>
            </div>
        </>
    )
}

export default NewTask;