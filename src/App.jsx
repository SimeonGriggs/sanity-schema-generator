import React, { useState } from 'react';
import './App.css';

import Header from './components/Header.jsx';
import Footer from './components/Footer.jsx';
import Fields from './components/Fields.jsx';
import Output from './components/Output.jsx';
// import History from './components/History';

function App() {
  const [schema, setSchema] = useState([]);

  return (
    <div className="min-h-screen">
      {/* <History schema={schema} setSchema={setSchema} /> */}
      <Fields schema={schema} setSchema={setSchema} />
      <main className="md:flex">
        <div className="md:w-2/5 xl:w-1/3"></div>
        <div className="flex-1 px-4 md:px-16">
          <Header />
          <Output schema={schema} />
          <Footer />
        </div>
      </main>
    </div>
  );
}

export default App;
