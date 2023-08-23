import AdminPage from '../page/AdminPage/AdminPage';
import HomePage from '../page/HomePage/HomePage';
import NotFoundPage from '../page/NotFoundPage/NotFoundPage';
import OrderPage from '../page/OrderPage/OrderPage';
import OrderSuccess from '../page/OrderSuccess/OrderSuccess';
import PaymentPage from '../page/PaymentPage/PaymentPage';
import ProductDetail from '../page/ProductDetail/ProductDetail';
import ProductsPage from '../page/ProductsPage/ProductsPage';
import Profile from '../page/Profile/ProfilePage';
import SignInPage from '../page/SignInPage/SignInPage';
import SignUpPage from '../page/SignUpPage/SignUpPage';
import TypeProductPage from '../page/TypeProductPage/TypeProductPage';

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
        path: '/payment',
        page: PaymentPage,
        isShowHeader: true,
    },
    {
        path: '/order-success',
        page: OrderSuccess,
        isShowHeader: true,
    },
    {
        path: '/products',
        page: ProductsPage,
        isShowHeader: true,
    },
    {
        path: '/product/:type',
        page: TypeProductPage,
        isShowHeader: true,
    },
    {
        path: '/sign-in',
        page: SignInPage,
        isShowHeader: false,
    },
    {
        path: '/sign-up',
        page: SignUpPage,
        isShowHeader: false,
    },
    {
        path: '/product-detail/:id',
        page: ProductDetail,
        isShowHeader: true,
    },

    {
        path: '/profile-user',
        page: Profile,
        isShowHeader: true,
    },
    // admin
    {
        path: '/system/admin',
        page: AdminPage,
        isShowHeader: false,
        isPrivate: true,
    },
    {
        path: '*',
        page: NotFoundPage,
    },
];
