import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import store from 'store';
import update from 'immutability-helper';
// Components
import Panel from './components/Panel';
import View from './components/View';

class App extends Component {
  state = {
    timers: [],
    currentTimerIndex: -1,
    editTimerIndex: null,
    isOn: false,
    timeout: null,
  };

  runTimer = () => {
    const { timers, currentTimerIndex: index } = this.state;

    if (timers.length === 0 || !timers[index]) return null;

    const duration = timers[index].minutes * 60 + timers[index].seconds * 1000;

    const timeout = setTimeout(() => {
      if (timers[index]) {
        this.runTimer();
      }
    }, duration);

    this.setState({
      timeout: timeout,
      currentTimerIndex: index + 1,
      isOn: true,
    });
  };

  stopTimer = () => {
    clearTimeout(this.state.timeout);
    this.setState({ timeout: null, isOn: false, currentTimerIndex: 0 });
  };

  updateLocalTimersStore = data => {
    store.set('timers', this.state.timers);
  };

  resetLocalTimersStore = () => {
    store.remove('timers');
  };

  editTimer = index => {
    this.setState({ editTimerIndex: index });
  };

  handleAddTimer = timer => {
    if (!timer) return;

    const timers = update(this.state.timers, { $push: [timer] });

    this.setState({ timers }, () => {
      store.set('timers', timers);
    });
  };

  updateTimer = (newTimer, oldIndex) => {
    if (!newTimer || oldIndex < 0 || oldIndex >=
      this.state.timers.length) return;
    const updatedTimersState = this.state.timers;
    updatedTimersState[oldIndex] = newTimer;
    this.setState({ timers: updatedTimersState, editTimerIndex: null });
  };

  removeTimer = index => {
    const { timers } = this.state;
    const updatedTimersState = update(timers, { $splice: [[index, 1]] });
    this.setState({ timers: updatedTimersState },
      () => this.updateLocalTimersStore());
  };

  handleResetAllTimers = () => {
    if (this.state.timers.length === 0) return;
    this.setState({ timers: [] });
  };

  handleSelectTimer = index => {
    if (index < 0 || index >= this.state.timers.length) return;
    this.setState({ currentTimerIndex: index });
  };

  render() {
    const functions = {
      runTimer: this.runTimer,
      stopTimer: this.stopTimer,
      editTimer: this.editTimer,
      updateTimer: this.updateTimer,
      removeTimer: this.removeTimer,

      handleAddTimer: this.handleAddTimer,
      handleSelectTimer: this.handleSelectTimer,
      handleResetAllTimers: this.handleResetAllTimers,
    };

    return (
      <Switch>
        <Route exact path="/" render={props =>
          <Panel {...props} {...this.state} {...functions} />}/>
        <Route path="/view"
               render={props => <View {...props} {...this.state} />}/>
      </Switch>
    );
  }
}

export default App;
