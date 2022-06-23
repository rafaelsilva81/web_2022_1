import React, { useState, useEffect } from 'react'
import { Form, Button, Container } from 'react-bootstrap'
import MainNavbar from '../Components/MainNavbar'
import {getDoc, doc, updateDoc} from 'firebase/firestore'
import {auth, db} from '../FirebaseConfig'
import { useNavigate, useParams } from 'react-router-dom'
import { onAuthStateChanged } from 'firebase/auth'

export default function EditStudent() {

  let navigate = useNavigate();

  onAuthStateChanged(auth, (user) =>{
    if (!user) {
      navigate("/login")
    }
  })


  const [student, setStudent] = useState([]);
  const {id} = useParams()
  
  useEffect(() => {
    const docRef = doc(db, "students", id);
    getDoc(docRef).then((snapshot) => { 
        let fields = snapshot.data()
        setStudent(fields)
        setName(fields.name)
        setUniversity(fields.university)
        setCourse(fields.degree)
    });
  }, [id]);

  const [name, setName] = useState("");
  const [university, setUniversity] = useState("");
  const [course, setCourse] = useState("");

  const submit = async (e) => {
    e.preventDefault();
    await updateDoc(doc(db, "students", id), {
        name: name,
        university : university,
        course : course
    }).then(() => {
      alert("Edited Succesfully!")
    }).catch((err) => {
      alert("Error found : " + err.message)
    })
  
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
