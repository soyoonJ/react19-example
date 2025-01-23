const intl = new Intl.NumberFormat("en-US", {
	style: "currency",
	currency: "KRW",
});

interface Props {
	quantity: number;
	isPending: boolean;
}

export default function Total({ quantity, isPending }: Props) {
	return (
		<div className="total">
			<span>Total:</span>
			<span>{isPending ? "🌀 Updating..." : `${intl.format(quantity * 9999)}`}</span>
		</div>
	);
}
