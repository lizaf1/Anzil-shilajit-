
import { GoogleGenAI } from "@google/genai";

const getSystemInstruction = (lang: 'en' | 'id') => `
You are the AI Wellness Expert for "Anzil Himalayan Shilajit Resin".
Your goal is to educate users about the benefits, usage, and purity of Anzil Shilajit.

CURRENT LANGUAGE: ${lang === 'id' ? 'Bahasa Indonesia' : 'English'}.
YOU MUST RESPOND ONLY IN ${lang === 'id' ? 'Bahasa Indonesia' : 'English'}.

Key Product Facts:
- Sourced from above 16,000 ft in the Himalayan mountains.
- 100% Pure resin form (the most potent version).
- Contains over 84 trace minerals and high levels of Fulvic Acid.
- Lab tested for purity and heavy metals (BPOM standard compliant).
- Benefits: Natural energy, cognitive support, immunity, and hormonal balance (vitalitas).
- Usage: Pea-sized amount dissolved in warm water/milk.

Guidelines:
1. Be professional and encouraging.
2. Advise consulting a doctor for medical conditions.
3. Keep responses concise and scientific.
`;

export const getWellnessResponse = async (userMessage: string, lang: 'en' | 'id' = 'en') => {
  // Create a new instance right before making an API call to ensure it always uses the most up-to-date API key from the dialog.
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  
  try {
    // Correctly using gemini-3-flash-preview for text generation tasks
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: userMessage,
      config: {
        systemInstruction: getSystemInstruction(lang),
        temperature: 0.7,
      },
    });

    // Accessing .text as a property as per guidelines
    return { 
      text: response.text || (lang === 'id' ? "Halo! Ada yang bisa saya bantu?" : "Hello! How can I help you?"),
      error: null 
    };
  } catch (error: any) {
    console.error("Gemini API Error:", error);
    
    // Check if it's a permission/not found error that might be solved by key selection
    const errorMessage = error?.message || "";
    const isPermissionError = 
      errorMessage.includes("403") || 
      errorMessage.includes("permission") || 
      errorMessage.includes("Requested entity was not found.");
    
    return {
      text: lang === 'id' ? "Maaf, sepertinya ada kendala akses. Pastikan kunci API telah dikonfigurasi dengan benar." : "I'm having trouble accessing the service. Please ensure the API key is correctly configured.",
      error: isPermissionError ? 'AUTH_REQUIRED' : 'GENERAL_ERROR'
    };
  }
};
