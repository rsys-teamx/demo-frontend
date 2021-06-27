import { AUTH_ROUTES } from "utils/route";
import { SubmitHandler, useForm } from "react-hook-form";
import { notify } from "utils/utils";

type RegistrationFrom = {
	firstName: string;
	lastName: string;
	email: string;
	username: string;
	password: string;
	confirmPassword: string;
};

const Register = ({ history }: any) => {
	const {
		handleSubmit,
		register,
		watch,
		formState: { errors },
	} = useForm<RegistrationFrom>({
		mode: "onChange",
	});

	const registrationHanlder: SubmitHandler<RegistrationFrom> = (formData) => {
		let headers: any = { "Content-Type": "application/json" };
		fetch(`http://localhost:8000/2fa-auth/register/`, {
			method: "POST",
			headers: headers,
			body: JSON.stringify(formData),
		}).then((response) => {
			const res: any = response.json();
			res.then((data: any) => {
				if (response.status === 201) {
					history.push(`/auth/security-questions/${data.authToken}`);
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
				<span className="color-pink">Register</span> your account
			</h1>
			<form
				className="form-group m-t-50"
				onSubmit={handleSubmit(registrationHanlder)}
			>
				<div className="input-wrap m-b-10">
					<label htmlFor="">First Name</label>
					<input
						type="text"
						placeholder="Enter your first name"
						{...register("firstName", {
							required: true,
						})}
					/>
					{errors.firstName && (
						<p className="error">Enter a valid first Name</p>
					)}
				</div>
				<div className="input-wrap m-b-10">
					<label htmlFor="">Last Name</label>
					<input
						type="text"
						placeholder="Enter your last name"
						{...register("lastName", {
							required: true,
						})}
					/>
					{errors.lastName && <p className="error">Enter a valid last Name</p>}
				</div>
				<div className="input-wrap m-b-10">
					<label htmlFor="">Username</label>
					<input
						type="text"
						placeholder="Enter your username"
						{...register("username", {
							required: true,
						})}
					/>
					{errors.username && <p className="error">Enter a valid username</p>}
				</div>
				<div className="input-wrap m-b-10">
					<label htmlFor="">Email</label>
					<input
						type="text"
						placeholder="Enter your email"
						{...register("email", {
							required: {
								value: true,
								message: "Enter a valid email",
							},
							pattern: {
								value:
									/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
								message: "Enter a valid email",
							},
						})}
					/>
					{errors.email && <p className="error">{errors.email.message}</p>}
				</div>
				<div className="input-wrap m-b-10">
					<label htmlFor="">Password</label>
					<input
						type="password"
						placeholder="Enter a password"
						{...register("password", {
							required: true,
						})}
					/>
					{errors.password && <p className="error">Enter a valid password</p>}
				</div>
				<div className="input-wrap m-b-40">
					<label htmlFor="">Confirm password</label>
					<input
						type="password"
						placeholder="Enter your password"
						{...register("confirmPassword", {
							required: {
								value: true,
								message: "Confirm password is required",
							},
							validate: {
								validateConfirmPassword: (value) => {
									return value === watch("password");
								},
							},
						})}
					/>
					{errors.confirmPassword && (
						<p className="error">{errors.confirmPassword.message}</p>
					)}
					{errors.confirmPassword &&
						errors.confirmPassword.type === "validateConfirmPassword" && (
							<p className="error">
								Password and confirm password is not matching
							</p>
						)}
				</div>
				<button className="btn btn--primary m-b-10">Register</button>
				<button
					className="btn btn--secondary"
					onClick={() => history.push(`${AUTH_ROUTES}/login`)}
				>
					Login
				</button>
			</form>
		</div>
	);
};

export default Register;
