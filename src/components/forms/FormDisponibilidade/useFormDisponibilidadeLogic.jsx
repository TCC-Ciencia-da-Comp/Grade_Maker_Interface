import { useEffect, useState } from "react";
import { useToast } from "@chakra-ui/react";
import {
  deleteteByIdProf,
  deleteteByIdProfessorAnoSemestre,
  getDispProf,
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

  // Estado para rastrear alterações
  const [hasChanges, setHasChanges] = useState(false);

  useEffect(() => {
    const fetchDisponibilidade = async () => {
      try {
        if (!selectedProfessor || !anoInput || !semestreInput) return;

        const resultado = await getDispProf(selectedProfessor.id);

        // Filtrar disponibilidades por ano e semestre
        const disponibilidadesFiltradas = resultado.filter(
          (disp) =>
            disp.ano === parseInt(anoInput) &&
            disp.semestre === parseInt(semestreInput)
        );

        // Formatar disponibilidade por dia e turno
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

        // Atualizar estado de disponibilidade
        setDisponibilidade(disponibilidadeFormatada);

        // Extraindo disciplinas sem duplicatas (baseado no nome)
        const disciplinasUnicas = [];
        disponibilidadesFiltradas.forEach((disp) => {
          const { disciplina } = disp;
          if (!disciplinasUnicas.some((d) => d.nome === disciplina.nome)) {
            disciplinasUnicas.push(disciplina);
          }
        });

        // Atualizar as disciplinas selecionadas
        setSelecionadas(disciplinasUnicas);
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
    setHasChanges(true); // Alteração detectada
  };

  // Move uma disciplina da lista de selecionadas para a lista de disponíveis
  const moverParaDisponiveis = (item) => {
    setSelecionadas(
      selecionadas.filter((disciplina) => disciplina.id !== item.id)
    );
    setDisponiveis([...disponiveis, item]);
    setHasChanges(true); // Alteração detectada
  };

  // Reseta o formulário com confirmação
  const handleCancelarAlteracoes = () => {
    const confirmCancel = window.confirm("Tem certeza de que deseja cancelar as alterações?");
    if (confirmCancel) {
      setDisponiveis([]);
      setSelecionadas([]);
      setSelectedCurso(null);
      setDisponibilidade({});
      setAnoInput(ano);
      setSemestreInput("");
      setSelectedProfessor(null);
      setHasChanges(false);
    }
  };

  const handleToggle = (dayId, periodId) => {
    setDisponibilidade((prevDisponibilidade) => {
      const updatedDisponibilidade = {
        ...prevDisponibilidade,
        [dayId]: {
          ...prevDisponibilidade[dayId],
          [periodId]: !prevDisponibilidade[dayId]?.[periodId],
        },
      };

      // Detecta alterações
      const hasChangesOccurred = JSON.stringify(updatedDisponibilidade) !== JSON.stringify(disponibilidade);
      setHasChanges(hasChangesOccurred);

      return updatedDisponibilidade;
    });
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
      setHasChanges(false); // Reset changes state
    } catch (error) {
      toast({
        title: "Erro",
        description: "Falha ao salvar disponibilidade.",
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
    handleCancelarAlteracoes,
    handleToggle,
    handleSubmit,
    hasChanges,
  };
};

export default useFormDisponibilidadeLogic;