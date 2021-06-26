import { useStoreActions } from "easy-peasy";

const VerifyLogin = ({ history }: any) => {
	const updateAuthToken = useStoreActions(
		(actions: any) => actions.auth.updateAuthToken
	);
	return (
		<div className="login-container p-t-100 p-b-100 p-l-30 p-r-30">
			<h1 className="title1">
				Verify your
				<span className="color-pink"> security</span> questions
			</h1>
			<div className="form-group m-t-50">
				<div className="input-wrap m-b-20">
					<label htmlFor="">What is your last job?</label>
					<input type="text" placeholder="Answer" />
				</div>
				<div className="input-wrap m-b-20">
					<label htmlFor="">What is your native place?</label>
					<input type="text" placeholder="Answer" />
				</div>
				<div className="input-wrap m-b-20">
					<label htmlFor="">Who is your favourite sports person?</label>
					<input type="text" placeholder="Answer" />
				</div>
				<div className="input-wrap m-b-50">
					<label htmlFor="">What is your firt vehicle?</label>
					<input type="text" placeholder="Answer" />
				</div>
				<button
					className="btn btn--primary m-b-10"
					onClick={() => {
						updateAuthToken("adcd");
						history.push(`/`);
					}}
				>
					Verify login
				</button>
			</div>
		</div>
	);
};

export default VerifyLogin;
