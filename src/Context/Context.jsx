import { createContext, useState } from "react";
import run from "../config/gemini";

export const Context = createContext();

const ContextProvider = (props) => {
    const [input, setInput] = useState('');
    const [recentPrompt, setRecentPrompt] = useState('');
    const [previousPrompts, setPreviousPrompts] = useState([]);
    const [showResult, setShowResult] = useState(false);
    const [loading, setLoading] = useState(false);
    const [resultData, setResultData] = useState('');

    const delayPara = (index, nextWord) => {
        setTimeout(() => setResultData(prev => prev + nextWord), 25 * index);
    };

    const newChat = () => {
        setLoading(false);
        setShowResult(false);
    };

    const onSent = async (prompt) => {
        const currentPrompt = prompt || input;

        if (!currentPrompt) return; // Exit if there's no prompt

        setRecentPrompt(currentPrompt);
        setShowResult(true);
        setLoading(true);
        setResultData(''); // Clear previous result

        // Update previous prompts if the current prompt is new
        setPreviousPrompts(prev => {
            if (!prev.includes(currentPrompt)) {
                const updatedPrompts = [...prev, currentPrompt];
                return updatedPrompts.length > 18 ? updatedPrompts.slice(-18) : updatedPrompts;
            }
            return prev; // Do not add if it already exists
        });

        try {
            const response = await run(currentPrompt);
            const formattedResponse = formatResponse(response);
            formattedResponse.split('').forEach((char, index) => delayPara(index, char));
        } catch (error) {
            console.error("Error fetching data:", error);
            setResultData("An error occurred while fetching data. Please try again.");
        } finally {
            setLoading(false);
            setInput(''); // Clear input after sending
        }
    };

    const formatResponse = (response) => {
        return response.split('**').map((part, index) => 
            (index % 2 === 1) ? `<b>${part}</b>` : part.replace(/\*/g, '<br>')
        ).join('');
    };

    return (
        <Context.Provider value={{
            previousPrompts,
            onSent,
            setRecentPrompt,
            recentPrompt,
            showResult,
            loading,
            resultData,
            input,
            setInput,
            newChat,
        }}>
            {props.children}
        </Context.Provider>
    );
};

export default ContextProvider;
