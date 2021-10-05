import React from 'react'
import './App.css'

export default function Click(props) {
  return (
    <div className="App">
      <h1>{props.first_name} {props.last_name} </h1>
      <p style={{fontSize: '23px'}}>POSITION:</p>
      <p>{props.position}</p>
      <p style={{fontSize: '23px'}}>TEAM:</p>
      <p>{props.full_name}</p>
      <p style={{fontSize: '23px'}}>DIVISION:</p>
      <p>{props.division}</p>
      <a href="#" onClick={props.close}>Back To Search Page</a>
    </div>

  )
}