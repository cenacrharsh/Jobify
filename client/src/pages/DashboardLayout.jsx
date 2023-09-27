import { useContext, createContext, useState } from 'react';
import {
    Outlet,
    redirect,
    useLoaderData,
    useNavigate,
    useNavigation,
} from 'react-router-dom';

import Wrapper from '../assets/wrappers/Dashboard';
import { BigSidebar, Navbar, SmallSidebar, Loading } from '../components';
import customFetch from '../utils/customFetch';
import { toast } from 'react-toastify';

/*
    - React Router has a built in prop 'context' that works like context, which can be used to pass down values to all the children here <Outlet />

    - For other components like BigSidebar, SmallSidebar and Navbar we can use normal props or use createContext()
*/

//* loader helps to fetch some data even before page renders, it also returns something
export const loader = async () => {
    try {
        const { data } = await customFetch.get('/users/current-user');

        return data;
    } catch (error) {
        return redirect('/');
    }
};

const DashboardContext = createContext();

const DashboardLayout = ({ isDarkThemeEnabled }) => {
    const { user } = useLoaderData();

    const navigate = useNavigate();
    const navigation = useNavigation();
    const isPageLoading = navigation.state === 'loading';

    const [showSidebar, setShowSidebar] = useState(false);
    const [isDarkTheme, setIsDarkTheme] = useState(isDarkThemeEnabled);

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

        toast.success('Successfully Logged Out');
    };

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
