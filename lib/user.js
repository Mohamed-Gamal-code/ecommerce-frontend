/** @format */

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

export const getAllUsers = async (getValidToken) => {
  try {
    const token = await getValidToken();
    if (!token) {
      // إذا لم يتم إرجاع توكن، فهذا يعني أن التحديث فشل وتم تسجيل الخروج
      throw new Error("Authentication failed. Please log in again.");
    }

    const res = await fetch(`${API_URL}/user`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      cache: "no-store",
    });

    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(errorData.message || "Failed to fetch users");
    }
    return await res.json();
  } catch (error) {
    if (process.env.NODE_ENV === "development") {
      console.error("Fetch users error:", error);
    }
    throw error;
  }
};

export const deleteUser = async (getValidToken, userid) => {
  try {
    const token = await getValidToken();
    if (!token) {
      // إذا لم يتم إرجاع توكن، فهذا يعني أن التحديث فشل وتم تسجيل الخروج
      throw new Error("Authentication failed. Please log in again.");
    }

    const res = await fetch(`${API_URL}/user/${userid}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      cache: "no-store",
    });

    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(errorData.message || "Failed to fetch users");
    }
    return await res.json();
  } catch (error) {
    if (process.env.NODE_ENV === "development") {
      console.error("Fetch users error:", error);
    }
    throw error;
  }
};
export const getUser = async (getValidToken, userid) => {
  try {
    const token = await getValidToken();
    if (!token) {
      // إذا لم يتم إرجاع توكن، فهذا يعني أن التحديث فشل وتم تسجيل الخروج
      throw new Error("Authentication failed. Please log in again.");
    }

    const res = await fetch(`${API_URL}/user/${userid}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      cache: "no-store",
    });

    const responseData = await res.json();

    if (!res.ok) {
      throw new Error(responseData.message || "Failed to fetch user");
    }

    return responseData.data;
  } catch (error) {
    if (process.env.NODE_ENV === "development") {
      console.error("Fetch user error:", error);
    }
    throw error;
  }
};
export const updateUser = async (getValidToken, userid, userData) => {
  try {
    const token = await getValidToken();
    if (!token) {
      throw new Error("Authentication failed. Please log in again.");
    }

    // Check if userData contains a file (for avatar upload)
    const hasFile = Object.values(userData).some(
      (value) => value instanceof File
    );

    let body;
    let headers = {
      Authorization: `Bearer ${token}`,
    };

    if (hasFile) {
      // Use FormData for file uploads
      const formData = new FormData();
      Object.keys(userData).forEach((key) => {
        formData.append(key, userData[key]);
      });
      body = formData;
      // Don't set Content-Type for FormData, let browser set it
    } else {
      // Use JSON for non-file updates
      headers["Content-Type"] = "application/json";
      body = JSON.stringify(userData);
    }

    const res = await fetch(`${API_URL}/user/${userid}`, {
      method: "PUT",
      headers,
      body,
      cache: "no-store",
    });

    const responseData = await res.json();

    if (!res.ok) {
      throw new Error(responseData.message || "Failed to update user");
    }

    return responseData.data;
  } catch (error) {
    if (process.env.NODE_ENV === "development") {
      console.error("Update user error:", error);
    }
    throw error;
  }
};

export const addToCart = async (getValidToken, { productId, quantity }) => {
  try {
    const token = await getValidToken();
    if (!token) {
      throw new Error("Authentication failed. Please log in again.");
    }

    const res = await fetch(`${API_URL}/user/cart`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ productId, quantity }),
      cache: "no-store",
    });

    const responseData = await res.json();

    if (!res.ok) {
      throw new Error(responseData.message || "Failed to add item to cart");
    }

    return responseData.data;
  } catch (error) {
    if (process.env.NODE_ENV === "development") {
      console.error("Add to cart error:", error);
    }
    throw error;
  }
};

export const updateUserProfile = async (token, userid, updateData) => {
  try {
    if (!token) {
      throw new Error("Authentication failed. Please log in again.");
    }

    const formData = new FormData();
    if (updateData.name) formData.append("name", updateData.name);
    if (updateData.email) formData.append("email", updateData.email);
    if (updateData.currentPassword)
      formData.append("currentPassword", updateData.currentPassword);
    if (updateData.newPassword)
      formData.append("newPassword", updateData.newPassword);
    if (updateData.avatar) formData.append("avatar", updateData.avatar);

    const res = await fetch(`${API_URL}/user/${userid}`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
      cache: "no-store",
    });

    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(errorData.message || "Failed to update profile");
    }
    return await res.json();
  } catch (error) {
    if (process.env.NODE_ENV === "development") {
      console.error("Update profile error:", error);
    }
    throw error;
  }
};
