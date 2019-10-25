export interface Request {

    id: number;

    textDescription: string;

    imagesDescription: string[];

    address: string;

    longitude: number;

    latitude: number;

    createAt: Date;

    status: string;

    noReceiver: number;

    noQuote: number;

    feedBack: boolean;

    rate: number;

    point: number;

    comment: string;

    userId: number;

    repairerId: number;
}


export interface RecentRequest {

    id: number;

    textDescription: string;

    imagesDescription: string[];

    address: string;

    longitude: number;

    latitude: number;

    createAt: Date;

    status: string;

    noReceiver: number;

    noQuote: number;
}

export interface AcceptedRequest {

    id: number;

    textDescription: string;

    imagesDescription: string[];

    address: string;

    longitude: number;

    latitude: number;

    createAt: Date;

    status: string;

    noReceiver: number;

    noQuote: number;

    point: number;

    repairerName: string;
}


export interface CompletedRequest {
    id: number;

    textDescription: string;

    imagesDescription: string[];

    address: string;

    longitude: number;

    latitude: number;

    createAt: Date;

    status: string;

    noReceiver: number;

    noQuote: number;

    feedBack: boolean;

    rate: number;

    comment: string;

    point: number;

    repairerName: string;
}


export interface AcceptedItemConfig {
    color: string;
    iconName: string;
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
