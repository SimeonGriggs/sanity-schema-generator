import React, { useState } from 'react';
import './App.css';

import Header from './components/Header.jsx';
import Footer from './components/Footer.jsx';
import Fields from './components/Fields.jsx';
import Output from './components/Output.jsx';

function App() {
  const [schema, setSchema] = useState([]);

  return (
    <div className="px-4 md:px-8 text-gray-700">
      <Header />
      <main className="mb-6 flex">
        <Fields schema={schema} setSchema={setSchema} />
        <Output schema={schema} />
      </main>
      <Footer />
    </div>
  );
}

export default App;
