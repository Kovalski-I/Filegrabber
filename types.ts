export interface ApiRequest {
    body: any;
    session: {
        user_id: string;
        username: string;
        commit: () => Promise<void>;
    }
}

export interface File {
    file_id: number;
    info: string;
    is_file: number;
    is_public: number;
    user_id: string;
}
