export const passwordRules = [
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
];
