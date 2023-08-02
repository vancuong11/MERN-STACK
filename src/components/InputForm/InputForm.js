import { Input } from 'antd';
import { useState } from 'react';

import './InputForm.scss';

function InputForm(props) {
    const { placeholder, ...rests } = props;
    const handleOnChangeInput = (e) => {
        props.onChange(e.target.value);
    };
    return (
        <div>
            <Input
                className="input-style"
                placeholder={placeholder}
                value={props.value}
                {...rests}
                onChange={(e) => handleOnChangeInput(e)}
            />
        </div>
    );
}

export default InputForm;
