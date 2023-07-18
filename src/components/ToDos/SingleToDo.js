import React, {useState} from 'react'
import { useAuth } from '../../contexts/AuthContext'
import { FaEdit, FaTrashAlt } from 'react-icons/fa'
import axios from 'axios'
import ToDoEdit from './ToDoEdit'

export default function SingleToDo(props) {
    const { currentUser } = useAuth()


    const [showEdit, setShowEdit] = useState(false)

    const deleteToDo = (id) => {
        if(window.confirm(`Are you sure you want to delete ${props.toDo.name}`)){
            axios.delete(`https://localhost:7229/api/ToDos/${id}`).the(() =>
                props.getToDos())
        }
    }

    const flipDone = () => {
        let updatedToDo = {
            toDoId: props.todo.toDoId,
            name: props.todo.name,
            done: !props.todo.done,
            categoryId: props.todo.categoryId
        }
        axios.put(`https://localhost:7229/api/ToDos/${props.todo.toDoId}`, updatedToDo).then(response => {
            console.log(response)
            props.getToDos()
        })
    }

  return (
    <tr>
        <td>
            <input type="checkbox" className='checkbox' checked={props.todo.done} onChange={() => flipDone()} />
        </td>
        <td>{props.todo.name}</td>
        <td>{props.todo.category.catName}</td>
        {currentUser.email === process.env.REACT_APP_ADMIN_EMAIL &&
        <td>
        <button className="m-1 rounded" id='editLink' 
            onClick={()=> setShowEdit(true)}>
                <FaEdit />
          </button>
          <button className="m-1 rounded" id='deleteLink' 
            onClick={()=> deleteToDo(props.todo.toDoId)}>
                <FaTrashAlt />
          </button>
          {showEdit && 
            <ToDoEdit
            todo = {props.todo} 
            setShowEdit={setShowEdit}
            showEdit = {showEdit}
            getToDos = {props.getToDos} />
          }
          
        </td>
        }
    </tr>
  )
}
