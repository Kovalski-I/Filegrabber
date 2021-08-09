export const generateCoookie = (name: string, value: string, days?: number) => {
    let expires = '';
    if (days) {
        const date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000))
        expires = `; expires=${date.toUTCString()}`;
    }

    return name + '=' + (value || '') + expires + '; path=/';
}

export const deleteCookie = (name: string) => {
    return name + '=;expires=Thu, 01 Jan 1970 00:00:01 GMT;';
}
