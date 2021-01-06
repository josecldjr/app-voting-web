import { RequestRegisterRequestDTO } from "../dto/request-register.dto";
import { HTTPService } from "./http.service";

export class AuthService {

    constructor(private httpService: HTTPService) { }


    async requestRegister(data: RequestRegisterRequestDTO) {
        await this.httpService.post(
            this.httpService.getBaseUrl() + '/user/request',
            { ...data }
        )
    }

}
