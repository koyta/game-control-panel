import React from 'react';
import moment from 'moment';

export default function FormattedTimerValue(props) {
  const { timer } = props;

  const time = moment(0).
    add(timer.minutes, 'minutes').
    add(timer.seconds, 'seconds').
    format('mm:ss');

  return <span>{time}</span>;
}
