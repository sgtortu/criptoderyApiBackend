export interface Content {
    id: string;
    createdAt: string;
    publisherId: string;
    type: number;
    visibility: number;
    hidden: boolean;
    text: string;
    categoryId: number;
    isDeleted: boolean;
    title: string;
    updatedAt?: string;
}
  