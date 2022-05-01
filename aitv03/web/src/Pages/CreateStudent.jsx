import React, { useState } from 'react'
import { Form, Button, Container } from 'react-bootstrap'
import MainNavbar from '../Components/MainNavbar'
import api from '../api/api'

export default function CreateStudent() {


  const [name, setName] = useState("");
  const [university, setUniversity] = useState("");
  const [course, setCourse] = useState("");

  const submit = (e) => {
    e.preventDefault();
    api
    .post("/students", {
      name: name,
      university: university,
      course: course,
    })
    .then(function (response) {
      alert("Added Succesfully!");
    })
    .catch(function (err) {
      alert("Error found : " + err.message);
    });
  
    setName("");
    setUniversity("");
    setCourse("");
  };
  
  return (
    <div>
    <MainNavbar />
    <Container className="mt-4 w-50">
      <Form>
        <Form.Group className="mb-4" controlId="formInfo">
          <Form.Label>Name</Form.Label>
          <Form.Control type="text" className="mb-2" placeholder="Enter your name"  onChange={(e) => setName(e.target.value)}/>
          <Form.Label>University</Form.Label>
          <Form.Control type="text" className="mb-2" placeholder="Enter your university" onChange={(e) => setUniversity(e.target.value)}/>
          <Form.Label>Course</Form.Label>
          <Form.Control type="text" className="mb-2" placeholder="Enter your course" onChange={(e) => setCourse(e.target.value)}/>
        </Form.Group>

        <Button variant="primary" type="submit" onClick={submit}>
          Submit
        </Button>
      </Form>
    </Container>
  </div>

  )
}
