import React, { useState, useEffect } from "react";
import { Container, Stack, Button} from "react-bootstrap";
import MainNavbar from "../Components/MainNavbar";
import { FaEdit, FaTrash } from "react-icons/fa";
import { LinkContainer } from "react-router-bootstrap";
import Student from "../Components/Student";
import api from "../api/api";

export default function ListProfessor() {
  const [studentData, setStudentData] = useState([]);
  
  useEffect(() => {
    api.get("/students").then((res) => {
      setStudentData(res.data)
    })
  }, []);

  const deleteElement = async (id) => {
    let dialog = window.confirm("Delete this?");
    if (dialog) {
      api.delete('/professors/'+id).then(() => {
        alert("Deleted Succesfully!");
        setStudentData(studentData.filter((student) => student._id !== id)); //Isso é para dar re-render
      }).catch((err) => {
        alert("Error deleting : " + err.message)
      });
    }
  };

  return (
    <div>
      <MainNavbar />
      <Container className="mt-4 w-80">
        <h1> List of Students : </h1>
        <Stack gap={2} className="mt-3">
          {studentData.map((p) => (
            <Stack direction="horizontal" gap={3}>
              <div>
                <Student
                  key={p._id}
                  name={p.name}
                  university={p.university}
                  course={p.course}
                  id={p._id}
                />
              </div>
              <div>
                <LinkContainer to={"/editStudent/" + p._id}>
                  <Button variant="warning">
                    <FaEdit />
                  </Button>
                </LinkContainer>
              </div>
              <div>
                <Button variant="danger" onClick={() => deleteElement(p._id)}>
                  <FaTrash />
                </Button>
              </div>
            </Stack>
          ))}
        </Stack>
      </Container>

  
    </div>
  );
}
