import { ListResponseDTO } from "../dto/generic/list.dto";
import { Votation } from "../dto/model/votation.model";
import { SaveVotationRequestDTO } from "../dto/save-votation.dto";
import { HTTPService } from "./http.service";

export class VotationsService {

    constructor(private httpService: HTTPService) { }

    async getUserVotations({ isActive }: { isActive: boolean }): Promise<ListResponseDTO<Votation>> {
        const { data } = await this.httpService.get<ListResponseDTO<Votation>>(
            this.httpService.getBaseUrl() + '/user/votation',
            { isActive }
        )

        return data
    }

    async create(input: SaveVotationRequestDTO): Promise<Votation> {
        const { data } = await this.httpService.post<Votation>(this.httpService.getBaseUrl() + '/votation', input)

        return data
    }
}