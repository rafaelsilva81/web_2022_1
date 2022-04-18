import React, { useState, useEffect } from 'react'
import { Form, Button, Container } from 'react-bootstrap'
import MainNavbar from '../Components/MainNavbar'
import {getDoc, doc, updateDoc} from 'firebase/firestore'
import {db} from '../FirebaseConfig'
import { useNavigate, useParams } from 'react-router-dom'

export default function EditProfessor() {
  const [prof, setProf] = useState([]);
  const {id} = useParams()
  let navigate = useNavigate();
  
  useEffect(() => {
    const docRef = doc(db, "professors", id);
    getDoc(docRef).then((snapshot) => { 
        let fields = snapshot.data()
        setProf(fields)
        setName(fields.name)
        setUniversity(fields.university)
        setDegree(fields.degree)
    });
  }, [id]);

  const [name, setName] = useState("");
  const [university, setUniversity] = useState("");
  const [degree, setDegree] = useState("");

  const submit = async (e) => {
    e.preventDefault();
    await updateDoc(doc(db, "professors", id), {
        name: name,
        university : university,
        degree : degree
    }).then(() => {
      alert("Edited Succesfully!")
    }).catch((err) => {
      alert("Error found : " + err.message)
    })
  
    setName("");
    setUniversity("");
    setDegree("");

    navigate("/listProfessor")

  };

  return (
    <div>
      <MainNavbar />
      <Container className="mt-4 w-50">
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
