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
        <div className="view" style={{ backgroudImage: `url(${imageUrl})` }}>
          <div className="view__title">Ожидание начала отсчёта</div>
          <div className="view__timer">00:00</div>
        </div>
      );
    }

    let title = '';
    if (timers[currentTimerIndex]) {
      title = timers[currentTimerIndex].title;
    }

    return (
      <div className="view" style={{ backgroudImage: `url(${imageUrl})` }}>
        <div className="view__title">{title}</div>
        <div className="view__timer">
          {durations.map((seconds, index) => {
            if (index === currentTimerIndex) {
              return (
                <Countdown key={index} date={Date.now() + seconds * 1000}
                           renderer={this.renderer}>
                  00:00
                </Countdown>
              );
            } else return null;
          })}
        </div>
      </div>
    );
  }
}

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
