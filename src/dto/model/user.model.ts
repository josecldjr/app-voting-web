import { UserLevelTypes } from "../../enum/user-permission-types.enum"

export class User {
    login: string | undefined

    name: string | undefined
    email: string | null | undefined

    password?: string | undefined

    permissionLevel: UserLevelTypes | undefined

    isAdmin(): boolean {
        return this.permissionLevel === UserLevelTypes.admin || this.permissionLevel === UserLevelTypes.superAdmin
    }
}
