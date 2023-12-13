export type MenuItem = {
    id: string;
    title: string;
    foodTags: string[];
    foodType: string[];
    isAvailable: boolean;
    rating: number;
    ratingCount: string;
    description: string;
    price: number;
    additives: Additive[];
    imageUrl: string[];
    categorId: string;
    timeToCook: string;
}

export type Additive = {
    id: string;
    title: string;
    price: number;
}