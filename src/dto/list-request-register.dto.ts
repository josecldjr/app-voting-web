import yup from 'yup'

export class ListModificationRequestDTO {
    targetUserId: number
    onlyPendingRequests?: boolean
}

export const ListModificationsRequestSchema = yup.object({
    targetUserId: yup.number().optional(),
    onlyPendingRequests: yup.boolean().optional(),
})

