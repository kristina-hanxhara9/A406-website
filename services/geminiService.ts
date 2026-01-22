import { GoogleGenAI } from "@google/genai";
import { COMPANY_INFO, PRODUCTS } from "../constants";

let ai: GoogleGenAI | null = null;

const getAIClient = () => {
  if (!ai) {
    ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  }
  return ai;
};

const SYSTEM_INSTRUCTION = `
You are the AI Assistant for A406 Windows, a premium company specializing in Double Glazing, Windows, and Doors in London.
Your goal is to be helpful, professional, and encourage users to request a quote or call us.
We DO NOT offer painting services anymore. Focus purely on glazing, windows, and doors.

Company Details:
Name: ${COMPANY_INFO.name}
Address: ${COMPANY_INFO.address}
Phone: ${COMPANY_INFO.phone}
Hours: ${COMPANY_INFO.hours}
Rating: ${COMPANY_INFO.rating} stars from ${COMPANY_INFO.reviewCount} reviews.

Products & Services:
${PRODUCTS.map(p => `- ${p.title}: ${p.description} (${p.priceRange})`).join('\n')}

Tone: Modern, Professional, Expert, Concise.
Colors of brand: Dark Blue, Red.

If asked about prices, give the estimated ranges from the products list but emphasize that a site visit is best for an accurate quote.
If asked about location, mention we are on North Circular Rd, London N13.
If asked about painting, politely inform them we specialize exclusively in windows and doors now.
Keep responses concise (under 80 words) unless detailed info is requested.
`;

export const generateChatResponse = async (history: {role: string, parts: {text: string}[]}[], userMessage: string) => {
  const client = getAIClient();
  const model = "gemini-3-flash-preview";

  try {
    const chat = client.chats.create({
      model,
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
      },
      history: history,
    });

    const result = await chat.sendMessage({ message: userMessage });
    return result.text;
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "I'm having trouble connecting to my knowledge base right now. Please call us directly at 020 8889 9982.";
  }
};