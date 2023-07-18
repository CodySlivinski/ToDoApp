import React, {useState, useEffect } from 'react'
import axios from 'axios'
import SingleToDo from './SingleToDo'
import ToDoCreate from './ToDoCreate'
import './ToDo.css'

import {useAuth} from '../../contexts/AuthContext'
import FilterCat from './FilterCat'

export default function ToDos() {
  const [toDos, setToDos] = useState([])
  const {currentUser} = useAuth()
  const [showCreate, setShowCreate] = useState(false)
  const [filter, setFilter] = useState(0)
  const [showDone, setShowDone] = useState();

  const getToDos = () => {
    axios.get(`https://localhost:7229/api/ToDos`).then(resonse => {
      console.log(resonse)
      setToDos(resonse.data)
    })
  }

  useEffect(() => {
    getToDos()
  }, []);

  return (
    <section className="toDos">
      
      <article className="p-5">
        <h1 className="text-center">To-Dos</h1>
      </article>

      {currentUser.email === process.env.REACT_APP_ADMIN_EMAIL &&
        <div className="p-2 mb-3 text-center">
          {showCreate ? 
            <>
              <button onClick={() => setShowCreate(false)} className="btn btn-warning">
                Cancel
              </button>
              <ToDoCreate setShowCreate={setShowCreate}
                getToDos={getToDos} />
            </> :
            <button onClick={() => setShowCreate(true)} className="btn btn-warning">
              Create a To-Do
            </button>
          }
        </div>
      }

      <FilterCat setFilter={setFilter} showDone={showDone} setShowDone={setShowDone} />
      
      <div className="container p-2">
        <table className="table bg-info table-dark my-3">
          <thead className="table-secondary text-uppercase">
            <tr>
              <th>Done?</th>
              <th>Task</th>
              <th>Category</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
          {!showDone ?
              <>
               {filter === 0 ? toDos.filter(x => x.done === false).map(x =>
                <SingleToDo key={x.toDoId} todo={x} getToDos={getToDos}/>
                ) :
                toDos.filter(x => x.done === false && x.categoryId === filter).map(x =>
                  <SingleToDo key={x.toDoId} todo={x} getToDos={getToDos} />
              )}
            </> :
            <>
              {filter === 0 ? toDos.map(x =>
                  <SingleToDo key={x.toDoId} todo={x} getToDos={getToDos}/>
                ) :
                toDos.filter(x => x.categoryId === filter).map(x =>
                  <SingleToDo key={x.toDoId} todo={x} getToDos={getToDos} />
              )}
            </>
            }
          </tbody>
        </table>
        {!showDone ?
            <>
            {filter !== 0 && toDos.filter(x => x.done === false && x.categoryId === filter).length === 0 &&
              <h2 className="alert alert-warning text-dark">
                There are no incomplete To Do items in this category.
              </h2>
            }
            </> :
            <>
              {filter !== 0 && toDos.filter(x => x.categoryId === filter).length === 0 &&
              <h2 className="alert alert-warning text-dark">
                There are no To Do items in this category.
              </h2>
            }
            </>

            }
      </div>

    </section>
  )
}
