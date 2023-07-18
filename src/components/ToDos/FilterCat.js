import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { ImEye, ImEyeBlocked }from 'react-icons/im'

export default function FilterCat(props) {
    const [categories, setCategories] = useState([])

    useEffect(() => {
        axios.get(`https://localhost:7229/api/Categories`).then(response => {
            console.log(response)
            setCategories(response.data)
        })
    }, []);
    
  return (
    <div className='text-center mt-5'>
    <button className="btn btn-outline-success bg-warning text-white m-1" onClick={() => props.setFilter(0)}>
        All
    </button>
    {categories.map(c => 
        <button key={c.categoryId} className="btn btn-outline-success bg-warning text-white m-1" onClick={() => props.setFilter(Number(c.categoryId))}>
            {c.catName}
        </button>
    )}
    
        {!props.showDone ?
            <button className="btn btn-warning text-white m-1" onClick={() => props.setShowDone(!props.showDone)}>
                Show Complete &ensp;<ImEye />
            </button>:
            <button className="btn btn-warning text-white m-1" onClick={() => props.setShowDone(!props.showDone)}>
                Hide Complete &ensp;<ImEyeBlocked/> 
            </button>
        }   
</div>
)
}
