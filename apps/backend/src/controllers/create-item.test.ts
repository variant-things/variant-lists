import { makePrismaSchema } from "@test/factories/prisma-schema.factory";
import { getUser } from "@test/getUser";
import { app } from "app";
import request from "supertest";
import { makePrismaList } from "@test/factories/prisma-list.factory";
import { UserPresented } from "@src/presenters/user.presenter";
import { UniqueEntityID } from "@variant-lists/domain";

let cookie: string;
let user: UserPresented;

describe("Create Item (E2E)", () => {
	beforeAll(async () => {
		await app.ready();

		const response = await getUser(app);
		user = response.user;
		cookie = response.cookie;
	});

	test("[POST] /item", async () => {
		const schema = await makePrismaSchema({
			creatorId: new UniqueEntityID(user.id),
		});

		const list = await makePrismaList({
			schemaId: schema.id,
			creatorId: new UniqueEntityID(user.id),
		});

		await request(app.server)
			.post("/item")
			.set("Cookie", cookie)
			.send({
				title: "new item",
				description: "description",
				listId: list.id.toString(),
				data: {
					name: "My Name",
				},
			})
			.expect(200);
	});
});