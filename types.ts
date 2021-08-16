export interface ApiRequest {
    body: any;
    session: {
        user_id: string;
        username: string;
        commit: () => Promise<void>;
    }
}

export interface User {
    user_id: string;
    user_hash: string;
    username: string;
}

export interface FileCard {
    file_id: number;
    info: string;
    is_file: string;
    is_public: string;
    user_id: string;
}

export interface InsertIntoFilesParams {
    info: string;
    is_file: string;
    is_public: string;
    user_id: string;
}
