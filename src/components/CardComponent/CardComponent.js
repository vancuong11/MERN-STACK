import { Card, Image } from 'antd';
import { StarFilled } from '@ant-design/icons';
import './CardComponent.scss';
import logo from '../../assets/images/logo.png';

function CardComponent() {
    return (
        <Card
            className="card-style"
            hoverable
            style={{
                width: 200,
            }}
            bodyStyle={{ padding: '10px' }}
            cover={<img alt="example" src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png" />}
        >
            <img src={logo} className="card-logo" />
            <div className="content">
                <div className="name-product">Iphone</div>
                <div className="report-text">
                    <span>
                        <span> 4.96</span>
                        <StarFilled className="icon-report" />
                    </span>
                    <span>| Đã bán 1000+</span>
                </div>
                <div className="price">
                    1.000.000
                    <span className="discount">-6%</span>
                </div>
            </div>
        </Card>
    );
}

export default CardComponent;
