document.addEventListener("DOMContentLoaded", () => {
	const confirmOrderBtn = document.getElementById("confirmOrder");
	const addressInputs = document.getElementsByName("selectedAddress");
	const paymentInputs = document.getElementsByName("paymentMethod");
	const newAddressForm = document.getElementById("new-address-form");
	const addNewAddressBtn = document.getElementById("addNewAddress");
	const closeAddrBtn = document.getElementById("close-save-addr");

	const validateOrder = () => {
		const selectedAddress = [...addressInputs].some((input) => input.checked);
		const selectedPayment = [...paymentInputs].some((input) => input.checked);
		confirmOrderBtn.disabled = !(selectedAddress && selectedPayment);
	};

	addressInputs.forEach((input) => input.addEventListener("change", validateOrder));
	paymentInputs.forEach((input) => input.addEventListener("change", validateOrder));

	confirmOrderBtn.addEventListener("click", async (e) => {
		e.preventDefault();

		const selectedAddress = document.querySelector('input[name="selectedAddress"]:checked').value;
		const paymentMethod = document.querySelector('input[name="paymentMethod"]:checked').value;
		const totalAmount = e.target.getAttribute("data-final-total");

		const orderDetails = { selectedAddress, paymentMethod, totalAmount };

		try {
			const response = await fetch("/users/place-order", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify(orderDetails)
			});

			const result = await response.json();
			if (result.success) {
				alert("Order placed successfully!");
				window.location.href = "/users/orders";
			} else {
				alert("Failed to place order. Please try again.");
			}
		} catch (error) {
			console.error("Error placing order:", error);
		}
	});
});
