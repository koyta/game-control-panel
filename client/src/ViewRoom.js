import React, {Component} from 'react';
import Time from 'date-fns';

class ViewRoom extends Component {
    render() {
        return (
            <div>
                <h1>{this.props.title}</h1>
            </div>
        );
    }
}

export default ViewRoom;
