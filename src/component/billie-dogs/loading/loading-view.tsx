import React from 'react';
import './loading.css'

interface Props {
  show: boolean;
}

const Loading = (props: Props) => {
  return <div className={props.show ? 'row align-items-center loading-container show' : 'row align-items-center loading-container hide'}>
    <div className='text-center'>
      <div className='spinner-border'></div>
      <div>Loading...</div>
    </div>
  </div>
}

export { Loading }