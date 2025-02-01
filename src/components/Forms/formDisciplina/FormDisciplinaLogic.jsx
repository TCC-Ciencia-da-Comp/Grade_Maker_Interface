import { useEffect, useState } from "react";
import { useToast } from "@chakra-ui/react";
import { insertDisciplina, getDisciplina, updateDisciplina, deleteDisciplina } from "../../../service/DisciplinaService";
import { deleteDisciplinaCursoByDisciplinaId } from "../../../service/DisciplinaCursoService";

const useFormDisciplinaLogic = ({ isOpen, onClose, disciplinaId, initialNome, onSuccess }) => {
  const toast = useToast();
  const [nome, setNome] = useState(initialNome || "");
  const [isLoading, setIsLoading] = useState(false);
  const [hasChanges, setHasChanges] = useState(false);
  const [initialState, setInitialState] = useState(initialNome || "");
      

  // Simplify the useEffect hooks into a single one
  useEffect(() => {
    const fetchDisciplina = async () => {
      if (disciplinaId && !initialNome) {
        try {
          const response = await getDisciplina(disciplinaId);
          setNome(response.nome || "");
        } catch (error) {
          toast({
            title: "Erro",
            description: "Erro ao carregar dados da disciplina",
            status: "error",
            duration: 3000,
            isClosable: true,
            position: "top-right",
          });
          setNome("");
        }
      } else if (initialNome) {
        setNome(initialNome);
      }
    };
    
    if (isOpen) {
      setInitialState(initialNome || "");
      setNome(initialNome || "");
      setHasChanges(false);
      fetchDisciplina();
    } else {
      setNome("");
    }
  }, [disciplinaId, isOpen, initialNome]);

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
      const disciplinaData = {
        nome,
      };

      if (disciplinaId) {
        await updateDisciplina(disciplinaId, disciplinaData);
      } else {
        await insertDisciplina(disciplinaData);
      }

      toast({
        title: "Sucesso",
        description: disciplinaId 
          ? "Disciplina atualizada com sucesso"
          : "Disciplina cadastrada com sucesso",
        status: "success",
        duration: 3000,
        isClosable: true,
        position: "top-right",
      });
      
      if (onSuccess) onSuccess();
      setHasChanges(false);
      onClose();
      setNome("");

    } catch (error) {
      toast({
        title: "Erro",
        description: error.message || "Erro ao processar disciplina",
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
        setNome(initialState);
        setHasChanges(false);
        onClose();
      }
    } else {
      onClose();
    }
  };

  // Update setNome to track changes
  const handleNomeChange = (newValue) => {
    setNome(newValue);
    setHasChanges(newValue !== initialState);
  };

  const handleDelete = async () => {
    if (!disciplinaId) return;

    const confirmDelete = window.confirm(
      "Tem certeza que deseja excluir esta disciplina? Esta ação não pode ser desfeita."
    );

    if (confirmDelete) {
      setIsLoading(true);
      try {
        // Primeiro deletar todas as relações da disciplina com cursos
        await deleteDisciplinaCursoByDisciplinaId(disciplinaId);
        
        // Depois deletar a disciplina
        await deleteDisciplina(disciplinaId);

        toast({
          title: "Sucesso",
          description: "Disciplina excluída com sucesso",
          status: "success",
          duration: 3000,
          isClosable: true,
          position: "top-right",
        });

        if (onSuccess) onSuccess();
        onClose();
      } catch (error) {
        console.error("Erro ao excluir disciplina:", error);
        toast({
          title: "Erro",
          description: error.response?.data?.message || "Erro ao excluir a disciplina",
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
    setNome: handleNomeChange,
    handleSubmit,
    handleCancelar,
    handleDelete,
    isLoading,
    hasChanges
  };
};

export default useFormDisciplinaLogic; 