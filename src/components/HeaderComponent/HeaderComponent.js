import React, { useEffect, useState } from 'react';
import { Col, Popover, Row } from 'antd';
import { UserOutlined, CaretDownOutlined, ShoppingCartOutlined } from '@ant-design/icons';
import * as userService from '../../services/userService';

import './HeaderComponent.scss';
import ButtonInputSearch from '../ButtonInputSearch/ButtonInputSearch';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { resetUser } from '../../redux/slices/userSlide';
import Loading from '../LoadingComponent/Loading';
import { searchProduct } from '../../redux/slices/productSlide';

function HeaderComponent({ isHiddenSearch = false, isHiddenCart = false }) {
    const user = useSelector((state) => state.user);
    const [loading, setLoading] = useState(false);
    const [avatar, setAvatar] = useState();
    const [userName, setUserName] = useState('');
    const navigate = useNavigate();
    const [search, setSearch] = useState('');
    const order = useSelector((state) => state.order);

    const dispatch = useDispatch();

    const handleNavigateLogin = () => {
        navigate('/sign-in');
    };

    const handleNavigateProfile = () => {
        navigate('/profile-user');
    };

    const handleNavigateAdmin = () => {
        navigate('/system/admin');
    };

    const handleLogout = async () => {
        setLoading(true);
        await userService.logoutUser();
        localStorage.removeItem('access_token');
        dispatch(resetUser());
        setLoading(false);
    };

    useEffect(() => {
        setLoading(true);
        setUserName(user.name);
        setAvatar(user.avatar);
        setLoading(false);
    }, [user.name, user.avatar]);

    const content = (
        <div className="content-infor-user">
            <p onClick={handleNavigateProfile}>Thông tin tài khoản</p>
            {user.isAdmin && <p onClick={handleNavigateAdmin}>Quản lí hệ thống</p>}
            <p onClick={() => navigate('/my-order')}>Đơn hàng của tôi</p>
            <p onClick={handleLogout}>Đăng xuất</p>
        </div>
    );

    const handleHome = () => {
        navigate('/');
    };

    const onSearch = (e) => {
        setSearch(e.target.value);
        dispatch(searchProduct(e.target.value));
    };
    return (
        <div>
            <Row
                className="wrapper"
                style={{ justifyContent: isHiddenSearch && isHiddenCart ? 'space-between' : 'unset' }}
            >
                <Col span={5}>
                    <div className="logo" onClick={handleHome}>
                        VanCuong77
                    </div>
                </Col>
                {!isHiddenSearch && (
                    <Col span={13}>
                        <ButtonInputSearch
                            placeholder="Tìm kiếm"
                            size="lagre"
                            textbutton="Tìm kiếm"
                            onChange={onSearch}
                        />
                    </Col>
                )}

                <Col span={6}>
                    <div className="profile">
                        <div className="icon-account">
                            {avatar ? (
                                <img
                                    src={avatar}
                                    style={{
                                        width: '30px',
                                        height: '30px',
                                        borderRadius: '50%',
                                    }}
                                />
                            ) : (
                                <UserOutlined />
                            )}
                        </div>
                        <Loading isLoading={loading}>
                            {user.access_token ? (
                                <>
                                    <Popover placement="bottom" content={content} trigger="click">
                                        <span className="infor-user">
                                            {userName.length > 0 ? userName : user.email}
                                        </span>
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

                        {!isHiddenCart && (
                            <div className="cart" onClick={() => navigate('/order')}>
                                <div className="icon-shopping-cart">
                                    <ShoppingCartOutlined />
                                    <span className="cart-count">{order.orderItems.length}</span>
                                </div>
                                <div>Giỏ hàng</div>
                            </div>
                        )}
                    </div>
                </Col>
            </Row>
        </div>
    );
}

export default HeaderComponent;
