import { useState } from 'react';
import styles from '../../App.module.css';
import InputField from './InputField.jsx';

export default function ViteForm() {
	const [confirmPasswordError, setconfirmPasswordError] = useState(null);
	const [registrationStatus, setRegistrationStatus] = useState(null);

	const [inputsValue, setInputsValue] = useState({
		email: '',
		password: '',
		confirmPassword: '',
	});

	const [inputsErrors, setInputsErrors] = useState({
		emailError: null,
		passwordVerify: [
			{
				title: 'Цифры',
				status: false,
				verify: (value) => /\d/.test(value),
			},
			{
				title: 'Заглавные буквы',
				status: false,
				verify: (value) => /[A-Z А-Я]/.test(value),
			},
			{
				title: 'Больше 5 символов',
				status: false,
				verify: (value) => value.length > 5,
			},
		],
	});

	const isAllInputsCorrect = !(
		!inputsErrors.emailError &&
		inputsValue.password === inputsValue.confirmPassword &&
		inputsErrors.passwordVerify.every((item) => item.status)
	);

	const onEmailChange = ({ target }) => {
		setInputsValue({ ...inputsValue, email: target.value });
		setRegistrationStatus(null);
	};

	const onEmailBlur = ({ target }) => {
		const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
		if (!regex.test(target.value)) {
			setInputsErrors({ ...inputsErrors, emailError: 'Неккоректный эмейл' });
		} else {
			setInputsErrors({ ...inputsErrors, emailError: null });
		}
	};

	const onPasswordChange = ({ target }) => {
		setInputsValue({ ...inputsValue, password: target.value });

		setInputsErrors({
			...inputsErrors,
			passwordVerify: inputsErrors.passwordVerify.map((item) => ({
				...item,
				status: item.verify(target.value),
			})),
		});

		setRegistrationStatus(null);
	};

	const onconfirmPasswordChange = ({ target }) => {
		setInputsValue({ ...inputsValue, confirmPassword: target.value });
		setRegistrationStatus(null);
	};

	const onconfirmPasswordBlur = ({ target }) => {
		if (target.value !== inputsValue.password) {
			setconfirmPasswordError('Пароли не совпадают');
		} else {
			setconfirmPasswordError(null);
		}
	};

	const onSubmit = (e) => {
		e.preventDefault();

		if (isAllInputsCorrect) {
			setRegistrationStatus('Вы прошли регистрацию');
		} else {
			setRegistrationStatus(null);
		}

		console.log(inputsValue);
	};

	return (
		<>
			<div className={styles.container}>
				<form onSubmit={onSubmit}>
					{registrationStatus && <p className={styles.regStatus}>{registrationStatus}</p>}
					<InputField
						type="email"
						name="email"
						value={inputsValue.email}
						onChange={onEmailChange}
						onBlur={onEmailBlur}
						placeholder="Почта"
						error={inputsErrors.emailError}
					/>
					<InputField
						type="password"
						name="password"
						value={inputsValue.password}
						onChange={onPasswordChange}
						placeholder="Пароль"
					/>
					<ul>
						{inputsErrors.passwordVerify.map((item) => (
							<li
								key={item.title}
								className={item.status === true ? styles.green : styles.red}
							>
								{item.title}
							</li>
						))}
					</ul>
					<InputField
						type="password"
						name="confirmPassword"
						value={inputsValue.confirmPassword}
						onChange={onconfirmPasswordChange}
						onBlur={onconfirmPasswordBlur}
						placeholder="Повтор пароля"
						error={confirmPasswordError}
					/>
					<button type="submit" disabled={isAllInputsCorrect}>
						Зарегистрироваться
					</button>
				</form>
			</div>
		</>
	);
}
