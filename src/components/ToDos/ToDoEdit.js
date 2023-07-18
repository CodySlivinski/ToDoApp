import React from 'react'
import { Modal } from 'react-bootstrap'
import ToDoForm from './ToDoForm'

export default function ToDoEdit(props) {
  return (
    <Modal
        show={props.showEdit}
        onHide={() => props.setShowEdit(false)}
        size='lg'>

        <Modal.Header className='bg-info' closeButton>
            <h3>Editing {props.todo.name}</h3>
        </Modal.Header>
        
        <Modal.Body>
            <ToDoForm todo={props.todo}
                setShowEdit={props.setShowEdit} getToDos={props.getToDos} />
        </Modal.Body>

    </Modal>
  )
}
