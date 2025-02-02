import { useState, useEffect } from "react";
import { getDisciplinaCursoByDisciplinaId } from "../../../service/DisciplinaService";

const useViewDisciplinaLogic = (initialDisciplina) => {
    const [disciplina, setDisciplina] = useState({});
    const [cursos, setCursos] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
  
    useEffect(() => {
      const fetchData = async () => {
        if (!initialDisciplina?.id) {
          setIsLoading(false);
          return;
        }

        try {
          const response = await getDisciplinaCursoByDisciplinaId(initialDisciplina.id);
          
          if (response?.data) {
            const cursosData = response.data.map(item => ({
              id: item.curso.id,
              nome: item.curso.nome,
              disciplinas: item.curso.disciplinas
            }));
            
            setCursos(cursosData);
            setDisciplina(initialDisciplina);
          } else {
            setCursos([]);
          }
        } catch (error) {
          console.error("Erro ao carregar dados:", error);
          setCursos([]);
        } finally {
          setIsLoading(false);
        }
      };
  
      fetchData();
    }, [initialDisciplina]);
  
    return { disciplina, cursos, isLoading };
};

export default useViewDisciplinaLogic;
