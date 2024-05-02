import { memo, useState } from 'react';

export const CharacteristicsEditor = memo(() => {
	const [characteristics, setCharacteristics] = useState({});

	const handleAddCharacteristic = () => {
		setCharacteristics((prevCharacteristics) => {
			return {
				...prevCharacteristics,
				[`key${Object.keys(prevCharacteristics).length + 1}`]: '',
			};
		});
	};

	const handleChangeCharacteristic = (key, value) => {
		setCharacteristics((prevCharacteristics) => ({
			...prevCharacteristics,
			[key]: value,
		}));
	};

	const handleRemoveCharacteristic = (key) => {
		const { [key]: removedCharacteristic, ...rest } = characteristics;
		setCharacteristics(rest);
	};

	return (
		<div>
			<h2>Characteristics</h2>
			{Object.entries(characteristics).map(([key, value]) => (
				<div key={key}>
					<input
						type='text'
						value={value}
						onChange={(e) => handleChangeCharacteristic(key, e.target.value)}
					/>
					<button onClick={() => handleRemoveCharacteristic(key)}>
						Remove
					</button>
				</div>
			))}
			<button onClick={handleAddCharacteristic}>Add Characteristic</button>
			<button onClick={() => console.log(characteristics)}>Submit</button>
		</div>
	);
});
