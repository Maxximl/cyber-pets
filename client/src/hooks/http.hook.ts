import { useState, useCallback } from "react";
import { useAuth } from "./auth.hook";

export const useHttp = () => {
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<boolean>(false);
    const { logout } = useAuth();

    const request = useCallback(
        async (url, method = "GET", body = null, headers = {}) => {
            setLoading(true);
            try {
                if (body) {
                    body = JSON.stringify(body);
                    headers['Content-Type'] = 'application/json'
                }
                const response = await fetch(url, { method, body, headers });
                const data = await response.json();
                if (!response.ok) {
                    if (response.status === 401) logout();
                    throw new Error(data.message || 'Что-то пошло не так');
                }

                setLoading(false);
                return data;

            } catch (e) {
                setLoading(false);
                setError(e.message)
                console.log(e);
                throw e;
            }
        }, [logout]
    );

    const clearError = useCallback(() => (setError(false)), []);
    return { loading, request, error, clearError };
};
