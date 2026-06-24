const codespaceName = String(import.meta.env.VITE_CODESPACE_NAME || '').trim();

export const apiBase = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev`
  : 'http://localhost:8000';

export function normalizeApiResponse(data) {
  if (Array.isArray(data)) return data;
  if (data?.results && Array.isArray(data.results)) return data.results;
  if (data?.data && Array.isArray(data.data)) return data.data;
  return [];
}
