import { redirect } from "next/navigation";

const Dashboard = async () => {
  const res = await fetch("http://localhost:3001/api/users/user", {
    credentials: 'include',
    cache: 'no-store', // to avoid caching of fetch call
  });

  if (res.status === 400 || res.status === 401) {
    redirect("/login");
  }

  return (
    <div>Dashboard</div>
  )
}

export default Dashboard