import { Route, Routes } from 'react-router-dom'

import HomePage from "./components/HomePage"
import NewTask from "./components/NewTask"
import ViewTask from "./components/ViewTask"

import taskService from './services/tasks'

function App() {

  return (
    <div className='content'>
      <Routes>
        <Route path="/" exact Component={() => <HomePage getAll={taskService.getAll}/>} />
        <Route path="/new-task" Component={() => <NewTask create={taskService.create}/>} />
        <Route path="/view-task" Component={() => <ViewTask getOne={taskService.getOne} remove={taskService.remove}/>} />
      </Routes>
    </div>
  )
}

export default App
