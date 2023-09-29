import { Link, Form, redirect, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

import { Logo, FormRow, SubmitBtn } from '../components';
import Wrapper from '../assets/wrappers/RegisterAndLoginPage';
import customFetch from '../utils/customFetch';

export const action =
    (queryClient) =>
    async ({ request }) => {
        try {
            const formData = await request.formData();
            const data = Object.fromEntries(formData);

            await customFetch.post('/auth/login', data);

            //* invalidate all cached queries
            queryClient.invalidateQueries();

            toast.success('Successfully Logged In');

            return redirect('/dashboard');
        } catch (error) {
            toast.error(error?.response?.data?.msg);
            console.log(error);
            return error;
        }
    };

const Login = () => {
    const navigate = useNavigate();

    const loginDemoUser = async () => {
        const data = {
            email: 'test@gmail.com',
            password: 'Pass@123',
        };

        try {
            await customFetch.post('/auth/login', data);

            toast.success('Take a Test Drive');

            navigate('/dashboard');
        } catch (error) {
            toast.error(error?.response?.data?.msg);
        }
    };

    return (
        <Wrapper>
            <Form method="post" className="form">
                <Logo />

                <h4>Login</h4>

                <FormRow type="email" name="email" />

                <FormRow type="password" name="password" />

                <SubmitBtn />

                <button
                    type="button"
                    className="btn btn-block"
                    onClick={loginDemoUser}
                >
                    explore the app
                </button>

                <p>
                    Not a member yet?
                    <Link to="/register" className="member-btn">
                        Register
                    </Link>
                </p>
            </Form>
        </Wrapper>
    );
};
export default Login;
