import React, { useRef, useState } from 'react';
import axios from 'axios';

export default function FileUpload({section, onSuccess}) {
  const ref = useRef();
  const [msg, setMsg] = useState('');
  const onSubmit = async e => {
    e.preventDefault();
    const file = ref.current.files[0];
    if(!file) return setMsg('Choose a file');
    const form = new FormData();
    form.append('file', file);
    form.append('section', section);
    try {
      await axios.post('/api/files', form, {headers:{'x-upload-password':'ACAAVGAA'}});
      setMsg('Uploaded');
      onSuccess();
    } catch {
      setMsg('Failed');
    }
  };
  return <form onSubmit={onSubmit}>
    <input type="file" ref={ref}/>
    <button>Upload</button>
    <div>{msg}</div>
  </form>;
}
