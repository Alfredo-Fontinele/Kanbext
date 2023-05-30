'use client'

import React, { createContext, useContext, useState } from 'react'
import { IColumn, IItem } from '../page'
import { DropResult } from 'react-beautiful-dnd'

interface TodoContextProps {
  // columns: IColumn[]
  // setColumns: React.Dispatch<React.SetStateAction<IColumn[]>>
  handleDragEnd: (
    sourceColumnId: string,
    destinationColumnId: string,
    startIndex: number,
    endIndex: number,
  ) => void
  handleOnDragEnd: (result: DropResult) => void
  selectedItem: IItem | null
  setSelectedItem: React.Dispatch<React.SetStateAction<IItem | null>>
}

const TodoContext = createContext<TodoContextProps>({} as TodoContextProps)

export default function TodoProvider({ children }: React.PropsWithChildren) {
  const [selectedItem, setSelectedItem] = useState<IItem | null>(null)
  const [columns, setColumns] = useState<IColumn[]>([
    {
      idType: 'todo',
      lista: 'To Do',
      items: [],
    },
    {
      idType: 'doing',
      lista: 'Doing',
      items: [],
    },
    {
      idType: 'done',
      lista: 'Done',
      items: [],
    },
  ])

  const handleOnDragEnd = (result: DropResult) => {
    if (!result.destination) return

    const { source, destination } = result

    // console.log({
    //   destination,
    //   selectedItem,
    // })

    handleDragEnd(
      source.droppableId,
      destination.droppableId,
      source.index,
      destination.index,
    )
  }

  const handleDragEnd = (
    sourceColumnId: string,
    destinationColumnId: string,
    startIndex: number,
    endIndex: number,
  ) => {
    const updatedColumns = [...columns]

    const sourceColumnIndex = updatedColumns.findIndex(
      (column) => column.idType === sourceColumnId,
    )
    if (sourceColumnIndex !== -1) {
      const [removedItem] = updatedColumns[sourceColumnIndex].items.splice(
        startIndex,
        1,
      )

      const destinationColumnIndex = updatedColumns.findIndex(
        (column) => column.idType === destinationColumnId,
      )
      if (destinationColumnIndex !== -1) {
        updatedColumns[destinationColumnIndex].items.splice(
          endIndex,
          0,
          removedItem,
        )
      }

      setColumns(updatedColumns)
    }
  }
  return (
    <TodoContext.Provider
      value={{
        handleDragEnd,
        handleOnDragEnd,
        selectedItem,
        setSelectedItem,
      }}
    >
      {children}
    </TodoContext.Provider>
  )
}

export const useTodoContext = () => useContext(TodoContext)
