import React, { Component } from 'react';
import './App.css';
import { MyDrawer } from './components/connection';

class App extends Component {

    state = {
        innerHeight: 800
    };

    componentWillMount() {
        this.setHeight();
        window.onresize = this.setHeight;
    }

    componentWillUnmount() {
        window.onresize = null;
    }

    setHeight = () => {
        this.setState({
            innerHeight: window.innerHeight
        })
    }

    render() {
        const { innerHeight } = this.state;
        return (
            <div>
                <MyDrawer height={innerHeight} />
            </div>
        );
    }
}

export default App;
