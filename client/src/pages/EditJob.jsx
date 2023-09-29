import { useLoaderData } from 'react-router-dom';
import { Form, redirect } from 'react-router-dom';
import { toast } from 'react-toastify';

import { FormRow, FormRowSelect } from '../components';
import Wrapper from '../assets/wrappers/DashboardFormPage';
import customFetch from '../utils/customFetch';
import { JOB_STATUS, JOB_TYPE } from '../../../utils/constants';
import { SubmitBtn } from '../components';
import { useQuery } from '@tanstack/react-query';

const singleJobQuery = (id) => {
    return {
        queryKey: ['job', id],
        queryFn: async () => {
            const { data } = await customFetch.get(`/jobs/${id}`);

            return data;
        },
    };
};

export const loader = (queryClient) => {
    return async ({ params }) => {
        try {
            await queryClient.ensureQueryData(singleJobQuery(params.id));

            return params.id; //* we want to access id in component
        } catch (error) {
            toast.error(error?.response?.data?.msg);
            console.log(error);
            return redirect('/dashboard/all-jobs');
        }
    };
};

export const action = (queryClient) => {
    return async ({ request, params }) => {
        const formData = await request.formData();
        const data = Object.fromEntries(formData);

        try {
            await customFetch.patch(`/jobs/${params.id}`, data);

            //* invalidate all queries starting with jobs keyword
            queryClient.invalidateQueries(['jobs']);

            //* invalidate query for the current job
            queryClient.invalidateQueries(['job', params.id]);

            toast.success('Job Updated Successfully');

            return redirect('/dashboard/all-jobs');
        } catch (error) {
            toast.error(error?.response?.data?.msg);
            console.log(error);
            return redirect('/dashboard/all-jobs');
        }
    };
};

const EditJob = () => {
    const id = useLoaderData();

    const {
        data: { job },
    } = useQuery(singleJobQuery(id));

    return (
        <Wrapper>
            <Form method="post" className="form">
                <h4 className="form-title">edit job</h4>

                <div className="form-center">
                    <FormRow
                        type="text"
                        name="position"
                        defaultValue={job.position}
                    />

                    <FormRow
                        type="text"
                        name="company"
                        defaultValue={job.company}
                    />

                    <FormRow
                        type="text"
                        name="jobLocation"
                        labelText="job location"
                        defaultValue={job.jobLocation}
                    />

                    <FormRowSelect
                        name="jobStatus"
                        labelText="job status"
                        defaultValue={job.jobStatus}
                        list={Object.values(JOB_STATUS)}
                    />

                    <FormRowSelect
                        name="jobType"
                        labelText="job type"
                        defaultValue={job.jobType}
                        list={Object.values(JOB_TYPE)}
                    />

                    <SubmitBtn formBtn />
                </div>
            </Form>
        </Wrapper>
    );
};

export default EditJob;
