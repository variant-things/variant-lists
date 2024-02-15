import { List } from "@src/domain/lists/enterprise/entities/list";
import { ListRepository } from "@src/domain/lists/application/repositories/list-repository";

interface FetchListsByUserRequest {
	creatorId: string;
}

interface FetchListsByUserResponse {
	lists: List[];
}

export class FetchListsByUser {
	constructor(private listRepository: ListRepository) {}

	async execute({
		creatorId,
	}: FetchListsByUserRequest): Promise<FetchListsByUserResponse> {
		const lists = await this.listRepository.findManyByCreatorId(creatorId);

		return {
			lists,
		};
	}
}
