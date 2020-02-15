import React from "react";
import { generatorFactory } from "../../utils/generator-factory";
import './billie-dogs.css'

interface State {
  dogPhoto: string;
  breeds: string[];
  selectedBreed: string | undefined;
  invalidAction: boolean;
  fetchPhotoError: boolean;
  fetchBreedsError: boolean;
}

const billieColors = [
  '#8093FF',
  '#FF502C',
  '#FF9472',
  '#FF91FF'
];

class BillieDogs extends React.Component<{}, State> {
  constructor(props: {}) {
    super(props)
    this.state = {
      dogPhoto: '',
      breeds: [],
      selectedBreed: undefined,
      invalidAction: false,
      fetchPhotoError: false,
      fetchBreedsError: false
    }
  }

  fetchRandomDog = (): void => {
    fetch('https://dog.ceo/api/breeds/image/random')
      .then((response) => {
        if (!response.ok) {
          throw new Error();
        }
        return response.json();
      })
      .then((json) => {
        this.setState({
          dogPhoto: json.message,
          fetchPhotoError: false
        });
      })
      .catch((error) => {
        this.setState({
          fetchPhotoError: true
        })
      });
  }

  fetchBreeds = () => {
    fetch('https://dog.ceo/api/breeds/list/all')
      .then((response) => {
        if (!response.ok) {
          throw new Error();
        }
        return response.json();
      })
      .then((json) => {
        const breeds = [];
        for (const [breed, subBreed] of Object.entries<string[]>(json.message)) {
          breeds.push(breed);
          subBreed.forEach((val) => {
            const com = `${breed}-${val}`;
            breeds.push(com);
          });
        }
        this.setState({
          breeds: breeds,
          fetchBreedsError: false
        });
      })
      .catch((error) => {
        this.setState({
          fetchBreedsError: true
        });
      });
  }

  fetchByBreed = () => {
    if (!this.state.selectedBreed) {
      this.setState({
        invalidAction: true
      });
      return;
    }

    fetch(`https://dog.ceo/api/breed/${this.state.selectedBreed?.split('-').join('/')}/images/random`)
      .then((response) => {
        if (!response.ok) {
          throw new Error();
        }
        return response.json();
      })
      .then((json) => {
        this.setState({
          dogPhoto: json.message,
          fetchPhotoError: false
        });
      })
      .catch((error) => {
        this.setState({
          fetchPhotoError: true
        })
      });
  }

  handleClick = (): void => {
    this.fetchRandomDog();
  }

  handleChange = (event: React.ChangeEvent<HTMLSelectElement>): void => {
    if (event.target.value) {
      this.setState({
        selectedBreed: event.target.value,
        invalidAction: false
      })
    }
  }

  componentDidMount = (): void => {
    this.fetchRandomDog();
    this.fetchBreeds();
  }

  render = (): JSX.Element => {
    const generator = (generatorFactory(billieColors))();
    return (<div className='row'>
      <div className='row col-sm-12 justify-content-center p-3 mt-5 mb-5'>
        {!this.state.fetchPhotoError ?
        <div className='img-container'>
          <img className='img-fluid border rounded shadow' alt='dog' src={this.state.dogPhoto} />
          <h2><span>{'We ❤ our pups!'.split('').map((char, key) => {
            const color = generator.next();
            return <span key={key} style={{color: color.value}}>{char}</span>
          })}</span></h2>
        </div>
        :
        <div>There was a problem while fetching your billie.</div>
        }
      </div>
      <div className='row col-sm-12 justify-content-center p-3 mb-2 form-group'>
        <button className='btn btn-primary' onClick={this.fetchRandomDog}>retrieve another</button>
      </div>
      <div className='row col-sm-12 justify-content-center p-3 mb-2'>
        <div className='col-sm-3 form-group'>
          <select className={this.state.invalidAction || this.state.fetchBreedsError ? 'form-control custom-select is-invalid' : 'form-control custom-select'} value={this.state.selectedBreed} onChange={this.handleChange}>
            <option>Or choose a breed...</option>
            {this.state.breeds.map((breed, key) => {
              return <option key={key} value={breed}>{breed}</option>;
            })}
          </select>
          {this.state.invalidAction ? 
          <span className='text-danger'>You must select a breed first.</span> 
          : 
          this.state.fetchBreedsError ? <span className='text-danger'>There was a problem while fetching the breeds.</span> : null }
        </div>
        <div className='col-sm-auto form-group'>
          <button className='btn btn-primary' onClick={this.fetchByBreed}>get my breed!</button>
        </div>
      </div>
    </div>);
  }
}

export default BillieDogs;
