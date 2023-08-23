import { useLocation } from 'react-router-dom';
import './OrderSuccess.scss';

import { useDispatch, useSelector } from 'react-redux';
import { orderConstants } from '../../constants';
import { convertPrice } from '../../utils';

function OrderSuccess() {
    const order = useSelector((state) => state.order);
    const location = useLocation();
    const { state } = location;

    return (
        <div className="payment-container">
            {/* <Loading> */}
            <div className="content">
                <h3>Đơn hàng đã đặt thành công</h3>
                <div style={{ display: 'flex', justifyContent: 'center' }}>
                    <div className="left">
                        <div className="info">
                            <div>
                                <div className="label">Phương thức giao hàng</div>

                                <div className="value">
                                    <span style={{ color: '#ea8500', fontWeight: 'bold' }}>
                                        {orderConstants.delivery[state.delivery]}{' '}
                                    </span>
                                    Giao hàng tiết kiệm
                                </div>
                            </div>
                        </div>
                        <div className="info">
                            <div>
                                <div className="label">Phương thức thanh toán</div>

                                <div className="value">{orderConstants.payment[state.payment]}</div>
                            </div>
                        </div>
                        <div className="itemOrderInfo">
                            <div className="header">
                                <div className="columns">
                                    <span>Sản phẩm</span>
                                    <span>Giá tiền</span>
                                    <span>Số lượng</span>
                                </div>
                            </div>
                            {state.orders.map((order, index) => {
                                return (
                                    <div className="item-order" key={index}>
                                        <div
                                            style={{
                                                width: '390px',
                                                display: 'flex',
                                                alignItems: 'center',
                                                gap: 4,
                                            }}
                                        >
                                            <img
                                                src={order.image}
                                                alt="image"
                                                style={{ width: '77px', height: '79px', objectFit: 'cover' }}
                                            />
                                            <div
                                                style={{
                                                    width: 260,
                                                    overflow: 'hidden',
                                                    textOverflow: 'ellipsis',
                                                    whiteSpace: 'nowrap',
                                                }}
                                            >
                                                {order.name}
                                            </div>
                                        </div>
                                        <div
                                            style={{
                                                flex: 1,
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'space-between',
                                            }}
                                        >
                                            <span>
                                                <span style={{ fontSize: '13px', color: '#242424' }}>
                                                    {convertPrice(order.price)}
                                                </span>
                                            </span>

                                            <span>
                                                <span style={{ fontSize: '13px', color: '#242424' }}>
                                                    {order.amount}
                                                </span>
                                            </span>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>

                        <div>
                            <span
                                style={{
                                    color: 'rgb(255, 66, 78)',
                                    fontSize: '16px',
                                    fontWeight: 500,
                                }}
                            >
                                Tổng tiền: {convertPrice(state.totalPriceMemo)}
                            </span>
                        </div>
                    </div>
                </div>
            </div>
            {/* </Loading> */}
        </div>
    );
}

export default OrderSuccess;
