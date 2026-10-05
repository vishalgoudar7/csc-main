<template>
	<div style="background-color: #ef5b0c; color: #fff; font-size: 20px; font-weight: bold;">
		e-prasada seva anytime, anywhere through digital innovation
	</div>
	<header class="navbar-light header-sticky" style="border-bottom: 1px solid #cfcfcf;">
		<!-- Logo Nav START -->
		<nav class="navbar navbar-light navbar-expand-lg">
			<div class="container-fluid">
				<!-- Logo START -->
				<router-link to="/" class="p-4">
					<img style="width: 350px;" class="light-mode-item navbar-brand-item" src="@/assets/logo.png"
						alt="logo" />
				</router-link>
				<!-- Logo END -->
				<!-- Responsive navbar toggler -->
				<button class="navbar-toggler ms-auto me-3 p-0" type="button" data-bs-toggle="collapse"
					data-bs-target="#navbarCollapse" aria-controls="navbarCollapse" aria-expanded="false"
					aria-label="Toggle navigation">
					<span class="navbar-toggler-animation">
						<span></span>
						<span></span>
						<span></span>
					</span>
				</button>
				<div class="navbar-collapse collapse" id="navbarCollapse">
					<ul class="navbar-nav navbar-nav-scroll">
						<li class="nav-item">
							<router-link class="nav-link custom-menu py-0" to="/">
								<h6 class="mt-2">Home</h6>
							</router-link>
						</li>
						<li class="nav-item">
							<router-link class="nav-link custom-menu py-0" to="/events">
								<h6 class="mt-2">Events</h6>
							</router-link>
						</li>
						<li class="nav-item">
							<router-link to="/aboutpage" class="nav-link custom-menu py-0">
								<h6 class="mt-2">About Us</h6>
							</router-link>
						</li>
						<li class="nav-item">
							<router-link to="/contact" class="nav-link custom-menu py-0">
								<h6 class="mt-2">Contact Us</h6>
							</router-link>
						</li>
						<li class="nav-item" v-if="$store.getters.user">
							<router-link to="/bookings" class="nav-link custom-menu py-0">
								<h6 class="mt-2">My Bookings</h6>
							</router-link>
						</li>
					</ul>
				</div>
				<div :class="$store.getters.user ? 'd-flex extra-padding' : ''">
					<!-- Devotee Login Button -->
						<a href="https://devalayas.com/#/" target="_blank" class="btn btn-secondary me-2">
							Devotee Login
						</a>
					<button  v-if="$store.getters.user" class="btn btn-primary me-2" @click="showCart()">
						<i class="fa fa-shopping-cart"></i>
						Cart (<span>{{ cartLength }}</span>)
					</button>
					<template v-if="!$store.getters.user">
						<img src="@/assets/login.png" style="height: 80px;" @click="cscLogin()">
					</template>
					<div class="d-flex" v-if="$store.getters.user">
						<img src="../assets/avatar.png" class="avatar me-2" />
						<div class="user-info">
							<div class="user-name">{{ $store.getters.user.name }}</div>
							<div class="user-mobile">{{ $store.getters.user.cscid }}</div>
						</div>
						<a href="#" class="nav-link custom-menu ms-4 mt-2" @click.prevent="logout">
							<h6 style="color: rgb(248, 49, 4);">
								<i class="fa fa-sign-out me-2"></i> Logout
							</h6>
						</a>
					</div>
				</div>
			</div>
		</nav>
		<!-- Logo Nav END -->
		<!-- Cart dialog -->
		<dialog id="cart_dialog" class="daialbox">
			<div class="box-form" style="width:100% !important">
				<div class="right">
					<div style="overflow-y: scroll; padding: 5px">
						<div v-if="getCart.length == 0">
							<h7 class="product-title text-center">Your cart is empty!</h7>
						</div>
						<div v-else>
							<span
								style="color: rgb(252, 112, 5);font-family: 'Merriweather', serif; font-size: larger; font-weight: bold">Your
								Pooja Selections</span>
							<hr>
							<div class="cart-item-entry" v-for="pooja, key in getCart" :key='key'>
								<div class="product-details" style="text-align: left !important">
									<span class="product-title">{{ pooja.pooja_name }}</span><br>
									<span class="product-description">{{ pooja.name }}</span><br>
									<span class="product-date">{{ formattedDate(pooja.pooja_date) }}</span>
								</div>
								<div class="remove-button">
									<button class="remove-btn ms-5 me-2" @click="decrementPooja(pooja)"><i
											class="fa-solid fa-minus"></i></button>
									<span style="color:#ef5b0c">{{ pooja.quantity }}</span>
									<button class="remove-btn ms-2" @click="incrementPooja(pooja)"><i
											class="fa-solid fa-plus"></i></button>
								</div>
							</div>
						</div>
					</div>
					<div style="text-align: center">
						<button v-if="getCart.length" class="button p-0 mb-0" style="vertical-align: middle"
							@click="confirmOrder()">
							Checkout <i class="bi bi-check2-circle"></i>
						</button>
					</div>
				</div>
				<i class="fas fa-times-circle" style="
            font-size: 20px;
            color: rgb(252, 112, 5);
            float: right;
            cursor: pointer;
            margin: 5px;
          " v-on:click="closeCart()"></i>
			</div>
		</dialog>
		<!-- end of Cart dialog -->
		<!-- Confirm order -->
		<dialog id="confirm_dialog" class="daialbox">
			<div class="box-form" style="width: 100% !important;">
				<div class="right">
					<div ref="orderDetails" class="card shadow mb-4" v-if="response">
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
									<span class="h6 fw-light mb-0 me-5">Platform Fee</span>
									<span class="h6 fw-light mb-0">₹{{
										payment?.convenience_fee
									}}</span>
								</li>
								<!-- <li class="list-group-item d-flex justify-content-between py-2">
                  <span class="h6 fw-light mb-0 me-5">Booking Charges</span>
                  <span class="h6 fw-light mb-0">₹{{
                    payment?.booking_charges
                    }}</span>
                </li> -->
								<li class="list-group-item d-flex justify-content-between py-2">
									<span class="h6 fw-light mb-0 me-5">India Postal Charges</span>
									<span class="h6 fw-light mb-0">₹{{
										payment?.delivery_charge
									}}</span>
								</li>
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
							<!-- <button @click="razorpayPayment" class="btn btn-primary w-100 mb-0">
                Place Order
              </button> -->
						</div>
					</div>
					<div style="text-align: center">
						<button v-if="getCart.length" @click="razorpayPayment" class="button p-0 mb-0"
							style="vertical-align: middle">
							Place Order <i class="bi bi-check2-circle"></i>
						</button>
					</div>
				</div>
				<i class="fas fa-times-circle" style="
            font-size: 20px;
            color: rgb(252, 112, 5);
            float: right;
            cursor: pointer;
            margin: 5px;
          " v-on:click="closeConfirm()"></i>
			</div>
		</dialog>
		<!-- end of confirm order -->
	</header>
	
	<main>
		<dialog id="dialog" class="daialbox">
			<div class="box-form">
				<div class="left">
					<img style="height: 100%; width: 100%" src="@/assets/banners/loginimage.jpg" alt="Card image" />
				</div>
				<div class="right">
					<div class="position-relative">
						<div>
							<img style="height: 200px" src="@/assets/banners/Default.png" alt="Card image" />
						</div>
					</div>
					<div style="text-align: center">
						<br />
						<div v-if="!otpSent">
							<div>
								<select v-model="mobileNumber_code" style="
                    max-width: 100%;
                    min-width: 100%;
                    padding: 0.5rem 1rem;
                    font-size: 1rem;
                    font-weight: 400;
                    line-height: 1.5;
                    border-radius: 0.5rem;
                    border: 1px solid #cfcfcf;
                  ">
									<option value="+91">+91 (India)</option>
									<option value="+1">+1 (United States)</option>
									<option value="+33">+33 (France)</option>
									<option value="+44">+44 (United Kingdom Country)</option>
								</select>
							</div>

							<input :class="{ 'is-invalid': error_loginNumber != '' }" type="text" v-model="NumberCode"
								style="
                  /* max-width: 100%; */
                  padding: 0.5rem 1rem;
                  font-size: 1rem;
                  font-weight: 400;
                  line-height: 1.5;
                  border-radius: 0.5rem;
                  border: 1px solid #cfcfcf;
                " placeholder="Enter mobile number" maxlength="10" />
							<span v-if="error_loginNumber != ''" class="invalid-feedback">{{
								error_loginNumber
							}}</span>
							<!-- <div> -->
							<br />
							<div>
								<p style="font-size: x-small; padding: 10px">
									By proceeding you agree to the
									<a href="https://www.devalayas.com/#/TermsAndConditions" target="_blank"
										style="color: rgb(252, 112, 5)" class="fontie">
										Terms and conditions
									</a>
									and
									<a href="https://www.devalayas.com/#/PrivacyPolicy" target="_blank"
										style="color: rgb(252, 112, 5)" class="fontie">
										Privacy policy
									</a>
									of Astro Devalaya
								</p>
							</div>
							<br />
							<div>
								<button class="button p-0 mb-0" style="vertical-align: middle" @click="sendCode">
									Verify <i class="bi bi-check2-circle"></i>
								</button>
							</div>

							<!-- </div> -->
						</div>
						<div :key="elementKey" id="recaptcha-container"></div>
						<br />
						<div v-if="otpSent">
							<div>
								<input type="text" v-model="verificationCode" style="
                    text-align: center;
                    max-width: 100%;
                    min-width: 100%;
                    padding: 0.5rem 1rem;
                    font-size: 1rem;
                    font-weight: 400;
                    line-height: 1.5;
                    border-radius: 0.5rem;
                    border: 1px solid #cfcfcf;
                  " placeholder="Enter OTP" maxlength="6" />
							</div>
							<span v-if="otp_error != ''">{{ otp_error }}</span>
							<br />
							<button class="button p-0 mb-0" style="vertical-align: middle" @click="verifyCode">
								Send <i class="bi bi-send"></i>
							</button>

							<p v-if="!resendButton">
								{{ minutes }}:{{ seconds < 10 ? "0" + seconds : seconds }} </p>
									<div>
										<a v-if="resendButton" style="vertical-align: middle; cursor: pointer"
											@click="ResendCode">
											Resend<i class="bi bi-arrow-clockwise"></i>
										</a>
									</div>
						</div>
					</div>
				</div>
				<i class="fas fa-times-circle" style="
            font-size: 20px;
            color: rgb(252, 112, 5);
            float: right;
            cursor: pointer;
          " v-on:click="closeModal()"></i>
			</div>
		</dialog>
	</main>
