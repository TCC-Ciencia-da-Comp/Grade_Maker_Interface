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
  Select,
  Flex,
  Text,
  List,
  ListItem,
} from "@chakra-ui/react";
import useFormTurmaLogic from "./FormTurmaLogic";
import { DeleteIcon } from '@chakra-ui/icons';

const FormTurma = ({ isOpen, onClose, turmaId, initialData, onSuccess, cursos, turnos }) => {
  const {
    nome, setNome,
    curso, setCurso,
    turno, setTurno,
    semestre, setSemestre,
    ano, setAno,
    handleSubmit,
    handleCancelar,
    handleDelete,
    isLoading,
    hasChanges,
    searchDisponiveis, setSearchDisponiveis,
    searchSelecionadas, setSearchSelecionadas,
    disponiveisFiltrados,
    selecionadasFiltradas,
    moverParaSelecionadas,
    moverParaDisponiveis,
  } = useFormTurmaLogic({ isOpen, onClose, turmaId, initialData, onSuccess, cursos });

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="xl">
      <ModalOverlay />
      <ModalContent maxW="900px">
        <ModalHeader>
          {turmaId ? 'Editar Turma' : 'Adicionar Turma'}
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Box p={4}>
            <form onSubmit={handleSubmit}>
              <FormControl isRequired mb={4}>
                <FormLabel>Nome da Turma</FormLabel>
                <Input
                  value={nome}
                  onChange={(e) => setNome(e.target.value)}
                  placeholder="Nome da turma"
                />
              </FormControl>

              <FormControl isRequired mb={4}>
                <FormLabel>Curso</FormLabel>
                <Select
                  value={curso}
                  onChange={(e) => setCurso(e.target.value)}
                  placeholder="Selecione o curso"
                >
                  {cursos?.map((curso) => (
                    <option key={curso.id} value={curso.id}>
                      {curso.nome}
                    </option>
                  ))}

                </Select>
              </FormControl>

              <FormControl isRequired mb={4}>
                <FormLabel>Turno</FormLabel>
                <Select
                  value={turno}
                  onChange={(e) => setTurno(e.target.value)}
                  placeholder="Selecione o turno"
                >
                  {turnos?.filter(turno => turno.ativo === 1).map((turno) => (
                    <option key={turno.id} value={turno.id}>
                      {turno.descricao}
                    </option>
                  ))}
                </Select>
              </FormControl>

              <FormControl isRequired mb={4}>
                <FormLabel>Semestre</FormLabel>
                <Select
                  value={semestre}
                  onChange={(e) => setSemestre(e.target.value)}
                  placeholder="Selecione o semestre"
                >
                  <option value="1">Primeiro</option>
                  <option value="2">Segundo</option>
                </Select>
              </FormControl>

              <FormControl isRequired mb={4}>
                <FormLabel>Ano</FormLabel>
                <Input
                  type="number"
                  value={ano}
                  onChange={(e) => setAno(e.target.value)}
                  placeholder="Ano"
                />
              </FormControl>

              {curso && cursos?.find(c => c.id === parseInt(curso))?.disciplinas && (
                <Box mt={6}>
                  <Text fontSize="lg" fontWeight="bold" mb={4}>
                    Selecione as Disciplinas
                  </Text>
                  <Flex gap={4}>
                    <Box flex={1}>
                      <Text fontWeight="bold" mb={2}>
                        Disciplinas Disponíveis
                      </Text>
                      <Input
                        placeholder="Pesquisar disciplinas..."
                        mb={2}
                        value={searchDisponiveis}
                        onChange={(e) => setSearchDisponiveis(e.target.value)}
                      />
                      <Box
                        border="1px"
                        borderColor="gray.200"
                        borderRadius="md"
                        p={2}
                        height="200px"
                        overflowY="auto"
                      >
                        <List spacing={2}>
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

                    <Box flex={1}>
                      <Text fontWeight="bold" mb={2}>
                        Disciplinas Selecionadas
                      </Text>
                      <Input
                        placeholder="Pesquisar disciplinas..."
                        mb={2}
                        value={searchSelecionadas}
                        onChange={(e) => setSearchSelecionadas(e.target.value)}
                      />
                      <Box
                        border="1px"
                        borderColor="gray.200"
                        borderRadius="md"
                        p={2}
                        height="200px"
                        overflowY="auto"
                      >
                        <List spacing={2}>
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
                </Box>
              )}

              <Flex gap={4} justify="space-between" mt={4}>
                {turmaId && (
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
                    {turmaId ? 'Atualizar' : 'Salvar'}
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

export default FormTurma; 