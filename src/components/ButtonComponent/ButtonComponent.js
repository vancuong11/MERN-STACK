import { Button } from 'antd';

function ButtonComponent({ size, textbutton, icon, ...rests }) {
    return (
        <Button size={size} icon={icon} {...rests}>
            {textbutton}
        </Button>
    );
}

export default ButtonComponent;
