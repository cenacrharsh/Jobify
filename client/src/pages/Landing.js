import logo from "../assets/images/logo.svg";
import main from "../assets/images/main.svg";

import Wrapper from "../assets/wrappers/LandingPage";

const Landing = () => {
    return (
        <Wrapper>
            <nav>
                <img src={logo} alt="jobify" className="logo" />
            </nav>

            <div className="container page">
                {/* info */}
                <div className="info">
                    <h1>
                        job <span>tracking</span> app
                    </h1>
                    <p>
                        Lorem ipsum, dolor sit amet consectetur adipisicing
                        elit. Fuga esse molestias sequi voluptates accusamus!
                        Nostrum dolore repellendus nihil maiores ratione fuga.
                        Praesentium molestiae veniam delectus distinctio
                        voluptatem enim minima quaerat.
                    </p>
                    <button className="btn btn-hero">Login/Register</button>
                </div>
                <img src={main} alt="job hunt" className="img main-img" />
            </div>
        </Wrapper>
    );
};

export default Landing;
