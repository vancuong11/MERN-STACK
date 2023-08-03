import React from 'react';
import { Badge, Col, Row } from 'antd';
import Search from 'antd/es/input/Search';
import { UserOutlined, CaretDownOutlined, ShoppingCartOutlined } from '@ant-design/icons';

import './HeaderComponent.scss';
import ButtonInputSearch from '../ButtonInputSearch/ButtonInputSearch';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

function HeaderComponent() {
    const user = useSelector((state) => state.user);
    const navigate = useNavigate();

    const handleNavigateLogin = () => {
        navigate('/sign-in');
    };

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
                        {user.name ? (
                            <span>{user.name}</span>
                        ) : (
                            <div className="account">
                                <span onClick={() => handleNavigateLogin()}>Đăng nhập/ Đăng ký</span>
                                <div>
                                    <span>Tài khoản</span>
                                    <CaretDownOutlined />
                                </div>
                            </div>
                        )}

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
