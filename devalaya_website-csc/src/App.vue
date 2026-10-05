<template>
	<Header></Header>
	<router-view />
	<Footer></Footer>
</template>

<script>
import Header from "./components/Header.vue";
import Footer from "./components/Footer.vue";

export default {
	components: {
		Header,
		Footer,
	},
	created() {
		// let user = { "id": 771, "name": "CSC Test", "mobile_number": null, "email": "tarun.saxena11@csc.gov.in", "profile_image": null, cscid: "500100100014" };
		// sessionStorage.setItem("user", JSON.stringify(user));
		// sessionStorage.setItem("token", "87b3056065a5b4b38af7dd300cc2d7ee42cfefac");
		// sessionStorage.setItem("token_type", "Token");


		if (sessionStorage.getItem("user")) {
			this.$store.dispatch("setUser", JSON.parse(sessionStorage.getItem("user")));
			// sessionStorage.removeItem("user");
		}
		if (sessionStorage.getItem("token")) {
			this.$store.dispatch("setToken", sessionStorage.getItem("token"));
			// sessionStorage.removeItem("token");
		}
		if (sessionStorage.getItem("token_type")) {
			this.$store.dispatch("setTokenType", sessionStorage.getItem("token_type"));
			// sessionStorage.removeItem("token_type");
		}
		if (sessionStorage.getItem('cart')) {
			this.$store.dispatch('setCart', JSON.parse(sessionStorage.getItem('cart')));
			// sessionStorage.removeItem('cart')
		}

		window.addEventListener("beforeunload", () => {
			sessionStorage.setItem("user", JSON.stringify(this.$store.getters.user));
			sessionStorage.setItem("token", this.$store.getters.token);
			sessionStorage.setItem("token_type", this.$store.getters.tokenType);
			sessionStorage.setItem("cart", JSON.stringify(this.$store.getters.cart));
		});
	},
};
</script>
