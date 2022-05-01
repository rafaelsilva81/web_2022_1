import React, { useState, useEffect } from "react";
import { Container, Stack, Button} from "react-bootstrap";
import MainNavbar from "../Components/MainNavbar";
import Professor from "../Components/Professor";
import { FaEdit, FaTrash } from "react-icons/fa";
import { LinkContainer } from "react-router-bootstrap";
import api from "../api/api";

export default function ListProfessor() {
  const [profData, setProfData] = useState([]);
  
  useEffect(() => {
    api.get("/professors").then((res) => {
      console.log(res.data)
      setProfData(res.data)
    })
  }, []);

  const deleteElement = async (id) => {
    let dialog = window.confirm("Delete this?");
    if (dialog) {
      api.delete('/professors/'+id).then(() => {
        alert("Deleted Succesfully!");
        setProfData(profData.filter((prof) => prof._id !== id)); //Isso é para dar re-render
      }).catch((err) => {
        alert("Error deleting : " + err.message)
      });
    }
  };

  return (
    <div>
      <MainNavbar />
      <Container className="mt-4 w-80">
        <h1> List of Professors : </h1>
        <Stack gap={2} className="mt-3">
          {profData.map((p) => (
            <Stack direction="horizontal" gap={3}>
              <div>
                <Professor
                  key={p._id}
                  name={p.name}
                  university={p.university}
                  degree={p.degree}
                  id={p._id}
                />
              </div>
              <div>
                <LinkContainer to={"/editProfessor/" + p._id}>
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
