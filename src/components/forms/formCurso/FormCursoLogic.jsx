import { useEffect, useState } from "react";
import { useToast } from "@chakra-ui/react";
import { insertCurso, getCurso, updateCurso, getCursoByNome, deleteCurso } from "../../../service/CursoService";
import { getDisciplina } from "../../../service/DisciplinaService";
import { insertDisciplinaCurso, getDisciplinaCursoByCursoId, deleteDisciplinaCurso, deleteDisciplinaCursoByCursoId } from "../../../service/DisciplinaCursoService";

const useFormCursoLogic = ({ isOpen, onClose, cursoId, initialNome, onSuccess }) => {
  const toast = useToast();
  const [nome, setNome] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [hasChanges, setHasChanges] = useState(false);
  const [initialState, setInitialState] = useState({ nome: "", disciplinas: [] });
  
  // Estados para controle de disciplinas
  const [disponiveis, setDisponiveis] = useState([]);
  const [selecionadas, setSelecionadas] = useState([]);
  const [searchDisponiveis, setSearchDisponiveis] = useState("");
  const [searchSelecionadas, setSearchSelecionadas] = useState("");

  // Efeito para atualizar o nome quando initialNome mudar
  useEffect(() => {
    if (initialNome) {
      setNome(initialNome);
      setInitialState(prev => ({ ...prev, nome: initialNome }));
    }
  }, [initialNome]);

  // Carregar todas as disciplinas e as disciplinas do curso
  useEffect(() => {
    const fetchData = async () => {
      if (!isOpen) return;

      try {
        // Buscar todas as disciplinas disponíveis
        const todasDisciplinas = await getDisciplina();
        
        if (cursoId) {
          // Buscar disciplinas já vinculadas ao curso
          const disciplinasCurso = await getDisciplinaCursoByCursoId(cursoId);
          const disciplinasSelecionadas = disciplinasCurso.map(dc => dc.disciplina);
          
          // Filtrar disciplinas disponíveis
          const disciplinasDisponiveis = todasDisciplinas.filter(
            disc => !disciplinasSelecionadas.some(sel => sel.id === disc.id)
          );

          setDisponiveis(disciplinasDisponiveis);
          setSelecionadas(disciplinasSelecionadas);
          // Atualizar o estado inicial com o nome e disciplinas
          setInitialState({ 
            nome: initialNome || "", 
            disciplinas: disciplinasSelecionadas 
          });
          // Garantir que o nome seja atualizado
          setNome(initialNome || "");
        } else {
          setDisponiveis(todasDisciplinas);
          setSelecionadas([]);
          setInitialState({ nome: "", disciplinas: [] });
          setNome("");
        }
      } catch (error) {
        console.error("Erro ao carregar dados:", error);
        toast({
          title: "Erro",
          description: "Erro ao carregar dados",
          status: "error",
          duration: 3000,
          isClosable: true,
          position: "top-right",
        });
      }
    };

    fetchData();
  }, [cursoId, isOpen, initialNome]);

  // Filtrar disciplinas baseado na pesquisa
  const disponiveisFiltrados = disponiveis.filter((disciplina) =>
    disciplina.nome.toLowerCase().includes(searchDisponiveis.toLowerCase())
  );

  const selecionadasFiltradas = selecionadas.filter((disciplina) =>
    disciplina.nome.toLowerCase().includes(searchSelecionadas.toLowerCase())
  );

  // Funções para mover disciplinas entre as listas
  const moverParaSelecionadas = (disciplina) => {
    setDisponiveis(prev => prev.filter(d => d.id !== disciplina.id));
    setSelecionadas(prev => [...prev, disciplina]);
    setSearchDisponiveis("");
    setHasChanges(true);
  };

  const moverParaDisponiveis = (disciplina) => {
    setSelecionadas(prev => prev.filter(d => d.id !== disciplina.id));
    setDisponiveis(prev => [...prev, disciplina]);
    setSearchSelecionadas("");
    setHasChanges(true);
  };

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

  const moverTodosParaSelecionadas = () => {
    setSelecionadas(prev => [...prev, ...disponiveisFiltrados]);
    setDisponiveis(prev => prev.filter(item => 
      !disponiveisFiltrados.some(filtered => filtered.id === item.id)
    ));
    setSearchDisponiveis("");
    setHasChanges(true);
  };

  const moverTodosParaDisponiveis = () => {
    setDisponiveis(prev => [...prev, ...selecionadasFiltradas]);
    setSelecionadas(prev => prev.filter(item => 
      !selecionadasFiltradas.some(filtered => filtered.id === item.id)
    ));
    setSearchSelecionadas("");
    setHasChanges(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!nome) {
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
    
    setIsLoading(true);
    try {
      const cursoData = { nome };
      let novoCursoId;

      if (cursoId) {
        // Atualização de curso existente
        await updateCurso(cursoId, cursoData);
        novoCursoId = cursoId;
        
        // Remover todas as disciplinas antigas
        const disciplinasAtuais = await getDisciplinaCursoByCursoId(cursoId);
        for (const disc of disciplinasAtuais) {
          await deleteDisciplinaCurso(disc.id);
        }
      } else {
        // Criação de novo curso
        const response = await insertCurso(cursoData);
        // Acessar o ID do curso criado da resposta da API
        const teste = await getCursoByNome(nome);
        novoCursoId = teste.data[0].id;
      }

      // Adicionar novas disciplinas
      const promises = selecionadas.map(disciplina => 
        insertDisciplinaCurso({
          id_disciplina: disciplina.id,
          id_curso: novoCursoId
        })
      );
      
      await Promise.all(promises);

      toast({
        title: "Sucesso",
        description: cursoId 
          ? "Curso atualizado com sucesso"
          : "Curso cadastrado com sucesso",
        status: "success",
        duration: 3000,
        isClosable: true,
        position: "top-right",
      });
      
      if (onSuccess) onSuccess();
      setHasChanges(false);
      onClose();

    } catch (error) {
      console.error('Erro ao processar curso:', error);
      toast({
        title: "Erro",
        description: error.response?.data?.message || "Erro ao processar curso",
        status: "error",
        duration: 3000,
        isClosable: true,
        position: "top-right",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancelar = () => {
    if (hasChanges) {
      const confirmCancel = window.confirm("Tem certeza de que deseja cancelar as alterações?");
      if (confirmCancel) {
        setNome(initialState.nome);
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

  const handleDelete = async () => {
    if (!cursoId) return;

    const confirmDelete = window.confirm(
      "Tem certeza que deseja excluir este curso? Esta ação não pode ser desfeita."
    );

    if (confirmDelete) {
      setIsLoading(true);
      try {
        // Primeiro deletar todas as disciplinas associadas ao curso
        await deleteDisciplinaCursoByCursoId(cursoId);
        
        // Depois deletar o curso
        await deleteCurso(cursoId);

        toast({
          title: "Sucesso",
          description: "Curso excluído com sucesso",
          status: "success",
          duration: 3000,
          isClosable: true,
          position: "top-right",
        });

        if (onSuccess) onSuccess();
        onClose();
      } catch (error) {
        console.error("Erro ao excluir curso:", error);
        toast({
          title: "Erro",
          description: error.response?.data?.message || "Erro ao excluir o curso",
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

  return {
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
  };
};

export default useFormCursoLogic; 