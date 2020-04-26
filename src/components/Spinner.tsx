
import * as React from 'react';
import { connect } from 'react-redux';
import './loginStyle.css';

function Spinner(props: {additionalClasses?: string}) {
    let spinnerClass = 'lds-facebook ';

    spinnerClass += props.additionalClasses;

    return (<div className={spinnerClass}>
                <div></div>
                <div></div>
                <div></div>
            </div>) 
}

export default connect()(Spinner);