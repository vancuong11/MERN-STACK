import { Image } from 'antd';
import { useEffect, useState } from 'react';
import { EyeFilled, EyeInvisibleFilled } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';

import * as userService from '../../services/userService';
import { useMutationHooks } from '../../hooks/useMutationHook';
import ButtonComponent from '../../components/ButtonComponent/ButtonComponent';
import InputForm from '../../components/InputForm/InputForm';
import logo from '../../assets/images/logo-dn.png';
import Loading from '../../components/LoadingComponent/Loading';
import './SignUpPage.scss';
import * as message from '../../components/Message/Message';

function SignUpPage() {
    const [isShowPassword, setIsShowPassword] = useState(false);
    const [isShowConfirmPassword, setIsShowConfirmPassword] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const navigate = useNavigate();
    const handleNavigateSignIn = () => {
        navigate('/sign-in');
    };
    const mutation = useMutationHooks((data) => userService.signUpUser(data));
    const { data, isLoading, isError, isSuccess } = mutation;
    useEffect(() => {
        if (isSuccess) {
            message.success();
            navigate('/sign-in');
        } else if (isError) {
            message.error();
        }
    }, [isError, isSuccess]);

    const handleOnChangeEmail = (value) => {
        setEmail(value);
    };

    const handleOnChangePassword = (value) => {
        setPassword(value);
    };
    const handleOnChangeConfirmPassword = (value) => {
        setConfirmPassword(value);
    };

    const handleSignUp = () => {
        mutation.mutate({
            email,
            password,
            confirmPassword,
        });
    };
    return (
        <div className="modal-container">
            <div className="container-sign-in">
                <div className="left">
                    <div className="heading">
                        <h4>Xin chào,</h4>
                        <p>Đăng nhập hoặc Tạo tài khoản</p>
                    </div>
                    <InputForm
                        placeholder="abc@gmail.com"
                        style={{ marginBottom: '15px' }}
                        value={email}
                        onChange={handleOnChangeEmail}
                    />
                    <div className="form-input">
                        <span onClick={() => setIsShowPassword(!isShowPassword)}>
                            {isShowPassword ? <EyeFilled /> : <EyeInvisibleFilled />}
                        </span>
                        <InputForm
                            value={password}
                            onChange={handleOnChangePassword}
                            placeholder="Password"
                            type={isShowPassword ? 'text' : 'password'}
                            style={{ marginBottom: '15px' }}
                        />
                    </div>
                    <div className="form-input">
                        <span onClick={() => setIsShowConfirmPassword(!isShowConfirmPassword)}>
                            {isShowConfirmPassword ? <EyeFilled /> : <EyeInvisibleFilled />}
                        </span>
                        <InputForm
                            value={confirmPassword}
                            onChange={handleOnChangeConfirmPassword}
                            placeholder="Confirm Password"
                            type={isShowConfirmPassword ? 'text' : 'password'}
                        />
                    </div>
                    {data?.status === 'ERROR' && <span style={{ color: 'red' }}>{data?.message}</span>}
                    <Loading isLoading={isLoading}>
                        <div className="group-button">
                            <ButtonComponent
                                disabled={!email.length || !password.length || !confirmPassword.length}
                                onClick={handleSignUp}
                                className="btn-submit-product"
                                type="primary"
                                danger
                                textButton="Đăng Ký"
                            />
                        </div>
                    </Loading>
                    {/* <p className="login-with-email">Đăng nhập bằng email</p> */}
                    <p className="forgot-password">Quên mật khẩu</p>
                    <p>
                        Bạn có tài khoản?{' '}
                        <span className="create-account" onClick={() => handleNavigateSignIn()}>
                            Đăng nhập
                        </span>
                    </p>
                </div>
                <div className="right">
                    <Image className="img-logo" src={logo} alt="Logo Đăng nhập" preview={false} />
                    <div className="content">
                        <h4>Mua sắm tại Tiki</h4>
                        <span>Siêu ưu đãi mỗi ngày</span>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default SignUpPage;
