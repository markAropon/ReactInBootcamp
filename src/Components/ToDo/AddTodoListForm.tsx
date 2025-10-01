import { useState } from "react";
import { useTodo } from "./TodoContext";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { PlusCircle } from "lucide-react";

export const AddTodoListForm: React.FC = () => {
  const [isAdding, setIsAdding] = useState(false);
  const [name, setName] = useState("");
  const { addTodoList } = useTodo();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim()) {
      addTodoList(name.trim());
      setName("");
      setIsAdding(false);
    }
  };

  if (!isAdding) {
    return (
      <Button
        variant="ghost"
        className="flex items-center gap-2 w-full justify-start pl-2 mb-2"
        onClick={() => setIsAdding(true)}
      >
        <PlusCircle className="h-4 w-4" />
        <span>New List</span>
      </Button>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex gap-2 mb-4">
      <Input
        type="text"
        placeholder="List name..."
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="flex-1"
        autoFocus
      />
      <Button type="submit" size="sm" disabled={!name.trim()}>
        Add
      </Button>
      <Button
        type="button"
        variant="ghost"
        size="sm"
        onClick={() => {
          setIsAdding(false);
          setName("");
        }}
      >
        Cancel
      </Button>
    </form>
  );
};