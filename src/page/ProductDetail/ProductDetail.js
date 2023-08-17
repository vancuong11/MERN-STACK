import { Breadcrumb } from 'antd';

import './ProductDetail.scss';
import ProductDetailComponent from '../../components/ProductDetailComponent/ProductDetailComponent';
import { useParams } from 'react-router-dom';
import * as productService from '../../services/productService';
import { useEffect, useState } from 'react';

function ProductDetail() {
    const param = useParams();
    return (
        <div className="container-product-detail">
            <div className="bread-crumb">
                <Breadcrumb
                    items={[
                        {
                            title: 'Trang chủ',
                        },
                        {
                            title: 'Sản phẩm',
                        },
                    ]}
                />
            </div>
            <div className="content-product-detail">
                <ProductDetailComponent id={param} />
            </div>
        </div>
    );
}

export default ProductDetail;
