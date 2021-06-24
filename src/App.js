import { useState, useEffect } from 'react'
import Header from './components/Header'
import Footer from './components/Footer'
import Tasks from './components/Tasks'
import AddTask from './components/AddTask'
import About from './components/About'
//routing in react - importing react router dom
import {BrowserRouter as Router, Route} from 'react-router-dom'

function App() {
  //hooks - set hook to hold state for add task button and state for task list
  const [showAddTask, setShowAddTask] = useState(false)
  const [tasks, setTasks] = useState([])

  //useEffect is used for any side effects. Typically, we'll use them for any fetches
useEffect(() => {
  const getTasks = async () => {
    //grabbing our data from the server by calling our fetchTasks function
    const tasksFromServer = await fetchTasks()
    //setting our current state to the tasks from the json server
    setTasks(tasksFromServer)
  }
  

  //calling our function to set our tasks current state
  getTasks()
  //second parameter of useEffect to 'watch' -> update state if this gets changed
}, [])

//Fetch Tasks
const fetchTasks = async () => {
  //fetches are async as the response will be sent back as a promise. Async await
  const response = await fetch('http://localhost:5000/tasks')
  const data = await response.json()

  return data
}

//Fetch Task
const fetchTask = async (id) => {
  //fetches are async as the response will be sent back as a promise. Async await
  const response = await fetch(`http://localhost:5000/tasks/${id}`)
  const data = await response.json()

  return data
}

//Toggle Reminder
const toggleReminder = async (id) => {
  const taskToToggle = await fetchTask(id)
  //syntax to update an attribute of an object. Grab copy of the task and change value of the attribute
  const updateTask = { ...taskToToggle, reminder: !(taskToToggle.reminder)}

  const response = await fetch(`http://localhost:5000/tasks/${id}`, {
    method: 'PUT',
    headers: {
      'Content-type': 'application/json',
    },
    body: JSON.stringify(updateTask)
  })

  const data = await response.json()


  //maping over tasks. check to see if id matches. if yes, return that task but change reminder value to opposite boolean. if no, return task as it was
  setTasks(tasks.map((task) => task.id === id ? { ...task, reminder: data.reminder } : task))
  
  }

//Add Task
const addTask = async (task) => {
  const response = await fetch('http://localhost:5000/tasks', {
    method: 'POST',
    headers: {
      'Content-type': 'application/json',
    },
    body: JSON.stringify(task)
  })

  //response is sent as a promise. we have to add await
  const data = await response.json()

  setTasks([...tasks, data])

  //adding task in the UI only
  
  // const id = Math.floor(Math.random() * 10000) + 1
  // console.log(id)
  // const newTask = {id, ...task}
  // console.log(newTask)
  // console.log(task)

  // setTasks([ ...tasks, newTask])
}

//Delete Task
const deleteTask = async (id) => {
  await fetch(`http://localhost:5000/tasks/${id}`, {

    method: 'DELETE'
  })

  //use filter to filter out the targetted id
  setTasks(tasks.filter((task) => (
    task.id !== id
  )))
}
  return (
    <Router>
    <div className="container">
      <Header title="Task Tracker" onAdd={() => setShowAddTask(!showAddTask)} showAdd={showAddTask} />
      <Route path='/' exact render={(props) => (
        //need to wrap with empty fragments here
        <>
        {showAddTask && <AddTask onAdd={addTask} />}
        {tasks.length > 0 ?
        <Tasks tasks={tasks} onDelete={deleteTask} onReminder={toggleReminder} />
        : (
          "No Tasks to Show"
        )
        }

        </>
        
      )} />
      <Route path='/about' component={About} />
      <Footer />
    </div>
    </Router>
  );
}

export default App;
