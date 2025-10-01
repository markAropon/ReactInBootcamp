import { useTodo } from "./TodoContext";
import { TodoItem } from "./TodoItem";
import { AddTodoForm } from "./AddTodoForm";
import { Card } from "../ui/card";
import { CheckCheck } from "lucide-react";

export const TodoListView: React.FC = () => {
  const { todoLists, currentListId } = useTodo();

  // Find the current list
  const currentList = todoLists.find((list) => list.id === currentListId);

  if (!currentList) {
    return (
      <div className="flex justify-center items-center h-40">
        <p className="text-gray-500">Select or create a list to get started</p>
      </div>
    );
  }

  return (
    <Card className="flex flex-col p-0 bg-white overflow-hidden h-full max-w-full shadow-md">
      {/* Header */}
      <div className="py-2 px-4 bg-white flex items-center justify-between shrink-0 shadow-sm">
        <h2 className="text-base font-medium text-gray-800 truncate">{currentList.name}</h2>
      </div>
      
      {/* Task List */}
      <div className="flex-1 overflow-y-auto p-1 h-[calc(100%-4.5rem)]">
        {currentList.todos.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-center min-h-[200px]">
            <CheckCheck className="h-12 w-12 text-gray-300 mb-2" />
            <p className="text-gray-400">
              No tasks yet
            </p>
            <p className="text-gray-400 text-sm mt-1">
              Add your first task below
            </p>
          </div>
        ) : (
          <div className="space-y-2 pb-4">
            {currentList.todos.map((todo) => (
              <TodoItem key={todo.id} todo={todo} />
            ))}
          </div>
        )}
      </div>
      
      {/* Input Area */}
      <div className="py-3 px-4 bg-white shrink-0 shadow-sm">
        <AddTodoForm />
      </div>
    </Card>
  );
};