import React from "react";

interface State {
  dogPhoto: string;
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
    return (<div>
      <div>
        <img alt='dog' src={this.state.dogPhoto} />
      </div>
      <div>We ❤ our pups!</div>
      <button onClick={this.fetchDog}>retrieve another</button>
    </div>);
  }
}

export default BillieDogs;
