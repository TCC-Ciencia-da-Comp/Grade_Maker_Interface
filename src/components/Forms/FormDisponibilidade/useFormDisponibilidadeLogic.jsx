import { useEffect, useState } from "react";
import { useToast } from "@chakra-ui/react";
import { deleteteByIdProf, getDispProf, insertDisponibilidade } from "../../../pages/Disponibilidade/service";

const useFormDisponibilidadeLogic = (ano, professores, cursos) => {
  const toast = useToast();

  // Estados principais
  const [disponibilidade, setDisponibilidade] = useState({});
  const [anoInput, setAnoInput] = useState(ano);
  const [semestreInput, setSemestreInput] = useState("");
  const [selectedProfessor, setSelectedProfessor] = useState(null);

  // Estados adicionais para gerenciamento de disciplinas
  const [selectedCurso, setSelectedCurso] = useState(null);
  const [disponiveis, setDisponiveis] = useState([]);
  const [selecionadas, setSelecionadas] = useState([]);

  useEffect(() => {
    const fetchDisponibilidade = async () => {
      try {
        if (!selectedProfessor || !anoInput || !semestreInput) return;

        const resultado = await getDispProf(selectedProfessor.id);

        const disponibilidadesFiltradas = resultado.filter(
          (disp) => disp.ano === parseInt(anoInput) && disp.semestre === parseInt(semestreInput)
        );

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

  // Atualiza a lista de disciplinas disponíveis ao selecionar um curso
  useEffect(() => {
    if (selectedCurso) {
      const curso = cursos.find((c) => c.id === parseInt(selectedCurso));
      setDisponiveis(curso?.disciplinas || []);
      setSelecionadas([]);
    } else {
      setDisponiveis([]);
      setSelecionadas([]);
    }
  }, [selectedCurso, cursos]);

  // Move uma disciplina da lista de disponíveis para a lista de selecionadas
  const moverParaSelecionadas = (item) => {
    setDisponiveis(disponiveis.filter((disciplina) => disciplina.id !== item.id));
    setSelecionadas([...selecionadas, item]);
  };

  // Move uma disciplina da lista de selecionadas para a lista de disponíveis
  const moverParaDisponiveis = (item) => {
    setSelecionadas(selecionadas.filter((disciplina) => disciplina.id !== item.id));
    setDisponiveis([...disponiveis, item]);
  };

  // Reseta o formulário
  const handleCancelar = () => {
    setDisponiveis([]);
    setSelecionadas([]);
    setSelectedCurso(null);
  };

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
    selectedCurso,
    setSelectedCurso,
    disponiveis,
    selecionadas,
    moverParaSelecionadas,
    moverParaDisponiveis,
    handleCancelar,
    handleToggle,
    handleSubmit,
  };
};

export default useFormDisponibilidadeLogic;
