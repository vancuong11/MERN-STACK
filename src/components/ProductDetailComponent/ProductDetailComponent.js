import { Col, Image, InputNumber, Row } from 'antd';

import './ProductDetailComponent.scss';
import imageProduct from '../../assets/images/prod1.png';
import imageProductSmall from '../../assets/images/prod1.png';
import { MinusOutlined, PlusOutlined, StarFilled } from '@ant-design/icons';
import ButtonComponent from '../ButtonComponent/ButtonComponent';

function ProductDetailComponent() {
    return (
        <div className="container-product-detail-component">
            <Row>
                <Col span={10}>
                    <div className="image-product-detail">
                        <Image src={imageProduct} alt="Image product" preview={false} />
                    </div>
                    <div className="image-product-detail-small">
                        <Row className="row-image">
                            <Col span={4} className="col-image">
                                <Image
                                    className="img-small"
                                    src={imageProductSmall}
                                    alt="Image product"
                                    preview={false}
                                />
                            </Col>
                            <Col span={4} className="col-image">
                                <Image
                                    className="img-small"
                                    src={imageProductSmall}
                                    alt="Image product"
                                    preview={false}
                                />
                            </Col>
                            <Col span={4} className="col-image">
                                <Image
                                    className="img-small"
                                    src={imageProductSmall}
                                    alt="Image product"
                                    preview={false}
                                />
                            </Col>
                            <Col span={4} className="col-image">
                                <Image
                                    className="img-small"
                                    src={imageProductSmall}
                                    alt="Image product"
                                    preview={false}
                                />
                            </Col>
                            <Col span={4} className="col-image">
                                <Image
                                    className="img-small"
                                    src={imageProductSmall}
                                    alt="Image product"
                                    preview={false}
                                />
                            </Col>
                            <Col span={4} className="col-image">
                                <Image
                                    className="img-small"
                                    src={imageProductSmall}
                                    alt="Image product"
                                    preview={false}
                                />
                            </Col>
                        </Row>
                    </div>
                </Col>
                <Col span={14}>
                    <div className="description-product-detail">
                        <h1 className="title">Điện thoại Samsung Galaxy A54 5G (8GB/256gb) - Hàng chính hãng</h1>
                        <div className="star-report">
                            <StarFilled className="icon-report" />
                            <StarFilled className="icon-report" />
                            <StarFilled className="icon-report" />
                            <StarFilled className="icon-report" />
                            <span>| Đã bán 29</span>
                        </div>
                        <div className="price">
                            <div className="price-text">10.290.000 </div>

                            <div className="address">
                                Giao đến <span>Q. 1, P. Bến Nghé, Hồ Chí Minh</span> -
                                <span className="change-address"> Đổi địa chỉ</span>
                            </div>
                        </div>
                        <div className="quality">
                            <p>Số lượng</p>
                            <div>
                                <ButtonComponent icon={<MinusOutlined />} size="small" />
                                <InputNumber min={1} max={10} defaultValue={1} size="small" />
                                <ButtonComponent icon={<PlusOutlined />} size="small" />
                            </div>
                        </div>

                        <div className="group-button">
                            <ButtonComponent
                                className="btn-submit-product"
                                type="primary"
                                danger
                                textButton="Chọn mua"
                            />

                            <ButtonComponent
                                type="primary"
                                className="btn-pay-later-product"
                                textButton="Mua trả sau"
                            />
                        </div>
                    </div>
                </Col>
            </Row>
        </div>
    );
}

export default ProductDetailComponent;
