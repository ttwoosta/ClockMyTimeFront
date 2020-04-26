import * as React from 'react';
import { Container } from 'reactstrap';
import NavMenu from './NavMenu';
import { connect } from 'react-redux';

function Layout(props: {children?: React.ReactNode, isLoggedIn: boolean}) {
    const isLoggedIn = props.isLoggedIn;
    if (isLoggedIn) {
        return (<React.Fragment>
            <NavMenu/>
            <Container>
                {props.children}
            </Container>
        </React.Fragment>);
    }
    else {
        return (<React.Fragment>
            <Container>
                {props.children}
            </Container>
        </React.Fragment>);
    }
  }

  export default connect()(Layout);