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

    userFullName: string;

    userAvatar: string;

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

    userFullName: string;

    userAvatar: string;
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

    address: string;

    createAt: Date;

    feedBack: boolean;

    imagesDescription: string[];

    noQuote: number;

    noReceiver: number;

    point: number;

    rate: number;

    repairerName: string;

    status: string;

    textDescription: string;
}

export interface ClosedItemConfig {
    color: string;
    iconName: string;
}
