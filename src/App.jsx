import React, { useState, useEffect } from 'react';
import './App.css';

import Header from './components/Header.jsx';
import Footer from './components/Footer.jsx';
import Fields from './components/Fields.jsx';
import Output from './components/Output.jsx';

function App() {
  const [schema, setSchema] = useState([]);

  return (
    <div className="min-h-screen">
      <Fields schema={schema} setSchema={setSchema} />
      <main className="flex">
        <div className="w-2/5 xl:w-1/3"></div>
        <div className="flex-1 px-16">
          <Header />
          <Output schema={schema} />
          <Footer />
        </div>
      </main>
    </div>
  );
}

export default App;
