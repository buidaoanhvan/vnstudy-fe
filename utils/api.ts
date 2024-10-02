import { logout } from "./auth";

const API_URL = "http://localhost:3333";

async function fetchAuth(url: string, options: any) {
  const res = await fetch(url, options);
  if (res.status == 401) {
    logout();
  }
  return res.json();
}

export async function loginHandler(values: any) {
  const res = await fetch(`${API_URL}/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(values),
    credentials: "include",
  });
  return res.json();
}

export async function getUserInfo() {
  return fetchAuth(`${API_URL}/auth/profile`, {
    method: "GET",
    credentials: "include",
  });
}

export async function getListClass() {
  return fetchAuth(`${API_URL}/class/list`, {
    method: "GET",
    credentials: "include",
  });
}

export async function getListStudent() {
  return fetchAuth(`${API_URL}/students/list`, {
    method: "GET",
    credentials: "include",
  });
}
