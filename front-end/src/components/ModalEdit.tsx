import { useModalContext } from '@/app/context/ModalContext'
import { useApiContext } from '@/app/context/ApiContext'
import { FormEvent, useCallback, useRef } from 'react'
import Modal from './Modal'

export default function ModalEdit() {
  const { selectedItem, updateTodo, findAll, setTodos, deleteTodo } =
    useApiContext()
  const { closeModalEdit } = useModalContext()

  const inputTitulo = useRef<HTMLInputElement | null>(null)
  const inputConteudo = useRef<HTMLInputElement | null>(null)

  const getNewTodos = useCallback(async () => {
    const result = await findAll()
    setTodos(result)
  }, [])

  const onSaveSubmitEdit = (e: FormEvent) => {
    e.preventDefault()

    const tituloValue = inputTitulo.current?.value
    const conteudoValue = inputConteudo.current?.value

    if (!tituloValue || !conteudoValue || !selectedItem) return

    const taskUpdated = {
      ...selectedItem,
      titulo: tituloValue,
      conteudo: conteudoValue,
      lista: selectedItem.lista,
    }

    updateTodo(taskUpdated, selectedItem.lista)
    getNewTodos()
    closeModalEdit()
  }

  const removeTodo = () => {
    if (selectedItem) {
      deleteTodo(selectedItem)
    }
    getNewTodos()
    closeModalEdit()
  }

  return (
    <Modal closeModal={closeModalEdit}>
      <h3 className="text-2xl text-slate-300 font-bold mb-4">Edit Task</h3>
      <form className="flex flex-col gap-3" onSubmit={onSaveSubmitEdit}>
        <label className="text-slate-500">Titulo</label>
        <input
          type="text"
          defaultValue={selectedItem?.titulo}
          placeholder="Insira o título da task"
          className="w-full px-4 py-2 border border-gray-300 rounded-md mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
          ref={inputTitulo}
          required
        />
        <label className="text-slate-500">Conteudo</label>
        <input
          type="text"
          defaultValue={selectedItem?.conteudo}
          placeholder="Insira a descrição"
          className="w-full px-4 py-2 border border-gray-300 rounded-md mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
          ref={inputConteudo}
          required
        />
        <div className="flex gap-4">
          <button
            className="px-4 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600"
            type="submit"
          >
            Save
          </button>
          <button
            onClick={removeTodo}
            className="px-4 py-2 text-white bg-red-500 rounded-md hover:bg-red-600"
            type="button"
          >
            Remove
          </button>
        </div>
      </form>
    </Modal>
  )
}
