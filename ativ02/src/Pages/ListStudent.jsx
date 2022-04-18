import React, { useState, useEffect } from "react";
import { Container, Stack, Button} from "react-bootstrap";
import MainNavbar from "../Components/MainNavbar";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../FirebaseConfig";
import Professor from "../Components/Professor";
import { deleteDoc, doc } from "firebase/firestore";
import { FaEdit, FaTrash } from "react-icons/fa";
import { LinkContainer } from "react-router-bootstrap";

export default function ListProfessor() {
  const [studentData, setStudentData] = useState([]);
  
  useEffect(() => {
    getDocs(collection(db, "students")).then((querySnapshot) => {
      setStudentData(
        querySnapshot.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }))
      );
    });
  }, []);

  const deleteElement = async (id) => {
    let dialog = window.confirm("Delete this?");
    if (dialog) {
      await deleteDoc(doc(db, "students", id))
        .then(() => {
          alert("Deleted Succesfully!");
          setStudentData(studentData.filter((student) => student.id !== id)); //Isso é para dar re-render
        })
        .catch((err) => {
          alert("Error found : " + err.message);
        });
    }
  };

  return (
    <div>
      <MainNavbar />
      <Container className="mt-4 w-80">
        <h1> List of Professors : </h1>
        <Stack gap={2} className="mt-3">
          {studentData.map((p) => (
            <Stack direction="horizontal" gap={3}>
              <div>
                <Professor
                  key={p.id}
                  name={p.name}
                  university={p.university}
                  course={p.course}
                  id={p.id}
                />
              </div>
              <div>
                <LinkContainer to={"/editStudent/" + p.id}>
                  <Button variant="warning">
                    <FaEdit />
                  </Button>
                </LinkContainer>
              </div>
              <div>
                <Button variant="danger" onClick={() => deleteElement(p.id)}>
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
