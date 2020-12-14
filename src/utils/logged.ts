export const isLoggedIn = (): boolean => {
        return (localStorage.getItem("token") as string).length > 0;
}
export const getToken = (): string => localStorage.getItem("token") as string;