import { Col, Image, InputNumber, Rate, Row } from 'antd';

import './ProductDetailComponent.scss';
import imageProduct from '../../assets/images/prod1.png';
import imageProductSmall from '../../assets/images/prod1.png';
import { MinusOutlined, PlusOutlined, StarFilled } from '@ant-design/icons';
import ButtonComponent from '../ButtonComponent/ButtonComponent';
import * as productService from '../../services/productService';
import { useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import Loading from '../LoadingComponent/Loading';
import { useSelector } from 'react-redux';

function ProductDetailComponent(props) {
    const item = props.id;
    const user = useSelector((state) => state.user);
    console.log(user);
    const [numProduct, setNumProduct] = useState(1);

    const onChange = (value) => {
        setNumProduct(Number(value));
    };

    const handleChangeCount = (type) => {
        if (type === 'increase') {
            setNumProduct(numProduct + 1);
        } else {
            setNumProduct(numProduct - 1);
        }
    };

    const fetchDetailsProduct = async (context) => {
        const id = context?.queryKey && context.queryKey[1];
        if (!id) {
            return undefined;
        }
        const res = await productService.getDetailsProduct(id);
        return res?.data;
    };
    const { isLoading, data: productDetails } = useQuery(['product-details', item.id], fetchDetailsProduct, {
        enabled: !!item.id,
    });

    return (
        <Loading isLoading={isLoading}>
            <div className="container-product-detail-component">
                <Row>
                    <Col span={10}>
                        <div className="image-product-detail">
                            <Image src={productDetails?.image} alt="Image product" preview={false} />
                        </div>
                        <div className="image-product-detail-small">
                            <Row className="row-image">
                                <Col span={4} className="col-image">
                                    <Image
                                        className="img-small"
                                        src={productDetails?.image}
                                        alt="Image product"
                                        preview={false}
                                    />
                                </Col>
                                <Col span={4} className="col-image">
                                    <Image
                                        className="img-small"
                                        src={productDetails?.image}
                                        alt="Image product"
                                        preview={false}
                                    />
                                </Col>
                                <Col span={4} className="col-image">
                                    <Image
                                        className="img-small"
                                        src={productDetails?.image}
                                        alt="Image product"
                                        preview={false}
                                    />
                                </Col>
                                <Col span={4} className="col-image">
                                    <Image
                                        className="img-small"
                                        src={productDetails?.image}
                                        alt="Image product"
                                        preview={false}
                                    />
                                </Col>
                                <Col span={4} className="col-image">
                                    <Image
                                        className="img-small"
                                        src={productDetails?.image}
                                        alt="Image product"
                                        preview={false}
                                    />
                                </Col>
                                <Col span={4} className="col-image">
                                    <Image
                                        className="img-small"
                                        src={productDetails?.image}
                                        alt="Image product"
                                        preview={false}
                                    />
                                </Col>
                            </Row>
                        </div>
                    </Col>
                    <Col span={14}>
                        <div className="description-product-detail">
                            <h1 className="title">{productDetails?.name}</h1>
                            <div className="star-report">
                                <Rate
                                    className="icon-report"
                                    allowHalf
                                    value={productDetails?.rating}
                                    defaultValue={productDetails?.rating}
                                />

                                <span className="sell">| Đã bán 29</span>
                            </div>
                            <div className="price">
                                <div className="price-text">{productDetails?.price.toLocaleString()}</div>

                                <div className="address">
                                    Giao đến <span>{user.address} </span> -
                                    <span className="change-address"> Đổi địa chỉ</span>
                                </div>
                            </div>
                            <div className="quality">
                                <p>Số lượng</p>
                                <div>
                                    <ButtonComponent
                                        icon={<MinusOutlined />}
                                        size="small"
                                        onClick={() => handleChangeCount('decrease')}
                                    />
                                    <InputNumber
                                        onChange={onChange}
                                        min={1}
                                        defaultValue={1}
                                        value={numProduct}
                                        size="small"
                                        max={10}
                                    />
                                    <ButtonComponent
                                        icon={<PlusOutlined />}
                                        size="small"
                                        onClick={() => handleChangeCount('increase')}
                                    />
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
        </Loading>
    );
}

export default ProductDetailComponent;
