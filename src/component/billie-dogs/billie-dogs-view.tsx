import React from "react";
import { generatorFactory } from "../../utils/generator-factory";

interface State {
  dogPhoto: string;
  breeds: string[];
}

const billieColors = [
  '#8093FF',
  '#FF502C',
  '#FF9472',
  '#FF91FF'
];

class BillieDogs extends React.Component<{}, State> {
  constructor(props: any) {
    super(props)
    this.state = {
      dogPhoto: '',
      breeds: []
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
          dogPhoto: json.message
        });
      })
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
          breeds: breeds
        })
      })
  }

  handleClick = (): void => {
    this.fetchRandomDog();
  }

  componentDidMount = (): void => {
    this.fetchRandomDog();
    this.fetchBreeds();
  }

  render = (): JSX.Element => {
    const generator = (generatorFactory(billieColors))();
    return (<div>
      <div>
        <img alt='dog' src={this.state.dogPhoto} />
      </div>
      <h2>{'We ❤ our pups!'.split('').map((char, key) => {
        const color = generator.next();
        return <span key={key} style={{color: color.value}}>{char}</span>
      })}</h2>
      <button onClick={this.fetchRandomDog}>retrieve another</button>
      <div>
        Or select by breed
        <div>
          <select>
            {this.state.breeds.map((breed, key) => {
              return <option key={key} value={breed}>{breed}</option>;
            })}
          </select>
          <button>search by breed</button>
        </div>
      </div>
    </div>);
  }
}

export default BillieDogs;
