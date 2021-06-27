import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { AUTH_ROUTES } from "utils/route";
import { isEmpty, notify } from "utils/utils";

const SecurityQuestions = ({ history, id }: any) => {
	const {
		register,
		handleSubmit,
		watch,
		formState: { errors },
	} = useForm();
	const [formCount, setFormCount] = useState<any>([0]);
	const [counter, setCounter] = useState(1);
	const [minCount, setMinCount] = useState(1);
	const [maxCount, setMaxCount] = useState(1);
	const [questionList, setQuestionList] = useState([]);

	const addMoreQuestion = () => {
		if (counter < maxCount) {
			setFormCount((prevFormCount: any) => [...prevFormCount, counter]);
			setCounter((prevCounter) => prevCounter + 1);
		}
	};

	const submitAnswerHandler = (formData: any) => {
		console.log(formData);
		if (Object.values(formData).length >= minCount) {
			const requests = Object.values(formData);
			let headers: any = { "Content-Type": "application/json" };
			headers["authorization"] = `token ${id}`;
			fetch(`http://localhost:8000/2fa-auth/auth-questions/`, {
				method: "POST",
				headers: headers,
				body: JSON.stringify({ requests }),
			}).then((response) => {
				const res: any = response.json();
				res.then((data: any) => {
					if (response.status === 200) {
						history.push(`${AUTH_ROUTES}/login`);
						notify(
							"success",
							"2FA setup completed successfully, please login to continue."
						);
					}
				});
			});
		} else {
			notify("error", `You should answer atleast ${minCount} question(s)`);
		}
	};

	useEffect(() => {
		let headers: any = { "Content-Type": "application/json" };
		fetch(`http://localhost:8000/2fa-auth/questions/`, {
			method: "GET",
			headers: headers,
		}).then((response) => {
			const res: any = response.json();
			res.then((data: any) => {
				if (response.status === 200) {
					setQuestionList(data);
				}
			});
		});

		fetch(`http://localhost:8000/2fa-auth/2fa-config/`, {
			method: "GET",
			headers: headers,
		}).then((response) => {
			const res: any = response.json();
			res.then((data: any) => {
				if (response.status === 200) {
					setMaxCount(data.Config.registrationQuestionsCount);
					setMinCount(data.Config.registrationMinAnswerCount);
				}
			});
		});
	}, []);

	return (
		<div className="login-container p-t-100 p-b-100 p-l-30 p-r-30">
			<h1 className="title1">
				Setup your
				<span className="color-pink"> security</span> questions
			</h1>
			<form
				className="form-group m-t-50"
				onSubmit={handleSubmit(submitAnswerHandler)}
			>
				{formCount.map((index: any) => (
					<div className="input-wrap m-b-20" key={index}>
						<div className="select-wrap m-b-5">
							<select
								{...register(`${index}.questionId`, {
									required: true,
								})}
							>
								<option value="">Select a question</option>
								{questionList.map((question: any) => {
									const watchValues = Object.values(watch());
									const isSelected =
										watchValues.filter(
											(val: any) => val.questionId === question.id
										).length !== 0;

									const iscurrentQuestion = !isEmpty(watch()[index]?.questionId)
										? watch()[index]?.questionId === question.id
										: false;
									return (
										(!isSelected || (isSelected && iscurrentQuestion)) && (
											<option value={question.id} key={question.id}>
												{question.questionDesc}
											</option>
										)
									);
								})}
							</select>
							{errors[index]?.questionId && (
								<p className="error">Select a question</p>
							)}
						</div>
						<input
							type="text"
							placeholder="Answer"
							{...register(`${index}.answer`, {
								required: true,
							})}
						/>
						{errors[index]?.answer && (
							<p className="error">This field is required</p>
						)}
					</div>
				))}
				<p
					className={`link m-b-40 ${!(counter < maxCount) && "disabled"}`}
					onClick={() => addMoreQuestion()}
				>
					+ add more
				</p>
				<button className="btn btn--primary m-b-10">
					Complete registration
				</button>
			</form>
		</div>
	);
};

export default SecurityQuestions;
