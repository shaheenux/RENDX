import { GoogleGenAI } from "@google/genai";

export const generateCharacterImage = async (prompt: string, pose: string, background: string, aspectRatio: string): Promise<string> => {
  if (!process.env.API_KEY) {
    throw new Error("API key not found. Please ensure it is set in the environment variables.");
  }
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  
  const fullPrompt = `A high-quality 3D cartoon character render. A character that is ${prompt}, in a ${pose}. Pixar style, cinematic lighting, detailed, vibrant colors. Background: ${background}.`;

  try {
    const response = await ai.models.generateImages({
        model: 'imagen-4.0-generate-001',
        prompt: fullPrompt,
        config: {
          numberOfImages: 1,
          outputMimeType: 'image/jpeg',
          aspectRatio: aspectRatio,
        },
    });

    if (response.generatedImages && response.generatedImages.length > 0) {
      const base64ImageBytes: string = response.generatedImages[0].image.imageBytes;
      return base64ImageBytes;
    } else {
      throw new Error("No image was generated. The response might be empty or blocked.");
    }
  } catch (error) {
    console.error("Gemini API error:", error);
    throw new Error("Failed to generate character. The prompt may have been blocked or an API error occurred.");
  }
};