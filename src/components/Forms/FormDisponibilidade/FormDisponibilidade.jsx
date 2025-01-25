// Componente atualizado
import React from "react";
import {
  Box,
  Button,
  Flex,
  Grid,
  Input,
  Text,
  Image,
  Select,
  List,
  ListItem,
} from "@chakra-ui/react";
import useFormDisponibilidadeLogic from "./useFormDisponibilidadeLogic";
import imagemPrincipal from "../../../assets/ImagemFigma.png";

const FormDisponibilidade = ({ ano, days = [], turnos = [], professores = [], cursos = [] }) => {
  const {
    disponibilidade,
    anoInput,
    setAnoInput,
    semestreInput,
    setSemestreInput,
    selectedProfessor,
    setSelectedProfessor,
    selectedCurso,
    setSelectedCurso,
    disponiveis,
    selecionadas,
    moverParaSelecionadas,
    moverParaDisponiveis,
    handleCancelarAlteracoes,
    handleToggle,
    handleSubmit,
    hasChanges,
  } = useFormDisponibilidadeLogic(ano, professores, cursos);

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
                  {day?.descricao?.slice(0, 3)}
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

        {/* Seleção de Curso */}
        <Flex align="center" mb={4}>
          <Text mr={4}>Cursos</Text>
          <Select
            placeholder="Selecione o Curso"
            width="400px"
            value={selectedCurso || ""}
            onChange={(e) => setSelectedCurso(e.target.value)}
            _focus={{
              borderColor: "purple",
              boxShadow: "0 0 0 1px #805AD5",
            }}
          >
            {cursos.map((curso) => (
              <option key={curso.id} value={curso.id}>
                {curso.nome}
              </option>
            ))}
          </Select>
        </Flex>

        {/* Listas de Disciplinas */}
        <Flex align="center" justify="center" gap={4} mt={4}>
          <Box
            border="1px solid black"
            p={3}
            borderRadius="5px"
            width="200px"
            height="250px"
            overflow="auto"
          >
            <Text fontWeight="bold" mb={2}>
              Disponíveis
            </Text>
            <List>
              {disponiveis.map((disciplina) => (
                <ListItem key={disciplina.id}>
                  <Button
                    size="sm"
                    variant="outline"
                    width="100%"
                    onClick={() => moverParaSelecionadas(disciplina)}
                  >
                    {disciplina.nome}
                  </Button>
                </ListItem>
              ))}
            </List>
          </Box>
          <Flex direction="column" align="center" gap={2}>
            <Button
              onClick={() =>
                disponiveis.length > 0 &&
                moverParaSelecionadas(disponiveis[0])
              }
            >
              →
            </Button>
            <Button
              onClick={() =>
                selecionadas.length > 0 &&
                moverParaDisponiveis(selecionadas[0])
              }
            >
              ←
            </Button>
          </Flex>
          <Box
            border="1px solid black"
            p={3}
            borderRadius="5px"
            width="200px"
            height="250px"
            overflow="auto"
          >
            <Text fontWeight="bold" mb={2}>
              Selecionadas
            </Text>
            <List>
              {selecionadas.map((disciplina) => (
                <ListItem key={disciplina.id}>
                  <Button
                    size="sm"
                    variant="outline"
                    width="100%"
                    onClick={() => moverParaDisponiveis(disciplina)}
                  >
                    {disciplina.nome}
                  </Button>
                </ListItem>
              ))}
            </List>
          </Box>
        </Flex>

        <Flex justify="flex-end" mt={4} pr={320} gap={4}>
          <Box width="100px">
            <Button
              type="button"
              width="100%"
              colorScheme="red"
              onClick={handleCancelarAlteracoes}
              isDisabled={!hasChanges} // Desativa se não houver alterações
              _focus={{
                boxShadow: "0 0 1px 2px rgba(255, 99, 71, .75), 0 1px 1px rgba(0, 0, 0, .15)",
              }}
              _hover={{
                backgroundColor: "red.500",
                color: "white",
                transform: "scale(1.1)",
              }}
            >
              Cancelar
            </Button>
          </Box>
          <Box width="100px">
            <Button
              type="submit"
              width="100%"
              colorScheme="purple"
              isDisabled={!hasChanges} // Só fica ativo se houver alterações
              _focus={{
                boxShadow: "0 0 1px 2px rgba(173, 216, 230, .75), 0 1px 1px rgba(0, 0, 0, .15)",
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

export default FormDisponibilidade;
