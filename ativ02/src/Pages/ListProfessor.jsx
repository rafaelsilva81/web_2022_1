import React, { useState, useEffect } from 'react'
import { Container, Stack } from 'react-bootstrap'
import MainNavbar from '../Components/MainNavbar'
import { collection, getDocs } from 'firebase/firestore'
import { db } from '../FirebaseConfig'
import Professor from "../Components/Professor"

export default function ListProfessor() {
  const [profData, setProfData] = useState([]);

  useEffect(() => {
    getDocs(collection(db, "professors"))
      .then((querySnapshot) => {
        setProfData(
          querySnapshot.docs.map((doc) => ({
            ...doc.data(),
            id: doc.id
          }))
        );
      })
  }, []);

  return (
    <div>
      <MainNavbar />
      <Container className="mt-4 w-80">
        <h1> List of Professors : </h1>
        <Stack gap={2} className="mt-3">
          {profData.map((p) => (
            <Professor key={p.id} name={p.name} university={p.university} degree={p.degree} />
          ))}
        </Stack>
      </Container>

    </div>
  )
}
