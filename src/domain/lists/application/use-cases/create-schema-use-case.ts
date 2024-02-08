import { UniqueEntityID } from "@src/core/entities/uinique-entity-id";
import { Schema } from "@src/domain/lists/enterprise/entitites/schema";
import { SchemaRepository } from "@src/domain/lists/application/repositories/schema-repository";
import { Validator } from "@src/domain/lists/application/services/validator";
import { NotValidSchemaError } from "@src/core/errors/not-valid-schema-error";

interface CreateSchemaRequest {
	title: string;
	description: string;
	creatorId: string;
	data: Record<string, unknown>;
}

interface CreateSchemaResponse {
	schema: Schema;
}

export class CreateSchemaUseCase {
	constructor(
		private schemaRepository: SchemaRepository,
		private validator: Validator,
	) {}

	async execute({
		creatorId,
		data,
		...props
	}: CreateSchemaRequest): Promise<CreateSchemaResponse | null> {
		const jsonSchemaIsValid = await this.validator.validateJsonSchema(data);

		if (!jsonSchemaIsValid) {
			throw new NotValidSchemaError();
		}

		const schema = Schema.create({
			...props,
			creatorId: new UniqueEntityID(creatorId),
			data,
		});

		await this.schemaRepository.create(schema);

		return {
			schema,
		};
	}
}