</template>
<script>
import firebase from "@/store/firebase.js";
import "firebase/database";
import "firebase/compat/auth";
// import {GoogleAuthProvider,signInWithPopup,getAuth} from "firebase/auth";
import { parsePhoneNumberFromString } from "libphonenumber-js";
import moment from "moment";

export default {
	name: "Header",
	data() {
		return {
			mobileNumber_code: "+91",
			otp_error: "",
			elementKey: 0,
			error_loginNumber: "",
			isValidPhoneNumber: false,
			resendButton: false,
			otpSent: false,
			countryCode: "",
			phoneNumber: "",
			NumberCode: "",
			verificationCode: "",
			verificationId: "",
			user: {
				mobile_number: "",
				login_token: "123",
				app_version: "1",
				device_model: "Browser",
				user_type: "Devotee",
			},
			displayName: "",
			googleEmail: "",
			minutes: 3,
			seconds: 0,
			timer: null,
			recaptcha: "",

			errors: [],
			rz_key: '',
			order_id: '',
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
			response: false
		};
	},
	beforeDestroy() {
		clearInterval(this.timer);
	},
	computed: {
		cartLength() {
			return this.$store.getters.cart.length;
		},
		getCart() {
			return this.$store.getters.cart
		}
	},
	methods: {
		ResendCode() {
			let vm = this;
			vm.minutes = 3;
			vm.seconds = 0;
			vm.timer = null;
			this.user.mobile_number = "";
			this.phoneNumber = "";
			this.NumberCode = "";
			vm.otpSent = false;
			vm.resendButton = false;
			this.elementKey = 1;
		},
		startCountdown() {
			let vm = this;
			this.timer = setInterval(() => {
				if (this.minutes === 0 && this.seconds === 0) {
					clearInterval(this.timer);
					// Timer has reached zero, you can perform any actions here
					vm.resendButton = true;
				} else {
					if (this.seconds === 0) {
						this.minutes--;
						this.seconds = 59;
					} else {
						this.seconds--;
					}
				}
			}, 1000);
		},

		mobileLogin() {
			let vm = this;
			document.getElementById("dialog").showModal();
			vm.minutes = 3;
			vm.seconds = 0;
			vm.timer = null;
			this.user.mobile_number = "";
			this.phoneNumber = "";
			this.NumberCode = "";
			vm.otpSent = false;
			vm.resendButton = false;
		},
		login(number_login) {
			let vm = this;
			let loader = vm.$loading.show();
			this.user.mobile_number = number_login;
			vm.$store
				.dispatch("auth", { uri: "auth/", data: vm.user })
				.then((response) => {
					loader.hide();
					vm.$store.dispatch("setmobileNumber", this.user.mobile_number);
					vm.$store.dispatch("setsignInMbl", true);
					vm.$store.dispatch("setUser", response.data);
					vm.$store.dispatch("setToken", response.data.token);
					vm.$store.dispatch("setTokenType", "Token");
				})
				.catch((error) => {
					loader.hide();
					vm.errors = error.response.data.error;
					vm.$store.dispatch("error", error.response.data.message);
					vm.$store.dispatch("setsignInMbl", false);
				});
		},
		verifyCode() {
			let vm = this;
			this.otp_error = "";
			const credential = firebase.auth.PhoneAuthProvider.credential(
				this.verificationId,
				this.verificationCode
			);
			firebase
				.auth()
				.signInWithCredential(credential)
				.then((result) => {
					this.user.mobile_number =
						this.mobileNumber_code.trim() + this.NumberCode.trim();
					vm.$store.dispatch("setsignInMbl", true);
					document.getElementById("dialog").close();
					// vm.login(this.user.mobile_number);
					this.elementKey += 1;
				})
				.catch((error) => {
					// this.elementKey += 1;
					console.log(error);
					this.otp_error = "Invalid OTP";
				});
		},

		sendCode() {
			let vm = this;
			const appVerifier = new firebase.auth.RecaptchaVerifier(
				"recaptcha-container",
				{ size: "invisible" }
			);
			const regex = /^\+[0-9]{11,12}$/;
			vm.error_loginNumber = "";
			vm.phoneNumber = vm.mobileNumber_code.trim() + this.NumberCode.trim();
			vm.isValidPhoneNumber = regex.test(vm.phoneNumber);
			if (vm.mobileNumber_code == "") {
				vm.error_loginNumber = "Please select country code";
			} else if (this.NumberCode == "") {
				vm.error_loginNumber = "Please enter mobile number";
			} else if (!vm.isValidPhoneNumber) {
				vm.error_loginNumber =
					"Enter your number in the format '+919876543210'.";
			} else {
				const phoneNumber = parsePhoneNumberFromString(this.phoneNumber);

				firebase
					.auth()
					.signInWithPhoneNumber(this.phoneNumber, appVerifier)
					.then((confirmationResult) => {
						this.verificationId = confirmationResult.verificationId;
						this.otpSent = true;
						this.startCountdown();
						vm.phoneNumber = phoneNumber; // Assuming this.phoneNumber is a property of your component
					})
					.then((result) => {
						console.log("Phone authentication successful");
					})
					.catch((error) => {
						this.error_loginNumber = "Please try again later";
						console.error(error.message);
						this.elementKey += 1;
					});
			}
		},
		closeModal() {
			document.getElementById("dialog").close();
		},
		logout() {
			this.$store.dispatch("logout");
			this.$store.dispatch('setCart', []);
			this.$router.push("/");
		},
		showCart() {
			this.$router.push('/pooja_cart');
		},
		viewCart() {
			document.getElementById("cart_dialog").showModal();
		},
		closeCart() {
			document.getElementById('cart_dialog').close();
		},
		formattedDate(pooja_date) {
			return moment(pooja_date).format('DD-MM-YYYY');
		},
		removePooja(pooja) {
			let filteredPooja = this.$store.getters.cart.filter(item =>
				item.sl_id !== pooja.sl_id
			);
			this.$store.dispatch('setCart', filteredPooja);
		},
		confirmOrder() {
			let vm = this;
			document.getElementById("cart_dialog").close();
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
					// vm.request = false;
					vm.response = true;
					vm.getRZKey();
					// vm.order_id = response.data.order_id;
				})
				.catch(errors => {
					loader.hide();
					alert(errors.response.data.errors[0].message[0])
				})

			document.getElementById("confirm_dialog").showModal();
		},
		closeConfirm() {
			document.getElementById("confirm_dialog").close();
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
			this.closeConfirm()
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
		incrementPooja(pooja) {
			pooja.quantity += 1;
		},
		decrementPooja(pooja) {
			pooja.quantity -= 1;
			if (pooja.quantity == 0) {
				this.removePooja(pooja);
			}
		},

		cscLogin() {
			let loader = this.$loading.show();
			this.$store.dispatch('post', { uri: 'auth/csc/dsp' })
				.then(response => {
					loader.hide();
					sessionStorage.setItem("state", response.data.state);
					window.location = response.data.auth_url;
				})
				.catch(errors => {
					loader.hide();
				})
		}
	},
};
</script>

