'use client'

import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context'
import { DraggableLocation, DropResult } from 'react-beautiful-dnd'
import React, { createContext, useContext, useState } from 'react'
import { useRouter } from 'next/navigation'
import Cookies from 'universal-cookie'
import { api } from '../services/api'

export interface ItemTodoResponseProps {
  id: string
  titulo: string
  conteudo: string
  lista: string
  created_at: string
  updated_at: string
}

interface TokenResponseProps {
  access_token: string
  exception?: undefined
}

interface ItemTodoRequestProps {
  titulo: string
  conteudo: string
  lista: string
}

interface LoginRequestProps {
  login: string
  senha: string
}

interface FindAllResponseProps {
  items: ItemTodoResponseProps[]
  idType: string
  lista: 'To Do' | 'Doing' | 'Done'
}

export interface ColumnTodoProps {
  idType: string
  lista: 'To Do' | 'Doing' | 'Done'
  items: ItemTodoResponseProps[]
}

interface ApiContextProps {
  todos: ColumnTodoProps[]
  setTodos: React.Dispatch<React.SetStateAction<ColumnTodoProps[]>>
  token: string
  setToken: React.Dispatch<React.SetStateAction<string>>
  login: (loginRequest: LoginRequestProps) => Promise<TokenResponseProps | null>
  findAll: () => Promise<FindAllResponseProps[]>
  createTodo: (item: ItemTodoRequestProps) => Promise<ItemTodoResponseProps>
  updateTodo: (
    updatedTodo: ItemTodoResponseProps,
    destination: string,
  ) => Promise<void>
  deleteTodo: (todoToDelete: ItemTodoResponseProps) => Promise<void>
  selectedItem: ItemTodoResponseProps | null
  setSelectedItem: React.Dispatch<
    React.SetStateAction<ItemTodoResponseProps | null>
  >

  handleOnDragEnd: (result: DropResult) => void
  cookies: Cookies
  router: AppRouterInstance

  destination: DraggableLocation | undefined
  setDestination: React.Dispatch<
    React.SetStateAction<DraggableLocation | undefined>
  >
}

const ApiContext = createContext<ApiContextProps>({} as ApiContextProps)

export default function ApiProvider({ children }: React.PropsWithChildren) {
  const [destination, setDestination] = useState<DraggableLocation>()
  const [selectedItem, setSelectedItem] =
    useState<ItemTodoResponseProps | null>(null)
  const [todos, setTodos] = useState<ColumnTodoProps[]>([
    {
      idType: 'To Do',
      lista: 'To Do',
      items: [],
    },
    {
      idType: 'Doing',
      lista: 'Doing',
      items: [],
    },
    {
      idType: 'Done',
      lista: 'Done',
      items: [],
    },
  ])
  const cookies = new Cookies()
  const [token, setToken] = useState<string>(cookies.get('token:clickideia'))

  const router = useRouter()

  const handleOnDragEnd = async (result: DropResult) => {
    if (!result.destination) return

    const { source, destination } = result

    setDestination(destination)

    console.log({
      destination,
      selectedItem,
    })

    if (selectedItem) {
      await updateTodo(selectedItem, destination.droppableId)
    }

    setTodos((todos) => {
      const updatedColumns = [...todos]
      const sourceColumnIndex = updatedColumns.findIndex(
        (column) => column.idType === source.droppableId,
      )
      if (sourceColumnIndex !== -1) {
        const [removedItem] = updatedColumns[sourceColumnIndex].items.splice(
          source.index,
          1,
        )
        const destinationColumnIndex = updatedColumns.findIndex(
          (column) => column.idType === destination.droppableId,
        )
        if (destinationColumnIndex !== -1) {
          updatedColumns[destinationColumnIndex].items.splice(
            destination.index,
            0,
            removedItem,
          )
        }
        return updatedColumns
      }
      return todos
    })
  }

  const login = async (loginRequest: LoginRequestProps) => {
    const { data } = await api.post('/login', loginRequest)
    if (data.exception) return
    return data
  }

  const findAll = async (): Promise<FindAllResponseProps[]> => {
    const { data } = await api.get<ItemTodoResponseProps[]>('/cards', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    const newTodos = todos.map((todo) => ({
      ...todo,
      items: data.filter((item) => item.lista === todo.idType),
    }))
    setTodos(newTodos)
    return newTodos
  }

  const createTodo = async (
    item: ItemTodoRequestProps,
  ): Promise<ItemTodoResponseProps> => {
    const { data } = await api.post<ItemTodoResponseProps>('/cards', item, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    setTodos((prevTodos) => {
      const newTodos = prevTodos.map((todo) => {
        if (todo.lista === item.lista) {
          return {
            ...todo,
            items: [...todo.items, data],
          }
        }
        return todo
      })
      return newTodos
    })
    return data
  }

  const updateTodo = async (
    updatedTodo: ItemTodoResponseProps,
    destination: string,
  ) => {
    if (!selectedItem) return
    const newData = { ...updatedTodo, lista: destination }
    const { data } = await api.put<ItemTodoResponseProps>(
      `/cards/${newData.id}`,
      newData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    )
    setTodos((prevTodos) => {
      const updatedTodos = prevTodos.map((todo) => {
        if (todo.idType === updatedTodo.id) {
          return {
            ...todo,
            items: todo.items.map((item) =>
              item.id === updatedTodo.id ? data : item,
            ),
          }
        }
        return todo
      })
      return updatedTodos
    })
  }

  const deleteTodo = async (todoToDelete: ItemTodoResponseProps) => {
    try {
      await api.delete(`/cards/${todoToDelete.id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      setTodos((prevTodos) => {
        const updatedTodos = prevTodos.map((todo) => {
          if (todo.idType === todoToDelete.id) {
            return {
              ...todo,
              items: todo.items.filter((item) => item.id !== todoToDelete.id),
            }
          }
          return todo
        })
        return updatedTodos
      })
    } catch (error) {
      console.error('Erro ao excluir o todo:', error)
    }
  }

  return (
    <ApiContext.Provider
      value={{
        createTodo,
        deleteTodo,
        findAll,
        login,
        updateTodo,
        setTodos,
        setToken,
        todos,
        token,
        selectedItem,
        setSelectedItem,
        handleOnDragEnd,
        cookies,
        router,
        destination,
        setDestination,
      }}
    >
      {children}
    </ApiContext.Provider>
  )
}

export const useApiContext = () => useContext(ApiContext)
