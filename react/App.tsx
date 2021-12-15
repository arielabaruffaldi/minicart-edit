import React from 'react'
import MinicartEdit from './components/MinicartEdit/MinicartEdit'
import { ModalProvider } from './store/context/ModalContext'

const App = () => {
  return (
    <ModalProvider>
      <MinicartEdit />
    </ModalProvider>
  )
}
export default App