<style>
.login-button {
	padding: 10px 20px;
	font-size: 16px;
	cursor: pointer;
	background-color: #f0f0f0;
	color: #000000;
	border: none;
	border-radius: 5px;
}

.login-button:hover {
	background-color: #f0f0f0;
}

.custom-menu {
	font-size: auto;
	color: rgb(5, 5, 5);
	font-family: commanders;
}

.cancel-symbol {
	color: red;
	font-size: 30px;
	cursor: pointer;
	float: right;
}

.box-form {
	margin: 0 auto;
	width: 80%;
	background: #ffffff;
	border-radius: 10px;
	overflow: hidden;
	display: flex;
	flex: 1 1 100%;
	align-items: stretch;
	justify-content: space-between;
	/* box-shadow: 0 0 20px 6px #090b6f85; */
}

@media (max-width: 980px) {
	.box-form {
		flex-flow: wrap;
		text-align: center;
		align-content: center;
		align-items: center;
	}
}

.box-form div {
	height: auto;
}

.box-form .left {
	color: #ffffff;
	background-size: cover;
	background-repeat: no-repeat;
	background-image: url("https://i.pinimg.com/736x/5d/73/ea/5d73eaabb25e3805de1f8cdea7df4a42--tumblr-backgrounds-iphone-phone-wallpapers-iphone-wallaper-tumblr.jpg");
	overflow: hidden;
}

