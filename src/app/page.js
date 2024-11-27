import AuthStatus from './components/AuthStatus'

export default function Home() {
  return (
    <main className="min-h-screen p-8">
      <AuthStatus />
      <h1 className="text-2xl font-bold mt-4">Welcome to the Home Page</h1>
    </main>
  );
}