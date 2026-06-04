import ResourcePage from './ResourcePage'

export default function Users() {
  return (
    <ResourcePage
      title="Users"
      description="Profiles fetched from the backend users collection."
      resource="users"
      emptyMessage="No users have been created yet."
      fields={(user) => [
        { label: 'Username', value: user.username },
        { label: 'Email', value: user.email },
        { label: 'Joined', value: user.createdAt },
      ]}
    />
  )
}