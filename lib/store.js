/** @format */

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

export const getStoreSettings = async (token) => {
  try {
    if (!token) {
      throw new Error("Authentication failed. Please log in again.");
    }

    const res = await fetch(`${API_URL}/store`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      cache: "no-store",
    });

    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(errorData.message || "Failed to fetch store settings");
    }
    return await res.json();
  } catch (error) {
    if (process.env.NODE_ENV === "development") {
      console.error("Fetch store settings error:", error);
    }
    throw error;
  }
};

export const updateStoreSettings = async (token, updateData) => {
  try {
    if (!token) {
      throw new Error("Authentication failed. Please log in again.");
    }

    const formData = new FormData();
    if (updateData.storeName)
      formData.append("storeName", updateData.storeName);
    if (updateData.storeDescription)
      formData.append("storeDescription", updateData.storeDescription);
    if (updateData.currency) formData.append("currency", updateData.currency);
    if (updateData.timezone) formData.append("timezone", updateData.timezone);
    if (updateData.logo) formData.append("logo", updateData.logo);

    const res = await fetch(`${API_URL}/store`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
      cache: "no-store",
    });

    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(errorData.message || "Failed to update store settings");
    }
    return await res.json();
  } catch (error) {
    if (process.env.NODE_ENV === "development") {
      console.error("Update store settings error:", error);
    }
    throw error;
  }
};
