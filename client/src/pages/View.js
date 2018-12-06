import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import Countdown from 'react-countdown-now';
import classNames from 'classnames';
import { currentTimerSet } from '../modules/actions/timers';
import BackgroundImage from '../assets/images/background.jpg';
import PreviewImage from '../assets/images/preview.jpg';

const countdownImage = BackgroundImage;
const previewImage = PreviewImage;

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
      if (!this.isLastTimer()) this.props.currentTimerSet(
        this.props.currentTimerIndex + 1);
      return (
        <div className="view__timer" style={{ color: 'red' }}>
          00:00
        </div>
      );
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

    let title = '';
    if (timers[currentTimerIndex]) {
      title = timers[currentTimerIndex].title;
    }

    return (
      <div className={classNames('view', { ['view_active']: isCountdown })}>
        <div className="view__preview"/>
        <div className="view__text-container">
          {isCountdown && (
            <Fragment>
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
                  }
                })}
              </div>
            </Fragment>
          )}
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
