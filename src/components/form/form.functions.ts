import { useState } from "react";

export const useGeneratePrompt = () => {
  const [prompt, setPrompt] = useState("");

  const generatePrompt = (data: {
    language: string,
    finalDetailsPrompt: string,
    agePrompt: string,
    lengthPrompt: string,
    characterPrompt: string,
    scenarioPrompt: string,
    focusPrompt: string,
    purposePrompt: string,
    corePrompt: string
  }) => {
    const newPrompt =
      `
Generate an engaging, entertaining, and educational story in ${data.language}.

${data.finalDetailsPrompt}

${data.agePrompt}

### Story Structure:
- The story must be long enough to last **at least 2 minutes** when read aloud.
- Include these narrative elements:
  - A **clear beginning** to set up the plot and characters.
  - A **rising action** that builds tension.
  - A **climax** where the conflict reaches its peak.
  - A **falling action** leading to resolution.
  - A **satisfying conclusion**.

${data.lengthPrompt}

${data.characterPrompt}

${data.scenarioPrompt}

### Focus and Purpose:
  ${data.focusPrompt}
  ${data.corePrompt}
  ${data.purposePrompt}

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


