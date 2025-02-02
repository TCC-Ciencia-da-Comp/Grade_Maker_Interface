import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Flex,
  Grid,
  Input,
  Text,
  Image,
  Select,
  useToast,
} from "@chakra-ui/react";
import imagemPrincipal from "../../assets/ImagemFigma.png";
import { deleteteByIdProf, getDispProf, insertDisponibilidade } from "../../pages/Disponibilidade/service";

const FormDisponibilidade2 = ({
  ano = "",
  PrevDisponibilidade = [],
  days = [], // Dias disponíveis (ex.: segunda, terça)
  turnos = [], // Turnos disponíveis (ex.: manhã, tarde)
  cursos = [], // Lista de cursos
  professores = [], // Lista de professores
}) => {
  const toast = useToast();

  // Estados do componente
  const [disponibilidade, setDisponibilidade] = useState({}); // Disponibilidades selecionadas
  const [anoInput, setAnoInput] = useState(ano); // Ano selecionado
  const [semestreInput, setSemestreInput] = useState(""); // Semestre selecionado
  const [selectedProfessor, setSelectedProfessor] = useState(null); // Professor selecionado

  useEffect(() => {
    const fetchDisponibilidade = async () => {
      try {
        if (!selectedProfessor || !anoInput || !semestreInput) return;

        const resultado = await getDispProf(selectedProfessor.id);

        // Filtra as disponibilidades pelo ano e semestre
        const disponibilidadesFiltradas = resultado.filter(
          (disp) => disp.ano === parseInt(anoInput) && disp.semestre === parseInt(semestreInput)
        );

        // Converte a disponibilidade filtrada para um formato de objeto
        const disponibilidadeFormatada = disponibilidadesFiltradas.reduce((acc, disp) => {
          const dayId = disp.diaSemana.id;
          const periodId = disp.turno.id;

          if (!acc[dayId]) acc[dayId] = {};
          acc[dayId][periodId] = true;

          return acc;
        }, {});

        setDisponibilidade(disponibilidadeFormatada);
      } catch (error) {
        console.log("Erro inesperado: " + error);
      }
    };

    fetchDisponibilidade();
  }, [selectedProfessor, anoInput, semestreInput]);

  const handleToggle = (dayId, periodId) => {
    setDisponibilidade((prevDisponibilidade) => ({
      ...prevDisponibilidade,
      [dayId]: {
        ...prevDisponibilidade[dayId],
        [periodId]: !prevDisponibilidade[dayId]?.[periodId],
      },
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!selectedProfessor) {
      toast({
        title: "Erro",
        description: "Por favor, selecione um professor.",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "top-right",
      });
      return;
    }

    const selecionados = Object.keys(disponibilidade).flatMap((dayId) => {
      const turnosSelecionados = Object.keys(disponibilidade[dayId])
        .filter((periodId) => disponibilidade[dayId][periodId])
        .map((periodId) => ({ dayId, periodId }));
      return turnosSelecionados;
    });

    try {
      await deleteteByIdProf(selectedProfessor.id);

      await Promise.all(
        selecionados.map((disp) =>
          insertDisponibilidade({
            professorId: selectedProfessor.id,
            diaSemanaId: disp.dayId,
            turnoId: disp.periodId,
            ano: anoInput,
            semestre: semestreInput,
          })
        )
      );

      toast({
        title: "Disponibilidade agendada",
        description: "Disponibilidades atualizadas com sucesso.",
        status: "success",
        duration: 5000,
        isClosable: true,
        position: "top-right",
      });
    } catch (error) {
      toast({
        title: "Erro ao marcar",
        description: "Algo deu errado.",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "top-right",
      });
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <Box p={5}>
        <Grid templateColumns="2fr 1fr" gap={6}>
          {/* Coluna 1: Formulário */}
          <Box>
            <Flex align="center" justify="space-between" mb={4}>
              <Box>
                <Text mb={2}>Selecione o professor</Text>
                <Select
                  placeholder="Selecione o professor"
                  onChange={(e) =>
                    setSelectedProfessor(
                      professores.find(
                        (prof) => prof.id === parseInt(e.target.value)
                      )
                    )
                  }
                  value={selectedProfessor?.id || ""}
                  isRequired
                  _focus={{
                    borderColor: "purple",
                    boxShadow: "0 0 0 1px #805AD5",
                  }}
                >
                  {professores.map((prof) => (
                    <option key={prof.id} value={prof.id}>
                      {prof.nome}
                    </option>
                  ))}
                </Select>
              </Box>
              <Box>
                <Text mb={2}>Semestre</Text>
                <Select
                  placeholder="Semestre"
                  id="semestreInput"
                  onChange={(e) => setSemestreInput(e.target.value)}
                  value={semestreInput}
                  isRequired
                  _focus={{
                    borderColor: "purple",
                    boxShadow: "0 0 0 1px #805AD5",
                  }}
                >
                  <option value={1}>Primeiro</option>
                  <option value={2}>Segundo</option>
                </Select>
              </Box>
              <Box>
                <Text mb={2}>Ano</Text>
                <Input
                  _focus={{
                    borderColor: "purple",
                    boxShadow: "0 0 0 1px #805AD5",
                  }}
                  placeholder="Ano"
                  width="100px"
                  value={anoInput}
                  onChange={(e) => setAnoInput(e.target.value)}
                  id="anoInput"
                />
              </Box>
            </Flex>

            {/* Disponibilidade */}
            <Text mb={2}>Disponibilidade</Text>
            <Grid templateColumns={`repeat(${days.length + 1}, 1fr)`} gap={2}>
              <Box></Box>
              {days.map((day) => (
                <Text key={day.id} textAlign="center" fontSize="sm">
                  {day.descricao}
                </Text>
              ))}
              {turnos.map((period) => (
                <React.Fragment key={period.id}>
                  <Text>{period.descricao}</Text>
                  {days.map((day) => (
                    <Button
                      key={`${day.id}-${period.id}`}
                      colorScheme={
                        disponibilidade[day.id]?.[period.id] ? "purple" : "gray"
                      }
                      border="1px solid black"
                      onClick={() => handleToggle(day.id, period.id)}
                    />
                  ))}
                </React.Fragment>
              ))}
            </Grid>
          </Box>

          {/* Coluna 2: Imagem */}
          <Box display="flex" justifyContent="center" alignItems="center">
            <Image
              src={imagemPrincipal}
              alt="Professor working with data"
              boxSize="400px"
            />
          </Box>
        </Grid>
        <Flex justify={"flex-end"} mt={4} pr={320}>
          <Box width={"100px"}>
            <Button
              type="submit"
              width={"100%"}
              color={"white"}
              colorScheme="purple"
              _focus={{
                boxShadow:
                  "0 0 1px 2px rgba(173, 216, 230, .75), 0 1px 1px rgba(0, 0, 0, .15)",
              }}
              _hover={{
                backgroundColor: "purple",
                color: "white",
                transform: "scale(1.1)",
              }}
            >
              Enviar
            </Button>
          </Box>
        </Flex>
      </Box>
    </form>
  );
};

export default FormDisponibilidade2;
