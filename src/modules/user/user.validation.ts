import { z } from 'zod';

export const registerUserSchema = z.object({

    name: z
        .string()
        .trim()
        .min(2, 'Nama minimal 2 karakter')
        .max(100, 'Nama maksimal 100 karakter'),

    email: z
        .string()
        .trim()
        .email('Format email tidak valid')
        .max(255, 'Email terlalu panjang')
        .transform((value) => value.toLowerCase()),

    password: z
        .string()
        .min(8, 'Password minimal 8 karakter')
        .max(72, 'Password maksimal 72 karakter')

}).strict();

export const userIdSchema = z.object({
    id: z.string().uuid('Format ID tidak valid')
});

export type RegisterUserRequest = z.infer<
    typeof registerUserSchema
>;

export const updateUserSchema = z.object ({
    name : z
        .string()
        .trim()
        .min(2, 'Nama minimal 2 karakter')
        .max(100, 'Nama maximal 100 karakter')
        .optional(),

    email : z
        .string()
        .trim()
        .email('format email tidak valid')
        .max(255,'email terlalu panjang')
        .transform(value => value.toLowerCase())
        .optional()
}).strict().refine(
    data => Object.keys(data).length > 0,
    {
        message : 'minimal satu field harus di perbarui'
    }
);