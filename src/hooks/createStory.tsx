import { useState } from "react";
import { StoryForm } from "../components/form/form.types";

export const useCreateStory = () => {
  const [loading, setLoading] = useState(false);
  const [story, setStory] = useState<object | null>(null);

  const createStory = async (formData: StoryForm) => {
    setLoading(true);
    try {
      const userId = "6778202d3b42eca8e50dad86";
      const childId = "67785cfa2ed4368e8bd6fd22";
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
        "https://drzij5bfzs.us-west-2.awsapprunner.com/stories/create/test",
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
