import { useState, useRef, useEffect } from "react";
import type { KeyboardEvent } from "react";
import { useTodo } from "./TodoContext";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { SendHorizontal } from "lucide-react";

export const AddTodoForm: React.FC = () => {
  const [text, setText] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const { addTodo } = useTodo();

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (text.trim()) {
      addTodo(text.trim());
      setText("");
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.shiftKey && text.trim()) {
      e.preventDefault();
      addTodo(text.trim());
      setText("");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="relative">
      <div className="relative flex items-center">
        <Input
          ref={inputRef}
          type="text"
          placeholder="Add a task..."
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={handleKeyDown}
          className="w-full pr-10 py-2 rounded-md text-sm shadow-md focus-visible:ring-blue-500 focus-visible:ring-1"
        />
        <Button 
          type="submit" 
          disabled={!text.trim()}
          size="icon"
          className="absolute right-2 top-1/2 -translate-y-1/2 h-8 w-8 rounded-full bg-blue-500 hover:bg-blue-600 text-white shadow-sm"
        >
          <SendHorizontal className="h-3 w-3" />
          <span className="sr-only">Add Task</span>
        </Button>
      </div>
    </form>
  );
};