import { ListResponseDTO } from "../dto/generic/list.dto";
import { User } from "../dto/model/user.model";
import { HTTPService } from "./http.service";


export class UserService {

    constructor(private httpService: HTTPService) { }

    async getUsersList(searchString?: string): Promise<ListResponseDTO<User>> {
        const { data } = await this.httpService.get<ListResponseDTO<User>>(
            this.httpService.getBaseUrl() + '/user/search',
            { searchString: searchString || undefined }
        )

        return data
    }

}