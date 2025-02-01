import { Center, Heading } from '@chakra-ui/react'
import Api from '../service/Api'
import { useEffect } from 'react';
import React from 'react';


function Home(){

  useEffect(() => {
    const fetchDias = async () => {
      try {
            console.log("teste")
            const resultado = await Api.get('/dia_semana')
            console.log(resultado)
          } catch (error) {
            console.log(error);
          }
        };
        fetchDias();
      }, []);
      return (
        <Center flexDirection="column">
        <Heading
          className="page-title"
          as="h2"
          fontSize="4xl"
          position="relative"
          textAlign="center"
          _after={{
            content: '""',
            display: "block",
            width: "100%",
            height: "7px",
            backgroundColor: "purple.500",
            position: "absolute",
            bottom: "-5px",
            left: 0,
          }}
        >
          Home
        </Heading>
        </Center>
    )
}

export default Home