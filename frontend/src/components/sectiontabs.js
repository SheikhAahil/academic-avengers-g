import React, { useState, useEffect } from 'react';
import FileUpload from './FileUpload';
import FileList from './FileList';

export default function SectionTabs({user}) {
  const [tab, setTab] = useState('ACADEMIC BOOKS');
  const [refresh, setRefresh] = useState(0);

  return (
    <div>
      <div>
        {['ACADEMIC BOOKS','PERSONAL BOOKS','OTHER'].map(t => <button key={t} onClick={()=>setTab(t)}>{t}</button>)}
      </div>
      <FileUpload section={tab} onSuccess={()=>setRefresh(v=>v+1)} />
      <FileList section={tab} refresh={refresh}/>
    </div>
  )
}
