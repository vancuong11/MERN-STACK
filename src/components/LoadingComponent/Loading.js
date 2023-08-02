import { Spin } from 'antd';

function Loading({ children, isLoading, delay = 200 }) {
    return (
        <Spin tip="Loading" spinning={isLoading} delay={delay}>
            {children}
        </Spin>
    );
}

export default Loading;
