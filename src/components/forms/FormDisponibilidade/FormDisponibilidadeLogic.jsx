import { useEffect, useState } from "react";
import { useToast } from "@chakra-ui/react";
import { getDiaSemana } from "../../../service/DiaSemanaService";
import { getDisciplina } from "../../../service/DisciplinaService";
import { getTurno } from "../../../service/TurnoService";
import { getCurso } from "../../../service/CursoService";
import {
  deleteByIdProfessorAnoSemestre,
  getDisponibilidadeProfessor,
  insertListaDisponibilidade,
} from "../../../service/DisponibilidadeService";

const useFormDisponibilidadeLogic = (ano, professores, cursos, days, turnos) => {
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

  const [searchDisponiveis, setSearchDisponiveis] = useState("");
  const [searchSelecionadas, setSearchSelecionadas] = useState("");

  // Estado para rastrear alterações
  const [hasChanges, setHasChanges] = useState(false);  

  // Filtra as listas baseado na pesquisa
  const disponiveisFiltrados = disponiveis.filter((disciplina) =>
    disciplina.nome.toLowerCase().includes(searchDisponiveis.toLowerCase())
  );

  const selecionadasFiltradas = selecionadas.filter((disciplina) =>
    disciplina.nome.toLowerCase().includes(searchSelecionadas.toLowerCase())
  );

  useEffect(() => {
    const fetchDisponibilidade = async () => {
      try {
        if (!selectedProfessor || !anoInput || !semestreInput) return;
  
        const resultado = await getDisponibilidadeProfessor(selectedProfessor.id);
  
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
        console.error("Erro ao buscar disponibilidade:", error);
        toast({
          title: "Erro",
          description: "Falha ao buscar disponibilidade do professor.",
          status: "error",
          duration: 4000,
          position: "top-right",
          isClosable: true,
        });
      }
    };
  
    fetchDisponibilidade();
  }, [selectedProfessor, anoInput, semestreInput, toast]);
  

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
    // Remove o item da lista de disponíveis
    setDisponiveis((prevDisponiveis) => 
      prevDisponiveis.filter((disciplina) => disciplina.id !== item.id)
    );
    // Adiciona o item na lista de selecionadas
    setSelecionadas((prevSelecionadas) => [...prevSelecionadas, item]);
    // Limpa o campo de pesquisa após a movimentação
    setSearchDisponiveis("");
  };

  // Move uma disciplina da lista de selecionadas para a lista de disponíveis
  const moverParaDisponiveis = (item) => {
    // Remove o item da lista de selecionadas
    setSelecionadas((prevSelecionadas) => 
      prevSelecionadas.filter((disciplina) => disciplina.id !== item.id)
    );
    // Adiciona o item na lista de disponíveis
    setDisponiveis((prevDisponiveis) => [...prevDisponiveis, item]);
    // Limpa o campo de pesquisa após a movimentação
    setSearchSelecionadas("");
  };

  // Atualiza a lógica dos botões de seta para usar as listas filtradas
  const moverPrimeiroDisponivel = () => {
    if (disponiveisFiltrados.length > 0) {
      moverParaSelecionadas(disponiveisFiltrados[0]);
    }
  };

  const moverPrimeiroSelecionado = () => {
    if (selecionadasFiltradas.length > 0) {
      moverParaDisponiveis(selecionadasFiltradas[0]);
    }
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

  const handleAnoChange = (newValue) => {
    setAnoInput(newValue);
    // Limpa as seleções quando o ano muda
    setDisponiveis([]);
    setSelecionadas([]);
    setSelectedCurso(null);
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

    try {
      const payload = [];
      
      // Itera sobre as disciplinas selecionadas
      selecionadas.forEach((disciplina) => {
        // Itera sobre a disponibilidade
        Object.entries(disponibilidade).forEach(([idDiaSemana, turnosDisponiveis]) => {
          // Verifica se o dia está na lista de dias ativos
          const diaAtivo = days.some(d => d.id === parseInt(idDiaSemana));
          
          if (diaAtivo) {
            Object.entries(turnosDisponiveis).forEach(([idTurno, isAvailable]) => {
              // Verifica se o turno está na lista de turnos ativos
              const turnoAtivo = turnos.some(t => t.id === parseInt(idTurno));
              
              if (isAvailable && turnoAtivo) {
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
          }
        });

      });

      // Deleta registros existentes antes de inserir novos
      await deleteByIdProfessorAnoSemestre(selectedProfessor?.id, ano, semestreInput);
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
      console.error('Erro ao salvar disponibilidade:', error);
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

  // Adicione estas duas novas funções
  const moverTodosParaSelecionadas = () => {
    setSelecionadas(prev => [...prev, ...disponiveisFiltrados]);
    setDisponiveis(prev => prev.filter(item => 
      !disponiveisFiltrados.some(filtered => filtered.id === item.id)
    ));
    setSearchDisponiveis("");
  };

  const moverTodosParaDisponiveis = () => {
    setDisponiveis(prev => [...prev, ...selecionadasFiltradas]);
    setSelecionadas(prev => prev.filter(item => 
      !selecionadasFiltradas.some(filtered => filtered.id === item.id)
    ));
    setSearchSelecionadas("");
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
  };
};

export default useFormDisponibilidadeLogic;
