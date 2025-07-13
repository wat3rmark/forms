import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

import styles from '../../App.module.css';
import { passwordRules } from './passwordRules.js';

const schema = yup.object().shape({
	email: yup
		.string()
		.required('Обязательное поле')
		.matches(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, 'Неккоректная почта'),
	password: yup
		.string()
		.required('Обязательное поле')
		.min(6)
		.matches(/\d/)
		.matches(/[A-Z А-Я]/),
	confirmPassword: yup
		.string()
		.required('Обязательное поле')
		.oneOf([yup.ref('password')], 'Пароли не совпадают'),
});

export default function ReactHooksForm() {
	const {
		register,
		handleSubmit,
		watch,
		formState: { errors, isValid },
	} = useForm({
		defaultValues: {
			email: '',
			password: '',
			confirmPassword: '',
		},
		mode: 'onBlur',
		resolver: yupResolver(schema),
	});

	const passwordValue = watch('password');

	const onSubmit = (data) => {
		console.log(data);
	};

	return (
		<>
			<div className={styles.container}>
				<form onSubmit={handleSubmit(onSubmit)}>
					<input type="email" name="email" placeholder="Почта" {...register('email')} />
					{errors.email?.message && (
						<p className={styles.error}>{errors.email.message}</p>
					)}
					<input
						type="password"
						name="password"
						placeholder="Пароль"
						{...register('password')}
					/>
					<ul>
						{passwordRules.map((item) => (
							<li
								key={item.title}
								className={item.verify(passwordValue) ? styles.green : styles.red}
							>
								{item.title}
							</li>
						))}
					</ul>
					<input
						type="password"
						name="confirmPassword"
						placeholder="Повтор пароля"
						{...register('confirmPassword')}
					/>
					{errors.confirmPassword?.message && (
						<p className={styles.error}>{errors.confirmPassword?.message}</p>
					)}
					<button type="submit" disabled={!isValid}>
						Зарегистрироваться
					</button>
				</form>
			</div>
		</>
	);
}
