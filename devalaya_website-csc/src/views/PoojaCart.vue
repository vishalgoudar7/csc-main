<template>
	<div class="row">
		<div class="col-md-8">
			<div class="ms-2">
				<h2 class="cart-title mt-2" style="margin-bottom: -10px;">Cart</h2>
				<hr>
				<div style="overflow-y: scroll; padding: 5px; height: 60vh;">
					<div v-if="getCart.length == 0">
						<h7 class="product-title text-center">Your cart is empty!</h7>
					</div>
					<div class="product-cart" v-for="pooja, key in getCart" :key='key' v-else>
						<div class="row">
							<div class="col-md-6">
								<div class="product-item">
									<img :src="pooja.image" alt="Pooja Image" class="product-image">
									<div class="d-flex flex-column">
										<span class="product-title">{{ pooja.pooja_name }}</span>
										<span class="product-description">{{ pooja.name }}</span>
										<span class="product-description">{{ formattedDate(pooja.pooja_date) }}</span>
									</div>
								</div>
							</div>
							<div class="col-md-6">
								<div class="d-flex flex-column">
									<div style="text-align: start;">
										Quantity:
										<button class="remove-btn ms-1 me-2" @click="decrementPooja(pooja)"><i
												class="fa-solid fa-minus"></i></button>
										<span style="color:#ef5b0c">{{ pooja.quantity }}</span>
										<button class="remove-btn ms-2" @click="incrementPooja(pooja)"><i
												class="fa-solid fa-plus"></i></button>
									</div>
									<div style="text-align: start;">
										<span class="product-description">Pooja Cost: {{ pooja.pooja_cost }}</span>
									</div>
									<div style="text-align: start;">
										<span class="product-description">Subtotal: {{ pooja.sub_total }}</span>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
				<hr>
				<div class="d-flex justify-content-between">
					<router-link to="/" class="button p-0 mb-2 mt-1" style="vertical-align: middle">
						Continue Shopping
					</router-link>
					<!-- <button v-if="getCart.length" class="button p-0 mb-2 mt-1" style="vertical-align: middle"
                        @click="confirmOrder()">
                        Update Cart <i class="bi bi-check2-circle"></i>
                    </button> -->
				</div>
			</div>
		</div>
		<div class="col-md-4">
			<div id="confirm_dialog" class="daialbox">
				<div class="box-forms mt-5" style="width: 100% !important;">
					<div class="right" v-if="getCart.length">
						<div ref="orderDetails" class="card shadow mb-4" v-if="true">
							<div class="card-header border-bottom text-center">
								<span class="fw-bold">ORDER DETAILS</span>
							</div>
							<div class="card-body">
								<ul class="list-group list-group-borderless mb-3">
									<li class="list-group-item d-flex justify-content-between py-2">
										<span class="h6 fw-light mb-0 me-5">Puja / Prasada Cost</span>
										<span class="h6 fw-light mb-0">₹{{ payment?.original_cost
										}}</span>
									</li>
									<div v-show="booking.prasadam">
										<li class="list-group-item d-flex justify-content-between py-2">
											<span class="h6 fw-light mb-0 me-5">Prasadam Delivery</span>
											<span class="h6 fw-light mb-0">₹{{
												payment?.delivery_charge
											}}</span>
										</li>
									</div>
									<li class="list-group-item d-flex justify-content-between py-2">
										<span class="h6 fw-light mb-0 me-5">Pandit Ji for Puja & Convenience Fees</span>
										<span class="h6 fw-light mb-0">₹{{
											payment?.convenience_fee
										}}</span>
									</li>
									<span class="border-top"></span>
									<li class="list-group-item d-flex justify-content-between py-2">
										<span class="h6 fw-light mb-0 me-5"><img
												src="../../public/banners/post.png">India Postal Charges</span>
										<span class="h6 fw-light mb-0">₹{{
											payment?.delivery_charge
										}}</span>
									</li>
									<span class="border-top"></span>
									<li class="list-group-item d-flex justify-content-between py-2">
										<span class="h6 fw-light mb-0 me-5">Tax GST</span>
										<span class="h6 fw-light mb-0">₹{{ payment?.total_tax
										}}</span>
									</li>

									<li class="list-group-item py-2">
										<hr class="my-0">
									</li>
									<li class="list-group-item d-flex justify-content-between pb-0">
										<div>
											<span class="fw-bold mb-0 me-5">Total</span><br>
											<small>Inc. of all taxes</small>
										</div>
										<span class="h5 fw-normal mb-0">₹{{ payment?.final_total
										}}</span>
									</li>
								</ul>
							</div>
						</div>
						<div style="text-align: center">
							<button v-if="response" @click="makePayment" class="button p-0 mb-0"
								style="vertical-align: middle">
								Place Order <i class="bi bi-check2-circle"></i>
							</button>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>
