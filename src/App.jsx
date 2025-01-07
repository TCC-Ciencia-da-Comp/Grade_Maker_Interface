import { useState } from 'react'
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom'
import './App.css'
import AppRouter from './Routes'
import { ChakraProvider } from '@chakra-ui/react'
import ThemeLight from './themes/themeLight'
import ThemeDark from './themes/ThemeDark'
import { Container } from '@chakra-ui/react'

function App() {
  const [count, setCount] = useState(0)
  return (
    <ChakraProvider theme={ThemeLight}>
       <AppRouter/>       
    </ChakraProvider>
  )
}

export default App
