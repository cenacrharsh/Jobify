import { useContext, createContext, useState, useEffect } from 'react';
import { Outlet, redirect, useNavigate, useNavigation } from 'react-router-dom';

import Wrapper from '../assets/wrappers/Dashboard';
import { BigSidebar, Navbar, SmallSidebar, Loading } from '../components';
import customFetch from '../utils/customFetch';
import { toast } from 'react-toastify';
import { useQuery } from '@tanstack/react-query';

/*
    - React Router has a built in prop 'context' that works like context, which can be used to pass down values to all the children here <Outlet />

    - For other components like BigSidebar, SmallSidebar and Navbar we can use normal props or use createContext()
*/

const userQuery = {
    queryKey: ['user'],
    queryFn: async () => {
        const { data } = await customFetch('/users/current-user');
        return data;
    },
};

//* loader helps to fetch some data even before page renders, it also returns something
export const loader = (queryClient) => {
    return async () => {
        try {
            return await queryClient.ensureQueryData(userQuery);
        } catch (error) {
            return redirect('/');
        }
    };
};

const DashboardContext = createContext();

const DashboardLayout = ({ isDarkThemeEnabled, queryClient }) => {
    // const { user } = useLoaderData();
    const { user } = useQuery(userQuery)?.data;

    const navigate = useNavigate();
    const navigation = useNavigation();
    const isPageLoading = navigation.state === 'loading';

    const [showSidebar, setShowSidebar] = useState(false);
    const [isDarkTheme, setIsDarkTheme] = useState(isDarkThemeEnabled);

    const [isAuthError, setIsAuthError] = useState(false);

    const toggleDarkTheme = () => {
        const newDarkTheme = !isDarkTheme;
        setIsDarkTheme(newDarkTheme);

        document.body.classList.toggle('dark-theme', newDarkTheme);

        localStorage.setItem('darkTheme', newDarkTheme);
    };

    const toggleSidebar = () => {
        setShowSidebar(!showSidebar);
    };

    const logoutUser = async () => {
        navigate('/');

        await customFetch.get('/auth/logout');

        //* invalidate all cached queries
        queryClient.invalidateQueries();

        toast.success('Successfully Logged Out');
    };

    //* check if we have a 401 error
    customFetch.interceptors.response.use(
        (response) => {
            return response;
        },
        (error) => {
            if (error?.response?.status === 401) {
                setIsAuthError(true);
            }

            return Promise.reject(error);
        },
    );

    //* logout the use if we have a 401 error
    useEffect(() => {
        if (isAuthError === false) return;

        logoutUser();
    }, [isAuthError]);

    return (
        <DashboardContext.Provider
            value={{
                user,
                showSidebar,
                isDarkTheme,
                toggleSidebar,
                toggleDarkTheme,
                logoutUser,
            }}
        >
            <Wrapper>
                <main className="dashboard">
                    <BigSidebar />

                    <SmallSidebar />

                    <div>
                        <Navbar />

                        <div className="dashboard-page">
                            {isPageLoading ? (
                                <Loading />
                            ) : (
                                <Outlet context={{ user }} />
                            )}
                        </div>
                    </div>
                </main>
            </Wrapper>
        </DashboardContext.Provider>
    );
};

//* custom hook to avoid exporting main context
export const useDashboardContext = () => useContext(DashboardContext);

export default DashboardLayout;
