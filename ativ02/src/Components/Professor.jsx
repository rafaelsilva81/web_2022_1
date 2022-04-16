import React from 'react'

export default function Professor(props) {
  const {name, university, degree} = props
  console.log(name)
  return (
    <div>
        <h4> {name} </h4>
        {university} — {degree}
    </div>
  )
}
