import { useState, useEffect } from "react";
import { getMatrizByTurmaId } from "../../../service/MatrizService";

const useViewTurmaLogic = (initialTurma) => {
  const [turma, setTurma] = useState({});
  const [disciplinas, setDisciplinas] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      if (!initialTurma?.id) {
        setIsLoading(false);
        return;
      }

      try {
        setTurma(initialTurma);
        const matrizResponse = await getMatrizByTurmaId(initialTurma.id);
        const disciplinasSelecionadas = matrizResponse.map(matriz => matriz.disciplina);
        setDisciplinas(disciplinasSelecionadas);
      } catch (error) {
        console.error("Erro ao carregar dados:", error);
        setDisciplinas([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [initialTurma]);

  return { turma, disciplinas, isLoading };
};

export default useViewTurmaLogic;
