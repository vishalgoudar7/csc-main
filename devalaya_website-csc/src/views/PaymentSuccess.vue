<template>
	<main style="background-color: #fde5d1">
		<section class="pt-5">
			<div class="container">
				<div class="row">
					<div class="col-md-10 col-xl-8 mx-auto">
						<div class="card shadow1 p-5">
							<div class="text-center">
								<img style="width: 40%" src="@/assets/banners/4.jpg" class="rounded-top" alt="" />
							</div>
							<div class="card-body text-center p-4">
								<h5 class="heading" style="font-size: 15px">
									Congratulations your puja/prasada is booked Successfully. May God's
									grace be upon you. Devalaya hopes that this pooja/prasada will please
									you and fulfill your wishes.
								</h5>
								<h6 class="text-primary mt-2 mb-4" style="font-size: 15px">
									Thank you for placing the order. Please find the order details
									below:
								</h6>
								<div class="table-responsive">
									<table class="table table-sm table-primary-sm table-bordered">
										<tbody>
											<tr>
												<td>Payment ID</td>
												<td>{{ transactionId }}</td>
											</tr>
											<tr>
												<td>CSC ID</td>
												<td>{{ cscId }}</td>
											</tr>
										</tbody>
									</table>
								</div>
								<div class="d-sm-flex justify-content-sm-center d-grid">
									<a href="#" @click.prevent="$router.push('/bookings')"
										class="btn btn-primary mb-0">Bookings</a>
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
	data() {
		return {
			transactionId: "",
			cscId: "",
		};
	},
	beforeRouteEnter(to, from, next) {
		next(vm => {
			vm.transactionId = to.query.csc_txn || "NA";
			vm.cscId = to.query.csc_id || "NA";
			vm.$store.dispatch('setCart', []);
		});
	}
};
</script>
