import { useState, useEffect } from "react";
import { getDisciplinaCursoByDisciplinaId } from "../../../service/DisciplinaService";

const useViewCursoLogic = (initialCurso) => {
    const [curso, setCurso] = useState({});
    const [disciplinas, setDisciplinas] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
  
    useEffect(() => {
      const fetchData = async () => {
        if (!initialCurso?.id) {
          setIsLoading(false);
          return;
        }

        try {
          setCurso(initialCurso);
          setDisciplinas(initialCurso.disciplinas || []);
        } catch (error) {
          console.error("Erro ao carregar dados:", error);
          setDisciplinas([]);
        } finally {
          setIsLoading(false);
        }
      };
  
      fetchData();
    }, [initialCurso]);
  
    return { curso, disciplinas, isLoading };
};

export default useViewCursoLogic;
