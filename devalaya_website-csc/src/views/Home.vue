<template>
	<main>
		<div style="background-color: white;" v-if="!$store.getters.user">
			<div style="background-color: #ef5b0c; color: #fff; font-size: 20px; font-weight: bold;">
				Devotees can visit their nearby CSC Seva Center (Digital India) to book Prasadam online. Our Village Level Entrepreneurs (VLEs) will assist you in ordering Prasadam from temples through CSC.Devalayas.com. Alternatively, you can also call your local VLE to place your order easily and conveniently and get more information.
			</div>
			<div class="container-fluid header bg-white p-0">
				<div class="row g-0 align-items-center flex-column-reverse flex-lg-row">
					<div class="col-12 col-sm-12 col-md-6">
						<img class="img-fluid w-100" src="../../public/banners/minister.jpg" alt=""
							style="padding: 0px;" />
					</div>

					<div class="col-12 col-sm-12 col-md-6 wow fadeIn" data-wow-delay="0.5s">
						<div id="carouselExampleControls" class="carousel slide" data-bs-ride="carousel">
							<div class="carousel-inner">
								<div class="carousel-item active">
									<img class="d-block w-100" src="../../public/banners/banner-1.png"
										alt="First slide" />
								</div>
								<div class="carousel-item">
									<img class="d-block w-100" src="../../public/banners/banner-2.png"
										alt="Second slide" />
								</div>
								<div class="carousel-item">
									<img class="d-block w-100" src="../../public/banners/banner-3.png"
										alt="Third slide" />
								</div>
							</div>
							<a class="carousel-control-prev" href="#carouselExampleControls" role="button"
								data-bs-slide="prev">
								<span class="carousel-control-prev-icon" aria-hidden="true"></span>
								<span class="sr-only">Previous</span>
							</a>
							<a class="carousel-control-next" href="#carouselExampleControls" role="button"
								data-bs-slide="next">
								<span class="carousel-control-next-icon" aria-hidden="true"></span>
								<span class="sr-only">Next</span>
							</a>
						</div>
					</div>
				</div>
			</div>
		</div>
		<div class="container-fluid mt-4">
			<h3 class="col-12 text-center mb-0" style="color: #ef5b0c;">
				SEARCH TEMPLES
			</h3>
			<p>
				Reserve Prasadam and Pujas for yourself and your family at over 1,000 renowned temples across India, all
				under your name.
			</p>
			<template v-if="$store.getters.user">
				<div class="row">
					<div class="col-xl-8 mx-auto">
						<div class="bg-blur bg-white bg-opacity-10 border border-light border-opacity-25 rounded-3 p-4">
							<div class="row g-3 justify-content-center align-items-center">
								<div class="col-lg-10">
									<div class="form-input-dropdown position-relative">
										<input v-model="meta.search" placeholder="Search for Temple"
											class="form-control form-control-lg me-1 ps-5" @keyup.enter="search"
											type="text" />
									</div>
								</div>
								<div class="col-lg-2 d-grid">
									<a class="btn btn-lg btn-primary mb-0" href="#" @click.prevent="search">Search</a>
								</div>
							</div>
						</div>
					</div>
				</div>
				<div class="row g-1">
					<div class="col-sm-12 col-md-6 col-lg-custom col-xl-2" v-for="(card, index) in cards" :key="index">
						<div>
							<a href="#" @click.prevent="viewTemple(card.id)">
								<div class="card-hover" @mouseover="showDetails(index)" @mouseleave="hideDetails">
									<img :src="card.images[0]?.image" :alt="card.title" class="card-hover-image" />
									<div v-if="card.showDetails" class="card-hover-popup">
										<h6 style="color: #80f3e7;">🙏 {{ card.name }}</h6>
										<h6 style="color: #bc990c;">📍 {{ card.area }}</h6>
										<div>
											Participate Now
											<i class="fa fa-arrow-right pl-2 text-light my-auto"
												style="position: relative; font-size: 16px;" aria-hidden="true"></i>
										</div>
									</div>
								</div>
								<h6>{{ card.name }}</h6>
							</a>
						</div>
					</div>
					<Paginate class="pagination pagination-sm mb-4" :maxPage="meta.maxPage" :totalPages="meta.lastPage"
						:currentPage="meta.page" @pagechanged="onPageChange" />
				</div>
			</template>
		</div>
	</main>
</template>
<script>
import Paginate from "@/components/Pagination.vue";

