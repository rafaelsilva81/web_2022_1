import React, { useState, useEffect } from 'react'
import { Container, Stack } from 'react-bootstrap'
import MainNavbar from '../Components/MainNavbar'
import { collection, getDocs } from 'firebase/firestore'
import { db } from '../FirebaseConfig'
import Student from "../Components/Student"

export default function ListStudent() {
  const [profData, setProfData] = useState([]);

  useEffect(() => {
    getDocs(collection(db, "students"))
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
        <h2> List of Students : </h2>
        <Stack gap={2} className="mt-3">
          {profData.map((s) => (
            <Student key={s.id} name={s.name} university={s.university} course={s.course} />
          ))}
        </Stack>
      </Container>

    </div>
  )
}
