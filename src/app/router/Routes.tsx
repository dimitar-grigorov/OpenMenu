import { createBrowserRouter } from 'react-router-dom';
import App from '../layout/App';

export const router = createBrowserRouter([
    {
        path: '/',
        element: <App />,
        children: [
            //{ path: '/menu', element: <MenuDashboard /> },
            //{ path: '/menu/:id', element: <MenuItem /> },
        ]
    }
])