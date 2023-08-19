import { Col, Pagination, Row } from 'antd';

import './TypeProductPage.scss';
import CardComponent from '../../components/CardComponent/CardComponent';
import NavBarComponent from '../../components/NavbarComponent/NavBarComponent';
import { useLocation } from 'react-router-dom';
import * as productService from '../../services/productService';
import { useEffect, useState } from 'react';
import Loading from '../../components/LoadingComponent/Loading';

function TypeProductPage() {
    const { state } = useLocation();
    const [typeProduct, setTypeProduct] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    const fetchProductType = async (type) => {
        setIsLoading(true);
        const res = await productService.getProductType(type);
        if (res.data && res.status === 'OK') {
            setIsLoading(false);
            setTypeProduct(res.data);
        } else {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        if (state) {
            fetchProductType(state);
        }
    }, [state]);
    console.log(isLoading);
    return (
        <div className="container-type-product">
            <Loading isLoading={isLoading}>
                <Row>
                    <Col span={6}>
                        <div className="left">
                            <NavBarComponent />
                        </div>
                    </Col>
                    <Col span={18}>
                        <div className="right">
                            {typeProduct.length > 0 &&
                                typeProduct.map((product, index) => {
                                    return (
                                        <div key={index}>
                                            <CardComponent item={product} />
                                        </div>
                                    );
                                })}
                        </div>
                        <div className="pagination">
                            <Pagination defaultCurrent={1} total={50} />
                        </div>
                    </Col>
                </Row>
            </Loading>
        </div>
    );
}

export default TypeProductPage;
