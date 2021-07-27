import axios from "axios";

interface GoogleValidateResponse {
    data: {
        name: string;
        sub: string;
    }
}

interface FacebookApiResponse {
    data: {
        name: string;
        id: string;
    }
}

export const validateGoogleToken = async (id_token: string) => {
    const response: GoogleValidateResponse = await axios.get(
        'https://www.googleapis.com/oauth2/v3/tokeninfo', {
            params: { id_token }
        }
    );

    const { sub, name } = response.data;
    return [sub, name];
}

export const validateFacebookToken = async (id_token: string) => {
    const response: FacebookApiResponse = await axios.get(
        'https://graph.facebook.com/me', {
            params: { id_token }
        }
    );

    const { id, name } = response.data;
    return [id, name];
}

export const validateToken = async (auth: 'g' | 'f', token: string) => {
    return auth === 'g' ? await validateGoogleToken(token) : await validateFacebookToken(token)
}
