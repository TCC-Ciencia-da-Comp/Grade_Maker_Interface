import {
  Box,
  Button,
  Flex,
  Grid,
  Heading,
  Input,
  Text,
  Image,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import React from "react";
import imagemPrincipal from "../../assets/ImagemFigma.png";
import FormDisponibilidade from "../../components/Forms/FormDisponibilidade";
import { getDias, getDispProf, getTurnos } from "./service";

export default function Disponibilidade() {
  const [dias, setDias] = useState([]);
  const [turnos, setTurnos] = useState([]);
  const [anoAtual, setAnoAtual] = useState(new Date().getFullYear());
  const [disponibilidade, setDisponibilidade] = useState([]);

  const professor = {
    id: 39,
    nome:"Eliel Silva da Cruz"
  }


  useEffect(() => {
    const fetchDias = async () => {
      try {
        const resultado = await getDias();
        setDias(resultado.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchDias();
  }, []);

  useEffect(() => {
    const fetchTurnos = async () => {
      try {
        const resultado = await getTurnos();
        setTurnos(resultado.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchTurnos();
  }, []);
 
  useEffect(() => { 
    const fetchDisponibilidade = async () => {
      try {
        const resultado = await getDispProf(39);
        setDisponibilidade(resultado.data)
      } catch (error) {
        console.log("Erro inesperado: " + error);
      }
    };
    fetchDisponibilidade();
  }, []);




  const handleFormChange = (field, value) => {
    console.log(`${field}: ${value}`);
  };

  return (
    <div className="page-container">
      <div className="content-wrapper">
        <Heading
          className="page-title"
          as="h2"
          fontSize="2xl"
          position="relative"
          textAlign="center"
          _after={{
            content: '""',
            display: "block",
            width: "100%",
            height: "5px",
            backgroundColor: "purple.500", // Altere a cor para o desejado
            position: "absolute",
            bottom: "-5px", // Ajuste a posição vertical
            left: 0,
          }}
        >
          Disponibilidade do professor
        </Heading>
        <FormDisponibilidade
          nomeProfessor="João da Silva"
          semestre="5"
          ano={anoAtual}
          disponibilidade={disponibilidade}
          onChange={(field, value) => handleFormChange(field, value)}
          onDisponibilidadeChange={(newDisponibilidade) =>
            setDisponibilidade(newDisponibilidade)
          }
          days={dias}
          turnos={turnos}
          professor={professor}
        />
      </div>
    </div>
  );
}
