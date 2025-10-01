import { Button } from "../ui/button";
import { ArrowLeft, CheckSquare } from "lucide-react";
import { useNavigate } from "react-router-dom";


export function Header() {
  const navigate = useNavigate();

  return (
    <div className="flex justify-between items-center h-full py-1.5 px-3">
      <div className="flex items-center">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => navigate("/")}
          className="rounded-full hover:bg-gray-100 h-8 w-8"
        >
          <ArrowLeft className="w-4 h-4" />
          <span className="sr-only">Back to Home</span>
        </Button>
        <div className="flex items-center ml-2">
          <CheckSquare className="h-5 w-5 text-black mr-2" />
          <h1 className="text-lg font-medium text-black">Tasks</h1>
        </div>
      </div>
    </div>
  );
}