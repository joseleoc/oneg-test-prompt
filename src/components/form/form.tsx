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
import { useEffect } from "react";

export default function Form(props: {
  onSubmit: (data: StoryForm) => void;
  loading: boolean;
}) {
  const { onSubmit, loading } = props;
  const {
    handleSubmit,
    register,
    watch,
    formState: { isValid, errors },
    setValue,
    getValues,
    trigger,
  } = useForm({
    resolver: yupResolver(StorySchema),
  });
  const [focus, scenario, purpose, character] = watch([
    "focus",
    "scenario",
    "purpose",
    "character",
  ]);

  const { prompt, generatePrompt } = useGeneratePrompt();

  const handleGeneratePrompt = () => {
    trigger();
    if (!isValid) return;
    generatePrompt(getValues());
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

  return (
    <form onSubmit={handleSubmit(handleOnSubmit)}>
      <h1>Oneg Prompts</h1>

      {/* Core Field */}
      <label>
        Core:
        <select {...register("core")}>
          <option value="" disabled>
            Selecciona el core
          </option>
          {Object.values(StoryCore).map((value, index) => (
            <option key={index} value={value}>
              {value}
            </option>
          ))}
        </select>
        {errors.core && <span className="error">{errors.core.message}</span>}
      </label>

      {/* Purpose Field */}
      <label>
        Proposito de la historia:
        <select {...register("purpose")} defaultValue={"VALUES"}>
          {Object.values(GeneralPurpose).map((value, index) => (
            <option key={index} value={value}>
              {value}
            </option>
          ))}
        </select>
        {errors.purpose && (
          <span className="error">{errors.purpose.message}</span>
        )}
      </label>

      {purpose === "OTHER" && (
        <label>
          Descripción del propósito:
          <input {...register("purposeDescription")} />
          {errors.purposeDescription && (
            <span className="error">{errors.purposeDescription.message}</span>
          )}
        </label>
      )}

      {/* Focus Field */}
      <label>
        Foco de la historia:
        <select {...register("focus")}>
          <option value="" disabled>
            Selecciona el focus:
          </option>
          {Object.values(Focus).map((value, index) => (
            <option key={index} value={value}>
              {value}
            </option>
          ))}
        </select>
        {errors.focus && <span className="error">{errors.focus.message}</span>}
      </label>

      {focus === "OTHER" && (
        <label>
          Descripción del focus:
          <input {...register("focusDescription")} />
          {errors.focusDescription && (
            <span className="error">{errors.focusDescription.message}</span>
          )}
        </label>
      )}

      {/* Character Field */}
      <label>
        Personaje:
        <select {...register("character")}>
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
          <span className="error">{errors.character.message}</span>
        )}
      </label>

      {character === "OTHER" && (
        <label>
          Descripción del personaje:
          <input {...register("characterDescription")} />
          {errors.characterDescription && (
            <span className="error">{errors.characterDescription.message}</span>
          )}
        </label>
      )}

      {/* Scenario Field */}
      <label>
        Escenario:
        <select {...register("scenario")}>
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
          <span className="error">{errors.scenario.message}</span>
        )}
      </label>

      {scenario === "OTHER" && (
        <label>
          Descripción del escenario:
          <input {...register("scenarioDescription")} />
          {errors.scenarioDescription && (
            <span className="error">{errors.scenarioDescription.message}</span>
          )}
        </label>
      )}

      {/* Final Details */}
      <label>
        Detalles finales de la historia:
        <textarea {...register("finalDetails")} />
        {errors.finalDetails && (
          <span className="error">{errors.finalDetails.message}</span>
        )}
      </label>

      <button
        type="button"
        onClick={() => handleGeneratePrompt()}
        disabled={loading}>
        Generar prompt
      </button>

      <label>
        Prompt
        <textarea id="prompt" {...register("prompt")} disabled={!isValid} />
        {errors.prompt && (
          <span className="error">{errors.prompt.message}</span>
        )}
      </label>

      <button type="submit" disabled={loading || !isValid}>
        Generar historia
      </button>
    </form>
  );
}
