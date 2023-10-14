import { z } from "zod";

export const createCategorySchema = z.object({
    title: z.string({
        required_error: "Se requiere nombre",
    }),
    icon: z.string({
        required_error: "Se requiere icono",
    }),
    color: z.string({
        required_error: "Se requiere color",
    }),

});
