import { AUTH_ROUTES } from "utils/route";
import { SubmitHandler, useForm } from "react-hook-form";
import { notify } from "utils/utils";

type LoginForm = {
	username: string;
	password: string;
};

const Login = ({ history }: any) => {
	const {
		handleSubmit,
		register,
		formState: { errors },
	} = useForm<LoginForm>({
		mode: "onChange",
	});

	const loginHandler: SubmitHandler<LoginForm> = (formData) => {
		let headers: any = { "Content-Type": "application/json" };
		fetch(`http://localhost:8000/2fa-auth/login/`, {
			method: "POST",
			headers: headers,
			body: JSON.stringify(formData),
		}).then((response) => {
			const res: any = response.json();
			res.then((data: any) => {
				if (response.status === 200) {
					window.localStorage.setItem(
						"questions",
						JSON.stringify(data.user.questions)
					);
					notify(
						"success",
						"user verified, please answer your security questions to continue"
					);
					history.push(`/auth/verify/${data.user.authToken}`);
				} else {
					const error: any = Object.values(data);
					notify("error", error[0][0]);
				}
			});
		});
	};

	return (
		<div className="login-container p-t-100 p-b-100 p-l-30 p-r-30">
			<h1 className="title1">
				<span className="color-pink">Login</span> to your account
			</h1>
			<form className="form-group m-t-50" onSubmit={handleSubmit(loginHandler)}>
				<div className="input-wrap m-b-10">
					<label htmlFor="">Email</label>
					<input
						type="text"
						placeholder="Enter your email"
						{...register("username", {
							required: true,
							pattern: {
								value:
									/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
								message: "Enter a valid username",
							},
						})}
					/>
					{errors.username && <p className="error">Enter a valid email</p>}
				</div>
				<div className="input-wrap m-b-10">
					<label htmlFor="">Password</label>
					<input
						type="password"
						placeholder="Enter your password"
						{...register("password", {
							required: true,
						})}
					/>
					{errors.password && <p className="error">Enter a valid password</p>}
				</div>
				<p className="link m-b-50">Forgot password?</p>
				<button type="submit" className="btn btn--primary m-b-10">
					Login
				</button>
				<button
					type="button"
					className="btn btn--secondary"
					onClick={() => history.push(`${AUTH_ROUTES}/register`)}
				>
					Register
				</button>
			</form>
		</div>
	);
};

export default Login;
