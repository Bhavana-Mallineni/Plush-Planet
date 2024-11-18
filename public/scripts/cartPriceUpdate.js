// Ensure script runs after the DOM is fully loaded
document.addEventListener("DOMContentLoaded", () => {
	// Select all quantity input fields
	const quantityInputs = document.querySelectorAll("input[type='number']");

	// Add event listeners to all quantity inputs
	quantityInputs.forEach((input) => {
		input.addEventListener("change", handleQuantityChange);
	});

	// Function to handle quantity changes
	async function handleQuantityChange(event) {
		const input = event.target;
		const price = parseFloat(input.dataset.price);
		const productId = input.dataset.id;
		const quantity = parseInt(input.value) || 1;

		// Update the individual product total
		const itemTotalElement = document.querySelector(`#item-total-${productId}`);
		const itemTotal = price * quantity;
		itemTotalElement.textContent = `₹${itemTotal.toFixed(2)}`;

		const response = await fetch(`/update-cart/${productId}`, {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({ quantity: quantity })
		});

		// Recalculate the order summary
		recalculateSummary();
	}

	// Function to recalculate the order summary
	function recalculateSummary() {
		let totalPrice = 0;
		const shippingFee = 50;

		document.querySelectorAll("input[type='number']").forEach((input) => {
			const price = parseFloat(input.dataset.price);
			const quantity = parseInt(input.value) || 1;
			totalPrice += price * quantity;
		});

		document.querySelector("#total-price").textContent = `₹${totalPrice.toFixed(2)}`;
		document.querySelector("#final-total").textContent = `₹${(totalPrice + shippingFee).toFixed(
			2
		)}`;
	}

	recalculateSummary();
});
