import { createBrowserRouter } from 'react-router-dom';
import App from '../layout/App';
import Lab from '../../features/lab/Lab';
import MenuDashboard from '../../features/menu/MenuDashboard';

export const router = createBrowserRouter([
    {
        path: '/',
        element: <App />,
        children: [
            { path: '/menu', element: <MenuDashboard /> },
            //{ path: '/menu/:id', element: <MenuItem /> },
            { path: '/lab', element: <Lab /> },
        ]
    }
])