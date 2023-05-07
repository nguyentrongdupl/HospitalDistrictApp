export const validateUserName = (value: string) => {
    const regex = new RegExp('^[a-zA-Z0-9.]+$');
    return regex.test(value);
}