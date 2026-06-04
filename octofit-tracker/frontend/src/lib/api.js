const codespaceName = import.meta.env.VITE_CODESPACE_NAME?.trim()

export const isCodespaceConfigured = Boolean(codespaceName)

export const apiBaseUrl = isCodespaceConfigured
  ? `https://${import.meta.env.VITE_CODESPACE_NAME}-8000.app.github.dev/api`
  : 'http://localhost:8000/api'

export function buildResourceUrl(resource) {
  return `${apiBaseUrl}/${resource}/`
}

export function normalizeCollection(payload) {
  if (Array.isArray(payload)) {
    return payload
  }

  if (!payload || typeof payload !== 'object') {
    return []
  }

  const collectionKeys = ['results', 'items', 'data', 'docs', 'entries']

  for (const key of collectionKeys) {
    if (Array.isArray(payload[key])) {
      return payload[key]
    }
  }

  return []
}