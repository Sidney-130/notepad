const API_URL = `${import.meta.env.VITE_API_URL || "http://localhost:3000/api/v1"}/auth`;

export const signup = async ({ email, password }) => {
  const res = await fetch(`${API_URL}/signup`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.message || "Signup failed. Please try again.");
  }

  return data;
};

export const login = async ({ email, password }) => {
  const res = await fetch(`${API_URL}/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.message || "Login failed. Please try again.");
  }

  return data;
};
