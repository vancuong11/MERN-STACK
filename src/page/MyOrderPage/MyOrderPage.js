import { useSelector } from 'react-redux';
import * as orderService from '../../services/orderService';
import './MyOrderPage.scss';
import { useQuery } from '@tanstack/react-query';
import Loading from '../../components/LoadingComponent/Loading';
import ButtonComponent from '../../components/ButtonComponent/ButtonComponent';
import { convertPrice } from '../../utils';
import { useLocation, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

function MyOrderPage() {
    const location = useLocation();
    const { state } = location;
    const navigate = useNavigate();
    const fetchMyOrder = async () => {
        if (state?.id && state?.access_token) {
            const res = await orderService.getOrderByUserId(state?.id, state?.access_token);
            return res.data;
        }
    };

    const queryOrder = useQuery(
        { queryKey: ['orders'], queryFn: fetchMyOrder },
        {
            enabled: state?.id && state?.access_token,
        },
    );
    const { isLoading, data } = queryOrder;

    const handleDetailsOrder = (id) => {
        navigate(`/details-order/${id}`, {
            state: {
                access_token: state?.access_token,
            },
        });
    };

    const renderProduct = (data) => {
        return data.map((order, index) => {
            return (
                <div className="header-item" key={index}>
                    <img
                        src={order?.image}
                        style={{
                            width: '70px',
                            height: '70px',
                            objectFit: 'cover',
                            border: '1px solid rgb(238, 238, 238)',
                            padding: '2px',
                        }}
                    />
                    <div
                        style={{
                            width: 260,
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            whiteSpace: 'nowrap',
                            marginLeft: '10px',
                        }}
                    >
                        {order?.name}
                    </div>
                    <span style={{ fontSize: '13px', color: '#242424', marginLeft: 'auto' }}>
                        {convertPrice(order?.price)}
                    </span>
                </div>
            );
        });
    };
    return (
        <Loading isLoading={isLoading}>
            <div className="order-page-container">
                <div style={{ height: '100%', width: '1270px', margin: '0 auto' }}>
                    <h4>Đơn hàng của tôi</h4>
                    <div className="list-my-order">
                        {data?.map((order) => {
                            return (
                                <div className="item-my-order" key={order?._id}>
                                    <div className="status">
                                        <span style={{ fontSize: '14px', fontWeight: 'bold' }}>Trạng thái</span>
                                        <div>
                                            <span style={{ color: 'rgb(255, 66, 78)' }}>Giao hàng: </span>
                                            {`${order.isDelivered ? 'Đã giao hàng' : 'Chưa giao hàng'}`}
                                        </div>
                                        <div>
                                            <span style={{ color: 'rgb(255, 66, 78)' }}>Thanh toán:</span>
                                            {`${order.isPaid ? 'Đã thanh toán' : 'Chưa thanh toán'}`}
                                        </div>
                                    </div>
                                    {renderProduct(order.orderItems)}
                                    <div className="footer-item">
                                        <div>
                                            <span style={{ color: 'rgb(255, 66, 78)' }}>Tổng tiền: </span>
                                            <span
                                                style={{ fontSize: '13px', color: 'rgb(56, 56, 61)', fontWeight: 700 }}
                                            >
                                                {convertPrice(order?.totalPrice)}
                                            </span>
                                        </div>
                                        <div style={{ display: 'flex', gap: '10px' }}>
                                            <ButtonComponent
                                                // onClick={() => handleAddCard()}
                                                size={40}
                                                type="primary"
                                                danger
                                                textbutton={'Hủy đơn hàng'}
                                            ></ButtonComponent>
                                            <ButtonComponent
                                                onClick={() => handleDetailsOrder(order._id)}
                                                type="primary"
                                                size={40}
                                                textbutton={'Xem chi tiết'}
                                            ></ButtonComponent>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </Loading>
    );
}

export default MyOrderPage;
