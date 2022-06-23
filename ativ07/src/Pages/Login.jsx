import { onAuthStateChanged, signInWithEmailAndPassword } from 'firebase/auth';
import React, { useState } from 'react'
import { Button, Container, Form } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import MainNavbar from '../Components/MainNavbar'
import { auth } from "../FirebaseConfig"

export default function Login() {

    let navigate = useNavigate();

    onAuthStateChanged(auth, (user) =>{
        if (user) {
            navigate("/")
        }
    })

    const loginSucess = () => {
        toast.success("Logado com Sucesso!", {
            position: toast.POSITION.BOTTOM_RIGHT
        });
    }
    
    const loginErr = (msg) => {
        toast.error("Erro ao logar! : " + msg, {
            position: toast.POSITION.BOTTOM_RIGHT
        });
    }


    const [email, setEmail] = useState("");
    const [pass, setPass] = useState("");

    const submit = async (e) => {
        e.preventDefault();
        signInWithEmailAndPassword(auth, email, pass)
            .then((userCredential) => {
                // Signed in
                const user = userCredential.user;
                loginSucess()
                // ...
            })
            .catch((error) => {
                const errorMessage = error.message;
                loginErr(errorMessage)
            });

    };

    return (
        <div>
            <MainNavbar />
            <Container className="mt-4 w-50">
                <h1> LOGIN </h1>
                <Form>
                    <Form.Group className="mb-4" controlId="formInfo">
                        <Form.Label>Email</Form.Label>
                        <Form.Control type="email" className="mb-2" placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" className="mb-2" placeholder="Password" onChange={(e) => setPass(e.target.value)} />
                    </Form.Group>

                    <Button variant="primary" type="submit" onClick={submit}>
                        Login
                    </Button>
                </Form>
            </Container>
        </div>
    )
}
