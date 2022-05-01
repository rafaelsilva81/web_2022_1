import React, { useState, useEffect } from 'react'
import { Form, Button, Container } from 'react-bootstrap'
import MainNavbar from '../Components/MainNavbar'
import { useNavigate, useParams } from 'react-router-dom'
import api from '../api/api'

export default function EditStudent() {
  const [student, setStudent] = useState([]);
  const {id} = useParams()
  let navigate = useNavigate();
  
  useEffect(() => {
    api.get("/students/"+id).then((res) => {
      let fields = res.data
      console.log(res)
      setStudent(fields)
      setName(fields.name)
      setUniversity(fields.university)
      setCourse(fields.degree)
    })
  }, [id]);

  const [name, setName] = useState("");
  const [university, setUniversity] = useState("");
  const [course, setCourse] = useState("");

  const submit = async (e) => {
    e.preventDefault();
    api
    .put("/students", {
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

    navigate("/listStudents")

  };

  return (
    <div>
      <MainNavbar />
      <Container className="mt-4 w-50">
        <h1> Editing Student : </h1>
        <Form>
          <Form.Group className="mb-4" controlId="formInfo">
            <Form.Label>Name</Form.Label>
            <Form.Control type="text" className="mb-2" placeholder="Enter your name" defaultValue={student.name} onChange={(e) => setName(e.target.value)}/>
            <Form.Label>University</Form.Label>
            <Form.Control type="text" className="mb-2" placeholder="Enter your university" defaultValue={student.university} onChange={(e) => setUniversity(e.target.value)}/>
            <Form.Label>Course</Form.Label>
            <Form.Control type="text" className="mb-2" placeholder="Enter your course" defaultValue={student.course} onChange={(e) => setCourse(e.target.value)}/>
          </Form.Group>

          <Button variant="primary" type="submit" onClick={submit}>
            Submit
          </Button>
        </Form>
      </Container>
    </div>


  )
}
