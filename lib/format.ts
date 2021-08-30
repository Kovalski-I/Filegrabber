export const shortenName = (name: string, max: number, end = '...') => {
    return name.slice(0, max - 1 - end.length) + end;
}