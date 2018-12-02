import React, { Component } from 'react';
import { Route, Switch, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
// Utils
import Api from './utils/API';
// Components
import Panel from './pages/Panel';
import View from './pages/View';
// Actions
import { fetchTimers, setTimers, timerStart } from './modules/actions/timers';
import RWebSocket from 'reconnecting-websocket';
// Styles
import './index.sass';

export const API = new Api();

const ws = new RWebSocket('ws://localhost:5001', null, {
  debug: false,
});

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      socket: ws,
      isSocketConnected: false,
      currentDuration: null,
      duration: 0,
    };

    ws.onopen = () => this.setState({ isSocketConnected: true });

    ws.onmessage = message => {
      const parsedMessage = JSON.parse(message.data);
      console.log(parsedMessage);

      const { type, value } = parsedMessage;

      switch (type) {
        case 'data': {
          console.log('Re-fetching timers data');
          this.props.setTimers(JSON.parse(value));
          break;
        }
        case 'start': {
          if (!this.props.isCountdown) this.props.timerStart();
          break;
        }
        default: {
          console.error('Undefined type of message: ', type);
        }
      }
    };

    ws.onclose = () => this.setState({ isSocketConnected: false });
  }

  componentDidMount() {
    this.props.fetchTimersRequest();
  }

  componentWillUnmount() {
    this.socket.ws.close();
  }

  render() {
    if (!this.state.isSocketConnected) return <span>Подключение...</span>;
    if (this.state.socket.readyState !==
      WebSocket.OPEN) return <span>Подключение...</span>;
    return (
      <Switch>
        <Route exact path="/" component={Panel}/>
        <Route path="/view" component={View}/>
      </Switch>
    );
  }
}

const mapStateToProps = state => ({
  timers: state.timers.timers,
  isCountdown: state.timers.isCountdown,
});

const mapDispatchToProps = {
  fetchTimersRequest: fetchTimers,
  setTimers,
  timerStart,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(App);
