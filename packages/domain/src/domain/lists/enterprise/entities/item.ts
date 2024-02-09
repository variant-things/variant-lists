import { Optional } from "@src/core/types/optional";
import { Entity } from "@src/core/entities/entity";
import { UniqueEntityID } from "@src/core/entities/uinique-entity-id";
import { Slug } from "@src/domain/lists/enterprise/entities/value-objects/slug";

export type ItemProps = {
	title: string;
	slug: Slug;
	description: string;
	listId: UniqueEntityID;
	creatorId: UniqueEntityID;
	imageUrl?: string;
	lastValidationDate: Date;
	isValid: boolean;
	data: Record<string, unknown>;
};

export class Item extends Entity<ItemProps> {
	static create(
		props: Optional<ItemProps, "slug" | "lastValidationDate" | "isValid">,
		id?: UniqueEntityID,
	) {
		const { slug, title, lastValidationDate, isValid } = props;

		const newProps: ItemProps = {
			...props,
			title,
			lastValidationDate: lastValidationDate ?? new Date(),
			isValid: isValid ?? true,
			slug: slug ?? Slug.createFromText(title),
		};
		return new Item(newProps, id);
	}

	get slug() {
		return this.props.slug;
	}

	get creatorId() {
		return this.props.creatorId;
	}

	get listId() {
		return this.props.listId;
	}

	get lastValidationDate() {
		return this.props.lastValidationDate;
	}

	set lastValidationDate(value: Date) {
		this.props.lastValidationDate = value;
	}

	get data() {
		return this.props.data;
	}

	get isValid() {
		return this.props.isValid;
	}

	set isValid(value: boolean) {
		this.props.isValid = value;
	}
}