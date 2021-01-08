import * as yup from 'yup'
import { maxLength, minLength } from '../messages/validation'
import { User } from './model/user.model'

export type DoLoginRequestDTO = {

    // @IsString()
    // @Length(5, 50)
    login: string

    // @IsString()
    // @Length(6, 36)
    password: string
}

export const DoLoginRequestSchema = yup.object({
    login: yup.string().min(5, minLength(5)).max(50, maxLength(50)),
    password: yup.string().min(6, minLength(6)).max(36, maxLength(36)),
})

export type SignJWTResult = {
    token: string
    user: User
}
