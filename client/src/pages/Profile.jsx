import { Form, useOutletContext } from 'react-router-dom';
import { toast } from 'react-toastify';

import { FormRow } from '../components';
import Wrapper from '../assets/wrappers/DashboardFormPage';
import customFetch from '../utils/customFetch';
import { SubmitBtn } from '../components';

export const action = async ({ request }) => {
    const formData = await request.formData();

    const file = formData.get('avatar');
    if (file && file.size > 500000) {
        toast.error('Image size too large');
        return null;
    }

    try {
        await customFetch.patch('/users/update-user', formData);
        toast.success('Profile updated successfully');
    } catch (error) {
        toast.error(error?.response?.data?.msg);
    }

    return null;
};

const Profile = () => {
    const { user } = useOutletContext();
    const { name, lastName, email, location } = user;

    return (
        <Wrapper>
            <Form method="post" className="form" encType="multipart/form-data">
                <h4 className="form-title">profile</h4>

                <div className="form-center">
                    <div className="form-row">
                        <label htmlFor="avatar" className="form-label">
                            Select an image file (max 0.5 MB)
                        </label>

                        <input
                            type="file"
                            id="avatar"
                            name="avatar"
                            className="form-input"
                            accept="image/*"
                        />
                    </div>

                    <FormRow type="text" name="name" defaultValue={name} />

                    <FormRow
                        type="text"
                        name="lastName"
                        labelText="last name"
                        defaultValue={lastName}
                    />

                    <FormRow type="email" name="email" defaultValue={email} />

                    <FormRow
                        type="text"
                        name="location"
                        defaultValue={location}
                    />

                    <SubmitBtn formBtn />
                </div>
            </Form>
        </Wrapper>
    );
};

export default Profile;
