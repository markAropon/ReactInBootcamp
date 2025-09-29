"use client";

import { useState, useMemo, useRef, useEffect, useCallback } from "react";
import { 
  type Options, 
  makeText, 
  normalize, 
  calculateAccuracy, 
  calculateWpm, 
  calculateAccuracyPercentage,
  resetTypingTest,
  handleOptionsChange,
  setupKeyboardShortcuts
} from "@/helpers/TypingTestDataHelper";
import {
  Header,
  StatsDisplay,
  TextDisplay,
  InputArea,
  SettingsPanel,
  Footer
} from "@/Components/TypingTest";
import Result from "@/Components/TypingTest/Result";
export function TypingTest() {
  const [opts, setOpts] = useState<Options>({
    caseSensitive: false,   
    includePunctuation: false,
    wordCount: 25,
  });

  const [target, setTarget] = useState(() => makeText(opts.wordCount, opts));
  const [input, setInput] = useState("");
  const [startedAt, setStartedAt] = useState<number | null>(null);
  const [endedAt, setEndedAt] = useState<number | null>(null);
  const [showOptions, setShowOptions] = useState(false);
  const [timeLeft, setTimeLeft] = useState<number>(30);
  const [timerRunning, setTimerRunning] = useState(false);
  const [showResults, setShowResults] = useState(false);
  
  const inputRef = useRef<HTMLInputElement>(null);
  const timerRef = useRef<number | null>(null);

  const normTarget = useMemo(() => normalize(target, opts), [target, opts]);
  const normInput = useMemo(() => normalize(input, opts), [input, opts]);
  const { correctChars, errors } = useMemo(() => {
    return calculateAccuracy(normTarget, normInput);
  }, [normTarget, normInput]);

  const wpm = useMemo(() => {
    return calculateWpm(input, startedAt, endedAt);
  }, [input, startedAt, endedAt]);

  const accuracy = useMemo(() => {
    return calculateAccuracyPercentage(correctChars, input.length);
  }, [correctChars, input.length]);

  // Use the timer helper
  const { startTimer } = useMemo(() => {
    // Custom modified version of createTimer function
    const createModifiedTimer = () => {
      let timerId: number | null = null;
      
      const startTimer = () => {
        timerId = window.setInterval(() => {
          setTimeLeft(prevTime => {
            if (prevTime <= 1) {
              // When time's up
              if (timerId) {
                clearInterval(timerId);
                timerId = null;
              }
              setTimerRunning(false);
              setEndedAt(Date.now());
              setShowResults(true); // Show results when time's up
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
    };
    
    return createModifiedTimer();
  }, []);
  
  // Clear timer function
  const clearTimer = useCallback(() => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
  }, []);

  const handleInput = useCallback((v: string) => {
    if (!startedAt && v.length > 0) {
      setStartedAt(Date.now());
      const timer = startTimer();
      timerRef.current = timer.timerId;
    }
    if (v === target) {
      setEndedAt(Date.now());
      clearTimer();
      setTimerRunning(false);
      setShowResults(true); // Show results when the test is completed
    }
    setInput(v);
  }, [clearTimer, startedAt, target, startTimer]);
  const reset = useCallback(() => {
    resetTypingTest(
      opts,
      setTarget,
      setInput,
      setStartedAt,
      setEndedAt,
      setTimeLeft,
      setTimerRunning,
      setShowOptions,
      clearTimer,
      inputRef
    );
    setShowResults(false); // Hide results when resetting
  }, [opts, clearTimer]);
  
  const toggleOptions = useCallback((e?: React.MouseEvent) => {
    e?.stopPropagation();
    setShowOptions(prev => !prev);
  }, []);

  useEffect(() => {
    const handleKeyDown = setupKeyboardShortcuts(reset, toggleOptions);
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [reset, toggleOptions]);
  
  useEffect(() => {
    return clearTimer;
  }, []);
  
  useEffect(() => {
    handleOptionsChange(
      startedAt,
      endedAt,
      opts,
      setTarget,
      setInput,
      setStartedAt,
      setEndedAt,
      setTimeLeft,
      inputRef
    );
  }, [opts.wordCount, opts.caseSensitive, opts.includePunctuation, startedAt, endedAt]);
  
  // Use as-is to match the expected types in component props
  const settingsRef = useRef<HTMLDivElement>(null);
  const settingsButtonRef = useRef<HTMLButtonElement>(null);
  
  useEffect(() => {
    inputRef.current?.focus();
    const handleWindowClick = (e: MouseEvent) => {
      inputRef.current?.focus();
      if (showOptions && 
          settingsRef.current && 
          !settingsRef.current.contains(e.target as Node) &&
          settingsButtonRef.current && 
          !settingsButtonRef.current.contains(e.target as Node)) {
        setShowOptions(false);
      }
    };
    window.addEventListener('click', handleWindowClick);
    return () => {
      window.removeEventListener('click', handleWindowClick);
    };
  }, [showOptions]);

  return (
    <div className="container mx-auto py-8 px-6 min-h-screen flex flex-col">
      {/* Header with back button and settings */}
      <Header 
        showOptions={showOptions} 
        toggleOptions={toggleOptions}
        settingsButtonRef={settingsButtonRef}
      />
      
      {/* Settings panel overlay */}
      <div className="relative mb-10">
        {showOptions && (
          <div 
            className="fixed inset-0 bg-black/5 backdrop-blur-[2px] z-0"
            onClick={() => setShowOptions(false)}
          />
        )}
        
        {/* Settings panel component */}
        <SettingsPanel
          showOptions={showOptions}
          setShowOptions={setShowOptions}
          opts={opts}
          setOpts={setOpts}
          settingsRef={settingsRef}
          startedAt={startedAt}
          endedAt={endedAt}
        />
      </div>

      {/* Stats display component */}
      <StatsDisplay
        wpm={wpm}
        accuracy={accuracy}
        errors={errors}
        timeLeft={timeLeft}
        timerRunning={timerRunning}
        startedAt={startedAt}
        endedAt={endedAt}
      />

      {/* Text display component */}
      <TextDisplay 
        target={target} 
        input={input} 
      />

      {/* Input area component */}
      <InputArea
        input={input}
        handleInput={handleInput}
        inputRef={inputRef}
        reset={reset}
      />

      {/* Footer component */}
      <Footer
        endedAt={endedAt}
        timeLeft={timeLeft}
      />
      
      {/* Results modal */}
      <Result 
        wpm={wpm}
        accuracy={accuracy}
        errors={errors}
        timeElapsed={startedAt && endedAt ? Math.round((endedAt - startedAt) / 1000) : 30 - timeLeft}
        completed={endedAt !== null && timeLeft > 0}
        onClose={reset}
        isOpen={showResults}
      />
    </div>
  );
}

export default TypingTest;