<script>
import moment from 'moment';
export default {
	data() {
		return {
			booking: {
				pooja_id: '',
				pooja_name: '',
				pooja_price: 0,
				pooja_original_cost: '',
				prasad_delivery: false,
				booking_date: '',
				name: '',
				mobile_no: "",
				comment: " ",
				gotra: "",
				rashi: "",
				nakshatra: "",
				prasadam: false,
				prasadam_address: {
					street_address_1: "",
					street_address_2: "",
					area: "",
					city: "",
					state: "",
					pincode: ""
				}

			},
			payment: {
				id: '',
				original_cost: 0,
				delivery_charge: 0,
				convenience_fee: 0,
				booking_charges: 0,
				total_tax: 0,
				final_total: 0
			},
			payments: [],
			response: false,
			cart: []
		}
	},

	mounted() {
		this.updateSubtotal();
		this.confirmOrder();
	},

	computed: {
		cartLength() {
			return this.$store.getters.cart.length;
		},
		getCart() {
			return this.cart;
		},
	},
	methods: {
		updateSubtotal() {
			this.cart = this.$store.getters.cart.map(pooja => {
				const originalCost = parseFloat(pooja.pooja_cost) || 0;
				const quantity = parseInt(pooja.quantity) || 0;
				pooja.sub_total = originalCost * quantity;
				return pooja;
			});
		},
		formattedDate(pooja_date) {
			return moment(pooja_date).format('DD-MM-YYYY');
		},
		incrementPooja(pooja) {
			this.response = false;
			pooja.quantity += 1;
			pooja.sub_total = pooja.pooja_cost * pooja.quantity;
			this.confirmOrder();
		},
		decrementPooja(pooja) {
			this.response = false;
			pooja.quantity -= 1;
			if (pooja.quantity == 0) {
				this.removePooja(pooja);
			}
			pooja.sub_total = pooja.pooja_cost * pooja.quantity;
			this.confirmOrder();
		},
		removePooja(pooja) {
			let filteredPooja = this.$store.getters.cart.filter(item =>
				item.sl_id !== pooja.sl_id
			);
			this.$store.dispatch('setCart', filteredPooja);
			this.cart = filteredPooja;
		},
		confirmOrder() {
			let vm = this;
			let cart_poojas = this.$store.getters.cart;
			let final_cart = [];
			cart_poojas.forEach(pooja => {
				for (let i = 0; i < pooja.quantity; i++) {
					final_cart.push(pooja);
				}
			});
			let payload = {
				uri: 'devotee/bulk_pooja_request/',
				data: {
					requests: final_cart
				}
			}
			let loader = this.$loading.show();
			this.$store.dispatch('post', payload)
				.then(response => {
					loader.hide();
					this.payments = response.data;
					this.calculateFinalCost();
					vm.response = true;
					vm.getRZKey();
				})
				.catch(errors => {
					loader.hide();
					console.log(errors.response.data.errors[0].message[0])
				})
		},

		calculateFinalCost() {
			if (this.payments.length) {
				this.payment.id = this.payments[0].id;
				this.order_id = this.payments[0].order_id;
				this.payment.payment_order_id = this.payments[0].payment_order_id;
			}
			this.payment.original_cost = 0;
			this.payment.delivery_charge = 0;
			this.payment.convenience_fee = 0;
			this.payment.booking_charges = 0;
			this.payment.total_tax = 0;
			this.payment.final_total = 0;
			this.payments.forEach(obj => {
				this.payment.original_cost += parseFloat(obj.payment_data.original_cost);
				this.payment.delivery_charge += obj.payment_data.delivery_charge === null ? 0 : parseFloat(obj.payment_data.delivery_charge);
				this.payment.convenience_fee += parseFloat(obj.payment_data.convenience_fee);
				this.payment.booking_charges += parseFloat(obj.payment_data.booking_charges);
				this.payment.total_tax += parseFloat(obj.payment_data.total_tax);
				this.payment.final_total += parseFloat(obj.payment_data.final_total);
			});
		},

		getRZKey() {
			let vm = this;
			this.$store.dispatch('get', { uri: 'devotee/payment_key/' })
				.then(response => {
					vm.rz_key = response.data.key;
				})
				.catch(errors => {
					console.log(errors)
				})
		},

		razorpayPayment() {
			let vm = this;
			var options = {
				key: vm.rz_key,
				amount: (this.payment.final_total * 100),
				currency: "INR",
				name: "Devalaya",
				description: "Payment towards Pooja",
				image: "https://cdn.shopify.com/s/files/1/0735/5895/0166/files/unnamed_copy_ac3ece77-8a3a-44b7-b0f2-820c39455044.jpg?v=1679241399&width=500",
				order_id: this.payment.payment_order_id,
				handler: function (response) {
					vm.placeOrder(response);
				},
				prefill: {
					name: this.devotee_name,
					email: '',
					contact: this.devotee_mobile
				},
				notes: {
					address: "Devalaya",
				},
				theme: {
					color: "#df3002",
				},
			};
			var rzp1 = new Razorpay(options);
			rzp1.on("payment.failed", function (response) {
				alert(JSON.stringify(response))
			});
			rzp1.open();
		},

		placeOrder(rz_response) {
			let vm = this;
			let data = {
				razorpay_response: rz_response,
				request_id: vm.payment.id
			}
			let loader = this.$loading.show();
			this.$store.dispatch('post', { uri: 'devotee/pooja_request/payment/', data: data })
				.then(response => {
					loader.hide();
					this.$store.dispatch('setCart', []);
					vm.$router.push({
						name: 'order',
						params: { payment_id: rz_response.razorpay_payment_id, order_id: vm.order_id },
					});
				})
				.catch(errors => {
					loader.hide();
					console.log(errors)
				})
		},

		makePayment() {
			let vm = this;
			let data = {
				cscid: vm.$store.getters.user.cscid,
				total: vm.payment.final_total,
				payment_order_id: vm.payment.payment_order_id
			}
			let loader = this.$loading.show();
			this.$store.dispatch('post', { uri: 'csc/dsp/payment_request', data: data }).then(response => {
				loader.hide();
				vm.submitPayment(response.data.payment_url, response.data.enc_text)
			}).catch(errors => {
				loader.hide();
				console.log(errors)
			})
		},

		submitPayment(paymentUrl, encText) {
			const form = document.createElement("form");
			form.method = "POST";
			form.action = paymentUrl;

			const input = document.createElement("input");
			input.type = "text";
			input.name = "message";
			input.value = encText;

			form.appendChild(input);
			document.body.appendChild(form);
			form.submit();
		},
	}
}
</script>
<style>
.product-cart {
	width: 100%;
	max-width: 900px;
	/* margin: 0 auto; */
	padding: 20px;
	border: 1px solid #ddd;
	border-radius: 5px;
	background-color: #f9f9f9;
	margin-bottom: 5px;
}

