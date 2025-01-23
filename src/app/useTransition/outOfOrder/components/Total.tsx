const intl = new Intl.NumberFormat("en-US", {
	style: "currency",
	currency: "KRW",
});

interface Props {
	quantity: number;
	isPending: boolean;
	clientQuantity: number;
}

export default function Total({ quantity, isPending, clientQuantity }: Props) {
	return (
		<div className="total">
			<span>Total:</span>
			<span>{isPending ? "🌀 Updating..." : `${intl.format(quantity * 9999)}`}</span>
			<p>
				{!isPending && clientQuantity !== quantity
					? `Wrong Total expected: ${clientQuantity}`
					: "Correct"}
			</p>
		</div>
	);
}
