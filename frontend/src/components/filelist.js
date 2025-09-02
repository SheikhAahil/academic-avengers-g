import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function FileList({section, refresh}) {
  const [files, setFiles] = useState([]);
  useEffect(() => {
    axios.get('/api/files').then(res => {
      setFiles(res.data[section] || []);
    });
  }, [section, refresh]);
  return (
    <ul>
      {files.map(f => <li key={f}><a href={'/'+f} target="_blank" rel="noopener noreferrer">{f.split('/').pop()}</a></li>)}
    </ul>
  );
}
