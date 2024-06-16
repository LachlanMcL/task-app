import { Route, Routes } from 'react-router-dom'

import HomePage from "./components/HomePage"
import NewTask from "./components/NewTask"
import ViewTask from "./components/ViewTask"

import taskService from './services/tasks'

import "./../node_modules/bootstrap/dist/css/bootstrap.min.css"
import { useEffect, useState } from 'react'

function App() {
  const [input, setInput] = useState('')
  const [countries, setCountries] = useState([])

  useEffect(() => {
    const request = axios.get('https://studies.cs.helsinki.fi/restcountries/api/all')
    request.then(response => {
      setCountries(response.data)
    })
  }, [])

  const handleInputChange = (e) => {
    setInput(e.target.value)
  }

  return (
    <>
      <div className="row">
        <div>
          Enter country name: <input onChange={handleInputChange} value={input}></input>
        </div>
      </div>
      <div className="row">
        <div>
          {input}
        </div>
      </div>
    </>
  )
}

export default App
