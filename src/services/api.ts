/** Placeholder API service for future backend integration */

const API_BASE = import.meta.env.VITE_API_URL ?? '/api'

export async function fetchJson<T>(path: string): Promise<T> {
  const res = await fetch(`${API_BASE}${path}`)
  if (!res.ok) throw new Error(`API error: ${res.status}`)
  return res.json() as Promise<T>
}

export const api = {
  news: () => fetchJson('/news'),
  events: () => fetchJson('/events'),
  gallery: () => fetchJson('/gallery'),
  staff: () => fetchJson('/staff'),
}
