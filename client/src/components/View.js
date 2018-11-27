import React from 'react';
import styled from 'styled-components';
import store from 'store';

const blueColor = '#007cb0';
const imageUrl = '';

class View extends React.Component {
  state = {};

  componentDidMount() {
    const { timers, currentTimerIndex } = this.props;
    console.log({ timers, currentTimerIndex });
    if (currentTimerIndex !== -1) {
      this.start();
    }
  }

  getDataFromStore() {
    return {
      timers: store.get('timers'),
      currentTimerIndex: store.get('currentTimerIndex'),
    };
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    const data = this.getDataFromStore();
    if (data.currentTimerIndex !== -1) {
      this.start();
    }
  }

  start = () => {
    this.interval = setInterval(() => {
      const date = this.calculateCountdown(this.props.date);
      date ? this.setState(date) : this.stop();
    }, 1000);
  };

  stop() {
    clearInterval(this.interval);
  }

  render() {
    const { timers, currentTimerIndex } = this.props;
    if (currentTimerIndex === -1) {
      return <h1>Запустите таймер</h1>;
    }
    return (
      <Container img={imageUrl}>
        <Title>{timers[currentTimerIndex].title}</Title>
        <Time>00:30</Time>
      </Container>
    );
  }
}

const Text = styled.div`
  font-family: 'Montserrat Bold', sans-serif;
  color: ${blueColor};
  text-transform: uppercase;
  font-weight: bold;
  text-align: center;
`;

const Container = styled.div`
  display: block;
  background: ${props => `url(${imageUrl})`};
`;

const Title = styled(Text)`
  font-size: 4em;
`;

const Time = styled(Text)`
  font-size: 7em;
`;

export default View;
