import { useState } from "react";
import { StoryForm } from "./form.types";

export const useGeneratePrompt = () => {
  const [prompt, setPrompt] = useState("");

  const generatePrompt = (data: StoryForm) => {
    const newPrompt =
      `
        Generate an engaging, entertaining, and educational story in Spanish.  

        ${data.finalDetails &&
      `
          ### **Key Priority**:  
          - The story must be primarily shaped by the following user-provided details:  
            "${data.finalDetails}".  
          - Ensure that every aspect of the **finalDetails** is meaningfully incorporated and strongly influences the plot, characters, and setting.`
      }

        ### Age-Specific Considerations:  
        - The story should be tailored to a child aged **${9}** years. Use the following guidelines for story content and language:  
          - **Below 6 years old**:  
            - **Content**: Focus on simple situations, friendly characters, and teaching basic values like kindness, sharing, and honesty.  
            - **Language**: Use short, simple sentences with familiar and repetitive words. Avoid complex vocabulary or abstract concepts.  
          - **6-7 years old**:  
            - **Content**: Introduce adventurous elements with mild suspense and a clear, uplifting message. Scenarios should remain relatable to the child's experiences.  
            - **Language**: Use slightly longer sentences with an engaging yet simple vocabulary. Include dialogue and actions that spark curiosity but avoid overly complex ideas.  
          - **8-10 years old**:  
            - **Content**: Develop an elaborate adventure with challenges that involve logic or problem-solving. Characters should have depth and relatable emotions.  
            - **Language**: Use more descriptive language with occasional advanced vocabulary. Allow for more complex sentences and ideas that encourage critical thinking and engagement.
          - **Above 10 years old**:  
            - **Content**: Introduce intricate plots with layered challenges, moral dilemmas, and nuanced characters. Themes can involve broader topics such as teamwork, resilience, or discovery.  
            - **Language**: Use sophisticated vocabulary and sentence structures. Incorporate vivid descriptions, dialogue with subtext, and moments that challenge the reader's imagination or perspective.

        ### Story Structure:  
        - The story must be long enough to last **at least 2 minutes** when read aloud.  
        - Include these narrative elements:  
          - A **clear beginning** to set up the plot and characters.  
          - A **rising action** that builds tension.  
          - A **climax** where the conflict reaches its peak.  
          - A **falling action** leading to resolution.  
          - A **satisfying conclusion**.  

        ### Length and Style:  
        - Write at least ${15} paragraphs to fully develop the story, its plot, and characters. Expand as needed for depth.  
        - The tone should be free from violence or inappropriate themes.  

        ### Creative Specifications:  
        - The story's style should match ${data.style}.  
        - If additional details are provided (${!!data.finalDetails}), integrate them meaningfully: "${data.finalDetails}".  

        ### Character Details:  
        - The main character is ${data.character},${data.characterDescription ?? `, described as ${data.characterDescription}`}.  
          - In the **content** field:  
            - Avoid detailed physical descriptions of the main character. Focus on their actions, personality, or role in the story.  
          - In the **characterDescription** field:  
            - Provide a detailed description of the main character's appearance, intended for creating a visual representation using tools like DALL-E.  
            - Include attributes such as:  
              - Skin color, eye color, and clothing details.  
              - Age, height, weight, and unique identifiers (e.g., hairstyle, accessories).  

        ### Setting Details:  
        - The story takes place in ${data.scenario}, ${data.scenarioDescription ?? `described as: ${data.scenarioDescription}`}.  
          - In the **placeDescription** field, provide vivid details about the setting, including atmosphere, surroundings, and key features (50-200 characters).  
        - Avoid over-describing the setting in the **content** field; only use high-level details there.  

        ### Focus and Purpose:  
        - The story should center around ${data.focus}${data.focusDescription ?? `, with the specific focus: ${data.focusDescription}`}.  
        - It should explore themes related to ${data.core}.
        - If applicable (${data.purpose != 'OTHER'}), emphasize ${data.purpose}.  

        ### Summary:  
        - Provide a summary that is **engaging** and appeals to both young and adult readers, no longer than 50 words.

        ### contentImageDescription:
        - The contentImageDescription field should contain a list of strings that describe the images in the content section.
        - Every content should have a corresponding image.
        - The images should be described in detail, emphasizing the main character, setting, and the scene.
        - All the descriptions should contain the physical characteristics of the character and scene.
        - The descriptions should not exceed limit of 500 characters.
    `
    setPrompt(newPrompt);
  };

  return { prompt, generatePrompt };

};