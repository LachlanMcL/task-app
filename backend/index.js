const express = require('express')
const cors = require('cors')
const app = express()

let tasks = [
    {
        "title": "first task",
        "details": "first details",
        "priority": "low",
        "id": 1
    },
    {
        "title": "second task",
        "details": "second details",
        "priority": "medium",
        "id": 2
    },
    {
        "title": "third task",
        "details": "third details",
        "priority": "high",
        "id": 3
    }
]

let task_index = 4;

app.use(express.static('dist'))
app.use(cors())
app.use(express.json())

app.get('/api/tasks', (req, res) => {
    res.json(tasks)
})

app.get('/api/tasks/:id', (req, res) => {
    const id = Number(req.params.id)
    const task = tasks.find(task => task.id === id)
  
    if (task) {
      res.json(task)
    } else {
      res.status(404).end()
    }
})

app.post('/api/tasks', (req, res) => {
    const body = req.body
  
    if (tasks.some(task => task.title === body.title)) {
      return res.status(400).json({
        error: 'task name must be unique'
      })
    }
    
    if (!body.title) {
      return res.status(400).json({
        error: 'task name missing'
      })
    }
  
    const task = {
      id: task_index++,
      title: body.title,
      details: body.details,
      priority: body.priority
    }
  
    tasks = tasks.concat(task)
    res.json(task)
})

app.delete('/api/tasks/:id', (req, res) => {
    const id = Number(req.params.id)
    tasks = tasks.filter(task => task.id !== id)
  
    res.status(204).end()
  })

const PORT = 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})