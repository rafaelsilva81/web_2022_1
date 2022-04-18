import React, { useState, useEffect } from "react";
import { Container, Stack, Button, Modal, Form } from "react-bootstrap";
import MainNavbar from "../Components/MainNavbar";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../FirebaseConfig";
import Professor from "../Components/Professor";
import { deleteDoc, doc } from "firebase/firestore";
import { FaEdit, FaTrash } from "react-icons/fa";

export default function ListProfessor() {
  const [profData, setProfData] = useState([]);
  const [show, setShow] = useState(false);
  const [refProf, setRefProf] = useState();

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  useEffect(() => {
    getDocs(collection(db, "professors")).then((querySnapshot) => {
      setProfData(
        querySnapshot.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }))
      );
    });
  }, []);

  const callModal = (id) => {
    setRefProf(profData.find((prof) => prof.id === id));
    handleShow();
  };

  const deleteElement = async (id) => {
    let dialog = window.confirm("Delete this?");
    if (dialog) {
      await deleteDoc(doc(db, "professors", id))
        .then(() => {
          alert("Deleted Succesfully!");
          setProfData(profData.filter((prof) => prof.id !== id)); //Isso é para dar re-render
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
          {profData.map((p) => (
            <Stack direction="horizontal" gap={3}>
              <div>
                <Professor
                  key={p.id}
                  name={p.name}
                  university={p.university}
                  degree={p.degree}
                  id={p.id}
                />
              </div>
              <div>
                <Button variant="warning" onClick={() => callModal(p.id)}>
                  <FaEdit />
                </Button>
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

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Professor</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Container className="mt-4 w-50">
            <Form>
              <Form.Group className="mb-4" controlId="formInfo">
                <Form.Label>Name</Form.Label>
                <Form.Control
                  type="name"
                  className="mb-2"
                  placeholder={refProf.name}
                  onChange={(e) => refProf.name = e}
                />
                <Form.Label>University</Form.Label>
                <Form.Control
                  type="university"
                  className="mb-2"
                  placeholder="Enter your university"
                  defaultValue={refProf.university}
                  onChange={(e) => refProf.university = e}
                />
                <Form.Label>Degree</Form.Label>
                <Form.Control
                  type="degree"
                  className="mb-2"
                  placeholder="Enter your degree"
                  defaultValue={refProf.degree}
                  onChange={(e) => refProf.degree = e}
                />
              </Form.Group>

              <Button variant="primary" type="submit" onClick={''}>
                Submit
              </Button>
            </Form>
          </Container>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
