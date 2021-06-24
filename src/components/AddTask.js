import { useState } from 'react'

const AddTask = ({ onAdd }) => {
    const [text, setText] = useState('')
    const [day, setDay] = useState('')
    const [reminder, setReminder] = useState(false)

    const onSubmit = (event) => {
        event.preventDefault()

        if (!text) {
            alert("Please add a task")
            return
        }
        onAdd({text, day, reminder})

        setText('')
        setDay('')
        setReminder(false)
    }

    return (
       <form onSubmit={onSubmit} className="add-form">
           <div className="form-control">
               <label>Add Task</label>
               <input 
                    value={text} 
                    onChange={(event) => setText(event.target.value)} 
                    type='text' 
                    placeholder='Add Task'>
                </input>
           </div>
           <div className="form-control">
               <label>Add Day & time</label>
               <input 
                    value={day} 
                    onChange={(event) => setDay(event.target.value)}
                    type='text' 
                    placeholder='Add Day & Time'>
                </input>
           </div>
           <div className="form-control form-control-check">
               <label>Add Reminder</label>
               <input 
                    value={reminder} 
                    checked={reminder}
                    onChange={(event) => setReminder(event.currentTarget.checked)} 
                    type='checkbox'></input>
           </div>

           <input className='btn btn-block' type='submit' value='Save Task' />

       </form>
    )
}

export default AddTask
