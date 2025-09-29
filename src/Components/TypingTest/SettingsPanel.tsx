import type { RefObject } from "react";
import { Button } from "@/Components/ui/button";
import { Checkbox } from "@/Components/ui/checkbox";
import { Input } from "@/Components/ui/input";
import { Settings } from "lucide-react";
import type { Options } from "@/helpers/TypingTestDataHelper";

interface SettingsPanelProps {
  showOptions: boolean;
  setShowOptions: (show: boolean) => void;
  opts: Options;
  setOpts: React.Dispatch<React.SetStateAction<Options>>;
  settingsRef: RefObject<HTMLDivElement | null>;
  startedAt: number | null;
  endedAt: number | null;
}

export function SettingsPanel({ 
  showOptions, 
  setShowOptions, 
  opts, 
  setOpts,
  settingsRef,
  startedAt,
  endedAt
}: SettingsPanelProps) {
  return (
    <div 
      ref={settingsRef}
      className={`absolute right-0 top-0 z-10 transition-all duration-300 ease-out ${showOptions ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-5 pointer-events-none'}`}
      style={{ width: '300px' }}
    >
      <div className="p-6 rounded-xl shadow-lg border border-slate-200 transition-all duration-300 bg-white/80 backdrop-blur-sm">
        <div className="flex justify-between items-center mb-4">
          <h3 className="font-medium flex items-center gap-1">
            <Settings className="w-4 h-4" /> Settings
          </h3>
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={() => setShowOptions(false)}
            className="h-6 w-6 p-0 rounded-full hover:bg-slate-200/50"
          >
            <span className="sr-only">Close</span>
            <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M11.7816 4.03157C12.0062 3.80702 12.0062 3.44295 11.7816 3.2184C11.5571 2.99385 11.193 2.99385 10.9685 3.2184L7.50005 6.68682L4.03164 3.2184C3.80708 2.99385 3.44301 2.99385 3.21846 3.2184C2.99391 3.44295 2.99391 3.80702 3.21846 4.03157L6.68688 7.49999L3.21846 10.9684C2.99391 11.193 2.99391 11.557 3.21846 11.7816C3.44301 12.0061 3.80708 12.0061 4.03164 11.7816L7.50005 8.31316L10.9685 11.7816C11.193 12.0061 11.5571 12.0061 11.7816 11.7816C12.0062 11.557 12.0062 11.193 11.7816 10.9684L8.31322 7.49999L11.7816 4.03157Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd"></path>
            </svg>
          </Button>
        </div>
        <div className="text-xs text-slate-500 mb-4 italic">
          {startedAt && !endedAt 
            ? "Changes will apply to the next test" 
            : "Changes will apply immediately"}
        </div>
        <div className="flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <label htmlFor="case" className="text-sm font-medium">Case sensitive</label>
            <Checkbox
              id="case"
              checked={opts.caseSensitive}
              onCheckedChange={(v) => {
                const newValue = Boolean(v);
                setOpts((s) => ({ ...s, caseSensitive: newValue }));
              }}
            />
          </div>
          
          <div className="flex items-center justify-between">
            <label htmlFor="punct" className="text-sm font-medium">Punctuation</label>
            <Checkbox
              id="punct"
              checked={opts.includePunctuation}
              onCheckedChange={(v) => {
                const newValue = Boolean(v);
                setOpts((s) => ({ ...s, includePunctuation: newValue }));
              }}
            />
          </div>
          
          <div className="flex items-center justify-between">
            <label className="text-sm font-medium">Words</label>
            <Input
              type="number"
              value={opts.wordCount}
              min={10}
              max={200}
              onChange={(e) => {
                const newValue = Math.max(10, Math.min(200, Number(e.target.value)));
                setOpts((s) => ({ ...s, wordCount: newValue }));
              }}
              className="w-20 h-8"
            />
          </div>
        </div>
      </div>
    </div>
  );
}