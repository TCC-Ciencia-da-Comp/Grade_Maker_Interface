import React from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Flex,
  List,
  ListItem,
  Text
} from "@chakra-ui/react";
import useFormCursoLogic from "./FormCursoLogic";
import rightArrow from '../../../assets/icons/seta_simples_roxa_direita.png';
import leftArrow from '../../../assets/icons/seta_simples_roxa_esquerda.png';
import rightArrowD from '../../../assets/icons/seta_dupla_roxa_direita.png';
import leftArrowD from '../../../assets/icons/seta_dupla_roxa_esquerda.png';
import { DeleteIcon } from '@chakra-ui/icons';

const FormCurso = ({ isOpen, onClose, cursoId, initialNome, onSuccess }) => {
  const {
    nome,
    setNome,
    handleSubmit,
    handleCancelar,
    isLoading,
    hasChanges,
    disponiveis,
    selecionadas,
    searchDisponiveis,
    setSearchDisponiveis,
    searchSelecionadas,
    setSearchSelecionadas,
    disponiveisFiltrados,
    selecionadasFiltradas,
    moverParaSelecionadas,
    moverParaDisponiveis,
    moverPrimeiroDisponivel,
    moverPrimeiroSelecionado,
    moverTodosParaSelecionadas,
    moverTodosParaDisponiveis,
    handleDelete,
  } = useFormCursoLogic({ isOpen, onClose, cursoId, initialNome, onSuccess });

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent maxW="1000px">
        <ModalHeader>
          {cursoId ? 'Editar Curso' : 'Adicionar Curso'}
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Box p={4}>
            <form onSubmit={handleSubmit}>
              <FormControl isRequired mb={4}>
                <FormLabel>Nome do Curso</FormLabel>
                <Input
                  value={nome}
                  onChange={(e) => setNome(e.target.value)}
                  placeholder="Nome do curso"
                />
              </FormControl>

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
                            color="gray.50"
                            _hover={{
                              backgroundColor: "gray.50",
                              color: "black",
                            }}
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
                            color="gray.50"
                            _hover={{
                              backgroundColor: "gray.50",
                              color: "black",
                            }}
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

              <Flex gap={4} justify="space-between" mt={4}>
                {cursoId && (
                  <Button 
                    colorScheme="red"
                    onClick={handleDelete}
                    isLoading={isLoading}
                    leftIcon={<DeleteIcon />}
                  >
                    Excluir
                  </Button>
                )}
                <Flex gap={2} ml="auto">
                  <Button 
                    colorScheme="purple" 
                    variant="outline"
                    onClick={handleCancelar}
                  >
                    Cancelar
                  </Button>
                  <Button 
                    type="submit" 
                    colorScheme="purple"
                    isLoading={isLoading}
                    isDisabled={!hasChanges}
                  >
                    {cursoId ? 'Atualizar' : 'Salvar'}
                  </Button>
                </Flex>
              </Flex>
            </form>
          </Box>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default FormCurso; 