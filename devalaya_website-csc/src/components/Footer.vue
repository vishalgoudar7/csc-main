<template>
	<footer class="bg-image py-2">
		<div class="footer-container d-flex justify-content-between align-items-center">
			<div class="footer-column">
				<img class="h-50px" src="@/assets/logo.png" alt="logo" />
			</div>
			<div class="footer-column pt-2">
				<div class="fontie h6">
					Copyrights ©2025 Devalaya. All rights reserved.
				</div>
			</div>
		</div>
	</footer>
</template>

<script>
export default {
	name: "Header",
	data() {
		return {
			showAboutWebsite: true,
			showQuickLinks: true,
			showSupport: true,
			showContactUs: true,
		};
	},
	computed: {
		// Determine whether to show 2 columns for mobile view
		isMobileView() {
			return window.innerWidth <= 1136; // Adjust the breakpoint as needed
		},
	},
	watch: {
		// Watch for changes in the isMobileView property
		isMobileView(value) {
			// Hide or show columns based on the screen size
			this.showAboutWebsite = value;
			this.showQuickLinks = value;
			this.showSupport = !value;
			this.showContactUs = !value;
		},
	},
	mounted() {
		window.addEventListener("resize", this.handleResize);
	},
	methods: {
		// Handle the window resize event
		handleResize() {
			this.isMobileView = window.innerWidth <= 1136; // Adjust the breakpoint as needed
		},
	},
};
</script>
<style>
.fontie {
	font-family: fangsong;
	color: aliceblue;
}

.contactClass {
	font-family: "Poppins", sans-serif;
}

.bg-image {
	background-color: #ef5b0c;
}

footer {
	font-family: "Poppins", sans-serif;
	background-color: #030000;
	color: #fff;
	padding: 20px;
	text-align: center;
}

.footer-container {
	font-family: "Poppins", sans-serif;
	display: flex;
	justify-content: space-around;
	flex-wrap: wrap;
}

.footer-column {
	font-family: "Poppins", sans-serif;
	flex: none;
	margin: 10px;
}

.footer-logo {
	margin-top: 20px;
}

@media (max-width: 1136px) {
	.footer-column {
		flex: 1 0 100%;
		font-family: "Poppins", sans-serif;
	}
}
</style>