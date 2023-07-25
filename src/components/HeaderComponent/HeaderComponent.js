import React from 'react';
import { Col, Row } from 'antd';

import './HeaderComponent.scss';
import Search from 'antd/es/input/Search';
import { UserOutlined, CaretDownOutlined, ShoppingCartOutlined } from '@ant-design/icons';

function HeaderComponent() {
    return (
        <div>
            <Row className="wrapper">
                <Col span={6}>
                    <div className="logo">VanCuong77</div>
                </Col>
                <Col span={12}>
                    <div className="search">
                        <Search placeholder="input search text" enterButton />
                    </div>
                </Col>
                <Col span={6}>
                    <div className="profile">
                        <div className="icon-account">
                            <UserOutlined />
                        </div>
                        <div className="account">
                            <span>Đăng nhập/ Đăng ký</span>
                            <div>
                                <span>Tài khoản</span>
                                <CaretDownOutlined />
                            </div>
                        </div>
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
