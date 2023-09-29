import { useOutletContext, Form, redirect } from 'react-router-dom';
import { toast } from 'react-toastify';

import { FormRow } from '../components';
import Wrapper from '../assets/wrappers/DashboardFormPage';
import { JOB_STATUS, JOB_TYPE } from '../../../utils/constants';
import customFetch from '../utils/customFetch';
import { FormRowSelect } from '../components/index';
import { SubmitBtn } from '../components';

export const action =
    (queryClient) =>
    async ({ request }) => {
        const formData = await request.formData();
        const data = Object.fromEntries(formData);

        try {
            await customFetch.post('/jobs', data);

            //* invalidate all queries starting with jobs keyword
            queryClient.invalidateQueries(['jobs']);

            toast.success('Successfully created new job');

            return redirect('all-jobs');
        } catch (error) {
            toast.error(error?.response?.data?.msg);
            console.log(error);
            return error;
        }
    };

const AddJob = () => {
    const { user } = useOutletContext();

    return (
        <Wrapper>
            <Form method="post" className="form">
                <h4 className="form-title">add job</h4>
                <div className="form-center">
                    <FormRow type="text" name="position" />

                    <FormRow type="text" name="company" />

                    <FormRow
                        type="text"
                        name="jobLocation"
                        labelText="job location"
                    />

                    <FormRowSelect
                        labelText="job location"
                        name="jobStatus"
                        list={Object.values(JOB_STATUS)}
                    />

                    <FormRowSelect
                        labelText="job type"
                        name="jobType"
                        list={Object.values(JOB_TYPE)}
                    />

                    <SubmitBtn formBtn />
                </div>
            </Form>
        </Wrapper>
    );
};
export default AddJob;
