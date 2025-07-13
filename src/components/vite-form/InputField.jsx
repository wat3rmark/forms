import styles from '../../App.module.css';

export default function InputField({
	type,
	name,
	value,
	onChange,
	onBlur,
	placeholder,
	error,
}) {
	return (
		<div>
			<input
				type={type}
				name={name}
				value={value}
				onChange={onChange}
				onBlur={onBlur}
				placeholder={placeholder}
			/>
			{error && <p className={styles.error}>{error}</p>}
		</div>
	);
}
