import React, { useEffect, useState } from "react";
import Main from "./pages/Main";
import Layout from "./layouts/Layout";
import supabase from "./supabaseClient";
import Auth from "./components/Auth";

const App = () => {
  const [user, setUser] = useState(null);

  // Check if already logged in
  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      if (data.user) setUser(data.user);
    });
  }, []);

  if (!user) return <Auth onLogin={setUser} />; // show login if no user

  return (
    <Layout>
      <Main user={user} />
    </Layout>
  );
};

export default App;
