import {
	ValidateAllItemsFromList,
	JsonSchemaValidator,
} from "@variant-lists/domain";
import PrismaItemRepository from "@src/database/prisma/repositories/prisma-item.repository";
import PrismaListRepository from "@src/database/prisma/repositories/prisma-list.repository";
import PrismaSchemaRepository from "@src/database/prisma/repositories/prisma-schema.repository";
import PrismaUserRepository from "@src/database/prisma/repositories/prisma-user.repository";

export default class ValidateAllItemsFromListBuilder {
	prismaItemRepository: PrismaItemRepository;
	prismaSchemaRepository: PrismaSchemaRepository;
	prismaListRepository: PrismaListRepository;
	prismaUserRepository: PrismaUserRepository;
	jsonSchemaValidator: JsonSchemaValidator;

	constructor() {
		this.prismaItemRepository = new PrismaItemRepository();
		this.prismaSchemaRepository = new PrismaSchemaRepository();
		this.prismaListRepository = new PrismaListRepository();
		this.prismaUserRepository = new PrismaUserRepository();
		this.jsonSchemaValidator = new JsonSchemaValidator();
	}

	build() {
		return new ValidateAllItemsFromList(
			this.prismaItemRepository,
			this.prismaSchemaRepository,
			this.prismaListRepository,
			this.prismaUserRepository,
			this.jsonSchemaValidator,
		);
	}
}
