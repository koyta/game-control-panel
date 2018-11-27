import React, {Component} from 'react';
import {Layout} from 'antd';
import {Route, Switch, withRouter} from 'react-router-dom';
import Panel from './Panel';
import ViewRoom from './ViewRoom';
import API from './API';

import 'antd/dist/antd.css';

const Api = API;

const {Header, Content} = Layout;

class App extends Component {
    componentDidMount() {
      if (this.props.location.pathname === '/') {
        this.props.location.push('/server')
      }
    }

    render() {
        return (
            <Layout>
                <Header>Header</Header>
                <Content>
                    <Switch>
                        <Route path="/server" component={Panel} />
                        <Route path='/view' component={ViewRoom} />
                    </Switch>
                </Content>
            </Layout>
        );
    }
}

export default withRouter(App);
