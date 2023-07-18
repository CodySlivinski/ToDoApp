import React, { useEffect, useState } from 'react'
import { Formik, Form, Field } from 'formik'
import { toDoSchema } from '../../utilities/validationSchema'
import axios from 'axios'

export default function ToDoForm(props) {
    const [categories, setCategories] = useState([])

    const getCategories = () => {
        axios.get(`https://localhost:7229/api/Categories`).then(response => {
            console.log(response)
            setCategories(response.data)
        })
    }

    const handleSubmit = (values) => {
        console.log(values)
        if(!props.todo) {
            const toDoToCreate = {
                name: values.name,
                done: false,
                categoryId: values.caegoryId
            }
            axios.post(`https://localhost:7229/api/ToDos`, toDoToCreate).then(() => {
                props.setShowCreate(false)
                props.getToDos()
            })
        } else {
            const toDoToEdit ={
                toDoId: props.todo.toDoId,
                name: values.name,
                done: props.todo.done,
                categoryId: values.categoryId
            }

            axios.put(`https://localhost:7229/api/ToDos/${props.todo.toDoId}`, toDoToEdit).then(() => {
                props.getToDos()
                props.setShowEdit(false)
            })
        }
    }

    useEffect(() => {
        getCategories()
    }, []);

  return (
    
    <Formik
        intialValues={{
            name: props.todo ? props.todo.name : '',
            done: props.todo ? props.todo.done : false,
            categoryId: props.todo ? props.todo.categoryId : ''
        }}
        validationSchema={toDoSchema}
        onSubmit={(values) => handleSubmit(values)} >
        
        {({errors, touched}) => (
            <Form id='toDoForm'>
                <div className="form-group m-3">
                    <Field name='name' className='form-control' placeholder='Task' />
                    {errors.name && touched.name &&
                        <div className="text-danger">
                            {errors.name}
                        </div>
                    }
                </div>
                <div className="form-group m-3">
                    <Field name='categoryId' className='form-control' as='select'>
                        <option value='' disabled>
                            [--Please Choose--]
                        </option>
                        {/* Below we will map an option 4 every category in the API */}
                        {categories.map(cat =>
                            <option key={cat.categoryId} value={cat.categoryId}>
                                {cat.catName}
                            </option>    
                        )}
                    </Field>
                </div>
                <div className="form-group m-3">
                    <button type='submit' className="btn btn-success m-3">
                        Submit To-Do to API
                    </button>
                </div>
            </Form>
        )}

    </Formik>

  )
}
