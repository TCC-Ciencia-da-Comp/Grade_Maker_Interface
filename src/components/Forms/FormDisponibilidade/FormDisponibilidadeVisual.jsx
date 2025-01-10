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
} from "@chakra-ui/react";
import useFormDisponibilidadeLogic from "./useFormDisponibilidadeLogic";
import imagemPrincipal from "../../../assets/ImagemFigma.png";


const FormDisponibilidadeVisual = ({
  ano,
  days = [],
  turnos = [],
  professores = [],
}) => {
  const {
    disponibilidade,
    anoInput,
    setAnoInput,
    semestreInput,
    setSemestreInput,
    selectedProfessor,
    setSelectedProfessor,
    handleToggle,
    handleSubmit,
  } = useFormDisponibilidadeLogic(ano, professores);

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

export default FormDisponibilidadeVisual;

