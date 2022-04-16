import React from 'react'

export default function Student(props) {
  const {name, university, course} = props
  console.log(name)
  return (
    <div>
        <h4> {name} </h4>
        {university} — {course}
    </div>
  )
}
