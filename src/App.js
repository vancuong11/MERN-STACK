import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { routes } from './routes';
import DefaultComponent from './components/DefautComponent/DefaulComponent';
import { Fragment } from 'react';

function App() {
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
