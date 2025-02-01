import React, { useEffect, useState } from "react";
import {
  Box,
  Heading,
  VStack,
  HStack,
  Switch,
  Text,
  Divider,
  useToast,
  Button,
} from "@chakra-ui/react";
import { getDiaSemana, updateDiaSemana } from "../service/DiaSemanaService";
import { getTurno, updateTurno } from "../service/TurnoService";

const Configuracao = () => {
  const [diasSemana, setDiasSemana] = useState([]);
  const [turnos, setTurnos] = useState([]);
  const [pendingChanges, setPendingChanges] = useState({ dias: {}, turnos: {} });
  const toast = useToast();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [diasResponse, turnosResponse] = await Promise.all([
        getDiaSemana(),
        getTurno(),
      ]);
      const sortedDias = (diasResponse.data || []).sort((a, b) => a.id - b.id);
      const sortedTurnos = (turnosResponse.data || []).sort((a, b) => a.id - b.id);
      setDiasSemana(sortedDias);
      setTurnos(sortedTurnos);
    } catch (error) {
      showToast("Erro ao carregar dados", "error");
    }
  };

  const handleDiaSemanaToggle = (id, currentStatus) => {
    const newStatus = currentStatus === 1 ? 0 : 1;
    setDiasSemana(diasSemana.map(dia => 
      dia.id === id ? { ...dia, ativo: newStatus } : dia
    ));
    setPendingChanges(prev => ({
      ...prev,
      dias: { ...prev.dias, [id]: newStatus }
    }));
  };

  const handleTurnoToggle = (id, currentStatus) => {
    const newStatus = currentStatus === 1 ? 0 : 1;
    setTurnos(turnos.map(turno => 
      turno.id === id ? { ...turno, ativo: newStatus } : turno
    ));
    setPendingChanges(prev => ({
      ...prev,
      turnos: { ...prev.turnos, [id]: newStatus }
    }));
  };

  const handleSubmit = async () => {
    try {
      const updates = [];
      
      // Process dia semana updates
      for (const [id, ativo] of Object.entries(pendingChanges.dias)) {
        updates.push(updateDiaSemana(id, { ativo }));
      }
      
      // Process turno updates
      for (const [id, ativo] of Object.entries(pendingChanges.turnos)) {
        updates.push(updateTurno(id, { ativo }));
      }
      
      await Promise.all(updates);
      setPendingChanges({ dias: {}, turnos: {} });
      showToast("Configurações atualizadas com sucesso", "success");
    } catch (error) {
      showToast("Erro ao salvar as configurações", "error");
    }
  };

  const hasPendingChanges = () => {
    return Object.keys(pendingChanges.dias).length > 0 || 
           Object.keys(pendingChanges.turnos).length > 0;
  };

  const showToast = (message, status) => {
    toast({
      title: message,
      status: status,
      duration: 3000,
      isClosable: true,
    });
  };

  return (
    <Box p={6}>
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
        Configuração
      </Heading>

      
      <VStack spacing={6} align="stretch">
        <Box>
          <Heading size="md" mb={4}>Dias da Semana</Heading>
          <VStack spacing={3} align="stretch">
            {diasSemana.map((dia) => (
              <HStack key={dia.id} justify="space-between">
                <Text>{dia.descricao}</Text>
                <Switch
                  isChecked={dia.ativo === 1}
                  onChange={() => handleDiaSemanaToggle(dia.id, dia.ativo)}
                  colorScheme="purple"
                />
              </HStack>
            ))}
          </VStack>
        </Box>

        <Divider />

        <Box>
          <Heading size="md" mb={4}>Turnos</Heading>
          <VStack spacing={3} align="stretch">
            {turnos.map((turno) => (
              <HStack key={turno.id} justify="space-between">
                <Text>{turno.descricao}</Text>
                <Switch
                  isChecked={turno.ativo === 1}
                  onChange={() => handleTurnoToggle(turno.id, turno.ativo)}
                  colorScheme="purple"
                />
              </HStack>
            ))}
          </VStack>
        </Box>

        <Button
          colorScheme="purple"
          isDisabled={!hasPendingChanges()}
          onClick={handleSubmit}
          mt={4}
        >
          Salvar Alterações
        </Button>
      </VStack>
    </Box>
  );
};

export default Configuracao;
