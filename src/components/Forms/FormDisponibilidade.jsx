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
  List,
  ListItem,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import React from "react";
import imagemPrincipal from "../../assets/ImagemFigma.png";
import {
  deleteteByIdProf,
  getDispProf,
  insertDisponibilidade,
} from "../../pages/Disponibilidade/service";

// Componente principal para o formulário de professor
const FormDisponibilidade = ({
  nomeProfessor = "",
  semestre = "",
  ano = "",
  PrevDisponibilidade = [],
  onChange,
  onDisponibilidadeChange,
  days = [],
  turnos = [],
  professor = { id: null, nome: "" },
}) => {
  const toast = useToast();
  const [disponibilidade, setDisponibilidade] = useState([]);
  const [disponiveis, setDisponiveis] = useState([
    "Estrutura de Dados",
    "Matemática",
    "Teoria Grafos",
    "Eng. Requisitos",
  ]);
  const [selecionadas, setSelecionadas] = useState(["Matemática", "Teoria Grafos"]);
  const [anoInput, setAnoInput] = useState(ano);
  const [semestreInput, setSemestreInput] = useState("");

  useEffect(() => {
    const fetchDisponibilidade = async () => {
      try {
        const resultado = await getDispProf(professor.id || 0);
        resultado.forEach((res) => {
          console.log(res.diaSemanaId);
        });
      } catch (error) {
        console.log("Erro inesperado: " + error);
      }
    };
    fetchDisponibilidade();
  }, [professor.id]);

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

    const selecionados = Object.keys(disponibilidade).flatMap((dayId) => {
      const turnosSelecionados = Object.keys(disponibilidade[dayId])
        .filter((periodId) => disponibilidade[dayId][periodId])
        .map((periodId) => ({ dayId, periodId }));
      return turnosSelecionados;
    });

    try {
      await deleteteByIdProf(professor.id);

      selecionados.forEach((disp) => {
        const objectDisponibilidade = {
          professorId: professor.id,
          diaSemanaId: disp.dayId,
          turnoId: disp.periodId,
          ano: anoInput,
          semestre: semestreInput,
        };
        insertDisponibilidade(objectDisponibilidade);
      });

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
        title: "Erro ao marcar ",
        description: "Algo deu errado.",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "top-right",
      });
    }
  };

  const moverParaSelecionadas = (item) => {
    setDisponiveis(disponiveis.filter((disciplina) => disciplina !== item));
    setSelecionadas([...selecionadas, item]);
  };

  const moverParaDisponiveis = (item) => {
    setSelecionadas(selecionadas.filter((disciplina) => disciplina !== item));
    setDisponiveis([...disponiveis, item]);
  };

  const handleCancelar = () => {
    setDisponiveis(["Estrutura de Dados", "Matemática", "Teoria Grafos", "Eng. Requisitos"]);
    setSelecionadas([]);
  };

  return (
    <form onSubmit={handleSubmit}>
      <Box p={5}>
        <Grid templateColumns="2fr 1fr" gap={6}>
          {/* Coluna 1: Formulário */}
          <Box>
            <Flex align="center" justify="space-between" mb={4}>
              <Box>
                <Text mb={2}>Nome do professor</Text>
                <Input
                  placeholder="Nome do professor"
                  width="400px"
                  value={professor.nome}
                  readOnly
                  _focus={{
                    borderColor: "purple",
                    boxShadow: "0 0 0 1px #805AD5",
                  }}
                />
              </Box>
              <Box>
                <Text mb={2}>Semestre</Text>
                <Select
                  placeholder="Semestre"
                  id="semestreInput"
                  isRequired
                  value={semestreInput}
                  onChange={(e) => setSemestreInput(e.target.value)}
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
                  placeholder="Ano"
                  width="100px"
                  value={anoInput}
                  onChange={(e) => setAnoInput(e.target.value)}
                  id="anoInput"
                  _focus={{
                    borderColor: "purple",
                    boxShadow: "0 0 0 1px #805AD5",
                  }}
                />
              </Box>
            </Flex>

            <Text mb={2}>Disponibilidade</Text>
            <Grid templateColumns={`repeat(${days.length + 1}, 1fr)`} gap={2}>
              <Box></Box>
              {days.map((day) => (
                <Text key={day.descricao} textAlign="center" fontSize="sm">
                  {day.descricao.slice(0, 3)}
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
                    ></Button>
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

        {/* Gerenciamento de disciplinas */}
        <Box mt={8}>
          <Text fontSize="lg" fontWeight="bold" mb={4}>
            Disciplinas
          </Text>
          <Flex align="center" justify="center" gap={4}>
            <Box border="1px solid black" p={3} borderRadius="5px" width="200px" height="250px" overflow="auto">
              <Text fontWeight="bold" mb={2}>
                Disponíveis
              </Text>
              <List>
                {disponiveis.map((disciplina, index) => (
                  <ListItem key={index}>
                    <Button
                      size="sm"
                      variant="outline"
                      width="100%"
                      onClick={() => moverParaSelecionadas(disciplina)}
                    >
                      {disciplina}
                    </Button>
                  </ListItem>
                ))}
              </List>
            </Box>

            <Flex direction="column" justify="center" align="center" gap={2}>
              <Button onClick={() => disponiveis.length > 0 && moverParaSelecionadas(disponiveis[0])}>→</Button>
              <Button onClick={() => selecionadas.length > 0 && moverParaDisponiveis(selecionadas[0])}>←</Button>
            </Flex>

            <Box border="1px solid black" p={3} borderRadius="5px" width="200px" height="250px" overflow="auto">
              <Text fontWeight="bold" mb={2}>
                Selecionadas
              </Text>
              <List>
                {selecionadas.map((disciplina, index) => (
                  <ListItem key={index}>
                    <Button
                      size="sm"
                      variant="outline"
                      width="100%"
                      onClick={() => moverParaDisponiveis(disciplina)}
                    >
                      {disciplina}
                    </Button>
                  </ListItem>
                ))}
              </List>
            </Box>
          </Flex>
        </Box>

        <Flex justify="center" mt={4} gap={4}>
          <Button colorScheme="blue" type="submit">Confirmar</Button>
          <Button colorScheme="red" onClick={handleCancelar}>Cancelar</Button>
        </Flex>
      </Box>
    </form>
  );
};

export default FormDisponibilidade;
