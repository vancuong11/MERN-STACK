import { Breadcrumb } from 'antd';

import './ProductDetail.scss';
import ProductDetailComponent from '../../components/ProductDetailComponent/ProductDetailComponent';

function ProductDetail() {
    return (
        <div className="container-product-detail">
            <div className="bread-crumb">
                <Breadcrumb
                    items={[
                        {
                            title: 'Trang chủ',
                        },
                        {
                            title: 'An Application',
                        },
                    ]}
                />
            </div>
            <div className="content-product-detail">
                <ProductDetailComponent />
            </div>
        </div>
    );
}

export default ProductDetail;
