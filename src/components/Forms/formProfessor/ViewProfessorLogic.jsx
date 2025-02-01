import { useState, useEffect } from 'react';
import { getDisponibilidadeProfessor } from '../../../service/DisponibilidadeService';
import { getDiaSemana } from '../../../service/DiaSemanaService';
import { getTurno } from '../../../service/TurnoService';

const useViewProfessorLogic = (professor) => {
  const [disponibilidades, setDisponibilidades] = useState([]);
  const [todasDisponibilidades, setTodasDisponibilidades] = useState([]);
  const [anosDisponiveis, setAnosDisponiveis] = useState([]);
  const [anoSelecionado, setAnoSelecionado] = useState(new Date().getFullYear());
  const [semestreSelecionado, setSemestreSelecionado] = useState(1);
  const [diasSemana, setDiasSemana] = useState([]);
  const [turnos, setTurnos] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (!professor?.id) return;

        const [diasResponse, turnosResponse, disponibilidadesResponse] = await Promise.all([
          getDiaSemana(),
          getTurno(),
          getDisponibilidadeProfessor(professor.id)
        ]);

        setDiasSemana(diasResponse.data || []);
        setTurnos(turnosResponse.data || []);

        if (disponibilidadesResponse) {
          setTodasDisponibilidades(disponibilidadesResponse);
          
          const anos = [...new Set(disponibilidadesResponse.map(disp => disp.ano))].sort();
          setAnosDisponiveis(anos);
          
          if (anos.length > 0) {
            setAnoSelecionado(Math.max(...anos));
          }

          const disponibilidadesFiltradas = disponibilidadesResponse.filter(
            (disp) =>
              disp.ano === parseInt(anoSelecionado) &&
              disp.semestre === parseInt(semestreSelecionado)
          );
          setDisponibilidades(disponibilidadesFiltradas);
        }
      } catch (error) {
        console.error("Erro ao buscar dados:", error);
      }
    };

    fetchData();
  }, [professor?.id]);

  useEffect(() => {
    const disponibilidadesFiltradas = todasDisponibilidades.filter(
      (disp) =>
        disp.ano === parseInt(anoSelecionado) &&
        disp.semestre === parseInt(semestreSelecionado)
    );
    setDisponibilidades(disponibilidadesFiltradas);
  }, [anoSelecionado, semestreSelecionado, todasDisponibilidades]);

  const disponibilidadesAgrupadas = disponibilidades.reduce((acc, disp) => {
    const diaKey = disp.diaSemana.descricao;
    if (!acc[diaKey]) {
      acc[diaKey] = [];
    }
    acc[diaKey].push(disp);
    return acc;
  }, {});

  return {
    disponibilidades,
    disponibilidadesAgrupadas,
    anoSelecionado,
    setAnoSelecionado,
    semestreSelecionado,
    setSemestreSelecionado,
    diasSemana,
    turnos,
    anosDisponiveis,
  };
};

export default useViewProfessorLogic;
