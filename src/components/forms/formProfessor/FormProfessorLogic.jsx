import { useState, useEffect } from "react";
import { insertProfessor } from "../../../service/ProfessorService";
import { useToast } from "@chakra-ui/react";

const useFormProfessorLogic = (onClose) => {
    const [professor, setProfessor] = useState({});
    const [hasChanges, setHasChanges] = useState(false);
    const [initialState, setInitialState] = useState({});
    const toast = useToast();

    useEffect(() => {
        setInitialState({});
        setProfessor({});
        setHasChanges(false);
    }, []);

    const handleSubmitProfessor = async () => {
        try {
            if (!professor.nome || professor.nome.trim() === '') {
                toast({
                    title: "Erro",
                    description: "O nome do professor é obrigatório",
                    status: "error",
                    duration: 3000,
                    isClosable: true,
                });
                return;
            }

            await insertProfessor(professor);
            toast({
                title: "Sucesso",
                description: "Professor cadastrado com sucesso",
                status: "success",
                duration: 3000,
                isClosable: true,
            });
            setHasChanges(false);
            onClose();
        } catch (error) {
            toast({
                title: "Erro",
                description: "Erro ao cadastrar professor",
                status: "error",
                duration: 3000,
                isClosable: true,
            });
            console.error("Erro ao salvar professor:", error);
        }
    }

    const handleCancelar = () => {
        if (hasChanges) {
            const confirmCancel = window.confirm("Tem certeza de que deseja cancelar as alterações?");
            if (confirmCancel) {
                setProfessor(initialState);
                setHasChanges(false);
                onClose();
            }
        } else {
            onClose();
        }
    };

    const handleProfessorChange = (newValue) => {
        setProfessor(newValue);
        setHasChanges(JSON.stringify(newValue) !== JSON.stringify(initialState));
    };

    return {
        professor,
        setProfessor: handleProfessorChange,
        handleSubmitProfessor,
        handleCancelar,
        hasChanges
    };
}

export default useFormProfessorLogic;

