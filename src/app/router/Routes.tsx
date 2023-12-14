import { createBrowserRouter } from 'react-router-dom';
import App from '../layout/App';
import Lab from '../../features/lab/Lab';
import MenuDashboard from '../../features/menu/dashboard/MenuDashboard';
import MenuItemForm from '../../features/menu/forms/MenuItemForm';
import CategoriesList from '../../features/categories/CategoriesList';
import CategoryForm from '../../features/categories/CategoryForm';

export const router = createBrowserRouter([
    {
        path: '/',
        element: <App />,
        children: [
            { path: '/menu', element: <MenuDashboard /> },
            // { path: '/menu/:id', element: <MenuItem /> },
            { path: '/manage/:id', element: <MenuItemForm /> },
            { path: '/createMenuItem', element: <MenuItemForm key='create' /> },
            {
                path: '/categories', element: <CategoriesList />, children: [
                    // Nested route for creating a new category
                    { path: 'new', element: <CategoryForm key='create' /> },
                    // Nested route for editing an existing category
                    { path: ':id', element: <CategoryForm key='edit' /> },
                ]
            },
            { path: '/lab', element: <Lab /> },
        ]
    }
]);
