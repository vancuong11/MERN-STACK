import { useLocation, useParams } from 'react-router-dom';
import * as orderService from '../../services/orderService';
import './DetailsOrderPage.scss';
import { useQuery } from '@tanstack/react-query';
import { useMemo } from 'react';
import { convertPrice } from '../../utils';
import Loading from '../../components/LoadingComponent/Loading';
import { orderConstants } from '../../constants';

function DetailsOrderPage() {
    const params = useParams();
    const location = useLocation();
    const { state } = location;
    const { id } = params;

    const fetchDetailsOrder = async () => {
        const res = await orderService.getDetailsOrder(id, state?.access_token);

        return res.data;
    };

    const queryOrder = useQuery(
        { queryKey: ['orders-details'], queryFn: fetchDetailsOrder },
        {
            enabled: id,
        },
    );
    const { isLoading, data } = queryOrder;

    const priceMemo = useMemo(() => {
        const result = data?.orderItems?.reduce((total, cur) => {
            return total + cur.price * cur.amount;
        }, 0);
        return result;
    }, [data]);
    console.log(data);
    return (
        <Loading isLoading={isLoading}>
            <div className="details-order-container">
                <div style={{ width: '1270px', margin: '0 auto' }}>
                    <h4>Chi tiết đơn hàng</h4>
                    <div className="details-order-header-user">
                        <div className="info-user">
                            <div className="label-name">Địa chỉ người nhận</div>
                            <div className="content-info">
                                <div className="name-info">{data?.shippingAddress?.fullName}</div>
                                <div className="address-info">
                                    <span>Địa chỉ: </span>{' '}
                                    {`${data?.shippingAddress?.address} ${data?.shippingAddress?.city}`}
                                </div>
                                <div className="phone-info">
                                    <span>Điện thoại: </span> {data?.shippingAddress?.phone}
                                </div>
                            </div>
                        </div>
                        <div className="info-user">
                            <div className="label-name">Hình thức giao hàng</div>
                            <div className="content-info">
                                <div className="delivery-info">
                                    <span className="name-delivery">FAST </span>Giao hàng tiết kiệm
                                </div>
                                <div className="delivery-fee">
                                    <span>Phí giao hàng: </span> {convertPrice(data?.shippingPrice)}
                                </div>
                            </div>
                        </div>
                        <div className="info-user">
                            <div className="label-name">Hình thức thanh toán</div>
                            <div className="content-info">
                                <div className="payment-info">{orderConstants.payment[data?.paymentMethods]}</div>
                                <div className="status-payment">
                                    {data?.isPaid ? 'Đã thanh toán' : 'Chưa thanh toán'}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="content-details">
                        <div
                            style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}
                        >
                            <div style={{ width: '670px' }}>Sản phẩm</div>
                            <div className="item-label">Giá</div>
                            <div className="item-label">Số lượng</div>
                            <div className="item-label">Giảm giá</div>
                        </div>
                        {data?.orderItems?.map((order) => {
                            return (
                                <div className="product-details">
                                    <div className="product-name-details">
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
                                            {order.name}
                                        </div>
                                    </div>
                                    <div className="item">{convertPrice(order?.price)}</div>
                                    <div className="item">{order?.amount}</div>
                                    <div className="item">
                                        {order?.discount ? convertPrice(order?.discount) : '0 VND'}
                                    </div>
                                </div>
                            );
                        })}

                        <div className="all-price">
                            <div className="item-label">Tạm tính</div>
                            <div className="item">{convertPrice(priceMemo)}</div>
                        </div>
                        <div className="all-price">
                            <div className="item-label">Phí vận chuyển</div>
                            <div className="item">{convertPrice(data?.shippingPrice)}</div>
                        </div>
                        <div className="all-price">
                            <div className="item-label">Tổng cộng</div>
                            <div className="item">
                                <div className="item">{convertPrice(data?.totalPrice)}</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Loading>
    );
}

export default DetailsOrderPage;
