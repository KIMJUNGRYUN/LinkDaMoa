// src/api.js
export async function login(username, password) {
  const res = await fetch("http://localhost:8080/api/admin/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, password }),
    credentials: "include",
  });

  if (!res.ok) {
    throw new Error("Login failed");
  }
  return res.json();
}

// src/api.js
export async function logout() {
  const res = await fetch("http://localhost:8080/api/admin/logout", {
    method: "POST",
    credentials: "include", // 세션 쿠키 
  });

  if (!res.ok) {
    throw new Error("Logout failed");
  }
  return res.json();
}


// src/api.js
export async function getMe() {
  const res = await fetch("http://localhost:8080/api/admin/me", {
    credentials: "include", // 세션 쿠키 
  });
  if (!res.ok) {
    return { authenticated: false };
  }
  return res.json();
}

