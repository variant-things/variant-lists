import { expect, test } from "vitest";
import { Slug } from "@src/domain/lists/enterprise/entities/value-objects/slug";

test("it should be able to create a new slug from text", () => {
	const slug = Slug.createFromText("Example question title");

	expect(slug.value.startsWith("example-question-title")).toBeTruthy();
});
