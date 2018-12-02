import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import Form from '../components/Form';
import TimersTable from '../components/TimersTable';

import AppBar from '@material-ui/core/AppBar/AppBar';
import Paper from '@material-ui/core/Paper/Paper';
import Divider from '@material-ui/core/Divider/Divider';
import Button from '@material-ui/core/Button/Button';
import { currentTimerSet, timerStart } from '../modules/actions/timers';

const ControlsItemWrapper = styled.div`
  margin-right: 1em;
  &:last-child {
    margin-right: 0;
  }
`;

class Panel extends React.Component {
  render() {
    return (
      <div className="panel_container">
        <AppBar className="appbar" position="static" color="default">
          <Form/>
        </AppBar>

        <Paper className="controls_wrapper">
          <div className="controls__header">
            <ControlsItemWrapper>
              <Link to={'/view'}>
                <Button size="small">Открыть экран</Button>
              </Link>
            </ControlsItemWrapper>
            <ControlsItemWrapper>
              <Button variant="contained" size="small" color="primary"
                      disabled={false} onClick={this.props.timerStart}>
                Запустить
              </Button>
            </ControlsItemWrapper>
          </div>
          <Divider style={{ marginTop: 20, marginBottom: 20 }}/>
          <TimersTable timers={this.props.timers}/>
        </Paper>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  timers: state.timers.timers,
  currentTimerIndex: state.timers.currentTimerIndex,
});

const mapDispatchToProps = {
  timerStart,
  currentTimerSet,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Panel);
