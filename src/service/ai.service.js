const { GoogleGenAI } = require("@google/genai");

// The client gets the API key from the environment variable `GEMINI_API_KEY`.
const ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY
});

const generateResponse = async (chatHistory) => {
    const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: chatHistory,
        // config: {
        //     systemInstruction: `
        //         You are an expert in generating caption for images.
        //         You generate single caption for the image.
        //         Your caption should be short and concise.
        //         You use hashtags and emojis in the caption.
        //     `
        // }
    });

    return response.text;
};

module.exports = generateResponse;