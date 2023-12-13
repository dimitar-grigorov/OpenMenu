import { createBrowserRouter } from 'react-router-dom';
import App from '../layout/App';
import Lab from '../../features/lab/Lab';
import MenuDashboard from '../../features/menu/dashboard/MenuDashboard';
import MenuItemForm from '../../features/menu/forms/MenuItemForm';

export const router = createBrowserRouter([
    {
        path: '/',
        element: <App />,
        children: [
            { path: '/menu', element: <MenuDashboard /> },
            //{ path: '/menu/:id', element: <MenuItem /> },
            { path: '/manage/:id', element: <MenuItemForm /> },
            { path: '/createMenuItem', element: <MenuItemForm key='create' /> },
            { path: '/lab', element: <Lab /> },
        ]
    }
])