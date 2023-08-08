import { Input } from 'antd';

function InputComponent({ placeholder, size, ...rests }) {
    return <Input placeholder={placeholder} size={size} {...rests} />;
}

export default InputComponent;
