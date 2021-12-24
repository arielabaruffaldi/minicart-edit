import React from 'react'
import Main from './components/Main/Main'
import { GeneralProvider } from './store/context/GeneralContext'
import { ModalProvider } from './store/context/ModalContext'

const App = () => {
  return (
    <GeneralProvider>
      <ModalProvider>
        <Main />
      </ModalProvider>
    </GeneralProvider>
  )
}
export default App