export default {
	name: "ClarityIntegration",
	components: { Paginate },
	data() {
		return {
			meta: {
				page: 1,
				size: 15,
				count: 0,
				maxPage: 1,
				lastPage: 1,
				search: "",
				ordering: "name_en",
				date: "2",
			},
			cards: [],
		};
	},

	beforeRouteEnter(to, from, next) {
		next((vm) => {
			if (to.query.state && to.query.code && sessionStorage.getItem("state") == to.query.state) {
				let loader = vm.$loading.show();
				let data = {
					code: to.query.code,
				};
				vm.$store
					.dispatch("post", { uri: "auth/csc/dsp/callback", data: data })
					.then((response) => {
						loader.hide();
						sessionStorage.removeItem("state");
						vm.$store.dispatch("setUser", response.data);
						vm.$store.dispatch("setToken", response.data.token);
						vm.$store.dispatch("setTokenType", "Token");
						vm.getTemples();
					})
					.catch((errors) => {
						console.log(errors);
						loader.hide();
					});
			}
		});
	},

	mounted() {
		window.scrollTo(0, 0);
		if (this.$store.getters.user) {
			this.getTemples();
		}
	},

	methods: {
		showDetails(index) {
			this.cards[index].showDetails = true;
		},
		hideDetails() {
			this.cards.forEach((card) => {
				card.showDetails = false;
			});
		},
		getTemples() {
			let vm = this;
			let uri = "devotee/temple/?page=" + vm.meta.page + "&size=" + vm.meta.size + "&search=" + vm.meta.search + "&ordering=" + vm.meta.ordering;
			vm.$store
				.dispatch("get", { uri: uri })
				.then(function (response) {
					vm.cards = response.data.results;
					vm.meta.count = response.data.count;
					vm.meta.lastPage = Math.ceil(vm.meta.count / vm.meta.size);
					vm.meta.maxPage = vm.meta.lastPage >= 3 ? 3 : vm.meta.lastPage;
				})
				.catch((errors) => {
					console.log(errors);
				});
		},
		onPageChange(page) {
			this.meta.page = page;
			this.getTemples();
		},
		search() {
			this.meta.page = 1;
			this.getTemples();
		},
		viewTemple(id) {
			this.$router.push("temples?id=" + id);
		},
	},
};
</script>
<style>
video {
	pointer-events: none;
	/* Disable pointer events on the video */
}

.imagesize {
	height: 350px;
}

.video-container {
	position: relative;
	width: 100%;
	overflow: hidden;
}

.responsive-video {
	width: 100%;
	height: 100%;
	object-fit: cover;
}

.swiper {
	width: 100%;
	padding-top: 50px;
	padding-bottom: 50px;
}

.swiper-slide {
	background-position: center;
	background-size: cover;
	width: 300px;
	height: 300px;
}

.swiper-slide img {
	display: block;
	width: 100%;
}

.temple {
	border-radius: 9px;
	object-fit: cover;
	width: 100%;
	height: 250px;
}

.no-padding {
	background-color: transparent;
	margin-top: -70px;
}

@media only screen and (max-width: 375px) {
	.carousel__slide .carousel__slide--visible .carousel__slide--active {
		width: 100% !important;
	}

	.carousel__slide .carousel__slide--clone .carousel__slide--visible .carousel__slide--prev {
		width: 100% !important;
	}

	.carousel-inner {
		position: relative;
		width: 100%;
		overflow: hidden;
	}

	.carousel-caption {
		top: 300px;
		text-align: left;
		background-color: white;
		padding: 35px;
		width: fit-content;
	}

	.carousel-item.active {
		display: block;
	}

	.ba-1 {
		background-size: cover;
		background-position: top left;
	}
}

.imagetext {
	top: 150px;
	float: left;
}

.spls {
	margin: 0.1em 0;
	padding: 0.2em 0;
	display: flex;
	flex-direction: row;
	flex-wrap: wrap;
	align-content: normal;
	justify-content: space-evenly;
	align-items: center;
	justify-content: space-evenly;
	-ms-overflow-style: none;
	scrollbar-width: none;
	transition: top 0.3s;
	padding-top: 40px;
	padding-bottom: 30px;
}

.splimg {
	position: relative;
	height: 65px;
	width: 65px;
	margin: 0.2em auto;
	border: 2px solid var(--primary);
	border-radius: 50%;
	overflow: hidden;
	padding: 0;
}

.splimgEvent {
	height: 250px;
	min-width: 200px;
}

.spl {
	margin: 0.2em 0.5em;
	text-align: center;
	font-family: Poppins;
	font-size: 0.75em;
	color: rgba(0, 0, 0, 0.8);
	cursor: pointer;
}

