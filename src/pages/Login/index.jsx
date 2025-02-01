import { useNavigate } from 'react-router-dom';
import AuthService from './../../service/AuthService'; // Ajuste o caminho conforme necessário
import { div } from 'framer-motion/client';
import FormLogin from '../../components/forms/formLogin/FormLogin';
import { useState } from 'react';
import { useToast } from '@chakra-ui/react';


const Login = () => {
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const toast = useToast();
    const navigate = useNavigate();

  
    const handleLogin = async (username, password) => {
      setError('');
      setLoading(true);
      try {
        await AuthService.login(username, password);
        toast({
          title: 'Login realizado com sucesso!',
          status: 'success',
          position: "top-right",
          duration: 3000,
          isClosable: true,
        });
        navigate('/'); // Redireciona para a rota '/'
      } catch (err) {
        setError('Erro ao realizar login. Verifique suas credenciais.');
      } finally {
        setLoading(false);
      }
    };
  
    return (
        <div>
            <FormLogin handleLogin={handleLogin} error={error} loading = {loading}/>
        </div>
    );
  };
  
  export default Login;
  