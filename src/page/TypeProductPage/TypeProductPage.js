import { Col, Pagination, Row } from 'antd';

import './TypeProductPage.scss';
import CardComponent from '../../components/CardComponent/CardComponent';
import NavBarComponent from '../../components/NavbarComponent/NavBarComponent';

function TypeProductPage() {
    return (
        <div className="container-type-product">
            <Row>
                <Col span={6}>
                    <div className="left">
                        <NavBarComponent />
                    </div>
                </Col>
                <Col span={18}>
                    <div className="right">
                        <CardComponent />
                        <CardComponent />
                        <CardComponent />
                        <CardComponent />
                        <CardComponent />
                    </div>
                    <div className="pagination">
                        <Pagination defaultCurrent={1} total={50} />
                    </div>
                </Col>
            </Row>
        </div>
    );
}

export default TypeProductPage;