@media only screen and (max-width: 1200px) {
	.splimgEvent {
		height: 50px;
		min-width: 25px;
	}

	.single-list-topics-content {
		display: flex;
		align-items: center;
		flex-direction: column;
		justify-content: center;
		max-height: 100px;
		background: #fff;
		border-radius: 3px;
		margin-right: 10px;
		margin-bottom: 20px;
		border-radius: 20px;
	}
}

@media (min-width: 1200px) {
	.col-xl-3 {
		-webkit-box-flex: 0;
		-ms-flex: 0 0 auto;
		flex: 0 0 auto;
		width: 35%;
		margin-top: 20px;
	}
}

.vertical-card {
	border: 1px solid #ccc;
	border-radius: 8px;
	margin: 10px;
	overflow: hidden;
}

.card-content {
	display: flex;
}

.card-image {
	flex: 1;
}

.card-image img {
	width: 100%;
	height: auto;
	border-radius: 8px 0 0 8px;
}

.card-title {
	flex: 2;
	padding: 20px;
}

.card-title h2 {
	margin: 0;
}

* {
	-webkit-box-sizing: border-box;
	-moz-box-sizing: border-box;
	box-sizing: border-box;
}

body {
	font-family: "Dosis", sans-serif;
	text-align: center;
}

.clear {
	clear: both;
}

.bg-image {
	position: sticky;
}

.card {
	border: 1px solid #ccc;
	border-radius: 8px;
}

/* circulR SLIDE */
.circle-container {
	position: relative;
	margin: auto;
	overflow: hidden;
}

.circle-image {
	position: absolute;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);
	cursor: pointer;
	transition: transform 0.3s ease-in-out;
}

.circle-image img {
	width: 50px;
	height: 50px;
	border-radius: 50%;
}

.selected-image {
	text-align: center;
	margin-top: 10px;
}

.selected-image img {
	width: 80px;
	height: 80px;
	border-radius: 50%;
}

.selected-image p {
	margin: 5px 0;
	font-weight: bold;
}

