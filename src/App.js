import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { routes } from './routes';
import DefaultComponent from './components/DefautComponent/DefaulComponent';
import { Fragment, useEffect } from 'react';
import axios from 'axios';
import { useQuery } from '@tanstack/react-query';
import { isJsonString } from '../src/utils';
import jwt_decode from 'jwt-decode';
import * as userService from './services/userService';
import { useDispatch } from 'react-redux';
import { updateUser } from './redux/slices/userSlide';

function App() {
    // useEffect(() => {
    //     fetchApi();
    // }, []);
    const dispatch = useDispatch();

    useEffect(() => {
        let { storageData, decoded } = handleDecode();

        if (decoded?.id) {
            handleGetDetailsUser(decoded?.id, storageData);
        }
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
            if (decoded?.exp < currentTime.getTime() / 1000) {
                const data = await userService.refreshToken();
                config.headers['token'] = `Bearer ${data?.access_token}`;
            }
            return config;
        },
        (error) => {
            return Promise.reject(error);
        },
    );

    const handleGetDetailsUser = async (id, token) => {
        const res = await userService.getDetailsUser(id, token);
        dispatch(updateUser({ ...res.data, access_token: token }));
    };

    const fetchApi = async () => {
        const res = await axios.get(`${process.env.REACT_APP_API_URL}/product/get-all`);
        return res.data;
    };
    const query = useQuery({ queryKey: ['todos'], queryFn: fetchApi });

    return (
        <>
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
        </>
    );
}

export default App;
