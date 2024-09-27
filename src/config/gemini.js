/*
 * Install the Generative AI SDK
 *
 * $ npm install @google/generative-ai
 */

// Import the necessary classes from the SDK
import { GoogleGenerativeAI } from '@google/generative-ai';

// Directly integrate your API key
const apiKey = "AIzaSyA_JRmFqq2y-7k_wqKBQDa2Vqz6MCD-wHM"; 
const genAI = new GoogleGenerativeAI(apiKey);

// Get the generative model
const model = genAI.getGenerativeModel({
    model: 'gemini-1.5-flash',
});

// Configure generation settings
const generationConfig = {
    temperature: 1,
    topP: 0.95,
    topK: 64,
    maxOutputTokens: 8192,
    responseMimeType: 'text/plain',
};

// Function to run the AI model
async function run(prompt) {
    const chatSession = model.startChat({
        generationConfig,
        history: [],
    });

    // Send the message to the AI and get the result
    const result = await chatSession.sendMessage(prompt);
    const response = result.response; 
    console.log(response.text());
    return response.text();
}

// Call the function with your input prompt
run();
export default run ;// Replace with the actual prompt you want to use
