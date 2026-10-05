<template>
	<main style="background-color: #fde5d1">
		<section class="pt-4">
			<div class="container-fluid vstack gap-4">
				<div class="row">
					<div class="col-12">
						<div class="card border">
							<div class="card-header border-bottom">
								<h5 class="card-header-title">Bookings</h5>
							</div>
							<div class="card-body" v-if="count != 0">
								<div class="row g-3 align-items-center justify-content-between mb-3">
									<div class="col-md-12">
										<div class="rounded position-relative">
											<input class="form-control pe-5" type="search" placeholder="Search"
												aria-label="Search" v-model="meta.search" @keyup.enter="search" />
											<button
												class="btn border-0 px-3 py-0 position-absolute top-50 end-0 translate-middle-y"
												type="button">
												<i class="fas fa-search fs-6"></i>
											</button>
										</div>
									</div>
								</div>
								<div class="table-responsive border-0">
									<table class="table align-middle p-4 mb-0 table-hover table-shrink">
										<thead class="table-light">
											<tr>
												<th scope="col" class="border-0 rounded-start">#</th>
												<th scope="col" class="border-0">Order ID</th>
												<th scope="col" class="border-0">Payment Order ID</th>
												<th scope="col" class="border-0">Devotee</th>
												<th scope="col" class="border-0">Mobile No</th>
												<th scope="col" class="border-0">Pooja Date</th>
												<th scope="col" class="border-0">Tracking No</th>
												<th scope="col" class="border-0">Courrier Name</th>
												<th scope="col" class="border-0">Status</th>
												<th scope="col" class="border-0">Amount</th>
												<!-- <th scope="col" class="border-0">Payment</th> -->
												<th scope="col" class="border-0 rounded-end">Action</th>
												<!-- <th scope="col" class="border-0 rounded-end">
													Pooja Video
												</th> -->
											</tr>
										</thead>
										<tbody class="border-top-0">
											<tr v-for="(booking, key) in bookings" :key="key">
												<td>
													<h6 class="mb-0">{{ key + 1 }}</h6>
												</td>
												<td>
													<h6 class="mb-0">{{ booking.order_id }}</h6>
												</td>
												<td>{{ booking.payment_order_id }}</td>
												<td>{{ booking.name }}</td>
												<td>{{ booking.devotee_number }}</td>
												<td>
													<h6 class="mb-0 fw-light">
														{{ booking.pooja_date }}
													</h6>
												</td>
												<td>{{ booking.docket_number }}</td>
												<td>{{ booking.courrier_name }}</td>
												<td>
													<div v-if="booking.status == 'Pending'"
														class="badge text-bg-warning">
														{{ booking.status }}
													</div>
													<div v-else-if="booking.status == 'Expired'"
														class="badge text-bg-danger">
														{{ booking.status }}
													</div>
													<div v-else-if="booking.status == 'Completed'"
														class="badge text-bg-success">
														{{ booking.status }}
													</div>
													<div v-else class="badge text-bg-info">
														{{ booking.status }}
													</div>
												</td>

												<td>
													<h6 class="mb-0">{{ booking.total_cost }}</h6>
												</td>
												<td>
													<a target="_blank" :href="booking.invoice"
														class="btn btn-sm btn-light mb-0" style="
                              border-radius: 20px;
                              background-color: #ef5b0c;
                              color: white;
                            ">Invoice</a>
												</td>
												<!-- <td>
													<div v-if="booking.status == 'Completed'">
														<button class="btn btn-sm btn-light mb-0" style="
                                border-radius: 20px;
                                background-color: #ef5b0c;
                                color: white;
                              " @click="videoPlay(booking.id)">
															<span>Play</span>
														</button>
													</div>
												</td> -->
											</tr>
										</tbody>
									</table>
								</div>
							</div>
							<div class="card-footer">
								<Pagination class="pagination pagination-sm" :maxPage="meta.maxPage"
									:totalPages="meta.lastPage" :currentPage="meta.page" @pagechanged="onPageChange" />
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>
	</main>
</template>
<script>
import Pagination from "../components/Pagination.vue";
export default {
	name: "Bookings",
	components: { Pagination },

	data() {
		return {
			meta: {
				page: 1,
				size: 10,
				count: 0,
				maxPage: 1,
				lastPage: 1,
				search: "",
				ordering: "",
			},
			bookings: [],
			load_status: "",
			videoLink: "",
		};
	},

	mounted() {
		this.getBookings();
		let storedMobileNumber = localStorage.getItem("mobileNumber");
		if (
			storedMobileNumber != null &&
			storedMobileNumber != "null" &&
			storedMobileNumber != "+919080706050"
		) {
			this.$store.dispatch("setsignInMbl", true);
		}
		window.scrollTo(0, 0);
	},

	methods: {
		videoPlay(video_id) {
			let vm = this;
			let uri = "devotee/pooja_request/" + video_id;
			this.$store
				.dispatch("get", { uri: uri })
				.then((response) => {
					// console.log(response.data.videos[0].video);
					vm.videoLink = response.data.videos[0].video;

					var newTab = window.open(vm.videoLink, "_blank");
					if (newTab) {
						newTab.document.write(
							'<video controls autoplay src="' + videoUrl + '"></video>'
						);
					} else {
						console.warn(
							"Unable to open new tab. Please allow pop-ups and try again."
						);
					}
				})
				.catch((errors) => {
					console.warn(errors);
				});
		},
		getBookings() {
			let vm = this;
			let uri =
				"devotee/pooja_request/list/?page=" +
				this.meta.page +
				"&size=" +
				this.meta.size +
				"&search=" +
				this.meta.search;
			this.$store
				.dispatch("get", { uri: uri })
				.then((response) => {
					// console.log(response.data.results);
					vm.bookings = response.data.results;
					vm.meta.count = response.data.count;
					vm.meta.lastPage = Math.ceil(vm.meta.count / vm.meta.size);
					vm.meta.maxPage = vm.meta.lastPage >= 3 ? 3 : vm.meta.lastPage;
				})
				.catch((errors) => {
					console.warn(errors);
				});
		},
		onPageChange(page) {
			this.meta.page = page;
			this.getBookings();
		},

		search() {
			this.meta.page = 1;
			this.getBookings();
		},

		viewBooking(booking) {
			this.$router.push("bookings/" + booking.id);
		},
	},
};
</script>
