import { createBrowserRouter } from 'react-router-dom';
import App from '../layout/App';
import Lab from '../../features/lab/Lab';
import MenuDashboard from '../../features/menu/dashboard/MenuDashboard';
import MenuItemForm from '../../features/menu/forms/MenuItemForm';
import CategoriesList from '../../features/categories/CategoriesList';
import AccountPage from '../../features/auth/AccountPage';
import MainMenu from '../../features/menu/dashboard/MainMenu';

export const router = createBrowserRouter([
    {
        path: '/',
        element: <App />,
        children: [
            { path: '/menu', element: <MenuDashboard /> },
            // { path: '/menu/:id', element: <MenuItem /> },
            { path: '/manage/:id', element: <MenuItemForm /> },
            { path: '/createMenuItem', element: <MenuItemForm key='create' /> },
            { path: '/categories', element: <CategoriesList /> },
            { path: '/account', element: <AccountPage /> },
            { path: '/lab', element: <Lab /> },
            { path: '/main-menu', element: <MainMenu /> }
        ]
    }
]);
