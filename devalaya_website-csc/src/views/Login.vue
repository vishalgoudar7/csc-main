<template>
	<main>
		<!-- <section>
           <div class="container d-flex px-0 px-sm-4">
                <div class="row justify-content-center align-items-center m-auto">
                    <div class="col-12">
                        <div class="bg-mode shadow rounded-3 overflow-hidden">
                            <div class="row g-0">
                                <div class="col-lg-6 d-flex align-items-center order-2 order-lg-1">
                                    <div class="p-3 p-lg-5">
                                        <img  class="mb-4" src="https://thumbs.dreamstime.com/b/basic-rgb-144075870.jpg" alt="" />
                                    </div>
                                    <div class="vr opacity-2 d-none d-lg-block"></div>
                                </div>
                                <div class="col-lg-6 order-1">
                                    <div class="p-1 p-sm-6 text-center">
                                        <a href="#">
                                            <img class="h-100px mb-4" src="@/assets/logo.png" alt="logo"/>
                                        </a>
                                        <h3>Welcome: </h3>
                                        <br>
                                        <input v-model="phoneNumber" placeholder="Enter Phone Number" />
                                        <br>
                                        <br>
                                        <p><button v-on:click="signInWithGoogle">Login with Mobile</button></p>
                                        <div>
                                        <h6>Continue with : </h6>
                                        <p><button v-on:click="signInWithGoogle">Sign In with google</button></p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section> -->
	</main>
</template>

<script>
export default {
	name: "Login",
	data() {
		return {
			mobileNumber: this.$store.getters.mobileNumber,
			user: this.$store.getters.user,
			user: {
				mobile_number: "",
				login_token: "123",
				app_version: "1",
				device_model: "Browser",
				user_type: "Devotee",
			},
			error: {
				mobile_no: "",
			},
			errors: [],
		};
	},

	mounted() {
		let vm = this;
		let storedMobileNumber = localStorage.getItem("mobileNumber");
		if (
			storedMobileNumber != null &&
			storedMobileNumber != "null" &&
			storedMobileNumber != "+919080706050"
		) {
			this.user.mobile_number = storedMobileNumber;
			this.$store.dispatch("setsignInMbl", true);
		} else {
			this.user.mobile_number = "+919080706050";
		}
		vm.login();
	},

	methods: {
		login() {
			let vm = this;
			let loader = vm.$loading.show();
			vm.$store
				.dispatch("auth", { uri: "auth/", data: vm.user })
				.then((response) => {
					loader.hide();
					vm.$store.dispatch("setUser", response.data);
					vm.$store.dispatch("setToken", response.data.token);
					vm.$store.dispatch("setTokenType", "Token");
					vm.$router.push("/");
				})
				.catch((error) => {
					loader.hide();
					vm.$store.dispatch("error", error.response.data.message);
				});
		},
	},
};
</script>
