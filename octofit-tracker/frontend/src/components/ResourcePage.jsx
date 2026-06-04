import { useEffect, useState } from 'react'
import { buildResourceUrl, normalizeCollection } from '../lib/api'

function isIsoDateString(value) {
  return typeof value === 'string' && /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}/.test(value)
}

function formatValue(value) {
  if (value === null || value === undefined || value === '') {
    return 'Unavailable'
  }

  if (Array.isArray(value)) {
    return value.length > 0 ? value.join(', ') : 'None'
  }

  if (isIsoDateString(value)) {
    return new Date(value).toLocaleString()
  }

  if (typeof value === 'object') {
    if (value.username) {
      return value.username
    }

    if (value.name) {
      return value.name
    }

    return JSON.stringify(value)
  }

  return String(value)
}

export default function ResourcePage({
  title,
  description,
  resource,
  emptyMessage,
  fields,
}) {
  const [items, setItems] = useState([])
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let ignore = false

    async function loadItems() {
      setLoading(true)
      setError('')

      try {
        const response = await fetch(buildResourceUrl(resource))

        if (!response.ok) {
          throw new Error(`Request failed with status ${response.status}`)
        }

        const payload = await response.json()

        if (!ignore) {
          setItems(normalizeCollection(payload))
        }
      } catch (loadError) {
        if (!ignore) {
          setError(loadError instanceof Error ? loadError.message : 'Unable to load data.')
          setItems([])
        }
      } finally {
        if (!ignore) {
          setLoading(false)
        }
      }
    }

    void loadItems()

    return () => {
      ignore = true
    }
  }, [resource])

  return (
    <section className="resource-section card border-0">
      <div className="card-body p-4 p-lg-5">
        <div className="d-flex flex-column flex-lg-row justify-content-between align-items-start gap-3 mb-4">
          <div>
            <p className="eyebrow">Data View</p>
            <h2 className="h1 mb-2">{title}</h2>
            <p className="resource-meta mb-0">{description}</p>
          </div>
          <code>{buildResourceUrl(resource)}</code>
        </div>

        {loading ? <div className="alert alert-light border">Loading {title.toLowerCase()}...</div> : null}

        {!loading && error ? (
          <div className="alert alert-danger mb-0" role="alert">
            {error}
          </div>
        ) : null}

        {!loading && !error && items.length === 0 ? (
          <div className="alert alert-secondary mb-0" role="status">
            {emptyMessage}
          </div>
        ) : null}

        {!loading && !error && items.length > 0 ? (
          <div className="resource-grid">
            {items.map((item, index) => {
              const metrics = fields(item, index)
              const key = item._id ?? item.id ?? `${resource}-${index}`

              return (
                <article key={key} className="card h-100 border-0">
                  <div className="card-body">
                    <div className="metric-list">
                      {metrics.map((metric) => (
                        <div key={`${key}-${metric.label}`} className="metric-item">
                          <span className="metric-label">{metric.label}</span>
                          <span className="metric-value">{formatValue(metric.value)}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </article>
              )
            })}
          </div>
        ) : null}
      </div>
    </section>
  )
}