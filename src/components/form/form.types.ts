import * as yup from "yup";

export const StorySchema = yup.object().shape({
    generateAudios: yup.boolean().optional().default(false),
    generateImages: yup.boolean().optional().default(false),
    style: yup.string().required(),
    focus: yup.string().required(),
    focusDescription: yup.string().optional(),
    core: yup.string().required().oneOf(["SOLVING_PROBLEM", "TEACH_SOMETHING", "OTHER"]),
    scenario: yup.string().required(),
    scenarioDescription: yup.string().optional(),
    purpose: yup.string().required(),
    purposeDescription: yup.string().optional(),
    character: yup.string().required(),
    characterDescription: yup.string().optional(),
    prompt: yup.string().default("").optional(),
    finalDetails: yup.string().optional(),
});

export type StoryForm = yup.InferType<typeof StorySchema>;