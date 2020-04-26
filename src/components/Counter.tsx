import * as React from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router';
import { ApplicationState } from '../store';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

class Counter extends React.PureComponent {
    public render() {
        return (
            <React.Fragment>
                <Calendar />
            </React.Fragment>
        );
    }
};

export default connect()(Counter);