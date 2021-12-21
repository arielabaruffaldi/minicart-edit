import React from 'react'
import MinicartEdit from './components/MinicartEdit/MinicartEdit'
import { GeneralProvider } from './store/context/GeneralContext'
import { ModalProvider } from './store/context/ModalContext'

const App = () => {
  return (
    <GeneralProvider>
      <ModalProvider>
        <MinicartEdit />
      </ModalProvider>
    </GeneralProvider>
  )
}
export default App
