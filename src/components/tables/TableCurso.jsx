import React, { useEffect, useState } from "react";
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  Button,
  useDisclosure
} from "@chakra-ui/react";
import "../tables/Table.css";
import FormCurso from '../Forms/FormCurso';

const TableCurso = () => {

  return (
    <div className="page-container">
      {erro && <div className="error-message">Erro: {erro}</div>}
      <div className="table-container">
        <table className="table">
          <thead>
            <tr>
              <th className="table-header">ID</th>
              <th className="table-header">Nome</th>
              <th className="table-header"></th>
            </tr>
          </thead>
          <tbody>
            {cursos.map((curso, index) => (
              <tr key={curso.id} className={index % 2 === 0 ? "table-row-even" : "table-row-odd"}>
                <td className="table-cell">{curso.id}</td>
                <td className="table-cell">{curso.nome}</td>
                <td className="table-cell" style={{ textAlign: 'right' }}>
                  <Button colorScheme="blue" onClick={() => handleEditClick(curso)} mr={2}>
                    Editar
                  </Button>
                  <Button colorScheme="red" onClick={() => handleDeleteClick(curso.id)}>
                    Deletar
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TableCurso;
