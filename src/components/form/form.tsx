import { useForm } from "react-hook-form";
import "./form.css";

import { yupResolver } from "@hookform/resolvers/yup";
import {
  Focus,
  GeneralPurpose,
  MainCharacter,
  StoryCore,
  StoryForm,
  StoryScenario,
  StorySchema,
} from "./form.types";
import { useGeneratePrompt } from "./form.functions";
import { useEffect, useState } from "react";

export default function Form(props: {
  onSubmit: (data: StoryForm) => void;
  loading: boolean;
}) {
  const { onSubmit, loading } = props;
  const [lengthPrompt, setLengthPrompt] = useState("");
  const [childAgePrompt, setChildAgePrompt] = useState("");
  const [characterPrompt, setCharacterPrompt] = useState("");
  const [scenarioPrompt, setScenarioPrompt] = useState("");
  const [corePrompt, setCorePrompt] = useState("");
  const [focusPrompt, setFocusPrompt] = useState("");
  const [purposePrompt, setPurposePrompt] = useState("");
  const [finalDetailsPrompt, setFinalDetailsPrompt] = useState("");

  const {
    handleSubmit,
    register,
    watch,
    formState: { isValid, errors },
    setValue,
    trigger,
  } = useForm({
    resolver: yupResolver(StorySchema),
    mode: "onChange",
  });
  const [
    length,
    age,
    core,
    focus,
    focusDescription,
    scenario,
    scenarioDescription,
    purpose,
    purposeDescription,
    character,
    characterDescription,
    finalDetails,
  ] = watch([
    "length",
    "age",
    "core",
    "focus",
    "focusDescription",
    "scenario",
    "scenarioDescription",
    "purpose",
    "purposeDescription",
    "character",
    "characterDescription",
    "finalDetails",
  ]);

  const { prompt, generatePrompt } = useGeneratePrompt();

  const handleGeneratePrompt = () => {
    trigger();
    if (!isValid) return;
    generatePrompt({
      finalDetailsPrompt,
      agePrompt: childAgePrompt,
      lengthPrompt,
      characterPrompt,
      scenarioPrompt,
      focusPrompt,
      purposePrompt,
      corePrompt,
    });
  };

  const handleOnSubmit = (data: StoryForm) => {
    if (!isValid) {
      trigger();
      alert("Por favor, corrija los errores antes de generar el prompt");
      return;
    }
    if (loading) return;
    onSubmit(data);
  };

  useEffect(() => {
    setValue("prompt", prompt);
  }, [prompt, setValue]);

  // Length prompt handler
  useEffect(() => {
    setLengthPrompt(`
### Length and Style:
  - Write at least ${length} paragraphs to fully develop the story, its plot, and characters. Expand as needed for depth.  
  - The tone should be free from violence or inappropriate themes.  
      `);
  }, [length]);

  // Child age prompt handler
  useEffect(() => {
    setChildAgePrompt(`
### Age-Specific Considerations:
  - The story should be tailored to a child aged **${age}** years. Use the following guidelines for story content and language:  
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
      `);
  }, [age]);

  // Core prompt handler
  useEffect(() => {
    setCorePrompt(`
- It should explore themes related to ${core}.
      `);
  }, [core]);

  // Purpose prompt handler
  useEffect(() => {
    setPurposePrompt(
      `
- If applicable (${purpose != GeneralPurpose.OTHER}), emphasize in ${purpose}.  
      `
    );
  }, [purpose, purposeDescription]);

  // Focus prompt handler
  useEffect(() => {
    setFocusPrompt(
      `
- The story should center around ${focus}${
        focusDescription ? `, with the specific focus: ${focusDescription}` : ""
      }.  
      `
    );
  }, [focus, focusDescription]);

  // Scenario prompt handler
  useEffect(() => {
    setScenarioPrompt(`
### Setting Details:
  - The story takes place in ${scenario}${
      scenarioDescription ? `, described as: ${scenarioDescription}` : ""
    }.    
    - In the **placeDescription** field, provide vivid details about the setting, including atmosphere, surroundings, and key features (50-200 characters).  
  - Avoid over-describing the setting in the **content** field; only use high-level details there.  
      `);
  }, [scenario, scenarioDescription]);

  // Character prompt handler
  useEffect(() => {
    setCharacterPrompt(`
### Character Details:  
  - The main character is ${character}${
      characterDescription ? `, described as ${characterDescription}` : ""
    }.  
    - In the **content** field:  
      - Avoid detailed physical descriptions of the main character. Focus on their actions, personality, or role in the story.  
- In the **characterDescription** field:  
  - Provide a detailed description of the main character's appearance, intended for creating a visual representation using tools like DALL-E.  
  - Include attributes such as:  
    - Skin color, eye color, and clothing details.  
    - Age, height, weight, and unique identifiers (e.g., hairstyle, accessories).  
      `);
  }, [character, characterDescription]);

  // Core prompt handler
  useEffect(() => {
    setCorePrompt(`
- It should explore themes related to ${core}.
      `);
  }, [core]);

  // Final details prompt handler
  useEffect(() => {
    setFinalDetailsPrompt(`### **Key Priority**:
  - The story must be primarily shaped by the following user-provided details:
    "${finalDetails}".  
  - Ensure that every aspect of the **finalDetails** is meaningfully incorporated and strongly influences the plot, characters, and setting.

### Creative Specifications:
  - If additional details are provided (${!!finalDetails}), integrate them meaningfully: "${finalDetails}".  
`);
  }, [finalDetails]);

  return (
    <form
      onSubmit={handleSubmit(handleOnSubmit)}
      className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md grid grid-cols-2 gap-6 w-full">
      <h1 className="col-span-full text-2xl font-bold text-gray-800 mb-2">
        Oneg Prompts
      </h1>

      {/* Length */}
      <div className="col-span-1 space-y-2">
        <label className="block text-sm font-medium text-gray-700">
          Longitud de la historia:
          <input
            defaultValue={20}
            type="number"
            {...register("length")}
            min="0"
            max="20"
            step="1"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 p-2 border"
            placeholder="Ingresa la longitud de la historia"
          />
          {errors.length && (
            <span className="text-red-500 text-xs">
              {errors.length.message}
            </span>
          )}
        </label>
      </div>
      <div className="col-span-1">
        <textarea
          onChange={(e) => setLengthPrompt(e.target.value)}
          value={lengthPrompt}
          className="w-full h-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 p-2 border"
          placeholder="Length age prompt section"></textarea>
      </div>

      {/* Age  */}
      <div className="col-span-1 space-y-2">
        <label className="block text-sm font-medium text-gray-700">
          Child Age:
          <input
            defaultValue={9}
            type="number"
            {...register("age")}
            min="0"
            step="1"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 p-2 border"
            placeholder="Enter age"
          />
          {errors.age && (
            <span className="text-red-500 text-xs">{errors.age.message}</span>
          )}
        </label>
      </div>
      <div className="col-span-1">
        <textarea
          onChange={(e) => setChildAgePrompt(e.target.value)}
          value={childAgePrompt}
          className="w-full h-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 p-2 border"
          placeholder="Child age prompt section"></textarea>
      </div>

      {/* Core */}
      <div className="col-span-1 space-y-2">
        <label className="block text-sm font-medium text-gray-700">
          Core:
          <select
            {...register("core")}
            defaultValue={""}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 p-2 border">
            <option value="" disabled>
              Selecciona el core
            </option>
            {Object.values(StoryCore).map((value, index) => (
              <option key={index} value={value}>
                {value}
              </option>
            ))}
          </select>
          {errors.core && (
            <span className="text-red-500 text-xs">{errors.core.message}</span>
          )}
        </label>
      </div>
      <div className="col-span-1">
        <textarea
          onChange={(e) => setCorePrompt(e.target.value)}
          value={corePrompt}
          className="w-full h-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 p-2 border"
          placeholder="Core prompt section"></textarea>
      </div>

      {/* Purpose */}
      <div className="col-span-1 space-y-4">
        <label className="block text-sm font-medium text-gray-700">
          Proposito de la historia:
          <select
            {...register("purpose")}
            defaultValue={""}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 p-2 border">
            <option value="" disabled className="text-gray-400">
              Selecciona el propósito
            </option>
            {Object.values(GeneralPurpose).map((value, index) => (
              <option key={index} value={value}>
                {value}
              </option>
            ))}
          </select>
          {errors.purpose && (
            <span className="text-red-500 text-xs">
              {errors.purpose.message}
            </span>
          )}
        </label>

        {purpose === "OTHER" && (
          <label className="block text-sm font-medium text-gray-700">
            Descripción del propósito:
            <input
              {...register("purposeDescription")}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 p-2 border"
            />
            {errors.purposeDescription && (
              <span className="text-red-500 text-xs">
                {errors.purposeDescription.message}
              </span>
            )}
          </label>
        )}
      </div>
      <div className="col-span-1">
        <textarea
          onChange={(e) => setPurposePrompt(e.target.value)}
          value={purposePrompt}
          className="w-full h-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 p-2 border"
          placeholder="Purpose prompt section"></textarea>
      </div>

      {/* Focus */}
      <div className="col-span-1 space-y-4">
        <label className="block text-sm font-medium text-gray-700">
          Foco de la historia:
          <select
            {...register("focus")}
            defaultValue={""}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 p-2 border">
            <option value="" disabled>
              Selecciona el focus:
            </option>
            {Object.values(Focus).map((value, index) => (
              <option key={index} value={value}>
                {value}
              </option>
            ))}
          </select>
          {errors.focus && (
            <span className="text-red-500 text-xs">{errors.focus.message}</span>
          )}
        </label>

        {focus === "OTHER" && (
          <label className="block text-sm font-medium text-gray-700">
            Descripción del focus:
            <input
              {...register("focusDescription")}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 p-2 border"
            />
            {errors.focusDescription && (
              <span className="text-red-500 text-xs">
                {errors.focusDescription.message}
              </span>
            )}
          </label>
        )}
      </div>
      <div className="col-span-1">
        <textarea
          value={focusPrompt}
          onChange={(e) => setFocusPrompt(e.target.value)}
          className="w-full h-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 p-2 border"
          placeholder="Focus prompt section"></textarea>
      </div>

      {/* Character */}
      <div className="col-span-1 space-y-4">
        <label className="block text-sm font-medium text-gray-700">
          Personaje:
          <select
            defaultValue={""}
            {...register("character")}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 p-2 border">
            <option value="" disabled>
              Selecciona el personaje
            </option>
            {Object.values(MainCharacter).map((value, index) => (
              <option key={index} value={value}>
                {value}
              </option>
            ))}
          </select>
          {errors.character && (
            <span className="text-red-500 text-xs">
              {errors.character.message}
            </span>
          )}
        </label>

        {character === "OTHER" && (
          <label className="block text-sm font-medium text-gray-700">
            Descripción del personaje:
            <input
              {...register("characterDescription")}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 p-2 border"
            />
            {errors.characterDescription && (
              <span className="text-red-500 text-xs">
                {errors.characterDescription.message}
              </span>
            )}
          </label>
        )}
      </div>
      <div className="col-span-1">
        <textarea
          onChange={(e) => setCharacterPrompt(e.target.value)}
          className="w-full h-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 p-2 border"
          placeholder="Character prompt section"
          value={characterPrompt}></textarea>
      </div>

      {/* Scenario */}
      <div className="col-span-1 space-y-4">
        <label className="block text-sm font-medium text-gray-700">
          Escenario:
          <select
            defaultValue={""}
            {...register("scenario")}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 p-2 border">
            <option value="" disabled>
              Selecciona el escenario
            </option>
            {Object.values(StoryScenario).map((value, index) => (
              <option key={index} value={value}>
                {value}
              </option>
            ))}
          </select>
          {errors.scenario && (
            <span className="text-red-500 text-xs">
              {errors.scenario.message}
            </span>
          )}
        </label>

        {scenario === "OTHER" && (
          <label className="block text-sm font-medium text-gray-700">
            Descripción del escenario:
            <input
              {...register("scenarioDescription")}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 p-2 border"
            />
          </label>
        )}
        {errors.scenarioDescription && (
          <span className="text-red-500 text-xs">
            {errors.scenarioDescription.message}
          </span>
        )}
      </div>
      <div className="col-span-1">
        <textarea
          value={scenarioPrompt}
          onChange={(e) => setScenarioPrompt(e.target.value)}
          className="w-full h-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 p-2 border"
          placeholder="Scenario prompt section"></textarea>
      </div>

      {/* Final Details */}
      <div className="col-span-1 space-y-2">
        <label className="block text-sm font-medium text-gray-700">
          Detalles finales de la historia:
          <textarea
            {...register("finalDetails")}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 p-2 border h-24"
          />
          {errors.finalDetails && (
            <span className="text-red-500 text-xs">
              {errors.finalDetails.message}
            </span>
          )}
        </label>
      </div>
      <div className="col-span-1">
        <textarea
          value={finalDetailsPrompt}
          onChange={(e) => setFinalDetailsPrompt(e.target.value)}
          className="w-full h-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 p-2 border"
          placeholder="Final details prompt section"></textarea>
      </div>

      {/* Generate prompt button */}
      <div className="col-span-full">
        <button
          type="button"
          onClick={() => handleGeneratePrompt()}
          disabled={loading}
          className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed">
          Generar prompt
        </button>
      </div>

      <div className="col-span-1 text-sm text-gray-600">
        <span>
          El prompt está en formato{" "}
          <a
            href="https://www.markdownguide.org/cheat-sheet/"
            target="_blank"
            className="text-indigo-600 hover:underline">
            Markdown
          </a>
        </span>
      </div>

      <div className="col-span-full space-y-2">
        <label className="block text-sm font-medium text-gray-700">
          Prompt
          <textarea
            id="prompt"
            {...register("prompt")}
            disabled={!isValid}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 p-2 border h-80 disabled:bg-gray-100"
          />
          {errors.prompt && (
            <span className="text-red-500 text-xs">
              {errors.prompt.message}
            </span>
          )}
        </label>
      </div>

      <div className="col-span-full text-start">
        <p className="text-sm text-gray-500">
          HINT: Puedes editar el prompt para crear la historia*
        </p>
      </div>

      <div className="col-span-full">
        <button
          type="submit"
          disabled={loading || !isValid}
          className="w-full bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed">
          Generar historia
        </button>
      </div>
    </form>
  );
}