.bimage {
	background-image: url(https://media.giphy.com/media/U3qYN8S0j3bpK/giphy.gif);
}

@media (min-width: 992px) {
	.col-lg-6 {
		color: transparent;
	}

	.col-lg-4 {
		-webkit-box-flex: 0;
		-ms-flex: 0 0 33.333333%;
		flex: 0 0 33.333333%;
		max-width: 33.333333%;
	}
}

@media (min-width: 768px) {
	.col-md-4 {
		-webkit-box-flex: 0;
		-ms-flex: 0 0 33.333333%;
		flex: 0 0 33.333333%;
		max-width: 33.333333%;
	}
}

.carousel {
	transform-style: preserve-3d;
	/* display: flex; */
}

.ml-auto,
.mx-auto {
	margin-left: auto !important;
}

.mr-auto,
.mx-auto {
	margin-right: auto !important;
}

.w-100 {
	width: 100% !important;
}

.carousel {
	position: relative;
}

.carousel-container {
	overflow: hidden;
	width: max-content;
}

.ml-auto,
.mx-auto {
	margin-left: auto !important;
}

.mr-auto,
.mx-auto {
	margin-right: auto !important;
}

.w-100 {
	width: 100% !important;
}

.pl-0,
.px-0 {
	padding-left: 0 !important;
}

.pr-0,
.px-0 {
	padding-right: 0 !important;
}

.container-fluid {
	width: 100%;
	padding-right: 15px;
	padding-left: 15px;
	margin-right: auto;
	margin-left: auto;
}

/* popup */
.card-hover {
	position: relative;
	overflow: hidden;
	/* width: 200px; */
	height: 300px;
	margin: 20px;
	border: 1px solid #ccc;
	border-radius: 8px;
	transition: transform 0.3s;
}

.card-hover:hover {
	transform: scale(1.3);
}

.card-hover-image {
	align-items: center;
	width: 100%;
	height: 100%;
	object-fit: cover;
}

.card-hover-popup {
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	background: rgba(0, 0, 0, 0.7);
	color: #fff;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	opacity: 0;
	transform: translateY(20px);
	transition: opacity 0.3s, transform 0.3s;
}

.card-hover:hover .card-hover-popup {
	opacity: 1;
	transform: translateY(0);
}

.circular-gallery {
	display: flex;
	justify-content: center;
	align-items: center;
	height: 100vh;
}

.circle {
	position: relative;
	width: 240px;
	height: 240px;
}

.gallery-item {
	position: absolute;
	top: 50%;
	left: 50%;
	transform-origin: center center;
	transform: translate(-50%, -50%);
	cursor: pointer;
}

.gallery-item img {
	width: 50px;
	/* Adjust the size of the images */
	height: 50px;
	/* Adjust the size of the images */
	border-radius: 50%;
}

.gallery-item img:hover {
	border: 2px solid #ff5733;
}

/* Event New */
@media (min-width: 992px) {
	.col-lg-6 {
		color: transparent;
	}

	.col-lg-4 {
		-webkit-box-flex: 0;
		-ms-flex: 0 0 33.333333%;
		flex: 0 0 33.333333%;
		max-width: 33.333333%;
	}
}

@media (min-width: 768px) {
	.col-md-4 {
		-webkit-box-flex: 0;
		-ms-flex: 0 0 33.333333%;
		flex: 0 0 33.333333%;
		max-width: 33.333333%;
	}
}

.carousel-container * {
	box-sizing: border-box;
}

.carousel-caption-custom-1 {
	padding: 12px 5px;
	font-family: "Poppins";
	font-style: normal;
	font-weight: 700;
	font-size: 12px;
	line-height: 140%;
	z-index: 10;
	color: #fff;
	text-align: center;
	position: absolute;
	bottom: 7%;
	width: 88%;
	border-top: 1px #fff solid;
}

.addwrap {
	overflow: hidden !important;
	text-overflow: ellipsis;
	display: -webkit-box;
	-webkit-line-clamp: 3;
	line-clamp: 3;
	-webkit-box-orient: vertical;
}

.text-left {
	text-align: left !important;
}

@media (min-width: 768px) {
	.titletext {
		font-family: "Poppins";
		font-style: normal;
		font-weight: 600;
		font-size: 11px;
		line-height: 110%;
		color: #ffffff;
	}
}

@media (min-width: 940px) {
	.titletext {
		font-family: "Poppins";
		font-style: normal;
		font-weight: 600;
		font-size: 11px;
		line-height: 110%;
		color: #ffffff;
	}
}

.titletext {
	font-family: "Poppins";
	font-style: normal;
	font-weight: 600;
	font-size: 13px;
	line-height: 140%;
	color: #ffffff;
}

.pb-2,
.py-2 {
	padding-bottom: 0.5rem !important;
}

@media (min-width: 768px) {
	.subtitletext {
		font-family: "Poppins";
		font-style: normal;
		font-weight: 600;
		font-size: 12px;
		line-height: 120%;
		color: #ffffff;
	}
}

@media (min-width: 940px) {
	.subtitletext {
		font-family: "Poppins";
		font-style: normal;
		font-weight: 600;
		font-size: 12px;
		line-height: 120%;
		color: #ffffff;
	}
}

.subtitletext {
	font-family: "Poppins";
	font-style: normal;
	font-weight: 700;
	font-size: 14px;
	line-height: 140%;
	color: #ffffff;
}

.col {
	-ms-flex-preferred-size: 0;
	flex-basis: 0;
	-webkit-box-flex: 1;
	-ms-flex-positive: 1;
	flex-grow: 1;
	max-width: 100%;
}

.participatebuttonclass {
	font-family: "Poppins";
	font-style: normal;
	font-weight: 800;
	font-size: 16px;
	line-height: 110%;
	display: flex;
	align-items: center;
	text-transform: uppercase;
	color: #ffffff;
}

.responsive-section {
	display: flex;
	flex-wrap: wrap;
}

.div1 {
	order: 1;
	/* Initially div1 */
}

.div2 {
	order: 2;
	/* Initially div2 */
}

@media (min-width: 1200px) {
	.box {
		flex: 1;
	}
}

@media (max-width: 1200px) {
	.div1 {
		order: 1;
	}

	.div2 {
		order: 2;
	}
}

.box {
	flex: 1;
	padding: 20px;
	box-sizing: border-box;
}

.left-box {
	order: 1;
	/* Initially left box */
}

.right-box {
	order: 2;
	/* Initially right box */
}

img {
	max-width: 100%;
	height: auto;
}

/*  */
.app-info-section {
	display: flex;
	flex-wrap: wrap;
	/* Allow items to wrap to the next line on smaller screens */
}

.app-info {
	flex: 1;
	min-width: 200px;
	/* Set a minimum width for better responsiveness */
	padding: 20px;
	background-color: #f0f0f0;
}

.divider-section {
	flex: 1;
	display: flex;
	flex-wrap: wrap;
	/* Allow items to wrap to the next line on smaller screens */
}

.divider-item {
	flex: 1;
	min-width: 150px;
	/* Set a minimum width for better responsiveness */
	padding: 20px;
	border: 1px solid #ccc;
	margin: 10px;
	/* Add margin for separation */
}

/*  */
.app-info-section {
	display: flex;
	flex-wrap: wrap;
	/* Allow items to wrap to the next line on smaller screens */
}

.app-info {
	flex: 1;
	min-width: 200px;
	/* Set a minimum width for better responsiveness */
	padding: 20px;
	background-color: #f0f0f0;
}

.divider-section {
	flex: 1;
	display: flex;
	flex-direction: column;
}

.divider-row {
	display: flex;
	flex: 1;
}

.divider-item {
	flex: 1;
	min-width: 150px;
	padding: 20px;
	border: 0px;
	margin: 10px;
}

.rolling-number {
	font-size: 24px;
	display: inline-flex;
}

.digit {
	transition: transform 0.1s ease-in-out;
	display: inline-block;
}

@media (min-width: 992px) {
	.col-lg-4 {
		-webkit-box-flex: 0;
		-ms-flex: 0 0 33.333333%;
		flex: 0 0 33.333333%;
		max-width: 33.333333%;
	}
}

@media (min-width: 768px) {
	.col-md-4 {
		-webkit-box-flex: 0;
		-ms-flex: 0 0 33.333333%;
		flex: 0 0 33.333333%;
		max-width: 33.333333%;
	}
}

.ml-auto,
.mx-auto {
	margin-left: auto !important;
}

.mr-auto,
.mx-auto {
	margin-right: auto !important;
}

.w-100 {
	width: 100% !important;
}

.img-fluid {
	max-width: 100%;
	height: auto;
}

img {
	vertical-align: middle;
	border-style: none;
}

.carousel-caption-custom-1 {
	padding: 12px 5px;
	font-family: "Poppins";
	font-style: normal;
	font-weight: 700;
	font-size: 12px;
	line-height: 140%;
	z-index: 10;
	color: #fff;
	text-align: center;
	position: absolute;
	bottom: 7%;
	width: 88%;
	border-top: 1px #fff solid;
}

.addwrap {
	overflow: hidden !important;
	text-overflow: ellipsis;
	display: -webkit-box;
	-webkit-line-clamp: 3;
	line-clamp: 3;
	-webkit-box-orient: vertical;
}

/*  */
@media (min-width: 768px) {
	.titletext {
		font-family: "Poppins";
		font-style: normal;
		font-weight: 600;
		font-size: 11px;
		line-height: 110%;
		color: #ffffff;
	}
}

@media (min-width: 940px) {
	.titletext {
		font-family: "Poppins";
		font-style: normal;
		font-weight: 600;
		font-size: 11px;
		line-height: 110%;
		color: #ffffff;
	}
}

.titletext {
	font-family: "Poppins";
	font-style: normal;
	font-weight: 600;
	font-size: 13px;
	line-height: 140%;
	color: #ffffff;
}

/*  */
@media (min-width: 768px) {
	.subtitletext {
		font-family: "Poppins";
		font-style: normal;
		font-weight: 600;
		font-size: 12px;
		line-height: 120%;
		color: #ffffff;
	}
}

@media (min-width: 940px) {
	.subtitletext {
		font-family: "Poppins";
		font-style: normal;
		font-weight: 600;
		font-size: 12px;
		line-height: 120%;
		color: #ffffff;
	}
}

.subtitletext {
	font-family: "Poppins";
	font-style: normal;
	font-weight: 700;
	font-size: 14px;
	line-height: 140%;
	color: #ffffff;
}

/*  */
.participatebuttonclass {
	font-family: "Poppins";
	font-style: normal;
	font-weight: 800;
	font-size: 16px;
	line-height: 110%;
	display: flex;
	align-items: center;
	text-transform: uppercase;
	color: #ffffff;
}

.pl-4,
.px-4 {
	padding-left: 1.5rem !important;
}

.pb-4,
.py-4 {
	padding-bottom: 1.5rem !important;
}

.pr-4,
.px-4 {
	padding-right: 1.5rem !important;
}

.pt-4,
.py-4 {
	padding-top: 1.5rem !important;
}

.pl-0,
.px-0 {
	padding-left: 0 !important;
}

.pr-0,
.px-0 {
	padding-right: 0 !important;
}

.container-fluid {
	width: 100%;
	padding-right: 5px;
	padding-left: 5px;
	margin-right: auto;
	margin-left: auto;
}

.col-lg-custom {
	flex: 0 0 20%;
	max-width: 20%;
}

@media (max-width: 991.98px) {
	.col-lg-custom {
		flex: 0 0 50%;
		max-width: 50%;
	}
}

@media (max-width: 575.98px) {
	.col-lg-custom {
		flex: 0 0 100%;
		max-width: 100%;
	}
}
</style>
