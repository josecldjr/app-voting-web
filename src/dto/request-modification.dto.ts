import * as yup from 'yup'
import { maxLength, minLength, requiredField, shouldBeAValidEmail } from "../messages/validation"

export class RequestRegisterRequestDTO {

    // @IsString()
    // @Length(5, 50)
    login: string

    // @IsString()
    // @Length(3, 350)
    name: string

    // @IsOptional()
    // @IsString()
    // @IsEmail()
    email?: string

    // @IsString()
    // @Length(6, 36)
    password: string
}

export const RequestRegisterRequestSchema = yup.object({
    login: yup.string().min(5, minLength(5)).max(50, maxLength(50)),
    name: yup.string().min(3, minLength(3)).max(350, maxLength(350)).required(requiredField()),
    password: yup.string().min(6, minLength(6)).max(36, maxLength(36)).required(requiredField()),
    email: yup.string().email(shouldBeAValidEmail()).notRequired()
})

