import React from 'react';
import styled from 'styled-components';

import Form from './Form';
import TimersTable from './TimersTable';

import AppBar from '@material-ui/core/AppBar/AppBar';
import Paper from '@material-ui/core/Paper/Paper';
import { Link } from 'react-router-dom';
import Divider from '@material-ui/core/Divider/Divider';
import Button from '@material-ui/core/Button/Button';

class Panel extends React.Component {
  render() {
    const { timers, ...rest } = this.props;

    const canStart = rest.isOn === false || timers.length ===
      rest.currentTimerIndex + 1;
    const canStop = rest.isOn === true;

    console.log({ canStart, canStop });

    return (
      <div className="panel_container">
        <AppBar className="appbar" position="static" color="default">
          <Form {...this.props} />
        </AppBar>

        <Paper className="controls_wrapper">
          <header className="controls__header">
            <ControlsItemWrapper>
              <Link to="/view">
                <Button size="small">Открыть экран</Button>
              </Link>
            </ControlsItemWrapper>
            <ControlsItemWrapper>
              <Button
                onClick={this.props.runTimer}
                variant="contained"
                size="small"
                color="primary"
                disabled={!canStart}
              >
                Start
              </Button>
            </ControlsItemWrapper>
            <ControlsItemWrapper>
              <Button
                onClick={this.props.stopTimer}
                variant="contained"
                size="small"
                color="secondary"
                disabled={!canStop}
              >
                Stop
              </Button>
            </ControlsItemWrapper>
          </header>
          <Divider style={{ marginTop: 20, marginBottom: 20 }}/>
          <TimersTable timers={timers} {...rest} />
        </Paper>
      </div>
    );
  }
}

const ControlsItemWrapper = styled.div`
  margin-right: 1em;
  &:last-child {
    margin-right: 0;
  }
`;

export default Panel;
