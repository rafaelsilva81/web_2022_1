import React from 'react'
import { Container } from 'react-bootstrap'
import MainNavbar from '../Components/MainNavbar'

export default function Home() {
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
            </Container>
        </div>
    )
}
