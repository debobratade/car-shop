import React from "react";
import './Add_product.css'
import {useState} from 'react'


const Add_product=()=>{
  
    const [name, setName]= useState('')
    const [price, setPrice]= useState('')
    const [category, setCategory]= useState('')
    const [company, setCompany]= useState('')
    const [image, setImage]= useState('')
    const [error, setError]= useState(false)

    const addProduct= async()=>{
        console.warn(name, price, category, company)

        if(!name || !price || !category || !company || !image){
            setError(true)
            return false
        }

        const userId =JSON.parse(localStorage.getItem('woner'))._id
        
        let result= await fetch('http://localhost:5000/addProduct', {
            method: 'post',
            body: JSON.stringify({name, price, category, company, image, userId}),
            headers:{
                'Content-Type':'application/json',
                authorization: `bearer ${JSON.parse(localStorage.getItem('token'))}`
            }

        })
       

        if(result){
             alert("Successful")  
             setName('')
             setPrice('') 
             setCategory('')
             setCompany('')
             setImage('')
        }
    }

    return (
        <div className="box" >
            <h1>Add product</h1>

            <input type='text' placeholder="Enter product name" className="inputProduct"
           value={name} onChange={(e)=>{setName(e.target.value)}}
            />
           {error && !name && <span className="invalid-input">Enter valid name</span>}

           <input type='text' placeholder="Enter product image" className="inputProduct"
           value={image} onChange={(e)=>{setImage(e.target.value)}}
            />
           {error && !image && <span className="invalid-input">Enter image url</span>}

            <input type='text' placeholder="Enter price" className="inputProduct"
           value={price} onChange={(e)=>{setPrice(e.target.value)}}
            />
             {error && !price && <span className="invalid-input">Enter price</span>}

            <input type='text' placeholder="Enter category" className="inputProduct"
           value={category} onChange={(e)=>{setCategory(e.target.value)}}
            />
             {error && !category && <span className="invalid-input">Enter category</span>}

            <input type='text' placeholder="Enter company" className="inputProduct"
           value={company} onChange={(e)=>{setCompany(e.target.value)}}
            />
             {error && !company && <span className="invalid-input">Enter company</span>}

            <button onClick={addProduct} className="btn">Add product</button>
        </div>
    )
}

export default Add_product