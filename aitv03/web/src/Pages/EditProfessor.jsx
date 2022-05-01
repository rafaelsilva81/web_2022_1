import React, { useState, useEffect } from 'react'
import { Form, Button, Container } from 'react-bootstrap'
import MainNavbar from '../Components/MainNavbar'
import { useNavigate, useParams } from 'react-router-dom'
import api from '../api/api'

export default function EditProfessor() {
  const [prof, setProf] = useState([]);
  const {id} = useParams()
  let navigate = useNavigate();
  
  useEffect(() => {
    api.get("/professors/"+id).then((res) => {
      let fields = res.data
      console.log(res)
      setProf(fields)
      setName(fields.name)
      setUniversity(fields.university)
      setDegree(fields.degree)
    })
  }, [id]);

  const [name, setName] = useState("");
  const [university, setUniversity] = useState("");
  const [degree, setDegree] = useState("");

  const submit = async (e) => {
    e.preventDefault();
    api
    .put("/professors", {
      name: name,
      university: university,
      degree: degree,
    })
    .then(function (response) {
      alert("Added Succesfully!");
    })
    .catch(function (err) {
      alert("Error found : " + err.message);
    });
  
    setName("");
    setUniversity("");
    setDegree("");

    navigate("/listProfessor")

  };

  return (
    <div>
      <MainNavbar />
      <Container className="mt-4 w-50">
        <h1> Editing Professor : </h1>
        <Form>
          <Form.Group className="mb-4" controlId="formInfo">
            <Form.Label>Name</Form.Label>
            <Form.Control type="text" className="mb-2" placeholder="Enter your name" defaultValue={prof.name} onChange={(e) => setName(e.target.value)}/>
            <Form.Label>University</Form.Label>
            <Form.Control type="text" className="mb-2" placeholder="Enter your university" defaultValue={prof.university} onChange={(e) => setUniversity(e.target.value)}/>
            <Form.Label>Degree</Form.Label>
            <Form.Control type="text" className="mb-2" placeholder="Enter your degree" defaultValue={prof.degree} onChange={(e) => setDegree(e.target.value)}/>
          </Form.Group>

          <Button variant="primary" type="submit" onClick={submit}>
            Submit
          </Button>
        </Form>
      </Container>
    </div>


  )
}
