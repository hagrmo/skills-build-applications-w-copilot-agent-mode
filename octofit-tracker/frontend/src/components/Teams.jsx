import ResourcePage from './ResourcePage'

export default function Teams() {
  return (
    <ResourcePage
      title="Teams"
      description="Member groups and team creation timestamps from the collaboration tier."
      resource="teams"
      emptyMessage="No teams are available yet."
      fields={(team) => [
        { label: 'Team', value: team.name },
        {
          label: 'Members',
          value: Array.isArray(team.members)
            ? team.members.map((member) => member.username ?? member.name ?? member)
            : [],
        },
        { label: 'Created', value: team.createdAt },
      ]}
    />
  )
}