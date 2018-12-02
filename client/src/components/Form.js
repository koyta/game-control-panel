import React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { Button } from '@material-ui/core';
import TextField from '@material-ui/core/TextField/TextField';
import { addTimer, updateTimer } from '../modules/actions/timers';

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
`;

const ItemContainer = styled.div`
  margin-right: 20px;
`;

class Form extends React.Component {
  constructor(props) {
    super(props);
    this.titleInput = React.createRef();
  }

  state = {
    title: '',
    minutes: '',
    seconds: '',
  };

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.editTimerIndex !== this.props.editTimerIndex) {
      if (this.props.editTimerIndex !== null) {
        this.setState({
          title: this.props.timers[this.props.editTimerIndex].title,
          minutes: this.props.timers[this.props.editTimerIndex].minutes,
          seconds: this.props.timers[this.props.editTimerIndex].seconds,
        });
      }
    }
  }

  handleSubmit = () => {
    const { title, minutes, seconds } = this.state;
    const { editTimerIndex, updateTimer, addTimer, timers } = this.props;

    if (!title || !minutes || !seconds) return null;

    const newTimer = {
      title,
      minutes,
      seconds,
    };

    if (editTimerIndex !== null && editTimerIndex >= 0 && editTimerIndex <
      timers.length) {
      updateTimer({ id: timers[editTimerIndex].id, ...newTimer });
    } else {
      addTimer(newTimer);
    }

    this.resetInputs();
  };

  resetInputs = () => {
    this.setState({
      title: '',
      minutes: '',
      seconds: '',
    });
  };

  handleChange = name => e => {
    const { value } = e.currentTarget;
    this.setState({
      [name]: value,
    });
  };

  render() {
    const { editTimerIndex } = this.props;

    return (
      <Container>
        <div>
          <ItemContainer>
            <TextField
              id="title"
              label="Название таймера"
              value={this.state.title}
              onChange={this.handleChange('title')}
              margin="dense"
              innerRef={this.titleInput}
            />
          </ItemContainer>
          <ItemContainer>
            <TextField
              id="minutes"
              label="Минуты"
              value={this.state.minutes}
              onChange={this.handleChange('minutes')}
              margin="dense"
            />
          </ItemContainer>
          <ItemContainer>
            <TextField
              id="seconds"
              label="Секунды"
              value={this.state.seconds}
              onChange={this.handleChange('seconds')}
              margin="dense"
            />
          </ItemContainer>
        </div>
        <ItemContainer>
          <Button variant="contained" color="primary"
                  onClick={this.handleSubmit}>
            {this.props.editTimerIndex != null ?
              'Изменить таймер' :
              'Добавить таймер'}
          </Button>
        </ItemContainer>
      </Container>
    );
  }
}

const mapStateToProps = state => ({
  timers: state.timers.timers,
  editTimerIndex: state.timers.editTimerIndex,
});

const mapDispatchToProps = {
  updateTimer,
  addTimer,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Form);
