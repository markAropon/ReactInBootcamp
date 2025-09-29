export const WORDS = [
  "the","quick","brown","fox","jumps","over","lazy","dog",
  "typescript","react","developer","keyboard","practice",
  "accuracy","speed","modern","light","theme","layout",
  "coding","function","variable","interface","component",
  "hook","state","effect","render","optimize","performance",
  "frontend","design","responsive","application","framework"
];

export type Options = {
  caseSensitive: boolean;
  includePunctuation: boolean;
  wordCount: number;
};

export function makeText(wordCount: number, options: Options) {
  const picks: string[] = [];
  const punctuation = [",", ".", "!", "?", ";", ":"];

  for (let i = 0; i < wordCount; i++) {
    let w = WORDS[Math.floor(Math.random() * WORDS.length)];
    
    if (!options.caseSensitive) {
      w = w.toLowerCase();
    } else {
      if (Math.random() < 0.2) {
        w = w.charAt(0).toUpperCase() + w.slice(1);
      }
    }
    
    if (options.includePunctuation && i < wordCount - 1) {
      if (Math.random() < 0.3) {
        const punc = punctuation[Math.floor(Math.random() * punctuation.length)];
        w += punc;
      }
    }
    
    picks.push(w);
  }

  if (options.includePunctuation && picks.length > 0) {
    const lastWord = picks[picks.length - 1];
    if (!punctuation.some(p => lastWord.endsWith(p))) {
      picks[picks.length - 1] += ".";
    }
  }

  return picks.join(" ");
}

export function normalize(s: string, opts: Options) {
  let out = s;
  if (!opts.caseSensitive) out = out.toLowerCase();
  if (!opts.includePunctuation) {
    out = out.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()?"']/g, "");
  }
  return out;
}

export function calculateStats(normTarget: string, normInput: string, input: string, startedAt: number | null, endedAt: number | null) {
  const { correctChars, errors } = calculateAccuracy(normTarget, normInput);
  const wpm = calculateWpm(input, startedAt, endedAt);
  const accuracy = calculateAccuracyPercentage(correctChars, input.length);
  
  return { correctChars, errors, wpm, accuracy };
}

export function calculateAccuracy(target: string, input: string) {
  let correct = 0, errs = 0;
  for (let k = 0; k < Math.min(target.length, input.length); k++) {
    if (target[k] === input[k]) correct++;
    else errs++;
  }
  errs += Math.max(0, input.length - target.length);
  return { correctChars: correct, errors: errs };
}

export function calculateWpm(input: string, startedAt: number | null, endedAt: number | null) {
  if (!startedAt) return 0;
  const end = endedAt ?? Date.now();
  const minutes = Math.max(1 / 60, (end - startedAt) / 60000);
  return Math.round((input.length / 5) / minutes);
}

export function calculateAccuracyPercentage(correctChars: number, inputLength: number) {
  if (inputLength === 0) return 100;
  return Math.round((correctChars / inputLength) * 100);
}
export function setupKeyboardShortcuts(
  reset: () => void,
  toggleOptions: () => void
) {
  function handleKeyDown(e: KeyboardEvent) {
    if (e.key === 'Tab') {
      e.preventDefault();
      reset();
    } else if (e.key === 'Escape') {
      toggleOptions();
    }
  }
  
  return handleKeyDown;
}


export function handleOptionsChange(
  startedAt: number | null,
  endedAt: number | null,
  opts: Options,
  setTarget: React.Dispatch<React.SetStateAction<string>>,
  setInput: React.Dispatch<React.SetStateAction<string>>,
  setStartedAt: React.Dispatch<React.SetStateAction<number | null>>,
  setEndedAt: React.Dispatch<React.SetStateAction<number | null>>,
  setTimeLeft: React.Dispatch<React.SetStateAction<number>>,
  inputRef: React.RefObject<HTMLInputElement | null>
) {
  if (!startedAt || endedAt) {
    setTarget(makeText(opts.wordCount, opts));
    setInput("");
    setStartedAt(null);
    setEndedAt(null);
    setTimeLeft(30);
    inputRef.current?.focus();
  }
}

export function createTimer(
  setTimeLeft: React.Dispatch<React.SetStateAction<number>>,
  setTimerRunning: React.Dispatch<React.SetStateAction<boolean>>,
  setEndedAt: React.Dispatch<React.SetStateAction<number | null>>
) {
  const startTimer = () => {
    let timerId: number | null = window.setInterval(() => {
      setTimeLeft(prevTime => {
        if (prevTime <= 1) {
          if (timerId) {
            clearInterval(timerId);
            timerId = null;
          }
          setTimerRunning(false);
          setEndedAt(Date.now());
          return 0;
        }
        return prevTime - 1;
      });
    }, 1000);
    
    setTimerRunning(true);
    
    return {
      timerId,
      clearTimer: () => {
        if (timerId) {
          clearInterval(timerId);
          timerId = null;
        }
      }
    };
  };
  
  return { startTimer };
}

// Handle user input during the typing test
export function handleTypingInput(
  value: string, 
  target: string,
  startedAt: number | null,
  setStartedAt: React.Dispatch<React.SetStateAction<number | null>>,
  setEndedAt: React.Dispatch<React.SetStateAction<number | null>>,
  setInput: React.Dispatch<React.SetStateAction<string>>,
  startTimer: () => { timerId: number | null, clearTimer: () => void },
  clearTimer: (() => void) | null
) {
  // Start the timer on first input
  if (!startedAt && value.length > 0) {
    setStartedAt(Date.now());
    startTimer();
  }
  
  // Check if test is completed
  if (value === target) {
    setEndedAt(Date.now());
    if (clearTimer) clearTimer();
  }
  
  // Update input
  setInput(value);
}

// Reset the typing test state
export function resetTypingTest(
  opts: Options,
  setTarget: React.Dispatch<React.SetStateAction<string>>,
  setInput: React.Dispatch<React.SetStateAction<string>>,
  setStartedAt: React.Dispatch<React.SetStateAction<number | null>>,
  setEndedAt: React.Dispatch<React.SetStateAction<number | null>>,
  setTimeLeft: React.Dispatch<React.SetStateAction<number>>,
  setTimerRunning: React.Dispatch<React.SetStateAction<boolean>>,
  setShowOptions: React.Dispatch<React.SetStateAction<boolean>>,
  clearTimer: () => void,
  inputRef: React.RefObject<HTMLInputElement | null>
) {
  // Clear the timer
  clearTimer();
  
  // Generate new text with current options
  setTarget(makeText(opts.wordCount, opts));
  setInput("");
  setStartedAt(null);
  setEndedAt(null);
  setTimeLeft(30);
  setTimerRunning(false);
  setShowOptions(false);
  
  // Focus on the input
  inputRef.current?.focus();
}
