import React, { lazy, Suspense } from 'react';

import Spinner from '../../components/spinner/spinner.component';
import PrivateRoute from '../../components/private-route/private-route.container';

import { DashboardOverlay } from './dashboard.styles';

const Dashboard = lazy(() =>
  import('../../components/dashboard/dashboard.component')
);

const DashboardPage = ({ match }) => {
  return (
    <DashboardOverlay>
      <Suspense fallback={<Spinner />}>
        <PrivateRoute path={match.path} exact component={Dashboard} />
      </Suspense>
    </DashboardOverlay>
  );
};

export default DashboardPage;
