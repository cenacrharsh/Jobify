import { Link } from 'react-router-dom';

import Wrapper from '../assets/wrappers/LandingPage';
import { Logo } from '../components';
import main from '../assets/images/main.svg';

const Landing = () => {
    return (
        <Wrapper>
            <nav>
                <Logo />
            </nav>

            <div className="container page">
                <div className="info">
                    <h1>
                        job <span>tracking</span> app
                    </h1>

                    <p>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        Eaque, reprehenderit? Dolorum consequatur at vel odit!
                        Corporis corrupti debitis cum odio. Accusamus magnam
                        cumque asperiores alias, beatae sit vel laboriosam quos
                        aspernatur accusantium ab, delectus eum!
                    </p>

                    <Link to="/register" className="btn register-link">
                        Register
                    </Link>

                    <Link to="/login" className="btn register-link">
                        Login / Demo User
                    </Link>
                </div>

                <img src={main} alt="job hunt" className="img main-img" />
            </div>
        </Wrapper>
    );
};
export default Landing;
