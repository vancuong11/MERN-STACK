import { Checkbox, Form, InputNumber } from 'antd';
import './OrderPage.scss';
import { DeleteOutlined, MinusOutlined, PlusOutlined } from '@ant-design/icons';
import imageProduct from '../../assets/images/prod1.png';
import ButtonComponent from '../../components/ButtonComponent/ButtonComponent';
import ModalComponent from '../../components/ModalComponent/ModalComponent';
import Loading from '../../components/LoadingComponent/Loading';
import InputComponent from '../../components/InputComponent/InputComponent';
import { useDispatch, useSelector } from 'react-redux';
import {
    decreaseAmount,
    increaseAmount,
    removeAllOrderProduct,
    removeOrderProduct,
} from '../../redux/slices/orderSlide';
import { useMemo, useState } from 'react';
import { convertPrice } from '../../utils';

function OrderPage() {
    const order = useSelector((state) => state.order);
    const dispatch = useDispatch();
    const [listChecked, setListChecked] = useState([]);
    const user = useSelector((state) => state.user);

    const handleOnchangeCheckAll = (e) => {
        if (e.target.checked) {
            const newListChecked = [];
            order?.orderItems?.forEach((item) => {
                newListChecked.push(item?.product);
            });
            setListChecked(newListChecked);
        } else {
            setListChecked([]);
        }
    };

    const onChange = (e) => {
        if (listChecked.includes(e.target.value)) {
            const newListChecked = listChecked.filter((item) => item !== e.target.value);
            setListChecked(newListChecked);
        } else {
            setListChecked([...listChecked, e.target.value]);
        }
    };

    const handleDeleteOrder = (idProduct) => {
        dispatch(removeOrderProduct({ idProduct }));
    };

    const handleRemoveAllOrder = () => {
        if (listChecked?.length > 1) {
            dispatch(removeAllOrderProduct({ listChecked }));
        }
    };

    const handleChangeCount = (type, idProduct) => {
        if (type === 'increase') {
            dispatch(increaseAmount({ idProduct }));
        } else {
            dispatch(decreaseAmount({ idProduct }));
        }
    };

    const priceMemo = useMemo(() => {
        const result = order?.orderItems?.reduce((total, currentValue) => {
            return total + currentValue.price * currentValue.amount;
        }, 0);
        return result;
    }, [order]);
    console.log(order.orderItems);
    const priceDiscountMemo = useMemo(() => {
        let total = 0;
        order.orderItems.map((item) => {
            total += Math.ceil(item.discount * item.amount);
        });
        // const result = order?.orderItems?.reduce((total, currentValue) => {
        //     return total + currentValue.discount * currentValue.amount;
        // }, 0);
        // if (Number(result)) {
        //     return result;
        // } else {
        //     return 0;
        // }
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

    return (
        <div className="order-page-container">
            <div className="order-body">
                <h3 className="cart">Giỏ hàng</h3>
                <div className="order-content">
                    <div className="order-left">
                        <div className="header">
                            <span style={{ display: 'inline-block', width: '390px' }}>
                                <Checkbox
                                    className="checkbox"
                                    onChange={handleOnchangeCheckAll}
                                    checked={listChecked?.length === order?.orderItems?.length}
                                ></Checkbox>
                                <span>Tất cả ({order?.orderItems?.length} sản phẩm)</span>
                            </span>
                            <div className="columns">
                                <span>Đơn giá</span>
                                <span>Số lượng</span>
                                <span>Thành tiền</span>
                                <DeleteOutlined onClick={handleRemoveAllOrder} />
                            </div>
                        </div>
                        <div className="list-order">
                            {order?.orderItems?.map((order) => {
                                return (
                                    <>
                                        <div className="item-order">
                                            <div
                                                style={{
                                                    width: '390px',
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    gap: 4,
                                                }}
                                            >
                                                <Checkbox
                                                    onChange={onChange}
                                                    value={order?.product}
                                                    checked={listChecked.includes(order?.product)}
                                                />
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

                                                <div className="count-order">
                                                    <button
                                                        disabled={order?.amount <= 1 ? true : false}
                                                        style={{
                                                            border: 'none',
                                                            background: 'transparent',
                                                            cursor: 'pointer',
                                                        }}
                                                        onClick={() => handleChangeCount('decrease', order.product)}
                                                    >
                                                        <MinusOutlined style={{ color: '#000', fontSize: '10px' }} />
                                                    </button>
                                                    <InputNumber
                                                        size="small"
                                                        min={1}
                                                        defaultValue={order?.amount}
                                                        value={order?.amount}
                                                        // max={order?.countInstock}
                                                    />
                                                    <button
                                                        style={{
                                                            border: 'none',
                                                            background: 'transparent',
                                                            cursor: 'pointer',
                                                        }}
                                                        onClick={() => handleChangeCount('increase', order.product)}
                                                    >
                                                        <PlusOutlined style={{ color: '#000', fontSize: '10px' }} />
                                                    </button>
                                                </div>
                                                <span
                                                    style={{
                                                        color: 'rgb(255, 66, 78)',
                                                        fontSize: '13px',
                                                        fontWeight: 500,
                                                    }}
                                                >
                                                    {convertPrice(order?.price * order?.amount)}
                                                </span>
                                                <DeleteOutlined
                                                    style={{ cursor: 'pointer' }}
                                                    onClick={() => handleDeleteOrder(order?.product)}
                                                />
                                            </div>
                                        </div>
                                    </>
                                );
                            })}
                        </div>
                    </div>
                    <div className="order-right">
                        <div style={{ width: '100%' }}>
                            {/* <div className="address">
                                <div>
                                    <span>Địa chỉ: </span>
                                    <span style={{ fontWeight: 'bold' }}>
                                        {`${user?.address} ${user?.city}`} 
                                    </span>
                                    <span
                                        // onClick={handleChangeAddress}
                                        style={{ color: '#9255FD', cursor: 'pointer' }}
                                    >
                                        Thay đổi
                                    </span>
                                </div>
                            </div> */}

                            <div className="address">
                                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                    <span>Tạm tính</span>
                                    <span style={{ color: '#000', fontSize: '14px', fontWeight: 'bold' }}>
                                        {convertPrice(priceMemo)}
                                    </span>
                                </div>
                                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                    <span>Giảm giá</span>
                                    <span style={{ color: '#000', fontSize: '14px', fontWeight: 'bold' }}>
                                        {convertPrice(priceDiscountMemo)}
                                    </span>
                                </div>
                                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                    <span>Phí giao hàng</span>
                                    <span style={{ color: '#000', fontSize: '14px', fontWeight: 'bold' }}>
                                        {convertPrice(deliveryPriceMemo)}
                                    </span>
                                </div>
                            </div>

                            <div className="total">
                                <span>Tổng tiền</span>
                                <span style={{ display: 'flex', flexDirection: 'column' }}>
                                    <span style={{ color: 'rgb(254, 56, 52)', fontSize: '24px', fontWeight: 'bold' }}>
                                        {convertPrice(totalPriceMemo)}
                                    </span>
                                    <span style={{ color: '#000', fontSize: '11px' }}>(Đã bao gồm VAT nếu có)</span>
                                </span>
                            </div>
                            <div className="btn-submit">
                                <ButtonComponent
                                    className="btn-submit-product"
                                    textButton={'Mua hàng'}
                                    type="primary"
                                    danger
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <ModalComponent
                title="Cập nhật thông tin giao hàng"
                // open={isOpenModalUpdateInfo}
                // onCancel={handleCancleUpdate}
                // onOk={handleUpdateInforUser}
            >
                <Loading
                // isLoading={isLoading}
                >
                    <Form
                        name="basic"
                        labelCol={{ span: 4 }}
                        wrapperCol={{ span: 20 }}
                        // onFinish={onUpdateUser}
                        autoComplete="on"
                        // form={form}
                    >
                        <Form.Item
                            label="Name"
                            name="name"
                            rules={[{ required: true, message: 'Please input your name!' }]}
                        >
                            <InputComponent
                                // value={stateUserDetails['name']}
                                // onChange={handleOnchangeDetails}
                                name="name"
                            />
                        </Form.Item>
                        <Form.Item
                            label="City"
                            name="city"
                            rules={[{ required: true, message: 'Please input your city!' }]}
                        >
                            <InputComponent
                                // value={stateUserDetails['city']}
                                // onChange={handleOnchangeDetails}
                                name="city"
                            />
                        </Form.Item>
                        <Form.Item
                            label="Phone"
                            name="phone"
                            rules={[{ required: true, message: 'Please input your  phone!' }]}
                        >
                            <InputComponent
                                // value={stateUserDetails.phone}
                                // onChange={handleOnchangeDetails}
                                name="phone"
                            />
                        </Form.Item>

                        <Form.Item
                            label="Adress"
                            name="address"
                            rules={[{ required: true, message: 'Please input your  address!' }]}
                        >
                            <InputComponent
                                // value={stateUserDetails.address}
                                // onChange={handleOnchangeDetails}
                                name="address"
                            />
                        </Form.Item>
                    </Form>
                </Loading>
            </ModalComponent>
        </div>
    );
}

export default OrderPage;
