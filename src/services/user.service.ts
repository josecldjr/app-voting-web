import { ListResponseDTO } from "../dto/generic/list.dto";
import { User } from "../dto/model/user.model";
import { UserLevelTypes } from "../enum/user-permission-types.enum";
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


    async changeUserStatus(userId: number, options: { userLevelType: UserLevelTypes }): Promise<User> {
        const { data } = await this.httpService.patch<User>(
            this.httpService.getBaseUrl() + `/user/change-status/${userId}`, {
            userStatusType: options.userLevelType
        })

        return data
    }

}