import { useEffect, useState } from "react";
import { useToast } from "@chakra-ui/react";
import {
  deleteteByIdProf,
  deleteteByIdProfessorAnoSemestre,
  getDispProf,
  insertDisponibilidade,
  insertListaDisponibilidade,
} from "../../../pages/Disponibilidade/service";

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
          (disp) =>
            disp.ano === parseInt(anoInput) &&
            disp.semestre === parseInt(semestreInput)
        );

        const disponibilidadeFormatada = disponibilidadesFiltradas.reduce(
          (acc, disp) => {
            const dayId = disp.diaSemana.id;
            const periodId = disp.turno.id;

            if (!acc[dayId]) acc[dayId] = {};
            acc[dayId][periodId] = true;

            return acc;
          },
          {}
        );

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

      // Filtra disciplinas que não estão nas selecionadas
      const disciplinasFiltradas = (curso?.disciplinas || []).filter(
        (disciplina) => !selecionadas.some((sel) => sel.id === disciplina.id)
      );

      setDisponiveis(disciplinasFiltradas);
      setSelecionadas((prevSelecionadas) => [...prevSelecionadas]); // Mantém selecionadas
    } else {
      setDisponiveis([]);
      setSelecionadas([]);
    }
  }, [selectedCurso, cursos]);

  // Move uma disciplina da lista de disponíveis para a lista de selecionadas
  const moverParaSelecionadas = (item) => {
    setDisponiveis(
      disponiveis.filter((disciplina) => disciplina.id !== item.id)
    );
    setSelecionadas([...selecionadas, item]);
  };

  // Move uma disciplina da lista de selecionadas para a lista de disponíveis
  const moverParaDisponiveis = (item) => {
    setSelecionadas(
      selecionadas.filter((disciplina) => disciplina.id !== item.id)
    );
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
    if (!selectedProfessor || !semestreInput || !anoInput || selecionadas.length === 0) {
      toast({
        title: "Erro",
        description: "Preencha todos os campos antes de enviar.",
        status: "error",
        duration: 4000,
        position: "top-right",
        isClosable: true,
      });
      return;
    }
    const payload = [];
    selecionadas.forEach((disciplina) => {
      Object.entries(disponibilidade).forEach(([idDiaSemana, turnos]) => {
        Object.entries(turnos).forEach(([idTurno, isAvailable]) => {
          if (isAvailable) {
            payload.push({
              idProfessor: selectedProfessor.id,
              idDisciplina: disciplina.id,
              idTurno: parseInt(idTurno),
              idDiaSemana: parseInt(idDiaSemana),
              semestre: parseInt(semestreInput),
              ano: parseInt(anoInput),
            });
          }
        });
      });
    });
    try {
      await deleteteByIdProfessorAnoSemestre(selectedProfessor?.id, anoInput, semestreInput);
      await insertListaDisponibilidade(payload);
      toast({
        title: "Sucesso",
        description: "Disponibilidade salva com sucesso.",
        status: "success",
        duration: 4000,
        position: "top-right",
        isClosable: true,
      });
    } catch (error) {
      toast({
        title: "Erro",
        description: "Falha ao salvar disponibilidade. 10",
        status: "error",
        duration: 4000,
        position: "top-right",
        isClosable: true,
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
