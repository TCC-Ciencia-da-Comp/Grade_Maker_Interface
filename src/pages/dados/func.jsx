import {
  insertCurso,
  getCursoByNome,
  deleteAllCurso,
} from "../../service/CursoService";
import {
  insertDisciplina,
  getDisciplinaByNome,
  deleteAllDisciplina,
} from "../../service/DisciplinaService";
import {
  insertProfessor,
  getProfessorByNome,
  deleteAllProfessor,
} from "../../service/ProfessorService";
import {
  insertTurma,
  getTurmaByNome,
  deleteAllTurma,
} from "../../service/TurmaService";
import {
  insertDisciplinaCurso,
  deleteAllDisciplinaCurso,
} from "../../service/DisciplinaCursoService";
import {
  insertMatriz,
  deleteAllMatriz,
} from "../../service/MatrizService";
import {
  insertListaDisponibilidade,
  deleteAllDisponibilidade,
} from "../../service/DisponibilidadeService";
import { disponibilidades } from "./disponibilidade";
import { cursos } from "./curso";
import { disciplinas } from "./disciplina";
import { professores } from "./professor";
import { turmas } from "./turma";
import { disciplina_curso } from "./disciplina_curso";
import { matrizes } from "./matriz";

const func = async () => {
  let data;
  const listaDisponibilidades = [];

  await deleteAllDisponibilidade();
  await deleteAllMatriz();
  await deleteAllDisciplinaCurso();
  await deleteAllTurma();
  await deleteAllProfessor();
  await deleteAllDisciplina();
  await deleteAllCurso();

  async function inserirDados() {
    for (const curso of cursos) {
      data = {
        nome: curso.nome,
      };
      await insertCurso(data);
    }
    console.log("Cursos inseridos com sucesso");

    for (const disciplina of disciplinas) {
      data = {
        nome: disciplina.nome,
      };
      await insertDisciplina(data);
    }
    console.log("Disciplinas inseridas com sucesso");

    for (const professor of professores) {
      data = {
        nome: professor.nome,
      };
      await insertProfessor(data);
    }
    console.log("Professores inseridos com sucesso");

    for (const turma of turmas) {
      const curso = await getCursoByNome(turma.curso.nome);
      data = {
        id_curso: curso[0].id,
        id_turno: turma.turno.id,
        nome: turma.nome,
        semestre: turma.semestre,
        ano: turma.ano,
      };
      await insertTurma(data);
    }
    console.log("Turmas inseridas com sucesso");

    for (const disciplinaCurso of disciplina_curso) {
      const curso = await getCursoByNome(disciplinaCurso.curso.nome);
      const disciplina = await getDisciplinaByNome(
        disciplinaCurso.disciplina.nome
      );
      data = {
        id_curso: curso[0].id,
        id_disciplina: disciplina[0].id,
      };
      await insertDisciplinaCurso(data);
    }
    console.log("Disciplinas - Curso inseridas com sucesso");

    for (const disponibilidade of disponibilidades) {
      const professor = await getProfessorByNome(
        disponibilidade.professor.nome
      );
      const disciplina = await getDisciplinaByNome(
        disponibilidade.disciplina.nome
      );
      data = {
        idProfessor: professor[0].id,
        idDisciplina: disciplina[0].id,
        idTurno: disponibilidade.turno.id,
        idDiaSemana: disponibilidade.diaSemana.id,
        semestre: disponibilidade.semestre,
        ano: disponibilidade.ano,
      };
      listaDisponibilidades.push(data);
    }
    await insertListaDisponibilidade(listaDisponibilidades);
    console.log("Disponibilidades inseridas com sucesso");

    for (const matriz of matrizes) {
      const turma = await getTurmaByNome(matriz.turma.nome);
      const disciplina = await getDisciplinaByNome(matriz.disciplina.nome);
      data = {
        id_turma: turma[0].id,
        id_disciplina: disciplina[0].id,
      };
      await insertMatriz(data);
    }
    console.log("Matrizes inseridas com sucesso");
  }
  await inserirDados();
};
export default func;
