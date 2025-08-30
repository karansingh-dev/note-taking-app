import { ZodObject } from "zod";
import { ApiError } from "./apiError.js";

export function validateBody<T>(schema: ZodObject, body: unknown): T {
  const result = schema.safeParse(body);

  if (!result.success) {
    const errorMessages = result.error.issues.map((issue) => issue.message);
    console.warn("Zod Validation Error:", errorMessages);

    throw new ApiError(400, "Validation failed", [
      "Invalid Data Sent",
      "Invalid Structure of data",
    ]);
  }

  return result.data as T;
}
