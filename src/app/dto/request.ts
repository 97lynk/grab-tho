export interface RecentRequest {
    id: number;
    noReceiver: number;
    noQuote: number;
    address: string;
    imagesDescription: string[];
    textDescription: string;
    createAt: Date;
    status: string;
}

export interface AcceptedRequest {
    repairerName: string;
    address: string;
    coin: number;
    desImages: string[];
    desText: string;
    createAt: Date;
}

export interface AcceptedItemConfig {
    color: string;
    iconName: string;
}

export interface CompletedRequest {
    repairerName: string;
    address: string;
    coin: number;
    desImages: string[];
    desText: string;
    createAt: Date;
}

export interface CompletedItemConfig {
    color: string;
    iconName: string;
}

export interface ClosedRequest {
    repairerName: string;
    address: string;
    coin: number;
    rating: number;
    desImages: string[];
    desText: string;
    createAt: Date;
}

export interface ClosedItemConfig {
    color: string;
    iconName: string;
}
