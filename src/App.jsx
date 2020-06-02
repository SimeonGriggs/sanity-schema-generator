import React, { useState } from 'react';
import './App.css';

import Fields from './components/Fields.jsx';
import Output from './components/Output.jsx';

function App() {
  const [schema, setSchema] = useState([]);

  return (
    <div className="text-gray-700">
      <h1 className="px-4 md:px-8 text-3xl font-bold text-gray-700 mt-12">
        Sanity Schema Generator
      </h1>
      <main className="px-4 md:px-8 md:py-12 flex">
        <Fields schema={schema} setSchema={setSchema} />
        <Output schema={schema} />
      </main>
    </div>
  );
}

export default App;
