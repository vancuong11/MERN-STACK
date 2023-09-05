import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { routes } from './routes';
import DefaultComponent from './components/DefautComponent/DefaulComponent';
import { Fragment, useEffect, useState } from 'react';
import axios from 'axios';
import { useQuery } from '@tanstack/react-query';
import { isJsonString } from '../src/utils';
import jwt_decode from 'jwt-decode';
import * as userService from './services/userService';
import { useDispatch, useSelector } from 'react-redux';
import { resetUser, updateUser } from './redux/slices/userSlide';
import Loading from './components/LoadingComponent/Loading';

function App() {
    // useEffect(() => {
    //     fetchApi();
    // }, []);
    const dispatch = useDispatch();
    const user = useSelector((state) => state.user);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        setIsLoading(true);
        let { storageData, decoded } = handleDecode();

        if (decoded?.id) {
            handleGetDetailsUser(decoded?.id, storageData);
        }
        setIsLoading(false);
    }, []);

    const handleDecode = () => {
        let storageData = localStorage.getItem('access_token');
        let decoded = {};
        if (storageData && isJsonString(storageData)) {
            storageData = JSON.parse(storageData);
            decoded = jwt_decode(storageData);
        }
        return { decoded, storageData };
    };

    userService.axiosJWT.interceptors.request.use(
        async (config) => {
            const currentTime = new Date();
            let { decoded } = handleDecode();

            const storageRefreshToken = localStorage.getItem('refresh_token');
            const refresh_token = JSON.parse(storageRefreshToken);
            const decodedRefreshToken = jwt_decode(refresh_token);

            if (decoded?.exp < currentTime.getTime() / 1000) {
                if (decodedRefreshToken?.exp > currentTime.getTime() / 1000) {
                    const data = await userService.refreshToken();
                    config.headers['token'] = `Bearer ${data?.access_token}`;
                } else {
                    dispatch(resetUser());
                }
            }
            return config;
        },
        (error) => {
            return Promise.reject(error);
        },
    );

    const handleGetDetailsUser = async (id, token) => {
        const storageRefreshToken = localStorage.getItem('refresh_token');
        const refresh_token = JSON.parse(storageRefreshToken);
        const res = await userService.getDetailsUser(id, token);
        dispatch(updateUser({ ...res.data, access_token: token, refresh_token: refresh_token }));
        setIsLoading(false);
    };

    const fetchApi = async () => {
        const res = await axios.get(`${process.env.REACT_APP_API_URL}/product/get-all`);
        return res.data;
    };
    const query = useQuery({ queryKey: ['todos'], queryFn: fetchApi });

    return (
        <>
            <Loading isLoading={isLoading}>
                <Router>
                    <Routes>
                        {routes.map((route) => {
                            const Page = route.page;
                            const Layout = route.isShowHeader ? DefaultComponent : Fragment;
                            return (
                                <Route
                                    key={route.path}
                                    path={route.path}
                                    element={
                                        <Layout>
                                            <Page />
                                        </Layout>
                                    }
                                ></Route>
                            );
                        })}
                    </Routes>
                </Router>
            </Loading>
        </>
    );
}

export default App;
