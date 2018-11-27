import React from 'react';
import dateFormat from 'date-fns/format';

function TimerView (props) {
  return <div>{dateFormat(props.time, 'MM:SS')}</div>;
}

export default TimerView;
