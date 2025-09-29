import { Button } from "@/Components/ui/button";
import { ArrowLeft, Keyboard, Settings } from "lucide-react";
import { useNavigate } from "react-router-dom";
import type { RefObject } from "react";

interface HeaderProps {
  toggleOptions: (e?: React.MouseEvent) => void;
  showOptions: boolean;
  settingsButtonRef: RefObject<HTMLButtonElement | null>;
}

export function Header({ toggleOptions, showOptions, settingsButtonRef }: HeaderProps) {
  const navigate = useNavigate();

  return (
    <div className="flex justify-between items-center mb-8">
      <div className="flex items-center gap-3">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => navigate("/")}
          className="rounded-full hover:bg-slate-100"
        >
          <ArrowLeft className="w-5 h-5" />
          <span className="sr-only">Back to Home</span>
        </Button>

        <h1 className="text-2xl font-bold tracking-tight flex items-center gap-2">
          <Keyboard className="w-6 h-6" /> Typing Test
        </h1>
      </div>

      <Button 
        ref={settingsButtonRef}
        variant="ghost" 
        onClick={toggleOptions} 
        className="text-sm flex items-center gap-1 hover:bg-transparent hover:text-slate-700 transition-all duration-300"
      >
        <Settings className={`w-4 h-4 ${showOptions ? 'rotate-180' : 'rotate-0'} transition-transform duration-300`} />
        settings
      </Button>
    </div>
  );
}