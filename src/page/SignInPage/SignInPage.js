import { Image } from 'antd';

import ButtonComponent from '../../components/ButtonComponent/ButtonComponent';
import InputForm from '../../components/InputForm/InputForm';
import logo from '../../assets/images/logo-dn.png';
import './SignInPage.scss';

function SignInPage() {
    return (
        <div className="modal-container">
            <div className="container-sign-in">
                <div className="left">
                    <div class="heading">
                        <h4>Xin chào,</h4>
                        <p>Đăng nhập hoặc Tạo tài khoản</p>
                    </div>
                    <InputForm placeholder="abc@gmail.com" style={{ marginBottom: '15px' }} />
                    <InputForm placeholder="Password" />
                    <div className="group-button">
                        <ButtonComponent className="btn-submit-product" type="primary" danger textButton="Đăng nhập" />
                    </div>
                    {/* <p class="login-with-email">Đăng nhập bằng email</p> */}
                    <p className="forgot-password">Quên mật khẩu</p>
                    <p>
                        Chưa có tài khoản? <span className="create-account">Tạo tài khoản</span>
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

export default SignInPage;
