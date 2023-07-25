import HomePage from '../page/HomePage/HomePage';
import NotFoundPage from '../page/NotFoundPage/NotFoundPage';
import OrderPage from '../page/OrderPage/OrderPage';
import ProductsPage from '../page/ProductsPage/ProductsPage';

export const routes = [
    {
        path: '/',
        page: HomePage,
        isShowHeader: true,
    },
    {
        path: '/order',
        page: OrderPage,
        isShowHeader: true,
    },
    {
        path: '/products',
        page: ProductsPage,
        isShowHeader: true,
    },
    {
        path: '*',
        page: NotFoundPage,
    },
];
