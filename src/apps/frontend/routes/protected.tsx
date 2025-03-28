import routes from 'frontend/constants/routes';
import { TaskProvider, useAccountContext } from 'frontend/contexts';
import { Dashboard, NotFound, ProfileSettings, Tasks } from 'frontend/pages';
import AppLayout from 'frontend/pages/app-layout/app-layout';
import React, { useEffect } from 'react';
import { Outlet } from 'react-router-dom';

const App = () => {
  const { getAccountDetails } = useAccountContext();

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    getAccountDetails();
  }, [getAccountDetails]);

  return (
    <AppLayout>
      <Outlet />
    </AppLayout>
  );
};

export const protectedRoutes = [
  {
    path: '',
    element: <App />,
    children: [
      { path: routes.DASHBOARD, element: <Dashboard /> },
      {
        path: routes.TASKS,
        element: (
          <TaskProvider>
            <Tasks />
          </TaskProvider>
        ),
      },
      {
        path: routes.PROFILE_SETTINGS,
        element: <ProfileSettings />,
      },
      { path: '*', element: <NotFound /> },
    ],
  },
];
