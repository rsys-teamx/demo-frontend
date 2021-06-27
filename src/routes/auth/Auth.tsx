import Login from "./Login";
import Register from "./Register";
import SecurityQuestions from "./SecurityQuestions";
import { useHistory, useParams } from "react-router-dom";
import VerifyLogin from "./VerifyLogin";

const Auth = () => {
	const params: any = useParams();
	const history: any = useHistory();
	const { key, id } = params;
	return (
		<div className="main-container d-flex">
			<div className="left-container col-md-7 d-flex align-items-center">
				<h1 className="title-left color-white p-l-30 p-r-30">
					2FA – Django Package <br /> <span>by</span>{" "}
					<span className="color-pink">TeamX</span>
				</h1>
			</div>
			<div className="right-container col-md-5">
				{key === "login" && <Login history={history} />}
				{key === "register" && <Register history={history} />}
				{key === "security-questions" && (
					<SecurityQuestions history={history} id={id} />
				)}
				{key === "verify" && <VerifyLogin history={history} id={id} />}
			</div>
		</div>
	);
};

export default Auth;
