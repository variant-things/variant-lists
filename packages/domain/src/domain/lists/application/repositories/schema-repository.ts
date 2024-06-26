import { Schema } from "@src/domain/lists/enterprise/entities/schema";

export interface SchemaRepository {
	create(schema: Schema): Promise<void>;
	save(answer: Schema): Promise<void>;
	findById(id: string): Promise<Schema | null>;
	findBySlug({
		slug,
		creatorUsername,
	}: {
		slug: string;
		creatorUsername: string;
	}): Promise<Schema | null>;
	findManyByCreatorUsername(creatorId: string): Promise<Schema[]>;
}