.cart-title {
	text-align: left;
	font-size: 24px;
	font-weight: normal;
	margin-bottom: 20px;
	color: #333;
}

.product-item {
	display: flex;
	align-items: center;
	margin-bottom: 10px;
}

.product-image {
	width: 80px;
	height: 80px;
	object-fit: cover;
	border-radius: 5px;
	margin-right: 15px;
}

.product-details {
	flex-grow: 1;
}

.product-name {
	margin: 0 0 5px;
	font-size: 16px;
}

.product-price {
	margin: 0 0 10px;
	color: #555;
}

.product-quantity {
	display: flex;
	align-items: center;
}

.product-quantity label {
	margin-right: 5px;
}

.remove-product {
	background-color: #ff4d4d;
	color: #fff;
	border: none;
	padding: 8px 12px;
	border-radius: 5px;
	cursor: pointer;
	transition: background-color 0.3s ease;
}

.remove-product:hover {
	background-color: #ff1a1a;
}

.product-title {
	font-size: 18px !important;
	font-weight: bold !important;
	color: #333 !important;
	margin-bottom: 5px !important;
}

.product-description {
	font-size: 14px !important;
	color: #666 !important;
	margin-bottom: 5px !important;
	text-align: left !important;
}

.product-date {
	font-size: 12px !important;
	color: #888 !important;
}

.product-price {
	font-size: 16px !important;
	font-weight: bold !important;
	color: #28a745 !important;
	/* Green color for price */
}

.remove-btn {
	/* background-color: rgb(255, 203, 203) !important; */
	color: white !important;
	border: none !important;
	padding: 6px 12px !important;
	border-radius: 5px !important;
	cursor: pointer !important;
	font-size: 14px !important;
	transition: background-color 0.3s ease !important;
}

.remove-btn:hover {
	background-color: rgb(255, 33, 33) !important;
}
</style>