import React, {Component} from 'react';
import { Button, Input, TimePicker } from 'antd';

class Panel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
    };
  }

  componentDidMount() {

  }

  render() {
    return (
        <div>
          <Button />
          <Input />
          <TimePicker />
        </div>
    );
  }
}

export default Panel;
