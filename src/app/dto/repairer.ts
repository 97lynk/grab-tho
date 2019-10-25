export interface Repairer {

    id: number;

    username: string;

    email: string;

    fullName: string;

    address: string;

    phone: string;

    avatar: string;

    rating: number;

}

export interface JoinedRepairer {

    id: number;

    username: string;

    email: string;

    fullName: string;

    address: string;

    phone: string;

    avatar: string;

    roles: string[];

    status: string;

    point: number;

    createAt: Date;
}

