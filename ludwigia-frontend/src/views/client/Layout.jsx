import { Fragment } from 'react';
import { Outlet } from 'react-router';

import ClientHeader from './header/Header';

function ClientLayout() {
    return (
        <Fragment>
            <ClientHeader />
            <main>
                <Outlet />
            </main>
        </Fragment>
    )
}

export default ClientLayout;
