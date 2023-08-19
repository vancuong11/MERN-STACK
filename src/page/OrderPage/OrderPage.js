import { Checkbox, Form, InputNumber } from 'antd';
import './OrderPage.scss';
import { DeleteOutlined, MinusOutlined, PlusOutlined } from '@ant-design/icons';
import imageProduct from '../../assets/images/prod1.png';
import ButtonComponent from '../../components/ButtonComponent/ButtonComponent';
import ModalComponent from '../../components/ModalComponent/ModalComponent';
import Loading from '../../components/LoadingComponent/Loading';
import InputComponent from '../../components/InputComponent/InputComponent';

function OrderPage() {
    return (
        <div className="order-page-container">
            <div className="order-body">
                <h3 className="cart">Giỏ hàng</h3>
                <div className="order-content">
                    <div className="order-left">
                        {/* <h4>Phí giao hàng</h4>
                        <div className="delivery">
                            <StepComponent
                                items={itemsDelivery}
                                current={
                                    diliveryPriceMemo === 10000
                                        ? 2
                                        : diliveryPriceMemo === 20000
                                        ? 1
                                        : order.orderItemsSlected.length === 0
                                        ? 0
                                        : 3
                                }
                            />
                        </div> */}
                        <div className="header">
                            <span style={{ display: 'inline-block', width: '390px' }}>
                                <Checkbox
                                // className="checkbox"
                                // onChange={handleOnchangeCheckAll}
                                // checked={listChecked?.length === order?.orderItems?.length}
                                ></Checkbox>
                                <span>
                                    {' '}
                                    Tất cả ({/* {order?.orderItems?.length}  */}
                                    sản phẩm)
                                </span>
                            </span>
                            <div className="columns">
                                <span>Đơn giá</span>
                                <span>Số lượng</span>
                                <span>Thành tiền</span>
                                <DeleteOutlined
                                // onClick={handleRemoveAllOrder}
                                />
                            </div>
                        </div>
                        <div className="list-order">
                            <div className="item-order">
                                <div style={{ width: '390px', display: 'flex', alignItems: 'center', gap: 4 }}>
                                    <Checkbox
                                    // onChange={onChange} value={order?.product} checked={listChecked.includes(order?.product)}
                                    />
                                    <img
                                        src={imageProduct}
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
                                        Name sản phẩm
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
                                        <span style={{ fontSize: '13px', color: '#242424' }}>Giá</span>
                                    </span>

                                    <div className="count-order">
                                        <button
                                            style={{ border: 'none', background: 'transparent', cursor: 'pointer' }}
                                            // onClick={() =>
                                            //     handleChangeCount('decrease', order?.product, order?.amount === 1)
                                            // }
                                        >
                                            <MinusOutlined style={{ color: '#000', fontSize: '10px' }} />
                                        </button>
                                        <InputNumber
                                            size="small"
                                            defaultValue={1}
                                            min={1}
                                            // defaultValue={order?.amount} value={order?.amount}  max={order?.countInstock}
                                        />
                                        <button
                                            style={{ border: 'none', background: 'transparent', cursor: 'pointer' }}
                                            // onClick={() =>
                                            //     handleChangeCount(
                                            //         'increase',
                                            //         order?.product,
                                            //         order?.amount === order.countInstock,
                                            //         order?.amount === 1,
                                            //     )
                                            // }
                                        >
                                            <PlusOutlined style={{ color: '#000', fontSize: '10px' }} />
                                        </button>
                                    </div>
                                    <span style={{ color: 'rgb(255, 66, 78)', fontSize: '13px', fontWeight: 500 }}>
                                        500000
                                        {/* {convertPrice(order?.price * order?.amount)} */}
                                    </span>
                                    <DeleteOutlined
                                        style={{ cursor: 'pointer' }}
                                        // onClick={() => handleDeleteOrder(order?.product)}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="order-right">
                        <div style={{ width: '100%' }}>
                            <div className="address">
                                <div>
                                    <span>Địa chỉ: </span>
                                    <span style={{ fontWeight: 'bold' }}>
                                        {/* {`${user?.address} ${user?.city}`}  */}
                                    </span>
                                    <span
                                        // onClick={handleChangeAddress}
                                        style={{ color: '#9255FD', cursor: 'pointer' }}
                                    >
                                        Thay đổi
                                    </span>
                                </div>
                            </div>

                            <div className="address">
                                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                    <span>Tạm tính</span>
                                    <span style={{ color: '#000', fontSize: '14px', fontWeight: 'bold' }}>
                                        1000
                                        {/* {convertPrice(priceMemo)} */}
                                    </span>
                                </div>
                                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                    <span>Giảm giá</span>
                                    <span style={{ color: '#000', fontSize: '14px', fontWeight: 'bold' }}>
                                        {/* {convertPrice(priceDiscountMemo)} */} 100
                                    </span>
                                </div>
                                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                    <span>Phí giao hàng</span>
                                    <span style={{ color: '#000', fontSize: '14px', fontWeight: 'bold' }}>
                                        {/* {convertPrice(diliveryPriceMemo)} */}100
                                    </span>
                                </div>
                            </div>

                            <div className="total">
                                <span>Tổng tiền</span>
                                <span style={{ display: 'flex', flexDirection: 'column' }}>
                                    <span style={{ color: 'rgb(254, 56, 52)', fontSize: '24px', fontWeight: 'bold' }}>
                                        {/* {convertPrice(totalPriceMemo)} */}100
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
