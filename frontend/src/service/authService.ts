export function isAuthenticated(): boolean {
  const token = localStorage.getItem("token");
  return token !== null;
}

export function getUserRole(): string | null {
  const token = localStorage.getItem("token");
  if (token) {
    const payload = JSON.parse(atob(token.split(".")[1]));
    return payload.role;
  }
  return null;
}

export function logout(): void {
  localStorage.removeItem("token");
}
