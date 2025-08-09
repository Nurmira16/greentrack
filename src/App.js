import React from 'react';
import Main from './pages/Main';
import Layout from './layouts/Layout';
import { useEffect, useState } from "react";
import supabase from './supabaseClient'


const App = () => {
  const [instruments, setInstruments] = useState([]);
  useEffect(() => {
    getInstruments();
  }, []);
  async function getInstruments() {
    const { data } = await supabase.from("todos").select();
    setInstruments(data);
  }
  return (
    <div>
      <Layout>
      <ul>
      {instruments?.map((instrument) => (
        <li key={instrument.id}>{instrument.task}</li>
      ))}
    </ul>
      <Main/>
      </Layout>
    </div>
  );
};

export default App;