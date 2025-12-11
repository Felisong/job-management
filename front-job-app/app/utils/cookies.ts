export function setAuthToken(token: string){
    const maxAge = 7 * 24 * 60 * 60;
    document.cookie = `user-token=${token}; max-age=${maxAge}; path=/; ${process.env.NODE_ENV === 'production' ? 'secure': ''} samesite=strict`;
}

export function getAuthToken(): string | null {
    const cookies = document.cookie.split(";");
    for (const cookie of cookies) {
        const [name, value] = cookie.trim().split("=");
        if (name === 'user-token'){
            return value;
        }
    }
    return null;
}

export function removeAuthToken(){
    document.cookie = "user_token=; maxage=0; path=/"
}