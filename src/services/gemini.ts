import { GoogleGenAI, Type } from "@google/genai";

export interface SynthesisOptions {
  tone: 'professional' | 'empathetic' | 'direct';
  format: 'narrative' | 'bullets';
  focus: 'overall' | 'technical' | 'leadership';
  customInstructions?: string;
}

export async function synthesizeFeedback(rawFeedback: string[], options?: SynthesisOptions) {
  const apiKey = process.env.GEMINI_API_KEY;
  
  if (!apiKey) {
    console.error("GEMINI_API_KEY is missing. Please set it in the Secrets panel.");
    throw new Error("API_KEY_MISSING");
  }

  const ai = new GoogleGenAI({ apiKey });

  const toneInstruction = options?.tone === 'empathetic' 
    ? "Use an empathetic and supportive tone, focusing on growth and potential."
    : options?.tone === 'direct'
    ? "Use a direct and concise tone, focusing on clear facts and outcomes."
    : "Use a professional and balanced corporate tone.";

  const formatInstruction = options?.format === 'bullets'
    ? "Structure the summary as a list of bullet points."
    : "Structure the summary as a cohesive narrative paragraph.";

  const focusInstruction = options?.focus === 'technical'
    ? "Prioritize technical skills, code quality, and engineering impact."
    : options?.focus === 'leadership'
    ? "Prioritize leadership, mentorship, and team collaboration."
    : "Provide a balanced overview of all performance areas.";

  const customInstruction = options?.customInstructions 
    ? `Additional Manager Instructions: ${options.customInstructions}`
    : "";

  const prompt = `
    You are an expert HR Performance Analyst. Your task is to synthesize multiple peer and manager feedback comments into a single, professional, and bias-free performance summary.
    
    Raw Feedback:
    ${rawFeedback.map((f, i) => `${i + 1}. ${f}`).join('\n')}
    
    Specific Instructions:
    - ${toneInstruction}
    - ${formatInstruction}
    - ${focusInstruction}
    ${customInstruction ? `- ${customInstruction}` : ""}
    
    General Requirements:
    1. Neutralize subjective or biased language (e.g., "aggressive", "emotional", "bossy", "lazy").
    2. Focus on objective performance, impact, and growth.
    3. Identify key strengths and areas for improvement.
    4. Provide a "Bias Audit" showing exactly which phrases were changed.
    5. Generate a concise, descriptive title (3-6 words) that captures the essence of the analysis.
    
    In the 'audit' array, for each change:
    - 'original': the biased or subjective phrase from the raw feedback.
    - 'replacement': the professional, objective phrase used in the summary.
    - 'reason': why the original was flagged (e.g., "Gender bias", "Subjective adjective", "Vague criticism").
    
    Return the response in JSON format.
  `;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            title: { type: Type.STRING, description: "A concise, descriptive title for the summary." },
            summary: { type: Type.STRING, description: "The synthesized, bias-free summary." },
            audit: { 
              type: Type.ARRAY, 
              items: {
                type: Type.OBJECT,
                properties: {
                  original: { type: Type.STRING },
                  replacement: { type: Type.STRING },
                  reason: { type: Type.STRING }
                }
              },
              description: "List of biased terms removed and their replacements."
            },
            score: { type: Type.NUMBER, description: "A 'Fairness Score' from 0-100." }
          },
          required: ["title", "summary", "audit", "score"]
        }
      }
    });

    const text = response.text;
    if (!text) throw new Error("EMPTY_RESPONSE");
    
    return JSON.parse(text);
  } catch (error) {
    console.error("Gemini Synthesis Error:", error);
    throw error;
  }
}
