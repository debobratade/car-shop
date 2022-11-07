
import React from 'react'
import { Link } from 'react-router-dom'
import './Profile.css'

const Profile = () => {

    let data = localStorage.getItem('data')
    data = JSON.parse(data)
    
  return (
    <div className='profile'>
      <img src={data.image} alt={data.name}/>
          <h3>{data.name}</h3>
          <article>  {data.email}</article>
          <p>{data.category}</p>
            <button className='butn'>update</button>
      
    </div>
  )
}

export default Profile
