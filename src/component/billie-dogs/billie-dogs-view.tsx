import React from "react";
import './billie-dogs.css'
import { DogPhoto } from "./dog-photo/dog-photo-view";
import { Loading } from "./loading/loading-view";

interface State {
  dogPhoto: string;
  breeds: string[];
  selectedBreed: string | undefined;
  invalidAction: boolean;
  fetchPhotoError: boolean;
  fetchBreedsError: boolean;
  fetchingPhoto: boolean;
}

class BillieDogs extends React.Component<{}, State> {
  constructor(props: {}) {
    super(props)
    this.state = {
      dogPhoto: '',
      breeds: [],
      selectedBreed: undefined,
      invalidAction: false,
      fetchPhotoError: false,
      fetchBreedsError: false,
      fetchingPhoto: true
    }
  }

  fetchRandomDog = (): void => {
    this.setState({
      fetchingPhoto: true
    }, () => {
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
            fetchPhotoError: true,
            fetchingPhoto: false
          })
        });
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

    this.setState({
      fetchingPhoto: true
    }, () => {
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
            fetchPhotoError: true,
            fetchingPhoto: false
          })
        });
    });
  }

  handleChange = (event: React.ChangeEvent<HTMLSelectElement>): void => {
    if (event.target.value) {
      this.setState({
        selectedBreed: event.target.value,
        invalidAction: false
      })
    }
  }

  clearLoading = (): void => {
    this.setState({
      fetchingPhoto: false
    });
  }

  componentDidMount = (): void => {
    this.fetchRandomDog();
    this.fetchBreeds();
  }

  render = (): JSX.Element => {
    return (<div className='row'>
      <div className='row col-sm-12 justify-content-center p-3 mt-5 mb-5 photo-container'>
        <Loading show={this.state.fetchingPhoto} />
        {this.state.fetchPhotoError ?
        <div>There was a problem while fetching your billie.</div>
        :
        <DogPhoto dogPhoto={this.state.dogPhoto} clearLoading={this.clearLoading} />
        }
      </div>
      <div className='row col-sm-12 justify-content-center p-3 mb-2 form-group'>
        <button className='btn btn-primary' onClick={this.fetchRandomDog} {...this.state.fetchingPhoto ? {disabled: true} : null}>
          {this.state.fetchingPhoto ? 
          <span>
            <span className='spinner-border spinner-border-sm' role='status'></span>
            &nbsp;&nbsp;
            <span>Fetching Your Billie!</span>
          </span>
          :
          <span>Retrieve Another</span>}
        </button>
      </div>
      <div className='row col-sm-12 justify-content-center p-3 mb-2'>
        <div className='col-sm-3 form-group'>
          <select className={this.state.invalidAction || this.state.fetchBreedsError ? 'form-control custom-select is-invalid' : 'form-control custom-select'} value={this.state.selectedBreed} onChange={this.handleChange}>
            <option>Or choose a breed...</option>
            {this.state.breeds.map((breed, key) => {
              return <option key={key} value={breed}>{breed}</option>;
            })}
          </select>
          {this.state.invalidAction || this.state.fetchBreedsError ? 
          <span className='text-danger'>{this.state.invalidAction ? 'You must select a breed first.' : 'There was a problem while fetching the breeds.'}</span> 
          : 
          null}
        </div>
        <div className='col-sm-auto form-group'>
          <button className='btn btn-primary' onClick={this.fetchByBreed} {...this.state.fetchingPhoto ? {disabled: true} : null}>
            {this.state.fetchingPhoto ?
            <span>
              <span className='spinner-border spinner-border-sm' role='status'></span>
              &nbsp;&nbsp;
              <span>Fetching Your Billie!</span>
            </span>
            :
            <span>get my breed!</span>}
          </button>
        </div>
      </div>
    </div>);
  }
}

export default BillieDogs;
