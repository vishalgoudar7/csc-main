import { createStore } from "vuex";
import { createToast } from "mosha-vue-toastify";
import "mosha-vue-toastify/dist/style.css";
import axios from "axios";

export default createStore({
	state() {
		return {
			apiUrl: "https://live.devalayas.com/api/v1/",
			// apiUrl: "https://beta.devalayas.com/api/v1/",
			// apiUrl: "http://localhost:8000/api/v1/",
			user: null,
			token: "",
			signIn: false,
			signInMbl: false,
			mobileNumber: "",
			cart: []
		};
	},

	getters: {
		mobileNumber(state) {
			return state.mobileNumber;
		},
		user(state) {
			return state.user;
		},
		token(state) {
			return state.token;
		},
		tokenType(state) {
			return state.token_type;
		},
		apiUrl(state) {
			return state.apiUrl;
		},
		signIn(state) {
			return state.signIn;
		},
		signInMbl(state) {
			return state.signInMbl;
		},
		cart(state) {
			return state.cart;
		}
	},

	mutations: {
		setmobileNumber(state, mobileNumber) {
			state.mobileNumber = mobileNumber;
		},
		setUser(state, user) {
			state.user = user;
		},
		setToken(state, token) {
			state.token = token;
		},
		setTokenType(state, token_type) {
			state.token_type = token_type;
		},
		setsignIn(state, signIn) {
			state.signIn = signIn;
		},
		setsignInMbl(state, signInMbl) {
			state.signInMbl = signInMbl;
		},
		addToCart(state, pooja) {
			state.cart.push(pooja);
			createToast({
				title: 'Success',
				description: "Pooja added successfully."
			},
				{
					showIcon: true,
					hideProgressBar: true,
					type: 'success',
					position: 'top-right'
				})
			// const exists = state.cart.some(item =>
			//   item.pooja === pooja.pooja &&
			//   item.name === pooja.name &&
			//   item.devotee_number === pooja.devotee_number &&
			//   item.pooja_date === pooja.pooja_date);
			// if (!exists) {
			//   state.cart.push(pooja);
			//   createToast({
			//     title: 'Success',
			//     description: "Pooja added successfully."
			//   },
			//     {
			//       showIcon: true,
			//       hideProgressBar: true,
			//       type: 'success',
			//       position: 'top-right'
			//     })
			// } else {
			//   alert('Pooja already exists!');
			// }
		},
		setCart(state, cart) {
			state.cart = cart;
		}
	},

	actions: {
		async setmobileNumber(context, payload) {
			// localStorage.setItem("mobileNumber", payload);
			await context.commit("setmobileNumber", payload);
		},
		async setUser(context, payload) {
			// localStorage.setItem('user',JSON.stringify(payload));
			await context.commit("setUser", payload);
		},

		async setsignIn(context, payload) {
			// localStorage.setItem('signIn',JSON.stringify(payload));
			await context.commit("setsignIn", payload);
		},

		async setsignInMbl(context, payload) {
			// localStorage.setItem("signInMbl", payload);
			await context.commit("setsignInMbl", payload);
		},

		async setToken(context, payload) {
			// localStorage.setItem('token',payload);
			await context.commit("setToken", payload);
		},

		async setTokenType(context, payload) {
			// localStorage.setItem('token_type',payload);
			await context.commit("setTokenType", payload);
		},

		async logout(context) {
			await context.commit("setUser", null);
			await context.commit("setmobileNumber", null);
			await context.commit("setToken", "");
			await context.commit("setToken", "Bearer");
			await context.commit("setsignIn", false);
			await context.commit("setsignInMbl", false);
		},

		auth(context, payload) {
			return new Promise((resolve, reject) => {
				axios
					.post(this.state.apiUrl + payload.uri, payload.data)
					.then(function (response) {
						resolve(response);
					})
					.catch(function (error) {
						reject(error);
					});
			});
		},

		get(context, payload) {
			return new Promise((resolve, reject) => {
				axios
					.get(this.state.apiUrl + payload.uri, {
						headers: {
							Authorization: "Token" + " " + context.getters.token,
						},
					})
					.then(function (response) {
						resolve(response);
					})
					.catch(function (error) {
						reject(error);
					});
			});
		},

		post(context, payload) {
			return new Promise((resolve, reject) => {
				axios
					.post(this.state.apiUrl + payload.uri, payload.data, {
						headers: {
							Authorization: "Token" + " " + context.getters.token,
						},
					})
					.then(function (response) {
						resolve(response);
					})
					.catch(function (error) {
						reject(error);
					});
			});
		},

		put(context, payload) {
			return new Promise((resolve, reject) => {
				axios
					.put(this.state.apiUrl + payload.uri, payload.data, {
						headers: {
							Authorization: "Token" + " " + context.getters.token,
						},
					})
					.then(function (response) {
						resolve(response);
					})
					.catch(function (error) {
						reject(error);
					});
			});
		},

		async error(context, description) {
			await createToast(
				{
					title: "Error",
					description: description || "The given data was invalid.",
				},
				{
					showIcon: true,
					hideProgressBar: true,
					type: "danger",
					position: "top-right",
				}
			);
		},

		async success(context, description) {
			await createToast(
				{
					title: "Success",
					description: description || "Data is successfuly submited.",
				},
				{
					showIcon: true,
					hideProgressBar: true,
					type: "success",
					position: "top-right",
				}
			);
		},
		addToCart(context, payload) {
			context.commit('addToCart', payload);
		},
		async setCart(context, payload) {
			context.commit('setCart', payload);
		},
	},
});
