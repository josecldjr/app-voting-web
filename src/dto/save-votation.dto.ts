import * as yup from 'yup'
import { maxLength, minLength, mustBeAInteger, mustBePositive, requiredField } from '../messages/validation'

export type SaveVotationRequestDTO = {

    title: string

    description: string

    options: { [key: string]: string }

    expirateAt: Date

    startTime: Date

    minVotesCount: number
}

export const SaveVotationRequestSchema = yup.object({
    title: yup.string().max(100, maxLength(100)).required(requiredField()),
    description: yup.string().min(3, minLength(3)).max(255, maxLength(255)).required(requiredField()),
    options: yup.object().required(requiredField()),
    expirateAt: yup.date().required(requiredField()),
    startTime: yup.date().required(requiredField()),
    minVotesCount: yup.number().integer(mustBeAInteger()).positive(mustBePositive()).required(requiredField()),

})