import React from "react";

interface State {
  dogPhoto: string;
}

const billieColors = [
  '#8093FF',
  '#FF502C',
  '#FF9472',
  '#FF91FF'
];

function* billieColorsGenerator(): Iterator<string, string> {
  for (let i = 0; ; i++) {
    yield billieColors[i%4];
  }
}

class BillieDogs extends React.Component<{}, State> {
  constructor(props: any) {
    super(props)
    this.state = {
      dogPhoto: ''
    }
  }

  fetchDog = (): void => {
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
        })
      })
  }

  handleClick = (): void => {
    this.fetchDog();
  }

  componentDidMount = (): void => {
    this.fetchDog();
  }

  render = (): JSX.Element => {
    const generator = billieColorsGenerator();
    return (<div>
      <div>
        <img alt='dog' src={this.state.dogPhoto} />
      </div>
      <h2>{'We ❤ our pups!'.split('').map((char, key) => {
        const color = generator.next();
        return <span key={key} style={{color: color.value}}>{char}</span>
      })}</h2>
      <button onClick={this.fetchDog}>retrieve another</button>
    </div>);
  }
}

export default BillieDogs;
