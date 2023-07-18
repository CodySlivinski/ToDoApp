import React from 'react'
import CatForm from './CatForm'

export default function CatCreate(props) {
  return (
    <div className="createCategoryContainer m-2 text-center w-75 m-auto">
        <CatForm getCategories={props.getCategories} setShowCreate={props.setShowCreate} />
    </div>
  )
}