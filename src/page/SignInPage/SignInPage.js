import { Image } from 'antd';

import ButtonComponent from '../../components/ButtonComponent/ButtonComponent';
import InputForm from '../../components/InputForm/InputForm';
import logo from '../../assets/images/logo-dn.png';
import './SignInPage.scss';
import { useState } from 'react';
import { EyeFilled, EyeInvisibleFilled } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';

function SignInPage() {
    const [isShowPassword, setIsShowPassword] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const navigate = useNavigate();
    const handleNavigateSignUp = () => {
        navigate('/sign-up');
    };

    const handleOnChangeEmail = (value) => {
        setEmail(value);
    };

    const handleOnChangePassword = (value) => {
        setPassword(value);
    };

    const handleSignIn = () => {
        console.log(email, password);
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
                        value={email}
                        onChange={handleOnChangeEmail}
                        placeholder="abc@gmail.com"
                        style={{ marginBottom: '15px' }}
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
                        />
                    </div>
                    <div className="group-button">
                        <ButtonComponent
                            disabled={!email.length || !password.length}
                            onClick={handleSignIn}
                            className="btn-submit-product"
                            type="primary"
                            danger
                            textButton="Đăng nhập"
                        />
                    </div>
                    {/* <p className="login-with-email">Đăng nhập bằng email</p> */}
                    <p className="forgot-password">Quên mật khẩu</p>
                    <p>
                        Chưa có tài khoản?{' '}
                        <span className="create-account" onClick={() => handleNavigateSignUp()}>
                            Tạo tài khoản
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

export default SignInPage;
