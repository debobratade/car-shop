import React from "react";
import './UpdateProduct.css'
import {useState} from 'react'
import { useParams, useNavigate } from "react-router-dom";
import { useEffect } from "react";



const Update_product=()=>{
  
    const [name, setName]= useState('')
    const [price, setPrice]= useState('')
    const [category, setCategory]= useState('')
    const [company, setCompany]= useState('')
    const [image, setImage]= useState('')
    
    const params = useParams()
    const nav = useNavigate()

    useEffect(()=>{
        getProduct()
    },[])


    const getProduct=async()=>{
        let result= await fetch(`http://localhost:5000/productGet/${params.id}`,{
            headers:{
                authorization: `bearer ${JSON.parse(localStorage.getItem('token'))}`
              }
        });
            result=await result.json()
            setName(result.name)
            setPrice(result.price)
            setCategory(result.category)
            setCompany(result.company)
            setImage(result.image)
    }

     const updateProduct= async()=>{
        console.warn(name, price);
        let result= await fetch(`http://localhost:5000/productUpdate/${params.id}`,{
        method:"Put",
        body:JSON.stringify({name, price, category, company, image}),
        headers:{
            'Content-Type':"application/json",
            authorization: `bearer ${JSON.parse(localStorage.getItem('token'))}`
        }
        });
        if(result){
                     alert("Successful")  
                     setName('') 
                     setPrice('') 
                     setCategory('')
                     setCompany('')
                     setImage('')
                     nav('/')
                }
  
     }

    return (
        <div className="box" >
            <h1>Update product</h1>

            <input type='text' placeholder="Enter product name" className="inputProduct"
           value={name} onChange={(e)=>{setName(e.target.value)}}
            />
           
           <input type='text' placeholder="Enter product image" className="inputProduct"
           value={image} onChange={(e)=>{setImage(e.target.value)}}
            />

            <input type='text' placeholder="Enter price" className="inputProduct"
           value={price} onChange={(e)=>{setPrice(e.target.value)}}
            />
            
            <input type='text' placeholder="Enter category" className="inputProduct"
           value={category} onChange={(e)=>{setCategory(e.target.value)}}
            />
            
            <input type='text' placeholder="Enter company" className="inputProduct"
           value={company} onChange={(e)=>{setCompany(e.target.value)}}
            />
            
            <button onClick={updateProduct} className="btn">Update product</button>
        </div>
    )
}

export default Update_product