import React from 'react';
import './dog-photo.css'
import { generatorFactory } from '../../../utils/generator-factory';

interface Props {
  dogPhoto: string;
  clearLoading: ((event: React.SyntheticEvent<HTMLImageElement, Event>) => void) | undefined;
}

const billieColors = [
  '#8093FF',
  '#FF502C',
  '#FF9472',
  '#FF91FF'
];

const DogPhoto = (props: Props) => {
  const generator = (generatorFactory(billieColors))();
  return <div className='img-container'>
    <img className='img-fluid border rounded shadow' alt='dog' src={props.dogPhoto} onLoad={props.clearLoading} />
    <h2><span>{'We ❤ our pups!'.split('').map((char, key) => {
      const color = generator.next();
      return <span key={key} style={{color: color.value}}>{char}</span>
    })}</span></h2>
    </div>
}

export { DogPhoto }
