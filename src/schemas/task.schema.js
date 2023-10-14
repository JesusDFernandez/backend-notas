import { z } from "zod";

export const createTaskSchema = z.object({
  title: z.string({
    required_error: "Se requiere título",
  }),
  description: z.string({
    required_error: "Se requiere descripcion",
  })
});
