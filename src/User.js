import React from 'react'

export default function User(props) {
    return (
        <div>
             
               <p> {props.name}</p>
              <p>  {props.email}</p>
               <p> {props.phone}</p>
            
        </div>
    )
}
