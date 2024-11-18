document.addEventListener("DOMContentLoaded", () => {
	const addNewAddressBtn = document.getElementById("addNewAddress");
	const newAddressForm = document.getElementById("new-address-form");
	const newAddressInput = document.getElementById("newAddress");
	const saveAddressBtn = document.getElementById("saveAddress");
	const addressList = document.getElementById("address-list");
	const closeAddrBtn = document.getElementById("close-save-addr");

	addNewAddressBtn.addEventListener("click", () => {
		newAddressForm.classList.toggle("d-none");
	});

	saveAddressBtn.addEventListener("click", (e) => {
		e.preventDefault();
		const newAddress = newAddressInput.value.trim();
		if (!newAddress) {
			alert("Please enter a valid address!");
			return;
		}

		// AJAX request to save the address
		fetch("/users/save-address", {
			method: "POST",
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify({ address: newAddress })
		})
			.then((response) => response.json())
			.then((data) => {
				if (data.success) {
					// Update address list dynamically
					const newAddressDiv = document.createElement("div");
					newAddressDiv.innerHTML = `
					 <div class="address-box form-check">
                        <input type="radio" class="form-check-input ms-2" name="selectedAddress" id="address-${data.index}" value="${newAddress}" checked />
                        <label class="form-check-label me-1" for="address-${data.index}">${newAddress}</label>
						</div>
                    `;
					addressList.appendChild(newAddressDiv);

					// Reset form
					newAddressForm.classList.add("d-none");
					newAddressInput.value = "";
				} else {
					alert("Failed to save address. Please try again.");
				}
			})
			.catch((error) => {
				console.error("Error:", error);
				alert("An error occurred. Please try again.");
			});
	});
	closeAddrBtn.addEventListener("click", () => {
		newAddressForm.classList.add("d-none");
		newAddressInput.value = "";
	});
});
