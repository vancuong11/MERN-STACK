import React, { useState } from 'react';
import { Col, Popover, Row } from 'antd';
import { UserOutlined, CaretDownOutlined, ShoppingCartOutlined } from '@ant-design/icons';
import * as userService from '../../services/userService';

import './HeaderComponent.scss';
import ButtonInputSearch from '../ButtonInputSearch/ButtonInputSearch';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { resetUser } from '../../redux/slices/userSlide';
import Loading from '../LoadingComponent/Loading';

function HeaderComponent() {
    const user = useSelector((state) => state.user);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const dispatch = useDispatch();

    const handleNavigateLogin = () => {
        navigate('/sign-in');
    };

    const handleLogout = async () => {
        setLoading(true);
        await userService.logoutUser();
        localStorage.removeItem('access_token');
        dispatch(resetUser());
        setLoading(false);
    };

    const content = (
        <div className="content-infor-user">
            <p onClick={handleLogout}>Đăng xuất</p>
            <p>Thông tin tài khoản</p>
        </div>
    );

    return (
        <div>
            <Row className="wrapper">
                <Col span={5}>
                    <div className="logo">VanCuong77</div>
                </Col>
                <Col span={13}>
                    <ButtonInputSearch placeholder="Tìm kiếm" size="lagre" textButton="Tìm kiếm" />
                </Col>
                <Col span={6}>
                    <div className="profile">
                        <div className="icon-account">
                            <UserOutlined />
                        </div>
                        <Loading isLoading={loading}>
                            {user.name ? (
                                <>
                                    <Popover placement="bottom" title="title" content={content} trigger="click">
                                        <span className="infor-user">{user.name}</span>
                                    </Popover>
                                </>
                            ) : (
                                <div className="account">
                                    <span onClick={() => handleNavigateLogin()}>Đăng nhập/ Đăng ký</span>
                                    <div>
                                        <span>Tài khoản</span>
                                        <CaretDownOutlined />
                                    </div>
                                </div>
                            )}
                        </Loading>

                        <div className="cart">
                            <div className="icon-shopping-cart">
                                <ShoppingCartOutlined />
                                <span className="cart-count">0</span>
                            </div>
                            <div>Giỏ hàng</div>
                        </div>
                    </div>
                </Col>
            </Row>
        </div>
    );
}

export default HeaderComponent;
