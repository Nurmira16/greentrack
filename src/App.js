import React from "react";
import Main from "./pages/Main";
import Layout from "./layouts/Layout";
import Auth from "./components/Auth";
import { useAuth } from "./context/AuthProvider";

const App = () => {
  const { user, loading } = useAuth();

  if (loading) return <p>Loading...</p>;
  if (!user) return <Auth />;

  return (
    <Layout>
      <Main user={user} />
    </Layout>
  );
};

export default App;
