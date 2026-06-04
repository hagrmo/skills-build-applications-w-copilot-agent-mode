import ResourcePage from './ResourcePage'

export default function Users() {
  return (
    <ResourcePage
      title="Users"
      description="Profiles fetched from the backend users collection. Codespaces endpoint format: https://${import.meta.env.VITE_CODESPACE_NAME}-8000.app.github.dev/api/users/."
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