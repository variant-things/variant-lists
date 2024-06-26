import { NotValidSchemaError } from "@src/core/errors/not-valid-schema-error";
import { SchemaRepository } from "@src/domain/lists/application/repositories/schema-repository";
import { Validator } from "@src/domain/lists/application/services/validator";
import { SchemaNotFoundError } from "@src/core/errors/schema-not-found-error";
import { NotAllowedError } from "@src/core/errors/not-allowed-error";

interface UpdateSchemaRequest {
	title?: string;
	description?: string;
	creatorUsername: string;
	schemaId: string;
	data?: Record<string, unknown>;
}

interface UpdateSchemaResponse {}

export class UpdateSchema {
	constructor(
		private schemaRepository: SchemaRepository,
		private validator: Validator,
	) {}

	async execute({
		title,
		schemaId,
		creatorUsername,
		description,
		data,
	}: UpdateSchemaRequest): Promise<UpdateSchemaResponse | null> {
		const schema = await this.schemaRepository.findById(schemaId);

		if (!schema) {
			throw new SchemaNotFoundError();
		}

		if (schema.creatorUsername !== creatorUsername) {
			throw new NotAllowedError();
		}

		if (data) {
			const jsonSchemaIsValid =
				await this.validator.validateJsonSchema(data);

			if (!jsonSchemaIsValid) {
				throw new NotValidSchemaError();
			}

			schema.data = data;
		}

		if (title) schema.title = title;
		if (description) schema.description = description;

		await this.schemaRepository.save(schema);

		return {
			schema,
		};
	}
}
