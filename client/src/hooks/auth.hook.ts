import { useState, useCallback, useEffect } from "react";

const storageName: string = "userData";

export const useAuth = () => {
    const [token, setToken] = useState<string>("");
    const [ready, setReady] = useState<boolean>(false);
    const [userId, setUserId] = useState<string>("");

    const login = useCallback((jwtTotken, id) => {
        setToken(jwtTotken);
        setUserId(id);

        localStorage.setItem(
            storageName,
            JSON.stringify({
                userId: id,
                token: jwtTotken
            })
        );
    }, []);

    const logout = useCallback(() => {
        setToken("");
        setUserId("");
        localStorage.removeItem(storageName);
    }, []);

    useEffect(() => {
        const data = JSON.parse(localStorage.getItem(storageName) as string);
        if (data && data.token) {
            login(data.token, data.userId);
        }
        setReady(true);
    }, [login]);

    return { login, logout, token, userId, ready };
};
