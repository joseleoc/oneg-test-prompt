import { useState } from "react";
import { StoryForm } from "../components/form/form.types";

export const useCreateStory = () => {
  const [loading, setLoading] = useState(false);
  const [story, setStory] = useState<object | null>(null);

  const createStory = async (formData: StoryForm) => {
    setLoading(true);
    try {
      const userId = "678591514f065079dcafff8b";
      const childId = "670569d121d97981e45822a3";
      const storyNarrator = {
        ageCategory: "Elderly",
        gender: "male",
      };

      const body = {
        userId,
        childId,
        storyNarrator,
        mainCharacter: formData.character,
        storyStyle: formData.style,
        ...formData,
      };
      console.log(formData);
      const response = await fetch(
        "http://localhost:3000/stories/create/test",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization:
              "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE3MjczODM3MDYsImV4cCI6MTcyOTk3NTcwNn0.p1LcqqcV-eT0BN9tJViPePz5peDrVJ-yiGVH1905X2c",
          },
          body: JSON.stringify(body),
        }
      );
      console.log(response);
      const data = await response.json();
      setStory(data);
    } catch (error) {
      console.log(error);
      throw new Error("Error al crear la historia");
    } finally {
      setLoading(false);
    }
  };

  return { loading, createStory, story };
};
