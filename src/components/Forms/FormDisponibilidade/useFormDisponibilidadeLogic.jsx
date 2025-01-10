import { useEffect, useState } from "react";
import { useToast } from "@chakra-ui/react";
import { deleteteByIdProf, getDispProf, insertDisponibilidade } from "../../../pages/Disponibilidade/service";

const useFormDisponibilidadeLogic = (ano, professores) => {
  const toast = useToast();
  const [disponibilidade, setDisponibilidade] = useState({});
  const [anoInput, setAnoInput] = useState(ano);
  const [semestreInput, setSemestreInput] = useState("");
  const [selectedProfessor, setSelectedProfessor] = useState(null);

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

  return {
    disponibilidade,
    anoInput,
    setAnoInput,
    semestreInput,
    setSemestreInput,
    selectedProfessor,
    setSelectedProfessor,
    handleToggle,
    handleSubmit,
  };
};

export default useFormDisponibilidadeLogic;
