// Make call to backend

import { env } from "$env/dynamic/public";

// Example Endpoint: "/users/login", METHOD: "POST|GET|etc."
export async function callAPI(endpoint: string, method: string, body: string | null): Promise<Response> {
  const BACKEND = env.PUBLIC_BACKEND_URL;

  const token = getAuthCookie();

  const headers = new Headers();
  headers.append('Authorization', token!);

  if (method == "POST") {
    headers.append('content-type', 'application/json')
  }

  const res = await fetch(BACKEND + endpoint, {
    body,
    method: method,
    headers: headers
  });

  return res
}

// Get Cookie with Name 'Authorization'
export function getAuthCookie(): string {
  if (typeof document === 'undefined') {
    return ""
  }

  const value = '; ' + document.cookie;
  const parts = value.split('; ' + 'Authorization' + '=');

  return parts.pop()?.split(';').shift()!;
}

export function deleteAuthCookie() {
  if (typeof document === 'undefined') {
    return
  }
  const date = new Date();
  // Set it expire in -1 days
  date.setTime(date.getTime() + (-1 * 24 * 60 * 60 * 1000));

  // Set it
  document.cookie = "Authorization=; expires=" + date.toUTCString() + "; path=/";
}
