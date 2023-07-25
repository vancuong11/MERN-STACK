import { Button, Input } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
function ButtonInputSearch(props) {
    const { size, placeholder, textButton } = props;
    return (
        <div className="search">
            <Input placeholder={placeholder} size={size} />
            <Button size={size} icon={<SearchOutlined />}>
                {textButton}
            </Button>
        </div>
    );
}

export default ButtonInputSearch;
