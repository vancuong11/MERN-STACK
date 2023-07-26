import { Image } from 'antd';
import ButtonComponent from '../../components/ButtonComponent/ButtonComponent';
import InputForm from '../../components/InputForm/InputForm';
import logo from '../../assets/images/logo-dn.png';
import './SignUpPage.scss';
import { useState } from 'react';
import { EyeFilled, EyeInvisibleFilled } from '@ant-design/icons';

function SignUpPage() {
    const [isShowPassword, setIsShowPassword] = useState(false);
    return (
        <div className="modal-container">
            <div className="container-sign-in">
                <div className="left">
                    <div class="heading">
                        <h4>Xin chào,</h4>
                        <p>Đăng nhập hoặc Tạo tài khoản</p>
                    </div>
                    <InputForm placeholder="abc@gmail.com" style={{ marginBottom: '15px' }} />
                    <div className="form-input">
                        <span>{isShowPassword ? <EyeFilled /> : <EyeInvisibleFilled />}</span>
                        <InputForm
                            placeholder="Password"
                            type={isShowPassword ? 'text' : 'password'}
                            style={{ marginBottom: '15px' }}
                        />
                    </div>
                    <div className="form-input">
                        <span>{isShowPassword ? <EyeFilled /> : <EyeInvisibleFilled />}</span>
                        <InputForm placeholder="Confirm Password" />
                    </div>
                    <div className="group-button">
                        <ButtonComponent className="btn-submit-product" type="primary" danger textButton="Đăng Ký" />
                    </div>
                    {/* <p class="login-with-email">Đăng nhập bằng email</p> */}
                    <p className="forgot-password">Quên mật khẩu</p>
                    <p>
                        Bạn có tài khoản? <span className="create-account">Đăng nhập</span>
                    </p>
                </div>
                <div className="right">
                    <Image className="img-logo" src={logo} alt="Logo Đăng nhập" preview={false} />
                    <div class="content">
                        <h4>Mua sắm tại Tiki</h4>
                        <span>Siêu ưu đãi mỗi ngày</span>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default SignUpPage;
