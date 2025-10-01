import { Trash2 } from "lucide-react";
import { useTodo, type Todo } from "./TodoContext";
import { Checkbox } from "../ui/checkbox";
import { Button } from "../ui/button";

interface TodoItemProps {
  todo: Todo;
}

export const TodoItem: React.FC<TodoItemProps> = ({ todo }) => {
  const { toggleTodo, deleteTodo } = useTodo();

  return (
    <div className="flex items-center gap-2 py-2 px-3 group hover:bg-gray-50 rounded-md transition-colors">
      <Checkbox
        id={`todo-${todo.id}`}
        checked={todo.completed}
        onCheckedChange={() => toggleTodo(todo.id)}
        className="h-4 w-4 transition-all data-[state=checked]:bg-blue-500 data-[state=checked]:text-white"
      />
      <label
        htmlFor={`todo-${todo.id}`}
        className={`flex-1 cursor-pointer text-sm transition-all truncate ${
          todo.completed ? "line-through text-gray-400" : "text-gray-700"
        }`}
      >
        {todo.text}
      </label>
      <Button
        variant="ghost"
        size="icon"
        onClick={() => deleteTodo(todo.id)}
        className="h-7 w-7 rounded-full opacity-0 group-hover:opacity-100 transition-opacity hover:bg-gray-100 hover:text-red-500"
      >
        <Trash2 className="h-4 w-4" />
        <span className="sr-only">Delete</span>
      </Button>
    </div>
  );
};