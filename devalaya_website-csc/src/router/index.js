import { createRouter, createWebHistory } from "vue-router";
import store from "../store/index";

import Home from "../views/Home.vue";
import Temple from "../views/Temple.vue";
import Bookings from "../views/Bookings.vue";
import Order from "@/views/Order.vue";
import About from "@/views/About.vue";
import Profile from "@/views/Profile.vue";
import SuggestTemple from "@/views/SuggestTemple.vue";
import Events from "@/views/Events.vue";
import Eventlist from "@/views/Eventlist.vue";
import Contact from "@/views/Contact.vue";
import CancellationPolicy from "@/views/CancellationPolicy.vue";
import PrivacyPolicy from "@/views/PrivacyPolicy.vue";
import RefundPolicy from "@/views/RefundPolicy.vue";
import TermsAndConditions from "@/views/TermsAndConditions.vue";
import specialPooja from "@/views/specialPooja.vue";
import specialPoojaList from "@/views/specialPoojaList.vue";
import DeleteUser from "@/views/DeleteUser.vue";
import ProfileUpdate from "@/views/ProfileUpdate.vue";
import PoojaCart from "@/views/PoojaCart.vue";
import PaymentSuccess from "@/views/PaymentSuccess.vue"

const router = createRouter({
	history: createWebHistory(),
	routes: [
		{
			path: "/deleteUser",
			name: "DeleteUser",
			component: DeleteUser,
		},
		{
			path: "/List/category/:c_id/sub_category/:s_id",
			name: "specialPoojaList",
			component: specialPoojaList,
			meta: { auth: true },
		},
		{
			path: "/CancellationPolicy",
			name: "CancellationPolicy",
			component: CancellationPolicy,
		},
		{
			path: "/splpooja/:id",
			name: "splpooja",
			component: specialPooja,
			meta: { auth: true },
		},
		{
			path: "/PrivacyPolicy",
			name: "PrivacyPolicy",
			component: PrivacyPolicy,
		},
		{
			path: "/RefundPolicy",
			name: "RefundPolicy",
			component: RefundPolicy,
		},
		{
			path: "/TermsAndConditions",
			name: "TermsAndConditions",
			component: TermsAndConditions,
		},
		{
			path: "/contact",
			name: "contact",
			component: Contact,
		},
		{
			path: "/suggest",
			name: "suggest",
			component: SuggestTemple,
			meta: { auth: true },
		},
		{
			path: "/",
			name: "home",
			component: Home,
		},
		{
			path: "/temples",
			name: "temples.view",
			component: Temple,
			meta: { auth: true },
		},
		{
			path: "/bookings",
			name: "bookings",
			component: Bookings,
			meta: { auth: true },
		},
		{
			path: "/order/:payment_id/:order_id",
			name: "order",
			component: Order,
			meta: { auth: true },
		},
		{
			path: "/aboutpage",
			name: "aboutpage",
			component: About,
		},
		{
			path: "/profile",
			name: "profile",
			component: Profile,
			meta: { auth: true },
		},
		{
			path: "/profile_update",
			name: "ProfileUpdate",
			component: ProfileUpdate,
			meta: { auth: true },
		},
		{
			path: "/search/:name",
			name: "events.search",
			component: Events,
			meta: { auth: true },
		},
		{
			path: "/events",
			name: "events",
			component: Eventlist,
			meta: { auth: true },
		},
		{
			path: "/pooja_cart",
			name: "PoojaCart",
			component: PoojaCart,
			meta: { auth: true },
		},
		{
			path: "/payment_success",
			name: "payment_success",
			component: PaymentSuccess,
			meta: { auth: true },
		},
	],
});

router.beforeEach(function (to, _, next) {
	if (to.meta.auth && !store.getters.user) {
		next("/");
	} else {
		next();
	}
});

export default router;
