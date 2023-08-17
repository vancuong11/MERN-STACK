import { Card, Image } from 'antd';
import { StarFilled } from '@ant-design/icons';
import './CardComponent.scss';
import logo from '../../assets/images/logo.png';
import { useNavigate } from 'react-router-dom';

function CardComponent(props) {
    const { item } = props;
    const navigate = useNavigate();
    const handleDetailsProduct = () => {
        const id = item._id;
        navigate(`/product-detail/${id}`);
    };
    return (
        <Card
            className="card-style"
            onClick={handleDetailsProduct}
            hoverable
            style={{
                width: 200,
            }}
            bodyStyle={{ padding: '10px' }}
            cover={<img alt="example" src={item.image} />}
        >
            <img src={logo} className="card-logo" />
            <div className="content">
                <div className="name-product">{item.name}</div>
                <div className="report-text">
                    <span>
                        <span>{item.rating} </span>
                        <StarFilled className="icon-report" />
                    </span>
                    <span>| Đã bán {item.selled || 1000}+</span>
                </div>
                <div className="price">
                    {item.price.toLocaleString()} VND
                    <span className="discount"> - {item.discount || 5}%</span>
                </div>
            </div>
        </Card>
    );
}

export default CardComponent;
