import { useStoreActions } from "easy-peasy";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { notify } from "utils/utils";

const VerifyLogin = ({ history, id }: any) => {
	const updateAuthToken = useStoreActions(
		(actions: any) => actions.auth.updateAuthToken
	);
	const [questionsList, setQuestionsList] = useState<any>([]);
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm();

	useEffect(() => {
		let questions: any = window.localStorage.getItem("questions");
		questions = JSON.parse(questions);
		setQuestionsList(questions || []);
	}, []);

	console.log(errors);

	const submitAnswerHandler = (formData: any) => {
		let requests: any = [];
		questionsList.forEach((question: any, index: any) => {
			const answer: any = Object.values(formData)[index];
			requests.push({
				questionId: question.id,
				answer: answer.answer,
			});
		});
		let headers: any = { "Content-Type": "application/json" };
		headers["authorization"] = `token ${id}`;
		fetch(`http://localhost:8000/2fa-auth/2fa-verify-answer/`, {
			method: "POST",
			headers: headers,
			body: JSON.stringify({ requests }),
		}).then((response) => {
			const res: any = response.json();
			res.then((data: any) => {
				if (response.status === 200) {
					notify("success", "Successfully verified!");
					history.push(`/`);
				} else {
					const error: any = Object.values(data);
					notify("error", error[0]);
				}
			});
		});
	};
	return (
		<div className="login-container p-t-100 p-b-100 p-l-30 p-r-30">
			<h1 className="title1">
				Verify your
				<span className="color-pink"> security</span> questions
			</h1>
			<form
				className="form-group m-t-50"
				onSubmit={handleSubmit(submitAnswerHandler)}
			>
				{questionsList.map((question: any, index: any) => (
					<div className="input-wrap m-b-20" key={index}>
						<label htmlFor="">{question.question}</label>
						<input
							type="text"
							placeholder="Answer"
							{...register(`${index}.answer`, {
								required: true,
							})}
						/>
						{errors[index]?.answer && (
							<p className="error">This field is required.</p>
						)}
					</div>
				))}
				<button className="btn btn--primary m-b-10 m-t-50">Verify login</button>
			</form>
		</div>
	);
};

export default VerifyLogin;
