import { redirect } from 'react-router-dom';
import { toast } from 'react-toastify';

import customFetch from '../utils/customFetch';

export const action =
    (queryClient) =>
    async ({ params }) => {
        try {
            await customFetch.delete(`/jobs/${params.id}`);

            //* invalidate all queries starting with jobs keyword
            queryClient.invalidateQueries(['jobs']);

            toast.success('Job Deleted Successfully');

            return redirect('/dashboard/all-jobs');
        } catch (error) {
            toast.error(error?.response?.data?.msg);
            console.log(error);
            return redirect('/dashboard/all-jobs');
        }
    };
