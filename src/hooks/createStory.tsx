import { useState } from "react";
import { StoryForm } from "../components/form/form.types";

const API_URL = "https://drzij5bfzs.us-west-2.awsapprunner.com/stories/create/test";
// const API_URL = "http://localhost:3000/stories/create/test";

export const useCreateStory = () => {
  const [loading, setLoading] = useState(false);
  const [story, setStory] = useState<object | null>(null);
  const [step, setStep] = useState<1 | 2>(1);

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
        ...formData,
      };
      console.log(formData);
      const response = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization:
            "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE3MjczODM3MDYsImV4cCI6MTcyOTk3NTcwNn0.p1LcqqcV-eT0BN9tJViPePz5peDrVJ-yiGVH1905X2c",
        },
        body: JSON.stringify(body),
      });
      console.log(response);
      const data = await response.json();
      setStory(data);
      setStep(2);
    } catch (error) {
      console.log(error);
      throw new Error("Error al crear la historia");
    } finally {
      setLoading(false);
    }
  };

  return { loading, createStory, story, step, setStep };
};
