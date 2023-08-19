import { Col, Pagination, Row } from 'antd';

import './TypeProductPage.scss';
import CardComponent from '../../components/CardComponent/CardComponent';
import NavBarComponent from '../../components/NavbarComponent/NavBarComponent';
import { useLocation } from 'react-router-dom';
import * as productService from '../../services/productService';
import { useEffect, useState } from 'react';
import Loading from '../../components/LoadingComponent/Loading';
import { useSelector } from 'react-redux';
import { useDebounce } from '../../hooks/useDebounce';

function TypeProductPage() {
    const { state } = useLocation();
    const [typeProduct, setTypeProduct] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [paginate, setPaginate] = useState({
        page: 0,
        limit: 10,
        total: 1,
    });

    const searchProduct = useSelector((state) => state.product.search);
    const searchDebounce = useDebounce(searchProduct, 500);

    const fetchProductType = async (type, page, limit) => {
        setIsLoading(true);
        const res = await productService.getProductType(type, page, limit);
        if (res.data && res.status === 'OK') {
            setIsLoading(false);
            setTypeProduct(res.data);
            setPaginate({ ...paginate, total: res.totalPage });
        } else {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        if (state) {
            fetchProductType(state, paginate.page, paginate.limit);
        }
    }, [state, paginate.page, paginate.limit]);

    const onChange = (current, pageSize) => {
        setPaginate({ ...paginate, page: current - 1, limit: pageSize });
    };
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
                            {typeProduct
                                .filter((pro) => {
                                    if (searchDebounce === '') {
                                        return pro;
                                    } else if (pro?.name?.toLowerCase()?.includes(searchDebounce.toLowerCase())) {
                                        return pro;
                                    }
                                })
                                ?.map((product, index) => {
                                    return (
                                        <div key={index}>
                                            <CardComponent item={product} />
                                        </div>
                                    );
                                })}
                        </div>
                        <div className="pagination">
                            <Pagination defaultCurrent={paginate.page + 1} total={paginate.total} onChange={onChange} />
                        </div>
                    </Col>
                </Row>
            </Loading>
        </div>
    );
}

export default TypeProductPage;
