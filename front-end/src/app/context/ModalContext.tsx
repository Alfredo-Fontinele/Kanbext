'use client'

import React, { createContext, useContext, useState } from 'react'

interface ModalProps {
  isModalEditOpen: boolean
  setIsModalEditOpen: React.Dispatch<React.SetStateAction<boolean>>
  isModalAddOpen: boolean
  setIsModalAddOpen: React.Dispatch<React.SetStateAction<boolean>>
  openModalEdit: () => void
  closeModalEdit: () => void
  openModalAdd: () => void
  closeModalAdd: () => void
}

const ModalContext = createContext<ModalProps>({} as ModalProps)

export default function ModalProvider({ children }: React.PropsWithChildren) {
  const [isModalEditOpen, setIsModalEditOpen] = useState(false)
  const [isModalAddOpen, setIsModalAddOpen] = useState(false)

  const openModalEdit = () => {
    setIsModalEditOpen(true)
  }

  const closeModalEdit = () => {
    setIsModalEditOpen(false)
  }

  const openModalAdd = () => {
    setIsModalAddOpen(true)
  }

  const closeModalAdd = () => {
    setIsModalAddOpen(false)
  }
  return (
    <ModalContext.Provider
      value={{
        closeModalAdd,
        closeModalEdit,
        isModalAddOpen,
        isModalEditOpen,
        openModalAdd,
        openModalEdit,
        setIsModalAddOpen,
        setIsModalEditOpen,
      }}
    >
      {children}
    </ModalContext.Provider>
  )
}

export const useModalContext = () => useContext(ModalContext)
