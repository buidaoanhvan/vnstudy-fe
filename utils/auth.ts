import Cookies from "js-cookie";

export function checkAuth(): boolean {
  const access_token = Cookies.get("access_token");
  if (access_token) {
    return true;
  }
  return false;
}

export function logout() {
  Cookies.remove("access_token");
  window.location.href = "/dang-nhap";
}
