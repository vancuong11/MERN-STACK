import { Button } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import InputComponent from '../InputComponent/InputComponent';
import ButtonComponent from '../ButtonComponent/ButtonComponent';
function ButtonInputSearch(props) {
    const { size, placeholder, textButton } = props;
    return (
        <div className="search">
            <InputComponent placeholder={placeholder} size={size} {...props} />
            <ButtonComponent size={size} icon={<SearchOutlined />} textButton={textButton} />
        </div>
    );
}

export default ButtonInputSearch;
