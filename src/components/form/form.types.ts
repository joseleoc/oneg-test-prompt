import * as yup from "yup";

export enum StoryCore {
    "SOLVING_PROBLEM" = "SOLVING_PROBLEM",
    "TEACHING_SOMETHING" = "TEACHING_SOMETHING",
}

export enum GeneralPurpose {
    "FRIENDS" = "FRIENDS",
    "SCHOOL" = "SCHOOL",
    "BEHAVIOR" = "BEHAVIOR",
    "SIBLINGS" = "SIBLINGS",
    "PARENTS" = "PARENTS",
    "SLEEP" = "SLEEP",
    "VALUES" = "VALUES",
    "EMOTIONS" = "EMOTIONS",
    "ACADEMICS" = "ACADEMICS",
    "SPORTS" = "SPORTS",
    "OTHER" = "OTHER",
}

export enum Focus {
    // Values
    "RESPECT" = "RESPECT",
    "KINDNESS" = "KINDNESS",
    "HONESTY" = "HONESTY",
    "RESPONSIBILITY" = "RESPONSIBILITY",
    "EMPATHY" = "EMPATHY",
    "PERSEVERANCE" = "PERSEVERANCE",
    // Emotions
    "CALM" = "CALM",
    "FRUSTRATION" = "FRUSTRATION",
    "HAPPYNESS" = "HAPPYNESS",
    "EMBARRASSMENT" = "EMBARRASSMENT",
    "ANGER" = "ANGER",
    "SADNESS" = "SADNESS",
    "SCARE" = "SCARE",
    "ANXIETY" = "ANXIETY",
    // Academics
    "MATH" = "MATH",
    "LANGUAGE_ARTS" = "LANGUAGE_ARTS",
    "HISTORY" = "HISTORY",
    "GEOGRAPHY" = "GEOGRAPHY",
    "ART" = "ART",
    "MONEY" = "MONEY",
    // Sports
    "SOCCER" = "SOCCER",
    "SWIMMING" = "SWIMMING",
    "GYMNASTICS" = "GYMNASTICS",
    "BASEBALL" = "BASEBALL",
    "BASKETBALL" = "BASKETBALL",
    "FOOTBALL" = "FOOTBALL",
    // Other
    "OTHER" = "OTHER",
}

export enum MainCharacter {
    "GIRL" = "GIRL",
    "BOY" = "BOY",
    "DOG" = "DOG",
    "CAT" = "CAT",
    "KING" = "KING",
    "PRINCESS" = "PRINCESS",
    "OTHER" = "OTHER",
}

export enum StoryScenario {
    "HOUSE" = "HOUSE",
    "APARTMENT" = "APARTMENT",
    "SCHOOL" = "SCHOOL",
    "RESTAURANT" = "RESTAURANT",
    "HOTEL" = "HOTEL",
    "NATURE" = "NATURE",
    "OTHER" = "OTHER",
}

export enum Language {
    EN = "en",
    ES = "es",
}

export const StorySchema = yup.object().shape({
    // generateAudios: yup.boolean().optional().default(false),
    // generateImages: yup.boolean().optional().default(false),
    language: yup.string().required("El idioma es obligatorio").oneOf(Object.values(Language), "Selecciona una opción").default(Language.ES),
    age: yup.number().required("El año es obligatorio").min(0, "El año debe ser mayor o igual a 0").typeError("El año debe ser un número"),
    length: yup.number().required("La longitud es obligatoria").min(0, "La longitud debe ser mayor o igual a 0").max(20, "La longitud debe ser menor o igual a 20").typeError("La longitud debe ser un número"),
    focus: yup.string().required().oneOf(Object.values(Focus), "Selecciona una opción"),
    focusDescription: yup
        .string()
        .optional()
        .when("focus", {
            is: (focus: string) => focus === "OTHER",
            then: (schema) =>
                schema.required("La descripción del foco es obligatoria cuando el foco es OTHER"),
            otherwise: (schema) => schema.optional(),
        }),
    core: yup.string().required().oneOf(Object.values(StoryCore), "Selecciona una opción"),
    scenario: yup.string().required().oneOf(Object.values(StoryScenario), "Selecciona una opción"),
    scenarioDescription: yup
        .string()
        .optional()
        .when("scenario", {
            is: (scenario: string) => scenario === "OTHER",
            then: (schema) =>
                schema.required(
                    "La descripción del escenario es obligatoria cuando el escenario es OTHER"
                ),
            otherwise: (schema) => schema.optional(),
        }),
    purpose: yup.string().required().oneOf(Object.values(GeneralPurpose), "Selecciona una opción"),
    purposeDescription: yup
        .string()
        .optional()
        .when("purpose", {
            is: (purpose: string) => purpose === "OTHER",
            then: (schema) =>
                schema.required(
                    "La descripción del propósito es obligatoria cuando el propósito es OTHER"
                ),
            otherwise: (schema) => schema.optional(),
        }),
    character: yup.string().required().oneOf(Object.values(MainCharacter), "Selecciona una opción"),
    characterDescription: yup
        .string()
        .optional()
        .when("character", {
            is: (character: string) => character === "OTHER",
            then: (schema) =>
                schema.required(
                    "La descripción del personaje es obligatoria cuando el personaje es OTHER"
                ),
            otherwise: (schema) => schema.optional(),
        }),
    prompt: yup.string().default("").optional(),
    finalDetails: yup.string().optional(),
});

export type StoryForm = yup.InferType<typeof StorySchema>;