.box-form .left .overlay {
	padding: 30px;
	width: 100%;
	height: 100%;
	background: #5961f9ad;
	overflow: hidden;
	box-sizing: border-box;
}

.box-form .left .overlay h1 {
	font-size: 10vmax;
	line-height: 1;
	font-weight: 900;
	margin-top: 40px;
	margin-bottom: 20px;
}

.box-form .left .overlay span p {
	margin-top: 30px;
	font-weight: 900;
}

.box-form .left .overlay span a {
	background: #3b5998;
	color: #ffffff;
	margin-top: 10px;
	padding: 14px 50px;
	border-radius: 100px;
	display: inline-block;
}

.box-form .left .overlay span a:last-child {
	background: #1dcaff;
	margin-left: 30px;
}

.box-form .right {
	padding: 40px;
	/* overflow: hidden; */
}

@media (max-width: 980px) {
	.box-form .right {
		width: 100%;
	}
}

.box-form .right h5 {
	font-size: 6vmax;
	line-height: 0;
}

.box-form .right p {
	font-size: 14px;
	color: #b0b3b9;
}

.box-form .right .inputs {
	overflow: hidden;
}

.box-form .right input {
	width: 100%;
	padding: 10px;
	margin-top: 25px;
	font-size: 16px;
	border: none;
	outline: none;
	border-bottom: 2px solid #b0b3b9;
}

