import React from 'react'
import styles from './InputControlComponents.module.css'
const InputControlComponents = (props) => {
  return (
    <div className={styles.container}>
      {props.label && <label>{props.label}</label>}
      <input  {...props}/>
    </div>
  )
}

export default InputControlComponents
