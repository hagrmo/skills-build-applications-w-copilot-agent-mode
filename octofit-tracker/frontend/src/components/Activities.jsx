import ResourcePage from './ResourcePage'

export default function Activities() {
  return (
    <ResourcePage
      title="Activities"
      description="Logged workouts, owners, durations, and completion dates."
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