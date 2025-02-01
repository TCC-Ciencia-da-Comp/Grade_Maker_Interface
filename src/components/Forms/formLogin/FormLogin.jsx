import React, { useState } from 'react';
import {
  Box,
  Heading,
  FormControl,
  FormLabel,
  Input,
  Button,
  Text,
  Center,
} from '@chakra-ui/react';


const FormLogin = ({handleLogin, error, loading}) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');


  const onSubmit = (e)=>{
    e.preventDefault()
    handleLogin(username, password)
  };



  return (
    <Center minHeight="100vh" bg="gray.100">
      <Box
        bg="purple.600"
        color="white"
        p={8}
        borderRadius="md"
        boxShadow="lg"
        maxWidth="400px"
        w="100%"
      >
        <Heading as="h2" size="lg" textAlign="center" mb={6}>
          Login
        </Heading>
        <form onSubmit={onSubmit}>
          <FormControl id="username" isRequired mb={4}>
            <FormLabel>Usuário</FormLabel>
            <Input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Digite seu usuário"
              bg="white"
              color="black"
              _placeholder={{ color: 'gray.500' }}
            />
          </FormControl>
          <FormControl id="password" isRequired mb={4}>
            <FormLabel>Senha</FormLabel>
            <Input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Digite sua senha"
              bg="white"
              color="black"
              _placeholder={{ color: 'gray.500' }}
            />
          </FormControl>
          {error && (
            <Text color="red.300" mb={4}>
              {error}
            </Text>
          )}
          <Button
            type="submit"
            colorScheme="purple"
            isLoading={loading}
            width="100%"
          >
            {loading ? 'Entrando...' : 'Login'}
          </Button>
        </form>
      </Box>
    </Center>
  );
};

export default FormLogin;
