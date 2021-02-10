import { DoLoginRequestDTO, SignJWTResult } from "../dto/login.dto";
import { User } from "../dto/model/user.model";
import { RequestRegisterRequestDTO } from "../dto/request-modification.dto";
import { HTTPService } from "./http.service";

export class AuthService {

    private userDataStorageKey = 'user-data'

    constructor(private httpService: HTTPService) { }

    async requestRegister(data: RequestRegisterRequestDTO) {
        await this.httpService.post(
            this.httpService.getBaseUrl() + '/user/request',
            { ...data }
        )
    }

    async doLogin(loginData: DoLoginRequestDTO): Promise<SignJWTResult> {
        const { data } = await this.httpService.post<SignJWTResult>(
            this.httpService.getBaseUrl() + '/auth/login',
            { ...loginData }
        )

        this.httpService.setAuthToken(data.token)
        this.setUserData(data.user)

        return data
    }

    async setUserData(userData: User): Promise<void> {
        localStorage.setItem(this.userDataStorageKey, JSON.stringify(userData))
    }

    async getUserData(): Promise<User | null> {
        return JSON.parse(localStorage.getItem(this.userDataStorageKey)) as any
    }

    async logout(): Promise<void> {
        localStorage.removeItem(this.userDataStorageKey)
        this.httpService.setAuthToken(null)
    }

    async resetPassword(userId: number, newPassword: string): Promise<User> {
        const { data } = await this.httpService.post<User>(
            this.httpService.getBaseUrl() + `/auth/redefine-password`, {
            newPassword,
            targetUserId: userId,

        })

        return data
    }
}
