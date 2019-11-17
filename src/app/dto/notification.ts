export interface Notification {

    key: string;

    sender: string;

    message: string;

    link: string;

    sendAt: number;

    requestId: number;

    seen: boolean;

    action: string;

    thumbnail: string;
}
