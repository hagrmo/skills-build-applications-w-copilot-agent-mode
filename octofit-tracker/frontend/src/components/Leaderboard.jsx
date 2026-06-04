import ResourcePage from './ResourcePage'

export default function Leaderboard() {
  return (
    <ResourcePage
      title="Leaderboard"
      description="Ranked score entries sorted by the backend leaderboard route."
      resource="leaderboard"
      emptyMessage="No leaderboard entries are available yet."
      fields={(entry, index) => [
        { label: 'Rank', value: index + 1 },
        { label: 'Athlete', value: entry.user?.username ?? entry.user },
        { label: 'Score', value: entry.score },
        { label: 'Updated', value: entry.updatedAt },
      ]}
    />
  )
}