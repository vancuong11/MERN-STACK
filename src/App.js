import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { routes } from './routes';
import DefaultComponent from './components/DefautComponent/DefaulComponent';
import { Fragment, useEffect } from 'react';
import axios from 'axios';

function App() {
    useEffect(() => {
        fetchApi();
    }, []);

    const fetchApi = async () => {
        const res = await axios.get(`${process.env.REACT_APP_API_URL}/product/get-all`);
    };

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
