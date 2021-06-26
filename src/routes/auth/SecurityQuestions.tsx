import { useState } from "react";
import { useForm } from "react-hook-form";
import { AUTH_ROUTES } from "utils/route";
import { isEmpty } from "utils/utils";

const SecurityQuestions = ({ history }: any) => {
	const {
		register,
		handleSubmit,
		watch,
		formState: { errors },
	} = useForm();
	const [formCount, setFormCount] = useState<any>([0]);
	const [counter, setCounter] = useState(1);
	const [minCount, setMinCount] = useState(1);
	const [maxCount, setMaxCount] = useState(3);
	const [questionList, setQuestionList] = useState([
		{
			uuId: 1,
			question: "What is your last job?",
		},
		{
			uuId: 2,
			question: "What is your native place?",
		},
		{
			uuId: 3,
			question: "Who is your favourite sports person?",
		},
		{
			uuId: 4,
			question: "What is your firt vehicle?",
		},
	]);
	const [selectedQuestions, setSelectedQuestions] = useState<any>([]);

	const addMoreQuestion = () => {
		if (counter < maxCount) {
			setFormCount((prevFormCount: any) => [...prevFormCount, counter]);
			setCounter((prevCounter) => prevCounter + 1);
		}
	};

	const submitAnswerHandler = (formData: any) => {
		history.push(`${AUTH_ROUTES}/login`);
	};

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
								{...register(`${index}.question`, {
									required: true,
								})}
							>
								<option value="">Select a question</option>
								{questionList.map((question: any) => {
									const watchValues = Object.values(watch());
									const isSelected =
										watchValues.filter(
											(val: any) =>
												Number(val.question) === Number(question.uuId)
										).length !== 0;
									const iscurrentQuestion = !isEmpty(watch()[index]?.question)
										? Number(watch()[index]?.question) === Number(question.uuId)
										: false;
									return (
										(!isSelected || (isSelected && iscurrentQuestion)) && (
											<option value={question.uuId} key={question.uuId}>
												{question.question}
											</option>
										)
									);
								})}
							</select>
							{errors[index]?.question && (
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
