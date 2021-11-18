import React, { ComponentType, useContext } from 'react';
import Router from "next/router";

import { UserContext } from 'contexts/UserContext';

const ProtectedRoute = (WrappedComponent: ComponentType) => {

    return (props: any) => {

        const user = useContext(UserContext);

        React.useEffect(() => {
            if (user)
                Router.push({ pathname: "/" + Router.locale });
        }, [user])

        return <WrappedComponent {...props} />
    }
};

export default ProtectedRoute;