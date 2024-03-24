import React from 'react'
import { useFlashMessage } from '@/_components/context/flashMessageContext'
import Alert from '@mui/material/Alert'

const FlashMessageDisplay = () => {
  const { flashMessage } = useFlashMessage()
  console.log(flashMessage)

  if (!flashMessage) return null

  return (
    <div
      style={{
        position: 'fixed',
        top: '67px',
        right: '50%',
        transform: 'translateX(50%)',
        width: '30%',
        zIndex: 9999,
        animation: 'slide-down 0.5s ease-out',
      }}
    >
      <Alert severity={flashMessage.type} variant='filled'>
        {flashMessage.message}
      </Alert>
    </div>
  )
}

export default FlashMessageDisplay
