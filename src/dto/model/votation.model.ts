import { User } from "./user.model"

export class Votation {

    id: string

    title: string

    description: string
    options: { [key: string]: string }

    expirateAt: Date

    startTime: Date

    minVotesCount: number

    finalized: boolean

    deletedAt: Date
    createdAt: Date
    updatedAt: Date


    createdById: number
    createdBy: User
}