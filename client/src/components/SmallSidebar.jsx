import { FaTimes } from 'react-icons/fa';

import Wrapper from '../assets/wrappers/SmallSidebar';
import Logo from './Logo';
import { useDashboardContext } from '../pages/DashboardLayout';
import NavLinks from './NavLinks';

/*
    - Navlink adds active class automatically to the link that represents the page, end is used because we are using Nested routes due to which the index route alwasys matches and hence gets active class which can be avoided by using end prop
*/

const SmallSidebar = () => {
    const { showSidebar, toggleSidebar } = useDashboardContext();

    return (
        <Wrapper>
            <div
                className={
                    showSidebar
                        ? 'sidebar-container show-sidebar'
                        : 'sidebar-container'
                }
            >
                <div className="content">
                    <button
                        type="button"
                        className="close-btn"
                        onClick={toggleSidebar}
                    >
                        <FaTimes />
                    </button>

                    <header>
                        <Logo />

                        <NavLinks />
                    </header>
                </div>
            </div>
        </Wrapper>
    );
};
export default SmallSidebar;
