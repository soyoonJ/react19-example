import { startTransition } from "react";

interface Props {
	action: (newQuantity: number) => void;
}

export default function Item({ action }: Props) {
	function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
		// 💡 startTransition을 사용하지 않으면, onChange 시 버벅일 수 있음
		startTransition(async () => {
			action(Number(event.target.value));
		});
	}

	return (
		<div>
			<label htmlFor="product">Quantity: </label>
			<input type="number" onChange={handleChange} defaultValue={0} min={0} />
		</div>
	);
}
