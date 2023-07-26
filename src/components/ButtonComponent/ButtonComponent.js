import { Button } from 'antd';

function ButtonComponent({ size, textButton, icon, ...rest }) {
    return (
        <Button size={size} icon={icon} {...rest}>
            {textButton}
        </Button>
    );
}

export default ButtonComponent;
