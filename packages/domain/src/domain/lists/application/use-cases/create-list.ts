import { UniqueEntityID } from "@src/core/entities/uinique-entity-id";
import { List } from "@src/domain/lists/enterprise/entities/list";
import { ListRepository } from "@src/domain/lists/application/repositories/list-repository";
import { SchemaNotFoundError } from "@src/core/errors";
import { SchemaRepository } from "../repositories/schema-repository";

interface CreateListRequest {
	title: string;
	description: string;
	creatorId: string;
	schemaId: string;
}

interface CreateListResponse {
	list: List;
}

export class CreateList {
	constructor(
		private listRepository: ListRepository,
		private schemaRepository: SchemaRepository,
	) {}

	async execute({
		title,
		description,
		creatorId,
		schemaId,
	}: CreateListRequest): Promise<CreateListResponse | null> {
		const schema = await this.schemaRepository.findById(schemaId);

		if (!schema) {
			throw new SchemaNotFoundError();
		}

		const list = List.create({
			title,
			description,
			creatorId: new UniqueEntityID(creatorId),
			schemaId: new UniqueEntityID(schemaId),
		});

		await this.listRepository.create(list);

		return {
			list,
		};
	}
}
