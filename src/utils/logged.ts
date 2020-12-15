export const isLoggedIn = (): boolean => {
        console.log(localStorage.getItem("token")?.length, (localStorage.getItem("token") as string)?.length > 0)
        return (localStorage.getItem("token") as string)?.length > 0;
}
export const getToken = (): string => localStorage.getItem("token") as string;