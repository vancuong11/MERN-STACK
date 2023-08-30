import { Form, Radio } from 'antd';
import InputComponent from '../../components/InputComponent/InputComponent';
import ModalComponent from '../../components/ModalComponent/ModalComponent';
import './PaymentPage.scss';
import Loading from '../../components/LoadingComponent/Loading';
import ButtonComponent from '../../components/ButtonComponent/ButtonComponent';
import { convertPrice } from '../../utils';
import * as userService from '../../services/userService';
import * as orderService from '../../services/orderService';
import { useMutationHooks } from '../../hooks/useMutationHook';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useMemo, useState } from 'react';
import * as message from '../../components/Message/Message';
import { updateUser } from '../../redux/slices/userSlide';
import { useNavigate } from 'react-router-dom';
import { removeAllOrderProduct } from '../../redux/slices/orderSlide';
import { PayPalButton } from 'react-paypal-button-v2';
import * as paymentService from '../../services/paymentService';

function PaymentPage() {
    const order = useSelector((state) => state.order);
    const user = useSelector((state) => state.user);
    const navigate = useNavigate();
    const [delivery, setDelivery] = useState('fast');
    const [payment, setPayment] = useState('later_money');
    const [sdkReady, setSdkReady] = useState(false);

    const [isOpenModalUpdateInfo, setIsOpenModalUpdateInfo] = useState(false);
    const [stateUserDetails, setStateUserDetails] = useState({
        name: '',
        phone: '',
        address: '',
        city: '',
    });
    const [form] = Form.useForm();

    const dispatch = useDispatch();

    useEffect(() => {
        form.setFieldsValue(stateUserDetails);
    }, [form, stateUserDetails]);

    useEffect(() => {
        if (isOpenModalUpdateInfo) {
            setStateUserDetails({
                city: user?.city,
                name: user?.name,
                address: user?.address,
                phone: user?.phone,
            });
        }
    }, [isOpenModalUpdateInfo]);

    const handleChangeAddress = () => {
        setIsOpenModalUpdateInfo(true);
    };

    const priceMemo = useMemo(() => {
        const result = order?.orderItemsSelected?.reduce((total, currentValue) => {
            return total + currentValue.price * currentValue.amount;
        }, 0);
        return result;
    }, [order]);

    const priceDiscountMemo = useMemo(() => {
        let total = 0;
        order.orderItemsSelected.map((item) => {
            total += Math.ceil(item.discount * item.amount);
        });
        return total;
    }, [order]);

    const deliveryPriceMemo = useMemo(() => {
        if (priceMemo > 200000) {
            return 10000;
        } else if (priceMemo === 0) {
            return 0;
        } else {
            return 20000;
        }
    }, [priceMemo]);

    const totalPriceMemo = useMemo(() => {
        return Math.round(Number(priceMemo) - Number(priceDiscountMemo) + Number(deliveryPriceMemo));
    }, [priceMemo, priceDiscountMemo, deliveryPriceMemo]);

    const mutationAddOrder = useMutationHooks((data) => {
        const { token, ...rests } = data;
        const res = orderService.createOrder({ ...rests }, token);
        return res;
    });
    const { data: dataAdd, isLoading: isLoadingAddOrder, isSuccess, isError } = mutationAddOrder;

    const handleAddOrder = () => {
        if (
            user?.access_token &&
            order?.orderItemsSelected &&
            user?.name &&
            user?.address &&
            user?.phone &&
            user?.city &&
            priceMemo &&
            user?.id
        ) {
            // eslint-disable-next-line no-unused-expressions
            mutationAddOrder.mutate({
                token: user?.access_token,
                orderItems: order?.orderItemsSelected,
                fullName: user?.name,
                address: user?.address,
                phone: user?.phone,
                city: user?.city,
                paymentMethods: payment,
                itemsPrice: priceMemo,
                shippingPrice: deliveryPriceMemo,
                totalPrice: totalPriceMemo,
                user: user?.id,
            });
        }
    };

    useEffect(() => {
        if (isSuccess && dataAdd?.status === 'OK') {
            const arrOrder = [];
            order.orderItemsSelected.forEach((item) => {
                arrOrder.push(item.product);
            });
            dispatch(removeAllOrderProduct({ listChecked: arrOrder }));
            message.success('Đặt hàng thành công');
            navigate('/order-success', {
                state: {
                    delivery,
                    payment,
                    totalPriceMemo,
                    orders: order.orderItemsSelected,
                },
            });
        } else if (isError) {
            message.error();
        }
    }, [isSuccess, isError]);

    const mutationUpdate = useMutationHooks((data) => {
        const { id, token, ...rests } = data;
        const res = userService.updateUser(id, { ...rests }, token);
        return res;
    });

    const { isLoading, data } = mutationUpdate;

    const handleCancelUpdate = () => {
        setStateUserDetails({
            name: '',
            email: '',
            phone: '',
            isAdmin: false,
        });
        form.resetFields();
        setIsOpenModalUpdateInfo(false);
    };
    const handleUpdateInforUser = () => {
        const { name, address, city, phone } = stateUserDetails;
        if (name && address && city && phone) {
            mutationUpdate.mutate(
                { id: user?.id, token: user?.access_token, ...stateUserDetails },
                {
                    onSuccess: () => {
                        dispatch(updateUser({ name, address, city, phone }));
                        setIsOpenModalUpdateInfo(false);
                    },
                },
            );
        }
    };

    const handleOnchangeDetails = (e) => {
        setStateUserDetails({
            ...stateUserDetails,
            [e.target.name]: e.target.value,
        });
    };
    const handleDelivery = (e) => {
        setDelivery(e.target.value);
    };

    const handlePayment = (e) => {
        setPayment(e.target.value);
    };

    // paypal
    const addPaypalScript = async () => {
        const { data } = await paymentService.getConfig();
        const script = document.createElement('script');
        script.type = 'text/javascript';
        script.src = `https://www.paypal.com/sdk/js?client-id=${data}`;
        script.async = true;
        script.onload = () => {
            setSdkReady(true);
        };
        document.body.appendChild(script);
    };

    useEffect(() => {
        if (!window.paypal) {
            addPaypalScript();
        } else {
            setSdkReady(true);
        }
    }, []);

    const onSuccessPaypal = (details, data) => {
        mutationAddOrder.mutate({
            token: user?.access_token,
            orderItems: order?.orderItemsSelected,
            fullName: user?.name,
            address: user?.address,
            phone: user?.phone,
            city: user?.city,
            paymentMethods: payment,
            itemsPrice: priceMemo,
            shippingPrice: deliveryPriceMemo,
            totalPrice: totalPriceMemo,
            user: user?.id,
            isPaid: true,
            paidAt: details.update_time,
        });
    };

    return (
        <div className="payment-container">
            <Loading isLoading={isLoadingAddOrder}>
                <div className="content">
                    <h3>Thanh toán</h3>
                    <div style={{ display: 'flex', justifyContent: 'center' }}>
                        <div className="left">
                            <div className="info">
                                <div>
                                    <div className="label">Chọn phương thức giao hàng</div>
                                    <Radio.Group className="radio-payment" onChange={handleDelivery} value={delivery}>
                                        <Radio value="fast">
                                            <span style={{ color: '#ea8500', fontWeight: 'bold' }}>FAST</span> Giao hàng
                                            tiết kiệm
                                        </Radio>
                                        <Radio value="gojek">
                                            <span style={{ color: '#ea8500', fontWeight: 'bold' }}>GO_JEK</span> Giao
                                            hàng tiết kiệm
                                        </Radio>
                                    </Radio.Group>
                                </div>
                            </div>
                            <div className="info">
                                <div>
                                    <div className="label">Chọn phương thức thanh toán</div>
                                    <Radio.Group className="radio-payment" onChange={handlePayment} value={payment}>
                                        <Radio value="later_money"> Thanh toán tiền mặt khi nhận hàng</Radio>
                                        <Radio value="paypal"> Thanh toán bằng Paypal</Radio>
                                    </Radio.Group>
                                </div>
                            </div>
                        </div>
                        <div className="right">
                            <div style={{ width: '100%' }}>
                                <div className="info">
                                    <div>
                                        <span>Địa chỉ: </span>
                                        <span style={{ fontWeight: 'bold' }}>{`${user?.address} ${user?.city}`} </span>
                                        <span
                                            onClick={handleChangeAddress}
                                            style={{
                                                color: '#9255FD',
                                                cursor: 'pointer',
                                                fontWeight: 'bold',
                                                marginLeft: '10px',
                                            }}
                                        >
                                            Thay đổi
                                        </span>
                                    </div>
                                </div>
                                <div className="info">
                                    <div
                                        style={{
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'space-between',
                                        }}
                                    >
                                        <span>Tạm tính</span>
                                        <span style={{ color: '#000', fontSize: '14px', fontWeight: 'bold' }}>
                                            {convertPrice(priceMemo)}
                                        </span>
                                    </div>
                                    <div
                                        style={{
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'space-between',
                                        }}
                                    >
                                        <span>Giảm giá</span>
                                        <span style={{ color: '#000', fontSize: '14px', fontWeight: 'bold' }}>
                                            {convertPrice(priceDiscountMemo)}
                                        </span>
                                    </div>
                                    <div
                                        style={{
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'space-between',
                                        }}
                                    >
                                        <span>Phí giao hàng</span>
                                        <span style={{ color: '#000', fontSize: '14px', fontWeight: 'bold' }}>
                                            {convertPrice(deliveryPriceMemo)}
                                        </span>
                                    </div>
                                </div>
                                <div className="total">
                                    <span>Tổng tiền</span>
                                    <span style={{ display: 'flex', flexDirection: 'column' }}>
                                        <span
                                            style={{ color: 'rgb(254, 56, 52)', fontSize: '24px', fontWeight: 'bold' }}
                                        >
                                            {convertPrice(totalPriceMemo)}
                                        </span>
                                        <span style={{ color: '#000', fontSize: '11px' }}>(Đã bao gồm VAT nếu có)</span>
                                    </span>
                                </div>
                                {payment === 'paypal' && sdkReady ? (
                                    <div className="btn-submit">
                                        <PayPalButton
                                            amount={Math.round(totalPriceMemo / 30000)}
                                            // shippingPreference="NO_SHIPPING" // default is "GET_FROM_FILE"
                                            onSuccess={onSuccessPaypal}
                                            onError={() => {
                                                alert('Error');
                                            }}
                                        />
                                    </div>
                                ) : (
                                    <div className="btn-submit">
                                        <ButtonComponent
                                            onClick={() => handleAddOrder()}
                                            className="btn-submit-product"
                                            type="primary"
                                            danger
                                            textbutton={'Đặt hàng'}
                                        ></ButtonComponent>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
                <ModalComponent
                    forceRender
                    title="Cập nhật thông tin giao hàng"
                    open={isOpenModalUpdateInfo}
                    onCancel={handleCancelUpdate}
                    onOk={handleUpdateInforUser}
                >
                    <Loading isLoading={isLoading}>
                        <Form
                            name="basic"
                            labelCol={{ span: 4 }}
                            wrapperCol={{ span: 20 }}
                            // onFinish={onUpdateUser}
                            autoComplete="on"
                            form={form}
                        >
                            <Form.Item
                                label="Name"
                                name="name"
                                rules={[{ required: true, message: 'Please input your name!' }]}
                            >
                                <InputComponent
                                    value={stateUserDetails['name']}
                                    onChange={handleOnchangeDetails}
                                    name="name"
                                />
                            </Form.Item>
                            <Form.Item
                                label="City"
                                name="city"
                                rules={[{ required: true, message: 'Please input your city!' }]}
                            >
                                <InputComponent
                                    value={stateUserDetails['city']}
                                    onChange={handleOnchangeDetails}
                                    name="city"
                                />
                            </Form.Item>
                            <Form.Item
                                label="Phone"
                                name="phone"
                                rules={[{ required: true, message: 'Please input your  phone!' }]}
                            >
                                <InputComponent
                                    value={stateUserDetails.phone}
                                    onChange={handleOnchangeDetails}
                                    name="phone"
                                />
                            </Form.Item>

                            <Form.Item
                                label="Adress"
                                name="address"
                                rules={[{ required: true, message: 'Please input your  address!' }]}
                            >
                                <InputComponent
                                    value={stateUserDetails.address}
                                    onChange={handleOnchangeDetails}
                                    name="address"
                                />
                            </Form.Item>
                        </Form>
                    </Loading>
                </ModalComponent>
            </Loading>
        </div>
    );
}

export default PaymentPage;
