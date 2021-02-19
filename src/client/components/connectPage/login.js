import React from "react";

const Login = () => (
    <div className={"login-content is-half column px-6 minimum-height"}>
        <h1 className={"title is-1 has-text-grey"}>{"Login"}</h1>
        <h2 className={"subtitle has-text-grey"}>{"Log in to your account"}</h2>
        <form>
            <div className={"field"}>
                <label className={"label has-text-grey"}>{"Email"}</label>
                <div className={"control"}>
                    <input
                        className={"input has-text-grey is-medium is-rounded"}
                        type={"email"}
                        placeholder={"Enter your email adress"}
                    />
                </div>
            </div>

            <div className={"field"}>
                <label className={"label has-text-grey has-text-grey"}>
                    {"Password"}
                </label>
                <div className={"control"}>
                    <input
                        className={"input has-text-grey is-medium is-rounded"}
                        type={"password"}
                        placeholder={"**********"}
                    />
                </div>
            </div>
            <p className={"has-text-centered mt-5"}>
                <a className={"button btn is-medium is-primary is-rounded"}>
                    {" Login "}
                </a>
            </p>
        </form>
    </div>
);

export default Login;
