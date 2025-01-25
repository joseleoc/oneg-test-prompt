import { useForm } from "react-hook-form";
import "./form.css";

import { yupResolver } from "@hookform/resolvers/yup";
import { StoryForm, StorySchema } from "./form.types";
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
    formState: { isValid },
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
      <div className="generate-options">
        <label>
          <input type="checkbox" {...register("generateAudios")} />
          Generar audios
        </label>
        <label>
          <input type="checkbox" {...register("generateImages")} />
          Generar imágenes
        </label>
      </div>

      <label>
        Estilo de la historia:
        <select {...register("style", { required: true })}>
          <option value="" disabled>
            Selecciona un estilo
          </option>
          <option value="FICTIONAL">Ficcional</option>
          <option value="NON_FICTIONAL">No ficcional</option>
        </select>
      </label>

      <label>
        Core:
        <select {...register("core", { required: true })}>
          <option value="" disabled>
            Selecciona el core
          </option>
          <option value="SOLVING_PROBLEM">Resolver problemas</option>
          <option value="TEACH_SOMETHING">Enseñar algo</option>
          <option value="OTHER">Otro</option>
        </select>
      </label>

      <label>
        Proposito de la historia de la historia:
        <select
          {...register("purpose", { required: true })}
          defaultValue={"VALUES"}>
          <option value="VALUES">Valores</option>
        </select>
      </label>

      {focus === "OTHER" && (
        <label>
          Descripción del focus:
          <input {...register("focusDescription")} />
        </label>
      )}

      <label>
        Foco de la historia:
        <select {...register("focus", { required: true })}>
          <option value="" disabled>
            Selecciona el focus:
          </option>
          <option value="RESPECT">Respeto</option>
          <option value="KINDNESS">Amabilidad</option>
          <option value="HONESTY">Honestidad</option>
          <option value="OTHER">Otro</option>
        </select>
      </label>

      {purpose === "OTHER" && (
        <label>
          Descripción del focus:
          <input {...register("focusDescription")} />
        </label>
      )}

      <label>
        Personaje:
        <select {...register("character", { required: true })}>
          <option value="" disabled>
            Selecciona el personaje
          </option>
          <option value="GIRL">Chica</option>
          <option value="BOY">Chico</option>
          <option value="CAT">Gato</option>
          <option value="DOG">Perro</option>
          <option value="OTHER">Otro</option>
        </select>
      </label>

      {character === "OTHER" && (
        <label>
          Descripción del personaje:
          <input
            {...register("characterDescription", {
              required: character === "OTHER",
            })}
          />
        </label>
      )}

      <label>
        Escenario:
        <select {...register("scenario", { required: true })}>
          <option value="" disabled>
            Selecciona el escenario
          </option>
          <option value="HOUSE">Casa</option>
          <option value="SCHOOL">Escuela</option>
          <option value="RESTAURANT">Restaurante</option>
          <option value="OTHER">Otro</option>
        </select>
      </label>

      {scenario === "OTHER" && (
        <label>
          Descripción del escenario:
          <input {...register("scenarioDescription")} />
        </label>
      )}

      <label>
        Detalles finales de la historia:
        <textarea {...register("finalDetails")} />
      </label>

      <button
        type="button"
        onClick={() => generatePrompt(getValues())}
        disabled={loading}>
        Generar prompt
      </button>

      <label>
        Prompt
        <textarea id="prompt" {...register("prompt")} disabled={!isValid} />
      </label>

      <button type="submit" disabled={loading || !isValid}>
        Generar historia
      </button>
    </form>
  );
}
