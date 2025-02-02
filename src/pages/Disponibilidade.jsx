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
import { getDisponibilidadeProfessor } from "../service/DisponibilidadeService";
import { getDiaSemana } from "../service/DiaSemanaService";
import { getTurno } from "../service/TurnoService";
import { getProfessor } from "../service/ProfessorService";
import { getCurso } from "../service/CursoService";
import FormDisponibilidade from "../components/forms/FormDisponibilidade/FormDisponibilidade";

export default function Disponibilidade() {
  const [dias, setDias] = useState([]);
  const [turnos, setTurnos] = useState([]);
  const [anoAtual, setAnoAtual] = useState(new Date().getFullYear());
  const [disponibilidade, setDisponibilidade] = useState([]);
  const [cursos, setCursos] = useState([]);
  const [professores, setProfessores] = useState([]);

  useEffect(() => {
    const fetchDias = async () => {
      try {
        const resultado = await getDiaSemana();
        if (resultado && resultado.data && Array.isArray(resultado.data)) {
          const diasAtivos = resultado.data.filter(dia => dia.ativo === 1);
          setDias(diasAtivos);
        } else {
          console.error("Formato de dados inesperado para dias da semana");
        }
      } catch (error) {
        console.error("Erro ao buscar dias:", error);
      }
    };
    fetchDias();
  }, []);

  useEffect(() => {
    const fetchProfessores = async () => {
      try {
        const resultado = await getProfessor();
        if (resultado && Array.isArray(resultado)) {
          setProfessores(resultado);
        } else {
          console.error("Formato de dados inesperado para professores");
        }
      } catch (error) {
        console.error("Erro ao buscar professores:", error);
      }
    };
    fetchProfessores();
  }, []);

  useEffect(() => {
    const fetchCursos = async () => {
      try {
        const resultado = await getCurso();
        if (resultado && Array.isArray(resultado)) {
          setCursos(resultado);
        } else {
          console.error("Formato de dados inesperado para cursos");
        }
      } catch (error) {
        console.error("Erro ao buscar cursos:", error);
      }
    };
    fetchCursos();
  }, []);

  useEffect(() => {
    const fetchTurnos = async () => {
      try {
        const resultado = await getTurno();
        if (resultado && resultado.data && Array.isArray(resultado.data)) {
          const turnosAtivos = resultado.data.filter(turno => turno.ativo === 1);
          setTurnos(turnosAtivos);
        } else {
          console.error("Formato de dados inesperado para turnos");
        }
      } catch (error) {
        console.error("Erro ao buscar turnos:", error);
      }
    };
    fetchTurnos();
  }, []);

  useEffect(() => {
    const fetchDisponibilidade = async () => {
      try {
        const resultado = await getDisponibilidadeProfessor(39);
        if (resultado && Array.isArray(resultado)) {
          setDisponibilidade(resultado);
        } else {
          console.error("Formato de dados inesperado para disponibilidade");
        }
      } catch (error) {
        console.error("Erro ao buscar disponibilidade:", error);
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
            backgroundColor: "purple.500",
            position: "absolute",
            bottom: "-5px",
            left: 0,
          }}
        >
          Disponibilidade do professor
        </Heading>
        <FormDisponibilidade
          ano={anoAtual}
          cursos={cursos}
          days={dias}
          turnos={turnos}
          professores={professores}
        />
      </div>
    </div>
  );
}
