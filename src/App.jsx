import React, { useState } from 'react';
import './App.css';

import Fields from './components/Fields.jsx';
import Output from './components/Output.jsx';

function App() {
  const [schema, setSchema] = useState([]);

  return (
    <div className="px-4 md:px-8  text-gray-700">
      <article className="flex items-center mt-12">
        <h1 className="text-3xl font-bold text-gray-700">
          Sanity Schema Generator
        </h1>
        <div className="max-w-sm ml-auto text-right">
          A quick way to create basic
          <a
            className="text-green-400"
            href="https://www.sanity.io/docs/schema-types"
          >
            {' '}
            Sanity Schema
          </a>
          . This tool will only give you the basics. For validation, layout and
          other rules please read the docs.
        </div>
      </article>
      <main className="md:py-12 flex">
        <Fields schema={schema} setSchema={setSchema} />
        <Output schema={schema} />
      </main>
    </div>
  );
}

export default App;
