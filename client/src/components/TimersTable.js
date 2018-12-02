import React, { Component } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
// MaterialUI
import Table from '@material-ui/core/Table/Table';
import TableHead from '@material-ui/core/TableHead/TableHead';
import TableRow from '@material-ui/core/TableRow/TableRow';
import TableCell from '@material-ui/core/TableCell/TableCell';
import TableBody from '@material-ui/core/TableBody/TableBody';
import Button from '@material-ui/core/Button/Button';
import FormattedTimerValue from './FormattedTimerValue';
import { removeTimer, setEditTimer } from '../modules/actions/timers';

// Components

// Styled

const Container = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
`;

const H3 = styled.h3`
  margin-bottom: 20px;
`;

class TimersTable extends Component {
  render() {
    const { timers } = this.props;

    if (!timers || timers.length === 0) return <h3>Необходимо добавить хотя бы
      один таймер</h3>;

    return (
      <Container>
        <H3>Запланированные таймеры</H3>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Название</TableCell>
              <TableCell>Длительность</TableCell>
              <TableCell>Управление</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {timers.map((timer, index) => {
              const key = timer.title + timer.minutes + timer.seconds + index;
              // const isSelected = index === this.props.editTimerIndex;
              const isCurrent = index === this.props.currentTimerIndex;

              return (
                <TableRow key={key} selected={isCurrent}>
                  <TableCell>{timer.title}</TableCell>
                  <TableCell>
                    <FormattedTimerValue timer={timer}/>
                  </TableCell>
                  <TableCell>
                    <Button
                      variant="outlined"
                      size="small"
                      color="primary"
                      onClick={() => this.props.setEditTimer(index)}
                      style={{ marginRight: 10 }}
                    >
                      Изменить таймер
                    </Button>
                    <Button variant="text" color="secondary" size="small"
                            onClick={() => this.props.removeTimer(timer)}>
                      Удалить таймер
                    </Button>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </Container>
    );
  }
}

const mapStateToProps = state => ({
  timers: state.timers.timers,
});

const mapDispatchToProps = {
  setEditTimer,
  removeTimer,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(TimersTable);
