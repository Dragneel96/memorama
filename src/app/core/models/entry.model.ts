export interface RootObject {
    entries: Entry[];
    meta: RootObjectMeta;
}

export interface Entry {
    fields: Fields;
    meta: EntryMeta;
}

export interface Fields {
    image: Image;
}

export interface Image {
    alt_text: null;
    content_type: ContentType;
    description: null;
    tags: any[];
    title: string;
    url: string;
    uuid: string;
}

export enum ContentType {
    ImageJPEG = "image/jpeg",
}

export interface EntryMeta {
    author: Author;
    available_locales: Locale[];
    category: null;
    category_name: null;
    category_slug: null;
    created_at: Date;
    excerpt: string;
    locale: Locale;
    name: string;
    private: boolean;
    published_at: Date;
    slug: string;
    space: Space;
    tags: any[];
    targets: any[];
    type: Type;
    unpublished_at: null;
    updated_at: Date;
    uuid: string;
    version_type: VersionType;
}

export interface Author {
}

export enum Locale {
    Es = "es",
}

export enum Space {
    Animals = "animals",
}

export enum Type {
    Game = "game",
}

export enum VersionType {
    Current = "current",
}

export interface RootObjectMeta {
    current_page: number;
    per_page: number;
    total_entries: number;
    total_pages: number;
}


export interface Card {
    uuid: string;
    title: string;
    imageUrl: string;
}

export interface CardValidation {
    uuid: string;
    id: number;
}