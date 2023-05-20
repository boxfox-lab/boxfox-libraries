export const ACCESS_TOKEN_KEY = "@YWNjZXNzX3Rva2Vu";

export function getAccessToken() {
  return localStorage.getItem(ACCESS_TOKEN_KEY);
}

export function clearAccessToken() {
  return localStorage.removeItem(ACCESS_TOKEN_KEY);
}

export function setAccessToken(accessToken: string) {
  return localStorage.setItem(ACCESS_TOKEN_KEY, accessToken);
}
