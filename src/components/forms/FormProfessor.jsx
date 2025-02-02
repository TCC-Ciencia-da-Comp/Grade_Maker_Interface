import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    Button,
    Text,
  } from "@chakra-ui/react";
  
  const FormProfessor = ({ isOpen, onClose, professor }) => {
    console.log(professor)
    return (
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{professor ? professor.nome : "Professor"}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text>Detalhes do professor: {professor ? professor.nome : ""}</Text>
          </ModalBody>
  
          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              Fechar
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    );
  };
  
  export default FormProfessor;
  