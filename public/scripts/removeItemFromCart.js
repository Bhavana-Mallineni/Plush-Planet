document.addEventListener("DOMContentLoaded", () => {
	console.log("remove item");
	document.querySelectorAll(".delete-item-btn").forEach((button) => {
		button.addEventListener("click", function (e) {
			const productId = e.target.dataset.id;
			fetch(`/users/cart/remove/${productId}`, {
				method: "DELETE",
				headers: { "Content-Type": "application/json" }
			})
				.then((response) => response.json())
				.then((data) => {
					if (data.success) {
						location.reload();
					} else {
						alert("Failed to remove item.");
					}
				})
				.catch((error) => {
					console.error("Error:", error);
				});
		});
	});
});
