import React, { useState, useEffect } from 'react';
import Editor from './Editor';
import useLocalStograge from '../hooks/useLocalStorage'
function App() {
  const [html, setHtml] = useLocalStograge('html','');
  const [css, setCss] =useLocalStograge('css','');
  const [js, setJs] = useLocalStograge('js','');
  const [srcDoc, setSrcDoc] = useState('');

  useEffect(() => {
    const timeout = setTimeout(() => {
      setSrcDoc(`
        <html>
        <body>${html}</body>
        <style>${css}</style>
        <script>${js}</script>
        </html>
      `);
    }, 250);
    
    return () => clearTimeout(timeout);
  }, [html, css, js]);

  return (
    <>
      <div className="pane top-pane">
        <Editor 
          language="xml"
          displayName="HTML"
          value={html}
          onChange={setHtml}
        />
        <Editor 
          language="css"
          displayName="CSS"
          value={css}
          onChange={setCss}
        />
        <Editor 
          language="javascript"
          displayName="JS"
          value={js}
          onChange={setJs}
        />
      </div>
      <div className="pane">
        <iframe
          title="output"
          sandbox="allow-scripts"
          frameBorder="0"
          width="100%"
          height="100%"
          srcDoc={srcDoc}
        />
      </div>
    </>
  );
}

export default App;
