interface ICheck {
	c_id: string;
	c_value?: string;
	c_label: string;
}

export default function CheckBox({ c_id, c_value, c_label }: ICheck) {
	return (
		<div className="flex items-center">
			<input
				id={`filter-mobile-${c_id}`}
				// name={`${section.id}[]`}
				defaultValue={c_value}
				type="checkbox"
				// defaultChecked={option.checked}
				className="h-4 w-4 rounded border-gray-300 text-teal-600 focus:ring-teal-500"
			/>
			<label
				htmlFor={`filter-mobile`}
				className="ml-3 min-w-0 flex-1 text-gray-500 hover:cursor-pointer"
			>
				{c_label}
			</label>
		</div>
	);
}
