import { useModalContext } from '@/app/context/ModalContext'
import { useApiContext } from '@/app/context/ApiContext'
import { DragDropContext } from 'react-beautiful-dnd'
import ModalEdit from './ModalEdit'
import ModalAdd from './ModalAdd'
import Column from './Column'

export default function DraggableList() {
  const { openModalEdit, isModalAddOpen, isModalEditOpen } = useModalContext()
  const { todos, handleOnDragEnd } = useApiContext()

  return (
    <>
      <DragDropContext onDragEnd={handleOnDragEnd}>
        <ul className="flex flex-wrap w-full justify-center gap-12">
          {todos.map((column, i) => (
            <Column column={column} key={i} openModal={openModalEdit} />
          ))}
        </ul>
      </DragDropContext>
      {isModalEditOpen && <ModalEdit />}
      {isModalAddOpen && <ModalAdd />}
    </>
  )
}
