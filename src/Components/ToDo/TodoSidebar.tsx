import { useState, useRef, useEffect } from "react";
import type { KeyboardEvent } from "react";
import { useTodo } from "./TodoContext";
import { Plus, Trash2, Edit2 } from "lucide-react";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";
import { Input } from "../ui/input";

interface EditableListItemProps {
  id: string;
  name: string;
  isActive: boolean;
  isEditing: boolean;
  onSelect: () => void;
  onDelete: () => void;
  onEdit: () => void;
  onSave: (newName: string) => void;
}

const EditableListItem: React.FC<EditableListItemProps> = ({
  name,
  isActive,
  isEditing,
  onSelect,
  onDelete,
  onEdit,
  onSave
}) => {
  const [editedName, setEditedName] = useState(name);
  const inputRef = useRef<HTMLInputElement>(null);
  
  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus();
      inputRef.current.select();
    }
  }, [isEditing]);
  
  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && editedName.trim()) {
      onSave(editedName);
    } else if (e.key === 'Escape') {
      setEditedName(name);
      onEdit();
    }
  };

  return (
    <div 
      className={cn(
        "group flex items-center justify-between px-3 py-2 mb-1 transition-colors rounded-md",
        isActive ? "bg-blue-50 text-blue-700 font-medium shadow-sm" : "hover:bg-gray-50 text-gray-700"
      )}
    >
      {isEditing ? (
        <Input
          ref={inputRef}
          type="text"
          value={editedName}
          onChange={(e) => setEditedName(e.target.value)}
          onKeyDown={handleKeyDown}
          onBlur={() => {
            if (editedName.trim()) {
              onSave(editedName);
            } else {
              setEditedName(name);
              onEdit();
            }
          }}
          className="py-0 h-7 text-sm rounded-md shadow-sm focus-visible:ring-blue-500 focus-visible:ring-1"
        />
      ) : (
        <>
          <div className="flex-1 truncate cursor-pointer" onClick={onSelect}>
            {name}
          </div>
          <div className="flex items-center space-x-1 opacity-0 group-hover:opacity-100 transition-opacity">
            <Button
              variant="ghost"
              size="sm"
              onClick={onEdit}
              className="h-6 w-6 rounded-md hover:bg-gray-100 p-0 shadow-sm"
            >
              <Edit2 className="h-3 w-3" />
              <span className="sr-only">Edit</span>
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={onDelete}
              className="h-6 w-6 rounded-md hover:bg-gray-100 hover:text-red-500 p-0 shadow-sm"
            >
              <Trash2 className="h-3 w-3" />
              <span className="sr-only">Delete</span>
            </Button>
          </div>
        </>
      )}
    </div>
  );
};

export const TodoSidebar: React.FC = () => {
  const { todoLists, currentListId, setCurrentList, deleteTodoList, addTodoList, renameTodoList } = useTodo();
  const [isCreating, setIsCreating] = useState(false);
  const [newListName, setNewListName] = useState("");
  const [editingListId, setEditingListId] = useState<string | null>(null);
  const newInputRef = useRef<HTMLInputElement>(null);
  
  useEffect(() => {
    if (isCreating && newInputRef.current) {
      newInputRef.current.focus();
    }
  }, [isCreating]);

  const handleAddList = () => {
    if (newListName.trim()) {
      addTodoList(newListName.trim());
      setNewListName("");
      setIsCreating(false);
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && newListName.trim()) {
      handleAddList();
    } else if (e.key === 'Escape') {
      setNewListName("");
      setIsCreating(false);
    }
  };

  return (
    <div className="flex flex-col h-full bg-white max-w-full overflow-hidden">
      <div className="flex items-center justify-between px-3 py-2 shadow-md">
        <h3 className="text-base font-semibold text-black">Lists</h3>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setIsCreating(true)}
          className="h-7 w-7 rounded-md hover:bg-gray-100 p-0 shadow-sm"
        >
          <Plus className="h-4 w-4" />
          <span className="sr-only">Add List</span>
        </Button>
      </div>

      {isCreating && (
        <div className="px-3 py-2 shadow-sm">
          <Input
            ref={newInputRef}
            type="text"
            placeholder="New list name..."
            value={newListName}
            onChange={(e) => setNewListName(e.target.value)}
            onKeyDown={handleKeyDown}
            className="rounded-md shadow-md focus-visible:ring-blue-500 focus-visible:ring-1"
            onBlur={() => {
              if (newListName.trim()) {
                handleAddList();
              } else {
                setIsCreating(false);
              }
            }}
          />
        </div>
      )}

      <div className="flex-1 overflow-y-auto">
        {todoLists.map((list) => (
          <EditableListItem
            key={list.id}
            id={list.id}
            name={list.name}
            isActive={currentListId === list.id}
            isEditing={editingListId === list.id}
            onSelect={() => setCurrentList(list.id)}
            onDelete={() => {
              if (todoLists.length > 1) {
                deleteTodoList(list.id);
              }
            }}
            onEdit={() => setEditingListId(editingListId === list.id ? null : list.id)}
            onSave={(newName) => {
              renameTodoList(list.id, newName);
              setEditingListId(null);
            }}
          />
        ))}
      </div>
    </div>
  );
};