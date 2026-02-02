const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

export const apiClient = {
    async request(endpoint: string, options: RequestInit = {}) {
        const token = localStorage.getItem("access_token");

        const headers: Record<string, string> = {
            "Content-Type": "application/json",
        };

        if (options.headers) {
            Object.assign(headers, options.headers);
        }

        if (token) {
            headers["Authorization"] = `Bearer ${token}`;
        }

        const response = await fetch(`${API_BASE_URL}${endpoint}`, {
            ...options,
            headers,
        });

        if (response.status === 401) {
            localStorage.removeItem("access_token");
            localStorage.removeItem("user_id");
            localStorage.removeItem("user_email");
            localStorage.removeItem("username");
            window.location.href = "/login";
            throw new Error("Unauthorized");
        }

        return response;
    },

    async get(endpoint: string) {
        return this.request(endpoint, { method: "GET" });
    },

    async post(endpoint: string, data?: any) {
        return this.request(endpoint, {
            method: "POST",
            body: data ? JSON.stringify(data) : undefined,
        });
    },

    async put(endpoint: string, data?: any) {
        return this.request(endpoint, {
            method: "PUT",
            body: data ? JSON.stringify(data) : undefined,
        });
    },

    async delete(endpoint: string) {
        return this.request(endpoint, { method: "DELETE" });
    },
};