.box-form .right .remember-me--forget-password {
	display: flex;
	justify-content: space-between;
	align-items: center;
}

.box-form .right .remember-me--forget-password input {
	margin: 0;
	margin-right: 7px;
	width: auto;
}

.box-form .right button {
	color: #fff;
	font-size: 16px;
	padding: 12px 35px;
	border-radius: 50px;
	display: inline-block;
	border: 0;
	outline: 0;
	background: linear-gradient(140deg, #ff9800, #ff5757);
}

.daialbox {
	border: 1px solid #ffffff00;
	border-radius: 8px;
	padding: 0%;
	background-color: transparent;
}

/*  */
.cart-item-entry {
	display: flex !important;
	padding: 15px !important;
	margin-bottom: 15px !important;
	border: 1px solid #ddd !important;
	border-radius: 8px !important;
	background-color: #f9f9f9 !important;
	justify-content: space-between !important;
	align-items: center !important;
}

.product-image img {
	width: 80px !important;
	height: auto !important;
	border-radius: 5px !important;
	margin-right: 15px !important;
}

.product-details {
	flex-grow: 1 !important;
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

.remove-button {
	text-align: center !important;
}

.remove-btn {
	background-color: red !important;
	color: white !important;
	border: none !important;
	padding: 6px 12px !important;
	border-radius: 5px !important;
	cursor: pointer !important;
	font-size: 14px !important;
	transition: background-color 0.3s ease !important;
}

.remove-btn:hover {
	background-color: darkred !important;
}

.extra-padding {
	padding: 15px;
}

.user-info {
	display: flex;
	flex-direction: column;
	font-size: 14px;
	text-align: left;
}

.user-name {
	font-weight: bold;
	white-space: nowrap;
	/* Prevents wrapping */
}

.user-mobile {
	color: gray;
	font-size: 12px;
	white-space: nowrap;
}
</style>
