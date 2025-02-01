import React from "react";
import {
  Box,
  Button,
  Flex,
  Grid,
  Input,
  Text,
  Select,
  List,
  ListItem,
} from "@chakra-ui/react";
import useFormDisponibilidadeLogic from "./FormDisponibilidadeLogic";
import rightArrow from '../../../assets/icons/seta_simples_roxa_direita.png';
import leftArrow from '../../../assets/icons/seta_simples_roxa_esquerda.png';
import rightArrowD from '../../../assets/icons/seta_dupla_roxa_direita.png';
import leftArrowD from '../../../assets/icons/seta_dupla_roxa_esquerda.png';

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
    handleToggle,
    handleSubmit,
    searchDisponiveis,
    setSearchDisponiveis,
    searchSelecionadas,
    setSearchSelecionadas,
    disponiveisFiltrados,
    selecionadasFiltradas,
    moverPrimeiroDisponivel,
    moverPrimeiroSelecionado,
    moverTodosParaSelecionadas,
    moverTodosParaDisponiveis,
    handleAnoChange,
    handleCancelarAlteracoes,
    hasChanges,
  } = useFormDisponibilidadeLogic(ano, professores, cursos, days, turnos);

  // Ordena os arrays de dias e turnos pelo ID
  const sortedDays = [...days].sort((a, b) => a.id - b.id);
  const sortedTurnos = [...turnos].sort((a, b) => a.id - b.id);

  return (
    <form onSubmit={handleSubmit}>
      <Box p={5} maxWidth="1200px" mx="auto">
        {/* Formulário Superior */}
        <Flex align="center" justify="space-between" mb={4} px={10}>  
          <Box>
            <Text mb={2} fontSize={18}>Selecione o professor</Text>
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
            <Text mb={2} fontSize={18}>Semestre</Text>
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

        {/* Tabela de Disponibilidade */}
        <Box px={10} mb={10}>
          <Text mb={4} mt={14} fontFamily="serif" fontSize={20} textAlign="center">
            Disponibilidade
          </Text>
          <Grid 
            templateColumns={`repeat(${sortedDays.length + 1}, 1fr)`} 
            gap={2} 
            border="2px" 
            borderRadius={10} 
            padding="5px"
            maxWidth="800px"
            mx="auto"
          >
            <Box></Box>
            {sortedDays.map((day) => (
              <Text key={day.id} textAlign="center" fontSize="sm">
                {day?.descricao?.slice(0,3)}
              </Text>
            ))}
            {sortedTurnos.map((period) => (
              <React.Fragment key={period.id}>
                <Text>{period.descricao}</Text>
                {sortedDays.map((day) => (
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

        {/* Seleção de Curso */}
        <Box px={10}>
          <Flex align="center" mb={10} >
            <Text mr={4} fontSize={18}>Cursos </Text>
            <Select
              placeholder="Selecione o Curso"
              width="350px"
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
          <Flex gap={4} mt={4} justify="center">
            <Box>
              <Text fontWeight="bold" mb={2}>
                Disponíveis
              </Text>
              <Input
                placeholder="Pesquisar disciplinas..."
                mb={2}
                value={searchDisponiveis}
                onChange={(e) => setSearchDisponiveis(e.target.value)}
                _focus={{
                  borderColor: "purple",
                  boxShadow: "0 0 0 1px #805AD5",
                }}
              />
              <Box
                p={3}
                width="350px"
                height="250px"
                overflow="auto"
                border="1px solid black"
                borderRadius="5px"
              >
                <List>
                  {disponiveisFiltrados.map((disciplina) => (
                    <ListItem key={disciplina.id}>
                      <Button
                        size="sm"
                        variant="outline"
                        width="100%"
                        color="black"
                        onClick={() => moverParaSelecionadas(disciplina)}
                      >
                        {disciplina.nome}
                      </Button>
                    </ListItem>
                  ))}
                </List>
              </Box>
            </Box>

            <Flex direction="column" align="center" justify="center" gap={2} marginTop={20}>
              <Button
                color="black"
                onClick={moverTodosParaSelecionadas}
                p={2}
              >
                <img src={rightArrowD} alt="Mover todos para direita" width="15px" height="15px" />
              </Button>
              <Button
                color="black"
                onClick={moverPrimeiroDisponivel}
                p={2}
              >
                <img src={rightArrow} alt="Mover para direita" width="15px" height="15px" />
              </Button>
              <Button
                color="black"
                onClick={moverPrimeiroSelecionado}
                p={2}
              >
                <img src={leftArrow} alt="Mover para esquerda" width="15px" height="15px" />
              </Button>
              <Button
                color="black"
                onClick={moverTodosParaDisponiveis}
                p={2}
              >
                <img src={leftArrowD} alt="Mover todos para esquerda" width="15px" height="15px" />
              </Button>
            </Flex>

            <Box>
              <Text fontWeight="bold" mb={2}>
                Selecionadas
              </Text>
              <Input
                placeholder="Pesquisar disciplinas..."
                mb={2}
                value={searchSelecionadas}
                onChange={(e) => setSearchSelecionadas(e.target.value)}
                _focus={{
                  borderColor: "purple",
                  boxShadow: "0 0 0 1px #805AD5",
                }}
              />
              <Box
                border="1px solid black"
                p={3}
                borderRadius="5px"
                width="350px"
                height="250px"
                overflow="auto"
              >
                <List>
                  {selecionadasFiltradas.map((disciplina) => (
                    <ListItem key={disciplina.id}>
                      <Button
                        size="sm"
                        variant="outline"
                        width="100%"
                        color="black"
                        onClick={() => moverParaDisponiveis(disciplina)}
                      >
                        {disciplina.nome}
                      </Button>
                    </ListItem>
                  ))}
                </List>
              </Box>
            </Box>
          </Flex>
        </Box>

        {/* Botão Enviar */}
        <Flex justify="right" mt={10}>
          <Button
            type="submit"
            width="100px"
            color="white"
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
        </Flex>
        
        <Flex justify="left" mt={-10}>
          <Button
            type="reset"
            width="100px"
            color="white"
            colorScheme="purple"
            onClick={handleCancelarAlteracoes}
            isDisabled={!hasChanges} // Desativa se não houver alterações
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
            Cancelar
          </Button>
        </Flex>
      </Box>
    </form>
  );
};

export default FormDisponibilidade;

