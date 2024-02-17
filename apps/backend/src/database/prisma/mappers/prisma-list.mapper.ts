import { List as PrismaList, Prisma } from "@prisma/client";
import { List, Slug, UniqueEntityID } from "@variant-lists/domain";

export class PrismaListMapper {
	static toDomain(raw: PrismaList): List {
		return List.create(
			{
				title: raw.title,
				slug: Slug.create(raw.slug),
				description: raw.description,
				creatorId: new UniqueEntityID(raw.creatorId),
				schemaId: new UniqueEntityID(raw.schemaId),
			},
			new UniqueEntityID(raw.id),
		);
	}

	static toPrisma(list: List): Prisma.ListUncheckedCreateInput {
		return {
			id: list.id.toString(),
			title: list.title,
			slug: list.slug.value,
			description: list.description,
			creatorId: list.creatorId.toString(),
			schemaId: list.schemaId.toString(),
		};
	}
}
