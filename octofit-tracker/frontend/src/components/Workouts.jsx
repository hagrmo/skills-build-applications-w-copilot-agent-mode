import ResourcePage from './ResourcePage'

export default function Workouts() {
  return (
    <ResourcePage
      title="Workouts"
      description="Suggested workout plans with exercise lists and durations. Codespaces endpoint format: https://${import.meta.env.VITE_CODESPACE_NAME}-8000.app.github.dev/api/workouts/."
      resource="workouts"
      emptyMessage="No workouts are available yet."
      fields={(workout) => [
        { label: 'Workout', value: workout.name },
        { label: 'Duration', value: `${workout.duration ?? 0} minutes` },
        { label: 'Exercises', value: workout.exercises },
        { label: 'Description', value: workout.description },
      ]}
    />
  )
}