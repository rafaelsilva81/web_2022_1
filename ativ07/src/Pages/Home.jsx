import { onAuthStateChanged, signOut } from 'firebase/auth'
import React from 'react'
import { Button, Container } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import MainNavbar from '../Components/MainNavbar'
import { auth } from '../FirebaseConfig'

export default function Home() {

    let navigate = useNavigate();

    onAuthStateChanged(auth, (user) =>{
        if (!user) {
            navigate("/login")
        } 
    })

    const logoff = async (e) => {
        e.preventDefault();
        signOut(auth).then(() => {
          }).catch((error) => {
            console.log(error.message)
        });

    };

    return (
        <div>
            <MainNavbar />
            <Container className="mt-5 w-50">
                <h1 className='text-center'> This is just the homepage!</h1>
                <h6 className='text-center'>  
                    Author : 
                    <a href="https://github.com/rafaelsilva81" target="_blank" rel="noopener noreferrer"> 
                        Rafael Galdino da Silva 
                    </a> 
                </h6>
                <h3 className='text-center'>
                    <Button variant="primary" type="button" onClick={logoff}>
                        Logout
                    </Button>
                </h3>
            </Container>
        </div>
    )
}
