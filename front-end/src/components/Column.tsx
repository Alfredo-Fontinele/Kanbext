import { Draggable, Droppable } from 'react-beautiful-dnd'
import { useApiContext } from '@/app/context/ApiContext'
import { ImFilesEmpty } from 'react-icons/im'
import { IColumn, IItem } from '@/app/page'
import { useState } from 'react'

interface ColumnComponentProps {
  column: IColumn
  openModal: (item: IItem) => void
}

const validate = {
  'To Do': 'border-l-4 border-red-500 border-solid',
  Doing: 'border-l-4 border-purple-500 border-solid',
  Done: 'border-l-4 border-green-500 border-solid',
}

const emoji = {
  'To Do': '🔜',
  Doing: '🔧',
  Done: '✅',
}

export default function Column({ column, openModal }: ColumnComponentProps) {
  const { todos, setSelectedItem } = useApiContext()
  const [isEmpty, setIsEmpty] = useState(true)

  return (
    <Droppable droppableId={column.idType}>
      {(provided) => (
        <div
          ref={provided.innerRef}
          {...provided.droppableProps}
          className="flex flex-col flex-1 gap-8 items-center w-full min-w-[200px]"
        >
          <h3 className="text-2xl text-slate-300 text-center">
            {column.lista} {emoji[column.lista]}
          </h3>
          {!column.items.length && (
            <div className="text-white py-7 text-xl">
              <h1>Vazio</h1>
              <ImFilesEmpty className="flex text-slate-500 text-5xl p-2" />
            </div>
          )}
          {column.items.map((item, index) => (
            <Draggable key={item.id} draggableId={item.id} index={index}>
              {(provided) => (
                <div
                  ref={provided.innerRef}
                  {...provided.draggableProps}
                  {...provided.dragHandleProps}
                  style={provided.draggableProps.style}
                  className={`flex flex-col ${
                    validate[column.lista]
                  } text-slate-500 gap-4 shadow-lg rounded-sm p-3 w-full max-w-[400px] min-w-[200px]`}
                  onClick={() => openModal(item)}
                  onMouseDown={() => setSelectedItem(item)}
                >
                  <h3 className="text-slate-400 text-xl">{item.titulo}</h3>
                  <p className="text-slate-500">{item.conteudo}</p>
                </div>
              )}
            </Draggable>
          ))}
          {provided.placeholder}
        </div>
      )}
    </Droppable>
  )
}
