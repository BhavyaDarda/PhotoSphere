import OpenAI from "openai";
import { db } from "../db";
import { photos } from "@shared/schema";
import { eq } from "drizzle-orm";

// the newest OpenAI model is "gpt-4o" which was released May 13, 2024
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export async function analyzePhoto(imageUrl: string, photoId: number) {
  try {
    // Get image analysis from OpenAI Vision
    const visionResponse = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        {
          role: "user",
          content: [
            { 
              type: "text", 
              text: "Analyze this photograph in detail. Provide a JSON response with the following structure: { tags: string[], description: string }. The tags should be relevant keywords, and the description should be a detailed analysis." 
            },
            {
              type: "image_url",
              image_url: { url: imageUrl }
            }
          ],
        },
      ],
      response_format: { type: "json_object" }
    });

    const analysis = JSON.parse(visionResponse.choices[0].message.content);

    // Update the photo record with AI analysis
    await db.update(photos)
      .set({
        aiTags: analysis.tags,
        aiDescription: analysis.description
      })
      .where(eq(photos.id, photoId));

    return analysis;
  } catch (error) {
    console.error('Error analyzing photo:', error);
    throw error;
  }
}
