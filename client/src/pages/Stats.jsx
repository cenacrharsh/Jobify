import { useLoaderData } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';

import { ChartsContainer, StatsContainer } from '../components';
import customFetch from '../utils/customFetch';

/*
export const loader = async () => {
    try {
        const response = await customFetch.get('/jobs/stats');

        return response.data;
    } catch (error) {
        return error;
    }
};
*/

const statsQuery = {
    queryKey: ['stats'],
    queryFn: async () => {
        const response = await customFetch.get('/jobs/stats');

        return response.data;
    },
};

export const loader = (queryClient) => {
    return async () => {
        const data = await queryClient.ensureQueryData(statsQuery); //* fetches data from cache if available or makes a request

        return null;
    };
};

const Stats = () => {
    // const { defaultStats, monthlyApplications } = useLoaderData();

    const { data } = useQuery(statsQuery); //* we are not accessing this data from the loader, we can, but in this case we aren't as we loose some benefits
    const { defaultStats, monthlyApplications } = data;

    return (
        <>
            <StatsContainer defaultStats={defaultStats} />

            {monthlyApplications?.length > 1 && (
                <ChartsContainer data={monthlyApplications} />
            )}
        </>
    );
};
export default Stats;
