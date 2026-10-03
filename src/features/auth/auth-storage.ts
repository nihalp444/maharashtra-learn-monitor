/**
 * Helper to manage demo auth session across sessionStorage and localStorage (if remember me is checked)
 */
const AUTH_KEY = "mbocwwb-demo-auth";

export function getStoredDemoAuth(): string | null {
  if (typeof window === "undefined") return null;
  return sessionStorage.getItem(AUTH_KEY) || localStorage.getItem(AUTH_KEY);
}

export function setStoredDemoAuth(value: string, remember: boolean = false): void {
  if (typeof window === "undefined") return;
  sessionStorage.setItem(AUTH_KEY, value);
  if (remember) {
    localStorage.setItem(AUTH_KEY, value);
  } else {
    localStorage.removeItem(AUTH_KEY);
  }
}

export function clearStoredDemoAuth(): void {
  if (typeof window === "undefined") return;
  sessionStorage.removeItem(AUTH_KEY);
  localStorage.removeItem(AUTH_KEY);
}
