const registerSchema = z.object({
    nom: z.string().max(32),
    email: z.string().email(),
    password: z
        .string()
        .min(8)
        .max(16)
        .regex(/[A-Z]/, "Must contain uppercase letter")
        .regex(/[0-9]/, "Must contain a number"),


})
export default registerSchema;