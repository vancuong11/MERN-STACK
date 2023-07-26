import { Input } from 'antd';
import { useState } from 'react';

import './InputForm.scss';

function InputForm(props) {
    const [valueInput, setValueInput] = useState('');
    const { placeholder, ...rests } = props;
    return (
        <div>
            <Input className="input-style" placeholder={placeholder} value={valueInput} {...rests} />
        </div>
    );
}

export default InputForm;
