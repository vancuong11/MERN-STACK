import { Button } from 'antd';

function ButtonComponent({ size, textButton, icon, ...rests }) {
    return (
        <Button size={size} icon={icon} {...rests}>
            {textButton}
        </Button>
    );
}

export default ButtonComponent;
