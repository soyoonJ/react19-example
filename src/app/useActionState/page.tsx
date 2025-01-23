"use client";

import { useActionState } from "react";
import { addToCart, handleAction } from "./actions";

interface AddToCartFormProps {
	itemID: string;
	itemTitle: string;
}

function AddToCartForm({ itemID, itemTitle }: AddToCartFormProps) {
	// message는 addToCart 함수의 반환값을 받아서 출력한다.
	const [message, formAction, isPending] = useActionState(addToCart, "");
	return (
		<form action={formAction}>
			<h2>{itemTitle}</h2>
			<input type="hidden" name="itemID" value={itemID} />

			{/* 💡 button에 action attribute를 넣고싶을 경우 formAction으로 넣어야 함 */}
			<button type="submit">Add to Cart</button>
			{isPending ? "Loading..." : message}
		</form>
	);
}

export default function App() {
	return (
		<>
			<form action={handleAction}>
				<h2>테스트</h2>
				<input name="itemID" />

				<button type="submit">Add to Cart</button>
			</form>

			<AddToCartForm itemID="1" itemTitle="JavaScript: The Definitive Guide" />
			<AddToCartForm itemID="2" itemTitle="JavaScript: The Good Parts" />
		</>
	);
}
