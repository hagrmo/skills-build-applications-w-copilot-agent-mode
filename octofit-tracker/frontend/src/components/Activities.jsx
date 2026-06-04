import ResourcePage from './ResourcePage'

export default function Activities() {
  return (
    <ResourcePage
      title="Activities"
      description="Logged workouts, owners, durations, and completion dates. Codespaces endpoint format: https://${import.meta.env.VITE_CODESPACE_NAME}-8000.app.github.dev/api/activities/."
      resource="activities"
      emptyMessage="No activities have been logged yet."
      fields={(activity) => [
        { label: 'Activity', value: activity.activityType },
        { label: 'Athlete', value: activity.user?.username ?? activity.user },
        { label: 'Duration', value: `${activity.duration ?? 0} minutes` },
        { label: 'Date', value: activity.date },
      ]}
    />
  )
}