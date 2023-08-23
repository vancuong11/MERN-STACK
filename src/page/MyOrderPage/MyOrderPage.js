import { useSelector } from 'react-redux';
import * as orderService from '../../services/orderService';
import './MyOrderPage.scss';
import { useQuery } from '@tanstack/react-query';
import Loading from '../../components/LoadingComponent/Loading';
import ButtonComponent from '../../components/ButtonComponent/ButtonComponent';
import { convertPrice } from '../../utils';

function MyOrderPage() {
    const user = useSelector((state) => state.user);
    const fetchMyOrder = async () => {
        if (user?.id && user?.access_token) {
            const res = await orderService.getOrderByUserId(user?.id, user?.access_token);
            return res.data;
        }
    };

    const queryOrder = useQuery(
        { queryKey: ['orders'], queryFn: fetchMyOrder },
        {
            enabled: user?.id && user?.access_token,
        },
    );
    const { isLoading, data } = queryOrder;
    console.log('data', data);
    return (
        <Loading isLoading={isLoading}>
            <div className="order-page-container">
                <div style={{ height: '100%', width: '1270px', margin: '0 auto' }}>
                    <h4>Đơn hàng của tôi</h4>
                    <div className="list-order">
                        {data?.orderItems?.map((order) => {
                            return (
                                <div className="item-order" key={order?._id}>
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
                                    <div className="header-item">
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
                                    <div className="footer-item">
                                        <div>
                                            <span style={{ color: 'rgb(255, 66, 78)' }}>Tổng tiền: </span>
                                            <span
                                                style={{ fontSize: '13px', color: 'rgb(56, 56, 61)', fontWeight: 700 }}
                                            >
                                                {convertPrice(data?.totalPrice)}
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
                                                // onClick={() => handleAddCard()}
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
