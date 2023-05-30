'use client'

import { IItemTodoResponse, useApiContext } from './context/ApiContext'
import { useModalContext } from './context/ModalContext'
import DraggableList from '@/components/DraggableList'
import { IoMdAdd } from 'react-icons/io'
import { useEffect } from 'react'

type ListaProps = 'To Do' | 'Doing' | 'Done'

export interface IItem {
  id: string
  conteudo: string
  titulo: string
}

export interface IColumn {
  idType: string
  lista: ListaProps
  items: IItemTodoResponse[]
}

export default function Home() {
  const { openModalAdd } = useModalContext()
  const { findAll } = useApiContext()

  useEffect(() => {
    async function getAllTodos() {
      await findAll()
    }
    getAllTodos()
  }, [])

  return (
    <div className="flex flex-col w-full min-h-screen gap-10 p-6 bg-dark_theme ">
      <div className="w-full flex justify-between items-center">
        <h1 className="text-center text-4xl text-slate-700">Next Todo</h1>
        <div className="hidden sm:flex">
          <button
            className="px-4 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600"
            onClick={openModalAdd}
          >
            Add Task
          </button>
        </div>
        <IoMdAdd
          className="flex sm:hidden text-white text-5xl p-2 border-solid border-2 border-slate-500 cursor-pointer"
          onClick={openModalAdd}
        />
      </div>
      <div className="flex justify-evenly">
        <DraggableList />
      </div>
    </div>
  )
}
