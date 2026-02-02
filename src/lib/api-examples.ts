import { apiClient } from "@/lib/api";

// Example 1: GET request to protected endpoint
async function getUserProfile() {
    try {
        const response = await apiClient.get("/auth/me");
        const data = await response.json();
        console.log("User profile:", data);
    } catch (error) {
        console.error("Failed to get profile:", error);
    }
}

// Example 2: POST request with data
async function createFarmerProfile(profileData: any) {
    try {
        const response = await apiClient.post("/farmer/profile", profileData);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Failed to create profile:", error);
        throw error;
    }
}

// Example 3: PUT request to update data
async function updateCropData(cropId: string, updates: any) {
    try {
        const response = await apiClient.put(`/crops/${cropId}`, updates);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Failed to update crop:", error);
        throw error;
    }
}

// Example 4: DELETE request
async function deleteFarm(farmId: string) {
    try {
        const response = await apiClient.delete(`/farms/${farmId}`);
        return response.ok;
    } catch (error) {
        console.error("Failed to delete farm:", error);
        throw error;
    }
}

// The API client automatically:
// 1. Adds JWT token to Authorization header
// 2. Redirects to /login on 401 errors
// 3. Clears auth data on unauthorized
// 4. Sets Content-Type to application/json
