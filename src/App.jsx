import { useState } from 'react'
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom' 
import './App.css'
import AppRouter from './Routes'
import { ChakraProvider } from '@chakra-ui/react'
import ThemeLight from './styles/themes/themeLight'

function App() {
  return (
    <ChakraProvider theme={ThemeLight}> 
       <AppRouter/>       
    </ChakraProvider>
  )
}

export default App
