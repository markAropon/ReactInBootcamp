import { Button } from "@/Components/ui/button";
import { Input } from "@/Components/ui/input";
import { RotateCcw } from "lucide-react";
import type { RefObject } from "react";

interface InputAreaProps {
  input: string;
  handleInput: (value: string) => void;
  inputRef: RefObject<HTMLInputElement | null>;
  reset: () => void;
}

export function InputArea({ input, handleInput, inputRef, reset }: InputAreaProps) {
  return (
    <div className="relative mb-8">
      <Input
        ref={inputRef}
        value={input}
        onChange={(e) => handleInput(e.target.value)}
        className="w-full rounded-md font-mono text-lg h-16 caret-transparent opacity-0"
        autoComplete="off"
        autoCapitalize="off"
        spellCheck="false"
        autoFocus
      />
      <div className="absolute top-0 left-0 right-0 flex justify-center mt-4">
        <Button 
          variant="outline" 
          size="lg"
          onClick={reset}
          className="px-10 py-5 text-base shadow-md border border-slate-200 hover:shadow-lg hover:border-slate-300 hover:text-slate-700 flex items-center gap-2 transition-all duration-300 ease-in-out"
        >
          <RotateCcw className="w-4 h-4 transition-transform duration-300 group-hover:rotate-180" /> restart
        </Button>
      </div>
    </div>
  );
}