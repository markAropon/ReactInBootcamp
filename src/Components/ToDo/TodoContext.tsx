import React, { createContext, useContext, useState } from 'react';
import type { ReactNode } from 'react';

// Define interfaces for Todo and TodoList
export interface Todo {
  id: string;
  text: string;
  completed: boolean;
}

export interface TodoList {
  id: string;
  name: string;
  todos: Todo[];
}

// Define the context type
interface TodoContextType {
  todoLists: TodoList[];
  currentListId: string | null;
  addTodoList: (name: string) => void;
  renameTodoList: (id: string, newName: string) => void;
  deleteTodoList: (id: string) => void;
  setCurrentList: (id: string) => void;
  addTodo: (text: string) => void;
  toggleTodo: (id: string) => void;
  deleteTodo: (id: string) => void;
}

// Create context
export const TodoContext = createContext<TodoContextType | undefined>(undefined);

// Create a provider component
interface TodoProviderProps {
  children: ReactNode;
}

export const TodoProvider: React.FC<TodoProviderProps> = ({ children }) => {
  const [todoLists, setTodoLists] = useState<TodoList[]>([
    {
      id: '1',
      name: 'Default List',
      todos: [],
    },
  ]);
  const [currentListId, setCurrentListId] = useState<string | null>('1');

  // Add a new todo list
  const addTodoList = (name: string) => {
    const newList: TodoList = {
      id: Date.now().toString(),
      name,
      todos: [],
    };
    setTodoLists((prev) => [...prev, newList]);
    setCurrentListId(newList.id);
  };

  // Rename a todo list
  const renameTodoList = (id: string, newName: string) => {
    if (!newName.trim()) return;
    
    setTodoLists((prev) =>
      prev.map((list) =>
        list.id === id ? { ...list, name: newName.trim() } : list
      )
    );
  };

  // Delete a todo list
  const deleteTodoList = (id: string) => {
    setTodoLists((prev) => prev.filter((list) => list.id !== id));
    if (currentListId === id) {
      setCurrentListId(todoLists.length > 1 ? todoLists[0].id : null);
    }
  };

  // Set current list
  const setCurrentList = (id: string) => {
    setCurrentListId(id);
  };

  // Add a new todo to the current list
  const addTodo = (text: string) => {
    if (!currentListId) return;

    const newTodo: Todo = {
      id: Date.now().toString(),
      text,
      completed: false,
    };

    setTodoLists((prev) =>
      prev.map((list) => {
        if (list.id === currentListId) {
          return {
            ...list,
            todos: [...list.todos, newTodo],
          };
        }
        return list;
      })
    );
  };

  // Toggle todo completion status
  const toggleTodo = (id: string) => {
    if (!currentListId) return;

    setTodoLists((prev) =>
      prev.map((list) => {
        if (list.id === currentListId) {
          return {
            ...list,
            todos: list.todos.map((todo) =>
              todo.id === id ? { ...todo, completed: !todo.completed } : todo
            ),
          };
        }
        return list;
      })
    );
  };

  // Delete a todo
  const deleteTodo = (id: string) => {
    if (!currentListId) return;

    setTodoLists((prev) =>
      prev.map((list) => {
        if (list.id === currentListId) {
          return {
            ...list,
            todos: list.todos.filter((todo) => todo.id !== id),
          };
        }
        return list;
      })
    );
  };

  const value = {
    todoLists,
    currentListId,
    addTodoList,
    renameTodoList,
    deleteTodoList,
    setCurrentList,
    addTodo,
    toggleTodo,
    deleteTodo,
  };

  return <TodoContext.Provider value={value}>{children}</TodoContext.Provider>;
};

// Create a custom hook to use the context
export const useTodo = () => {
  const context = useContext(TodoContext);
  if (context === undefined) {
    throw new Error('useTodo must be used within a TodoProvider');
  }
  return context;
};