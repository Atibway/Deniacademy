import { UserRole } from "@prisma/client"
import * as z from "zod"


export const SettingsSchema = z.object({
    name: z.optional(z.string()),
    isTwoFactorEnabled: z.optional(z.boolean()),
    role: z.enum([UserRole.ADMIN, UserRole.USER]),
    email: z.optional(z.string().email()),
    password: z.optional(z.string().min(6)),
    newPassword: z.optional(z.string().min(6),
),
})
.refine((data)=> {
   
    if(!data.newPassword && data.password){
        return false
    }

    return true
}, {
    message: "New password is required",
    path: ["newPassword"]
})
.refine((data)=> {
    if(data.newPassword && !data.password){
        return false
    }

    return true
}, {
    message: "Password is required",
    path: ["password"]
})

export const NewPasswordSchema = z.object({
    password: z.string().min(6, 
        {
            message: "Minimum of 6 characters required"
        }
)
})

export const ResetSchema = z.object({
email: z.string().email({
    message: "Email is Required"
})
})

export const LoginSChema = z.object({
email: z.string().email({
    message: "Email is Required"
}),
password: z.string().min(1, 
    {
        message: "Password is Required"
    }
),
code: z.optional(z.string()),
}) 

export const RegisterSchema = z.object({
email: z.string().email({
    message: "Email is Required"
}),
password: z.string().min(6, 
    {
        message: "Minimum 6 characters Required"
    }
),
name: z.string().min(1, {
    message: "Name is required"
})
})
export const CreateCourseSchema = z.object({
title: z.string().min(1, {
    message: "Title is required"
}),
})