import { Center, Heading, Button } from "@chakra-ui/react";
import Api from "../service/Api";
import { useEffect } from "react";
import React from "react";
import func from "./dados/func";
import { div } from "framer-motion/client";

function Home() {
  return (
    <div>
      <Center flexDirection="column">
        <Heading
          className="page-title"
          as="h2"
          fontSize="4xl"
          position="relative"
          textAlign="center"
          _after={{
            content: '""',
            display: "block",
            width: "100%",
            height: "7px",
            backgroundColor: "purple.500",
            position: "absolute",
            bottom: "-5px",
            left: 0,
          }}
        >
          Home
        </Heading>
      </Center>
      <Button colorScheme="purple" onClick={() => func()}>
        Inserir dados
      </Button>
    </div>
  );
}

export default Home;
