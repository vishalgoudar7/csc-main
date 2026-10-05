<template>
	<main style="background-color: #fde5d1">
		<section class="pt-5">
			<div class="container">
				<div class="row">
					<div class="col-md-10 col-xl-8 mx-auto">
						<div class="card shadow1 p-5">
							<!-- Image -->
							<div class="text-center" v-if="!request">
								<img style="width: 60%" src="@/assets/banners/4.jpg" class="rounded-top" alt="" />
							</div>
							<div class="text-center" v-if="request">
								<img :src="image" class="temple card-img-middle" alt="Card image" />
							</div>

							<!-- Card body -->
							<div class="card-body text-center p-4">
								<!-- Title -->
								<h5>
									Congratulations your puja is booked Successfully. May God's
									grace be upon you. Devalaya hopes that this pooja will please
									you and fulfill your wishes.
								</h5>
								<!-- <h6 class="card-title fs-3">Congratulations your puja is booked Successfully. May God's grace be upon you. Devalaya hopes that this pooja will please you and fulfill your wishes.</h6> -->
								<!-- <p class="lead mb-3">Pooja has been booked in {{ templeName }}</p> -->

								<!-- Second title -->
								<h6 class="text-primary mb-4">
									Thank you for placing the order. Please find the order details
									below:
								</h6>
								<div class="table-responsive">
									<table class="table table-sm table-primary-sm table-bordered">
										<tbody>
											<tr>
												<td>Temple</td>
												<td>{{ templeName }}</td>
											</tr>
											<tr>
												<td>Order ID</td>
												<td>{{ order_id }}</td>
											</tr>
										</tbody>
									</table>
								</div>
								<!-- Button -->
								<div class="d-sm-flex justify-content-sm-center d-grid">
									<a href="#" @click.prevent="this.$router.push('/bookings')"
										class="btn btn-primary mb-0">OK</a>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>
	</main>
</template>
<script>
export default {
	mounted() {
		this.payment_id = this.$route.params.payment_id;
		this.order_id = this.$route.params.order_id;
		window.scrollTo(0, 0);
		this.getBookings();
		let storedMobileNumber = localStorage.getItem("mobileNumber");
		if (
			storedMobileNumber != null &&
			storedMobileNumber != "null" &&
			storedMobileNumber != "+919080706050"
		) {
			this.$store.dispatch("setsignInMbl", true);
		}
	},

	data() {
		return {
			payment_id: "",
			order_id: "",
			temples: [],
			temple: [],
			image: "",
			templeName: "",
			request: false,
		};
	},

	methods: {
		getBookings() {
			let vm = this;
			let uri = "devotee/pooja_request/list/?search=" + this.order_id;
			this.$store
				.dispatch("get", { uri: uri })
				.then((response) => {
					vm.temples = response.data.results;
					vm.image = vm.temples[0].temple.images[0].image;
					vm.templeName = vm.temples[0].temple.name;
					vm.request = true;
				})
				.catch((errors) => {
					console.warn(errors);
				});
		},
	},
};
</script>
<style>
.shadow1 {
	-webkit-box-shadow: 0px 0px 40px rgba(29, 58, 83, 0.1) !important;
	background-image: url("/src/assets/celebrations.gif");
}
</style>
