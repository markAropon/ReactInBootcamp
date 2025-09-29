interface TextDisplayProps {
  target: string;
  input: string;
}

export function TextDisplay({ target, input }: TextDisplayProps) {
  return (
    <div className="flex-grow rounded-xl shadow-md border border-slate-200 p-10 mb-8 flex items-center justify-center transition-all duration-300">
      <div className="font-mono text-xl leading-relaxed tracking-wider max-w-4xl w-full">
        {target.split("").map((ch, i) => {
          const typed = input[i];
          let cls = "text-slate-400";
          
          if (typed == null) {
            cls = i === input.length 
              ? "text-slate-800 border-b-2 border-slate-800 animate-pulse relative after:absolute after:bottom-0 after:left-0 after:w-full after:h-[2px] after:bg-slate-800 after:animate-pulse" 
              : "text-slate-400";
          } else if (typed === ch) {
            cls = "text-slate-800 transition-colors duration-150";
          } else {
            cls = "text-red-500 transition-colors duration-150";
          }
          
          return (
            <span key={i} className={cls}>
              {ch}
            </span>
          );
        })}
      </div>
    </div>
  );
}