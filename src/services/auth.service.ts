import { DoLoginRequestDTO, SignJWTResult } from "../dto/login.dto";
import { User } from "../dto/model/user.model";
import { RequestRegisterRequestDTO } from "../dto/request-register.dto";
import { HTTPService } from "./http.service";

export class AuthService {

    private tokenStorageKey = 'atj'
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

        this.setAuthToken(data.token)
        this.setUserData(data.user)

        return data
    }

    async setAuthToken(token: string): Promise<void> {
        localStorage.setItem(this.tokenStorageKey, token)
    }

    async getAuthToken(): Promise<string> {
        return localStorage.getItem(this.tokenStorageKey)
    }

    async setUserData(userData: User): Promise<void> {
        localStorage.setItem(this.userDataStorageKey, JSON.stringify(userData))
    }

    async getUserData(): Promise<User | null> {
        return JSON.parse(localStorage.getItem(this.userDataStorageKey)) as any
    }
}
