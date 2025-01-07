import React, { useEffect, useState } from "react";
import FormCurso from "../../components/Forms/FormCurso";
import TableCurso from "../../components/tables/TableCurso";
import "../../components/global.css";
import { Heading } from "@chakra-ui/react";
import { getCurso } from "./service";

const Curso = () => {
  const [cursos, setCursos] = useState([]);

  useEffect(() => {
    const fetchCurso = async () => {
      setCursos(await getCurso());
    };
    fetchCurso();
  },[]);

  return (
    <div className="page-container">
    <div className="content-wrapper">
        <Heading as="h1" className="page-title">Disciplina</Heading>
    </div>
</div>
  );
};

export default Curso;
