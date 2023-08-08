import { Card, Image } from 'antd';
import { StarFilled } from '@ant-design/icons';
import './CardComponent.scss';
import logo from '../../assets/images/logo.png';

function CardComponent(props) {
    const { item } = props;
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
                <div className="name-product">{item.name}</div>
                <div className="report-text">
                    <span>
                        <span>{item.rating} </span>
                        <StarFilled className="icon-report" />
                    </span>
                    <span>| {item.selled}</span>
                </div>
                <div className="price">
                    {item.price} VND
                    <span className="discount">{item.discount || 5}%</span>
                </div>
            </div>
        </Card>
    );
}

export default CardComponent;
