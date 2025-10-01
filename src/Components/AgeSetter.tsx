import React, { createContext, useContext, useReducer } from 'react';
import Button from './Button';

type AgeState = {
    age: number;
};

type AgeAction = 
    | { type: 'INCREMENT' }
    | { type: 'DECREMENT' }
    | { type: 'RESET' };

type AgeContextType = {
    state: AgeState;
    dispatch: React.Dispatch<AgeAction>;
};

const AgeContext = createContext<AgeContextType | undefined>(undefined);

const ageReducer = (state: AgeState, action: AgeAction): AgeState => {
    switch (action.type) {
        case 'INCREMENT':
            return { age: state.age + 1 };
        case 'DECREMENT':
            return { age: state.age > 0 ? state.age - 1 : 0 };
        case 'RESET':
            return { age: 0 };
        default:
            return state;
    }
};

export const AgeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [state, dispatch] = useReducer(ageReducer, { age: 0 });
    
    return (
        <AgeContext.Provider value={{ state, dispatch }}>
            {children}
        </AgeContext.Provider>
    );
};
export const useAge = (): AgeContextType => {
    const context = useContext(AgeContext);
    if (context === undefined) {
        throw new Error('useAge must be used within an AgeProvider');
    }
    return context;
};

const AgeSetter: React.FC = () => {
    const { state, dispatch } = useAge();

    return (
        <div className="flex flex-col items-center justify-center">
            <h2 className='text-6xl mb-4'>{state.age}</h2>
            <div className="flex gap-4 mb-2">
                <Button color="green" label="-" onClick={() => dispatch({ type: 'DECREMENT' })} />
                <Button color="red" label="Reset" onClick={() => dispatch({ type: 'RESET' })} />
                <Button color="blue" label="+" onClick={() => dispatch({ type: 'INCREMENT' })} />
            </div>
        </div>
    );
};

export default AgeSetter;