import React from 'react';
import { observer } from 'mobx-react';
import rootStore from '../stores/RootStore';
import { Redirect } from 'react-router-dom';

const protectedRoute = (Component) => (props) => {
    if (rootStore.sessionStore.isLoggedIn) {
        return Component;
    }
    return <Redirect to="/login" />;
}

export default protectedRoute;