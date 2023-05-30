import { useModalContext } from '@/app/context/ModalContext'
import { FormEvent, useRef, useState } from 'react'
import Modal from './Modal'
import { useApiContext } from '@/app/context/ApiContext'

export default function ModalAdd() {
  const { closeModalAdd } = useModalContext()
  const { createTodo } = useApiContext()

  const inputTitulo = useRef<HTMLInputElement | null>(null)
  const inputConteudo = useRef<HTMLInputElement | null>(null)

  const onSaveSubmitAdd = (e: FormEvent) => {
    e.preventDefault()

    const tituloValue = inputTitulo.current?.value
    const conteudoValue = inputConteudo.current?.value

    if (!tituloValue || !conteudoValue) return

    const newTask = {
      titulo: tituloValue,
      conteudo: conteudoValue,
      lista: 'To Do',
    }

    closeModalAdd()
    createTodo(newTask)
  }

  return (
    <Modal closeModal={closeModalAdd}>
      <h3 className="text-2xl text-slate-300 font-bold mb-4">Add Task</h3>
      <form className="flex flex-col gap-3" onSubmit={onSaveSubmitAdd}>
        <label className="text-slate-500">Titulo</label>
        <input
          type="text"
          className="w-full px-4 py-2 border border-gray-300 rounded-md mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
          ref={inputTitulo}
          placeholder="Insira o título da task"
          required
        />
        <label className="text-slate-500">Conteudo</label>
        <input
          type="text"
          className="w-full px-4 py-2 border border-gray-300 rounded-md mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
          ref={inputConteudo}
          placeholder="Insira a descrição"
          required
        />
        <div className="flex gap-4">
          <button
            type="submit"
            className="px-4 py-2 text-white bg-green-500 rounded-md hover:bg-green-600"
          >
            Save
          </button>
        </div>
      </form>
    </Modal>
  )
}
