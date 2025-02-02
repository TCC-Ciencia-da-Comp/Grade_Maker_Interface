import { useEffect, useState } from "react";
import { useToast } from "@chakra-ui/react";
import { insertTurma, updateTurma, deleteTurma } from "../../../service/TurmaService";
import { insertMatriz, getMatrizByTurmaId, deleteMatrizByTurmaId } from "../../../service/MatrizService";

const useFormTurmaLogic = ({ isOpen, onClose, turmaId, initialData, onSuccess, cursos, turnos }) => {
  const toast = useToast();
  
  // Estados básicos
  const [nome, setNome] = useState("");
  const [curso, setCurso] = useState("");
  const [turno, setTurno] = useState("");
  const [semestre, setSemestre] = useState("");
  const [ano, setAno] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [hasChanges, setHasChanges] = useState(false);
  
  // Estados para disciplinas
  const [disponiveis, setDisponiveis] = useState([]);
  const [selecionadas, setSelecionadas] = useState([]);
  const [searchDisponiveis, setSearchDisponiveis] = useState("");
  const [searchSelecionadas, setSearchSelecionadas] = useState("");

  // Estado inicial para controle de mudanças
  const [initialState, setInitialState] = useState({
    nome: "",
    curso: "",
    turno: "",
    semestre: "",
    ano: "",
    disciplinas: []
  });

  // Carregar dados iniciais
  useEffect(() => {
    const carregarDados = async () => {
      if (isOpen) {
        if (initialData) {
          console.log('Initial Data:', initialData);
          console.log('Curso ID:', initialData.curso?.id || initialData.id_curso);
          console.log('Turno ID:', initialData.turno?.id || initialData.id_turno);
          
          // Configurar dados iniciais
          setNome(initialData.nome || "");
          setCurso(initialData.curso?.id?.toString() || initialData.id_curso?.toString() || "");
          setTurno(initialData.turno?.id?.toString() || initialData.id_turno?.toString() || "");
          setSemestre(initialData.semestre?.toString() || "");
          setAno(initialData.ano?.toString() || "");

          const newInitialState = {
            nome: initialData.nome || "",
            curso: initialData.curso?.id?.toString() || initialData.id_curso?.toString() || "",
            turno: initialData.turno?.id?.toString() || initialData.id_turno?.toString() || "",
            semestre: initialData.semestre?.toString() || "",
            ano: initialData.ano?.toString() || "",
            disciplinas: []
          };

          if (turmaId) {
            try {
              const matrizResponse = await getMatrizByTurmaId(turmaId);
              console.log('Matriz Response:', matrizResponse); // Debug log
              
              const disciplinasSelecionadas = matrizResponse.map(matriz => matriz.disciplina);
              setSelecionadas(disciplinasSelecionadas);
              newInitialState.disciplinas = disciplinasSelecionadas;

              // Configurar disciplinas disponíveis
              const cursoSelecionado = cursos?.find(c => c.id === parseInt(initialData.id_curso));
              if (cursoSelecionado?.disciplinas) {
                const disciplinasDisponiveis = cursoSelecionado.disciplinas.filter(
                  disc => !disciplinasSelecionadas.some(sel => sel.id === disc.id)
                );
                setDisponiveis(disciplinasDisponiveis);
              }
            } catch (error) {
              console.error("Erro ao carregar matrizes:", error);
              toast({
                title: "Erro",
                description: "Erro ao carregar disciplinas da turma",
                status: "error",
                duration: 3000,
                isClosable: true,
                position: "top-right",
              });
            }
          }
          setInitialState(newInitialState);
        } else {
          resetForm();
        }
        setHasChanges(false);
      }
    };

    carregarDados();
  }, [isOpen, initialData, turmaId, cursos, toast]);

  // Função para resetar o formulário
  const resetForm = () => {
    setNome("");
    setCurso("");
    setTurno("");
    setSemestre("");
    setAno("");
    setSelecionadas([]);
    setDisponiveis([]);
    setInitialState({
      nome: "",
      curso: "",
      turno: "",
      semestre: "",
      ano: "",
      disciplinas: []
    });
  };

  // Monitorar mudanças
  useEffect(() => {
    const hasStateChanged =
      nome !== initialState.nome ||
      curso !== initialState.curso ||
      turno !== initialState.turno ||
      semestre !== initialState.semestre ||
      ano !== initialState.ano ||
      JSON.stringify(selecionadas.map(d => d.id).sort()) !== 
      JSON.stringify(initialState.disciplinas.map(d => d.id).sort());

    setHasChanges(hasStateChanged);
  }, [nome, curso, turno, semestre, ano, selecionadas, initialState]);

  // Atualizar disciplinas disponíveis quando o curso mudar
  useEffect(() => {
    if (curso) {
      const cursoSelecionado = cursos?.find(c => c.id === parseInt(curso));
      if (cursoSelecionado?.disciplinas) {
        const disciplinasDisponiveis = cursoSelecionado.disciplinas.filter(
          disc => !selecionadas.some(sel => sel.id === disc.id)
        );
        setDisponiveis(disciplinasDisponiveis);
      }
    }
  }, [curso, cursos, selecionadas]);

  // Filtragem de disciplinas
  const disponiveisFiltrados = disponiveis.filter((disciplina) =>
    disciplina.nome.toLowerCase().includes(searchDisponiveis.toLowerCase())
  );

  const selecionadasFiltradas = selecionadas.filter((disciplina) =>
    disciplina.nome.toLowerCase().includes(searchSelecionadas.toLowerCase())
  );

  const moverParaSelecionadas = (disciplina) => {
    setDisponiveis(prev => prev.filter(d => d.id !== disciplina.id));
    setSelecionadas(prev => [...prev, disciplina]);
    setHasChanges(true);
  };

  const moverParaDisponiveis = (disciplina) => {
    setSelecionadas(prev => prev.filter(d => d.id !== disciplina.id));
    setDisponiveis(prev => [...prev, disciplina]);
    setHasChanges(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Validar dados obrigatórios
      if (!nome || !curso || !turno || !semestre || !ano) {
        throw new Error("Todos os campos são obrigatórios");
      }

      const turmaData = {
        nome,
        id_curso: parseInt(curso),
        id_turno: parseInt(turno),
        semestre: parseInt(semestre),
        ano: parseInt(ano)
      };
      console.log(turmaData);

      // Verifica se todas as disciplinas selecionadas pertencem ao curso atual
      const cursoSelecionado = cursos?.find(c => c.id === parseInt(curso));
      if (!cursoSelecionado) {
        throw new Error("Curso selecionado não encontrado");
      }

      const disciplinasInvalidas = selecionadas.filter(
        disciplinaSelecionada => !cursoSelecionado.disciplinas?.some(
          discCurso => discCurso.id === disciplinaSelecionada.id
        )
      );

      if (disciplinasInvalidas.length > 0) {
        throw new Error("Existem disciplinas selecionadas que não pertencem ao curso atual");
      }

      // Edição de turma existente
      if (turmaId) {
        // Primeiro deleta as matrizes existentes
        await deleteMatrizByTurmaId(turmaId);
        
        // Atualiza a turma
        const turmaResponse = await updateTurma(turmaId, turmaData);
        console.log(turmaResponse);
        if (!turmaResponse) {
          throw new Error("Erro ao atualizar turma");
        }


        // Insere as novas matrizes
        await Promise.all(selecionadas.map(disciplina => 
          insertMatriz({
            id_turma: turmaId,
            id_disciplina: disciplina.id
          })
        ));
      } 
      // Criação de nova turma
      else {
        const turmaResponse = await insertTurma(turmaData);
        console.log(turmaResponse.id);
        if (!turmaResponse?.id) {
          throw new Error("Erro ao criar turma: ID não retornado");
        }


        // Insere as matrizes para a nova turma
        await Promise.all(selecionadas.map(disciplina => 
          insertMatriz({
            id_turma: turmaResponse.id,
            id_disciplina: disciplina.id
          })
        ));
      }

      toast({
        title: "Sucesso",
        description: `Turma ${turmaId ? 'atualizada' : 'cadastrada'} com sucesso`,
        status: "success",
        duration: 3000,
        isClosable: true,
        position: "top-right",
      });
      
      if (onSuccess) onSuccess();
      onClose();

    } catch (error) {
      console.error("Erro ao processar turma:", error);
      toast({
        title: "Erro",
        description: error.message || "Erro ao processar turma",
        status: "error",
        duration: 3000,
        isClosable: true,
        position: "top-right",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async () => {
    if (window.confirm("Tem certeza que deseja excluir esta turma?")) {
      setIsLoading(true);
      try {
        await deleteMatrizByTurmaId(turmaId);
        await deleteTurma(turmaId);
        
        toast({
          title: "Sucesso",
          description: "Turma excluída com sucesso",
          status: "success",
          duration: 3000,
          isClosable: true,
          position: "top-right",
        });
        
        if (onSuccess) onSuccess();
        onClose();
      } catch (error) {
        toast({
          title: "Erro",
          description: error.response?.data?.message || "Erro ao excluir a turma",
          status: "error",
          duration: 3000,
          isClosable: true,
          position: "top-right",
        });
      } finally {
        setIsLoading(false);
      }
    }
  };

  const handleCancelar = () => {
    if (hasChanges) {
      const confirmCancel = window.confirm("Tem certeza de que deseja cancelar as alterações?");
      if (confirmCancel) {
        setNome(initialState.nome);
        setCurso(initialState.curso);
        setTurno(initialState.turno);
        setSemestre(initialState.semestre);
        setAno(initialState.ano);
        setSelecionadas(initialState.disciplinas);
        setDisponiveis(prev => 
          [...prev, ...selecionadas.filter(sel => 
            !initialState.disciplinas.some(init => init.id === sel.id)
          )]
        );
        setHasChanges(false);
        onClose();
      }
    } else {
      onClose();
    }
  };

  return {
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
    disponiveis,
    selecionadas,
    searchDisponiveis, setSearchDisponiveis,
    searchSelecionadas, setSearchSelecionadas,
    disponiveisFiltrados,
    selecionadasFiltradas,
    moverParaSelecionadas,
    moverParaDisponiveis,
  };
};


export default useFormTurmaLogic; 