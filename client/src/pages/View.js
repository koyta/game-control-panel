import React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import Countdown from 'react-countdown-now';
import { currentTimerSet } from '../modules/actions/timers';
import { blueColor } from '../utils/color';

const imageUrl = '';

class View extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      durations: this.props.timers.map(timer => {
        return Number(timer.minutes) * 60 + Number(timer.seconds);
      }),
    };
  }

  renderer = ({ minutes, seconds, completed }) => {
    if (completed) {
      this.props.currentTimerSet(this.props.currentTimerIndex + 1);
      return <span>00:00</span>;
    } else {
      const isTimerEnding = Number(minutes) === 0 && Number(seconds) < 31;
      return (
        <div className={isTimerEnding ? 'danger' : ''}>
          {minutes}:{seconds}
        </div>
      );
    }
  };

  isLastTimer = () => {
    const { currentTimerIndex, timers } = this.props;
    return timers.length === currentTimerIndex + 1;
  };

  render() {
    const { timers, currentTimerIndex, isCountdown } = this.props;
    const { durations } = this.state;

    if (!timers.length) return null;

    if (!isCountdown) {
      return (
        <Container img={imageUrl}>
          <Title>Ожидание начала отсчёта</Title>
          <Time>00:00</Time>
        </Container>
      );
    }

    let title = '';
    if (timers[currentTimerIndex]) {
      title = timers[currentTimerIndex].title;
    }

    return (
      <Container img={imageUrl}>
        <Title>{title}</Title>
        <Time>
          {durations.map((seconds, index) => {
            if (index === currentTimerIndex) {
              return <Countdown key={index} date={Date.now() + seconds * 1000}
                                renderer={this.renderer}>00:00</Countdown>;
            } else return null;
          })}
        </Time>
      </Container>
    );
  }
}

const Text = styled.div`
  display: block;
  font-family: 'Montserrat Bold', sans-serif;
  color: ${blueColor};
  text-transform: uppercase;
  font-weight: bold;
  text-align: center;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: ${props => `url(${imageUrl})`};
  height: 100vh;
`;

const Title = styled(Text)`
  font-size: 4em;
`;

const Time = styled(Text)`
  font-size: 7em;
`;

const mapStateToProps = state => ({
  timers: state.timers.timers,
  currentTimerIndex: state.timers.currentTimerIndex,
  isCountdown: state.timers.isCountdown,
});

const mapDispatchToProps = {
  currentTimerSet,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(View);
