<template>
  <main style="background-color: #fde5d1">
    <div class="container" style="text-align: left">
      <br />
      <div class="row g-4">
        <div class="col-lg-8" style="width: 100%">
          <div
            class="bg-blur bg-white bg-opacity-10 border border-light border-opacity-25 rounded-3 mb-4"
          >
            <div class="row g-3 justify-content-center align-items-center">
              <div class="col-lg-10"></div>
            </div>
          </div>
          <div class="card card-body border mb-4" v-for="event in splPooja">
            <div class="position-relative">
              <div>
                <img
                  style="height: 300px"
                  :src="event.images[0]?.image"
                  alt="Card image"
                />
              </div>
              <div class="card-img-overlay p-3 z-index-1">
                <div class="badge text-bg-success">
                  {{ event.god.avatar }}
                </div>
              </div>
            </div>
            <h5 class="card-title mb-2">
              <a href="#">{{ event.name }}</a>
            </h5>
            <div class="d-flex align-items-center flex-wrap">
              <span class="me-2">{{ event.details }}</span>
              <span class="me-2" v-html="event.included"></span>
            </div>
            <div class="d-sm-flex justify-content-between mt-4">
              <div class="hstack gap-1">
                <h5 class="mb-0">₹ {{ event.original_cost }}</h5>
              </div>
              <div class="mt-2 mt-sm-0">
                <button
                  @click="participate(event.id)"
                  class="button btn btn-sm btn-primary mb-0"
                >
                  <i class="bi bi-plus-lg"></i> Participate
                </button>
              </div>
            </div>
          </div>
        </div>

        <dialog id="payment" class="dialtag">
          <div v-if="request">
            <div class="card shadow mb-4">
              <div class="card-header border-bottom">
                <div style="float: right">
                  <i
                    class="fas fa-times-circle"
                    style="font-size: 20px; color: rgb(255, 0, 0)"
                    v-on:click="close()"
                  ></i>
                </div>
                <h5 class="mb-0">Booking Details</h5>
              </div>
              <div class="card-body" style="text-align: left">
                <div class="mb-2">
                  <label class="form-label"
                    >Pooja Name <span class="text-red">*</span></label
                  >
                  <input
                    type="text"
                    v-model="pooja_name"
                    class="form-control"
                    placeholder="Pooja Name"
                    disabled
                  />
                </div>
                <div class="mb-2">
                  <label class="form-label"
                    >Booking Date <span class="text-red">*</span></label
                  >
                  <VueDatePicker
                    placeholder="Select Booking Date"
                    v-model="booking.booking_date"
                    :class="{ 'is-invalid': error.booking_date != '' }"
                    auto-apply
                    :min-date="startDate"
                    :max-date="endDate"
                    :enable-time-picker="false"
                    :start-date="startDate"
                    focus-start-date
                    :disabled="!request"
                  ></VueDatePicker>
                  <small
                    ><span
                      v-if="error.booking_date != ''"
                      class="text-danger"
                      >{{ error.booking_date }}</span
                    ></small
                  >
                </div>
                <div class="mb-2">
                  <label class="form-label"
                    >Devotee Name <span class="text-red">*</span></label
                  >
                  <input
                    type="text"
                    id="devotee_name"
                    v-model.trim="booking.name"
                    class="form-control"
                    placeholder="Devotee Name"
                    :class="{ 'is-invalid': error.name != '' }"
                    :disabled="!request"
                  />
                  <span v-if="error.name != ''" class="invalid-feedback">{{
                    error.name
                  }}</span>
                </div>
                <div class="mb-2">
                  <label class="form-label"
                    >Devotee Mobile Number
                    <span class="text-red">*</span></label
                  >
                  <input
                    type="text"
                    v-model="booking.mobile_no"
                    class="form-control"
                    placeholder="Devotee Mobile Number"
                    :class="{ 'is-invalid': error.mobile_no != '' }"
                    :disabled="!request"
                  />
                  <span v-if="error.mobile_no != ''" class="invalid-feedback">{{
                    error.mobile_no
                  }}</span>
                </div>
                <div class="mb-2">
                  <label class="form-label">Rashi</label>
                  <textarea
                    v-model="booking.rashi"
                    class="form-control"
                    placeholder="Rashi"
                    :disabled="!request"
                  ></textarea>
                </div>
                <div class="mb-2">
                  <label class="form-label">Nakshatra</label>
                  <textarea
                    v-model="booking.nakshatra"
                    class="form-control"
                    placeholder="Nakshatra"
                    :disabled="!request"
                  ></textarea>
                </div>
                <div class="mb-2">
                  <label class="form-label">Gotra</label>
                  <textarea
                    v-model="booking.gotra"
                    class="form-control"
                    placeholder="Gotra"
                    :disabled="!request"
                  ></textarea>
                </div>
                <div class="mb-2">
                  <label class="form-label">Sankalpa</label>
                  <textarea
                    v-model="booking.comment"
                    class="form-control"
                    placeholder="Sankalpa"
                    :disabled="!request"
                  ></textarea>
                </div>
                <div v-show="prasad_delivery">
                  <div class="mb-2">
                    <label for="prasadam">
                      <input
                        id="prasadam"
                        v-model="booking.prasadam"
                        type="checkbox"
                        style="vertical-align: middle"
                        :disabled="!request"
                      />
                      Do you want Prasadam ?</label
                    >
                  </div>
                  <div class="mb-2" v-show="this.booking.prasadam">
                    <label class="form-label"
                      >Street Address 1<span class="text-red">*</span></label
                    >
                    <input
                      type="text"
                      id="address"
                      v-model="booking.prasadam_address.street_address_1"
                      class="form-control"
                      placeholder="Address"
                      :class="{ 'is-invalid': error.address_1 != '' }"
                    />
                    <span
                      v-if="error.address_1 != ''"
                      class="invalid-feedback"
                      >{{ error.address_1 }}</span
                    >
                  </div>
                  <div class="mb-2" v-show="this.booking.prasadam">
                    <label class="form-label">Street Address 2</label>
                    <input
                      type="text"
                      id="address"
                      v-model="booking.prasadam_address.street_address_2"
                      class="form-control"
                      placeholder="Address"
                    />
                  </div>
                  <div class="mb-2" v-show="this.booking.prasadam">
                    <label class="form-label"
                      >Area<span class="text-red">*</span></label
                    >
                    <input
                      type="text"
                      id="area"
                      v-model="booking.prasadam_address.area"
                      class="form-control"
                      placeholder="Area"
                      :class="{ 'is-invalid': error.area != '' }"
                    />
                    <span v-if="error.area != ''" class="invalid-feedback">{{
                      error.area
                    }}</span>
                  </div>
                  <div class="mb-2" v-show="this.booking.prasadam">
                    <label class="form-label"
                      >City <span class="text-red">*</span></label
                    >
                    <input
                      type="text"
                      id="city"
                      v-model="booking.prasadam_address.city"
                      class="form-control"
                      placeholder="City"
                      :class="{ 'is-invalid': error.city != '' }"
                    />
                    <span v-if="error.city != ''" class="invalid-feedback">{{
                      error.city
                    }}</span>
                  </div>
                  <div class="mb-2" v-show="this.booking.prasadam">
                    <label class="form-label"
                      >State <span class="text-red">*</span></label
                    >
                    <input
                      type="text"
                      id="state"
                      v-model="booking.prasadam_address.state"
                      class="form-control"
                      placeholder="State"
                      :class="{ 'is-invalid': error.state != '' }"
                    />
                    <span v-if="error.state != ''" class="invalid-feedback">{{
                      error.state
                    }}</span>
                  </div>
                  <div class="mb-2" v-show="this.booking.prasadam">
                    <label class="form-label"
                      >Pincode <span class="text-red">*</span></label
                    >
                    <input
                      type="text"
                      v-model="booking.prasadam_address.pincode"
                      class="form-control"
                      placeholder="Pincode"
                      :class="{ 'is-invalid': error.pincode != '' }"
                    />
                    <span v-if="error.pincode != ''" class="invalid-feedback">{{
                      error.pincode
                    }}</span>
                  </div>
                </div>
                <div class="mb-0" v-if="request">
                  <button
                    @click="confirmBooking()"
                    class="btn btn-primary w-100"
                  >
                    Confirm Booking
                  </button>
                  <label class="note"
                    >Note: Video availability is subject to temple
                    consent</label
                  >
                </div>
              </div>
            </div>
          </div>

          <div v-if="response">
            <div class="card-header border-bottom">
              <div style="float: right">
                <i
                  class="fas fa-times-circle"
                  style="font-size: 20px; color: rgb(255, 0, 0)"
                  v-on:click="close()"
                ></i>
              </div>
              <h5 class="mb-0">Order Details</h5>
            </div>
            <div class="card-body">
              <ul class="list-group list-group-borderless mb-3">
                <li class="list-group-item d-flex justify-content-between py-2">
                  <span class="h6 fw-light mb-0">Pooja Cost</span>
                  <span class="h6 fw-light mb-0"
                    >₹{{ payment?.payment_data?.original_cost }}</span
                  >
                </li>
                <div v-show="this.booking.prasadam">
                  <li
                    class="list-group-item d-flex justify-content-between py-2"
                  >
                    <span class="h6 fw-light mb-0">Prasadam Delivery</span>
                    <span class="h6 fw-light mb-0"
                      >₹{{ payment?.payment_data?.delivery_charge }}</span
                    >
                  </li>
                </div>
                <li class="list-group-item d-flex justify-content-between py-2">
                  <span class="h6 fw-light mb-0">Convenience Fee</span>
                  <span class="h6 fw-light mb-0"
                    >₹{{ payment?.payment_data?.convenience_fee }}</span
                  >
                </li>
                <li class="list-group-item d-flex justify-content-between py-2">
                  <span class="h6 fw-light mb-0">Tax</span>
                  <span class="h6 fw-light mb-0"
                    >₹{{ payment?.payment_data?.total_tax }}</span
                  >
                </li>

                <li class="list-group-item py-2">
                  <hr class="my-0" />
                </li>
                <li class="list-group-item d-flex justify-content-between pb-0">
                  <div>
                    <h5 class="fw-normal mb-0">Total</h5>
                    <small>Inc. of all taxes</small>
                  </div>
                  <span class="h5 fw-normal mb-0"
                    >₹{{ payment?.payment_data?.final_total }}</span
                  >
                </li>
              </ul>
              <button
                @click="razorpayPayment"
                class="btn btn-primary w-100 mb-0"
              >
                Place Order
              </button>
            </div>
          </div>
        </dialog>
      </div>
    </div>
  </main>
</template>

<script>
import moment from "moment";
import VueDatePicker from "@vuepic/vue-datepicker";
import "@vuepic/vue-datepicker/dist/main.css";
import "firebase/database";
import "firebase/compat/auth";
// import VueDatePicker from '@vuepic/vue-datepicker';
import "@vuepic/vue-datepicker/dist/main.css";
import {
  GoogleAuthProvider,
  signInWithPopup,
  getAuth,
  signInWithPhoneNumber,
} from "firebase/auth";

export default {
  name: "specialPoojaList",
  components: {
    VueDatePicker,
  },

  data() {
    return {
      pooja_name: "",
      tax_amount: "",
      booking_charges: "",
      convenience_fee: "",
      cost: "",
      originalCost: "",
      final_total: "",
      tax_amount: "",
      booking_fee: "",
      prasad: "",
      payment: {},
      splPooja: [],
      error: {
        booking_date: "",
        name: "",
        mobile_no: "",
        address_1: "",
        address_2: "",
        area: "",
        city: "",
        state: "",
        pincode: "",
      },
      booking: {
        pooja_id: "",
        name: "",
        mobile_no: "",
        rashi: "",
        nakshatra: "",
        gotra: "",
        comment: "",
        prasad_delivery: false,
        booking_date: "",
        prasadam: false,
        prasadam_address: {
          street_address_1: "",
          street_address_2: "",
          area: "",
          city: "",
          state: "",
          pincode: "",
        },
      },
      request: false,
      setmobilelogin: false,
      newUser: false,
    };
  },
  beforeRouteEnter(to, from, next) {
    next((vm) => {
      vm.$store
        .dispatch("get", {
          uri:
            "devotee/pooja/?category=" +
            to.params.c_id +
            "&sub_category=" +
            to.params.s_id,
        })
        .then((response) => {
          vm.splPooja = response.data.results;
          // console.log(response);
          vm.getPoojas(to.params.id);
        })
        .catch((errors) => {
          console.log(errors);
        });
    });
  },

  mounted() {
    window.scrollTo(0, 0);
    let storedMobileNumber = localStorage.getItem("mobileNumber");
    if (
      storedMobileNumber != null &&
      storedMobileNumber != "null" &&
      storedMobileNumber != "+919080706050"
    ) {
      this.$store.dispatch("setsignInMbl", true);
    }
  },
  methods: {
    close() {
      document.getElementById("payment").close();
    },
    participate(poojaId) {
      let vm = this;
      let storedMobileNumber = localStorage.getItem("mobileNumber");
      if (
        storedMobileNumber != null &&
        storedMobileNumber != "null" &&
        storedMobileNumber != "+919080706050"
      ) {
        this.booking.mobile_no = storedMobileNumber;
        this.$store.dispatch("setsignInMbl", true);
      } else {
        this.booking.mobile_no = "";
      }
      if (this.$store.getters.signInMbl == false) {
        document.getElementById("dialog").showModal();
      }
      if (this.$store.getters.signInMbl == true) {
        (vm.participate_response = false),
          (vm.response = false),
          (vm.request = true);
        document.getElementById("payment").showModal();
        vm.$store
          .dispatch("get", { uri: "devotee/pooja/" + poojaId })
          .then((response) => {
            (vm.participate_response = true),
              (vm.pooja_name = response.data.name);
            vm.final_total = response.data.final_total;
            vm.tax_amount = response.data.tax_amount;
            vm.booking_charges = response.data.booking_charges;
            vm.convenience_fee = response.data.convenience_fee;
            vm.originalCost = response.data.original_cost;
            vm.cost = response.data.cost;
            vm.prasad_delivery = response.data.prasad_delivery;
            vm.booking.pooja_id = poojaId;
            vm.request = true;
            window.scrollTo(0, 0);
          })
          .catch((errors) => {
            console.log(errors);
          });
        vm.request = true;
      }
    },
    placeOrder(rz_response) {
      let vm = this;
      let data = {
        razorpay_response: rz_response,
        request_id: vm.payment.id,
      };
      let loader = this.$loading.show();
      this.$store
        .dispatch("post", { uri: "devotee/pooja_request/payment/", data: data })
        .then((response) => {
          loader.hide();
          vm.$router.push({
            name: "order",
            params: {
              payment_id: rz_response.razorpay_payment_id,
              order_id: vm.order_id,
            },
          });
        })
        .catch((errors) => {
          loader.hide();
          console.log(errors);
        });
    },
    razorpayPayment() {
      let vm = this;
      document.getElementById("payment").close();
      var options = {
        key: vm.rz_key,
        amount: this.payment.payment_data.final_total,
        currency: "INR",
        name: "Devalaya",
        description: "Payment towards Event Pooja",
        image:
          "https://cdn.shopify.com/s/files/1/0735/5895/0166/files/unnamed_copy_ac3ece77-8a3a-44b7-b0f2-820c39455044.jpg?v=1679241399&width=500",
        order_id: this.payment.payment_order_id,
        handler: function (response) {
          vm.placeOrder(response);
        },
        prefill: {
          name: this.devotee_name,
          email: "",
          contact: this.devotee_mobile,
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
        // alert(JSON.stringify(response));
      });
      rzp1.open();
    },

    confirmBooking() {
      let vm = this;
      let address_status = true;
      vm.error.booking_date = "";
      vm.error.name = "";
      vm.error.mobile_no = "";
      vm.error.address_1 = "";
      vm.error.area = "";
      vm.error.pincode = "";
      vm.error.city = "";
      vm.error.state = "";
      const regName_1 = /^[a-zA-Z]+ [a-zA-Z]+$/;
      const regName_2 = /^[a-zA-Z]+$/;
      const pin_reg_ex = /^\d{4,6}\b/g;
      const regex = /^\+[0-9]{11,12}$/;
      if (vm.booking.booking_date == "") {
        vm.error.booking_date = "The booking date is required";
      }
      if (vm.booking.name == "") {
        vm.error.name = "The devotee name is required";
      }
      if (
        !regName_1.test(this.booking.name) &&
        !regName_2.test(this.booking.name)
      ) {
        vm.error.name = "Please enter a valid full name";
      }
      if (vm.booking.mobile_no == "") {
        vm.error.mobile_no = "The devotee mobile number is required";
      }
      if (!regex.test(this.booking.mobile_no)) {
        vm.error.mobile_no =
          "Enter devotee number in the format '+919876543210'.";
      }
      if (
        vm.booking.prasadam &&
        vm.booking.prasadam_address.street_address_1 == ""
      ) {
        vm.error.address_1 = "Address is required for prasadam delivery";
        address_status = false;
      }
      if (vm.booking.prasadam && vm.booking.prasadam_address.pincode == "") {
        vm.error.pincode = "Pincode is required";
        address_status = false;
      }
      if (
        vm.booking.prasadam &&
        vm.booking.prasadam_address.pincode.length != 6
      ) {
        vm.error.pincode = "Pincode should be of 6 digits";
        if (!pin_reg_ex.test(vm.booking.prasadam_address.pincode)) {
          vm.error.pincode = "Please enter a valid pincode!";
        }
        address_status = false;
      }

      if (vm.booking.prasadam && vm.booking.prasadam_address.area == "") {
        vm.error.area = "Area is required";
        address_status = false;
      }
      if (vm.booking.prasadam && vm.booking.prasadam_address.city == "") {
        vm.error.city = "City is required";
        address_status = false;
      }
      if (vm.booking.prasadam && vm.booking.prasadam_address.state == "") {
        vm.error.state = "State is required";
        address_status = false;
      }
      if (
        vm.error.name == "" &&
        vm.error.mobile_no == "" &&
        vm.error.booking_date == "" &&
        address_status
      ) {
        let payload = {
          uri: "devotee/pooja_request/",
          data: {
            pooja: vm.booking.pooja_id,
            pooja_date: moment(String(vm.booking.booking_date)).format(
              "YYYY-MM-DD"
            ),
            name: vm.booking.name,
            devotee_number: vm.booking.mobile_no,
            is_prasadam_delivery: this.booking.prasadam,
            prasadam_address: {
              street_address_1: this.booking.prasadam_address.street_address_1,
              street_address_2: this.booking.prasadam_address.street_address_2,
              area: this.booking.prasadam_address.area,
              city: this.booking.prasadam_address.city,
              state: this.booking.prasadam_address.state,
              pincode: this.booking.prasadam_address.pincode,
            },
            family_member: [
              {
                id: null,
                name: vm.booking.name,
                father_name: "",
                kula: "",
                gotra: vm.booking.gotra,
                rashi: vm.booking.rashi,
                nakshatra: vm.booking.nakshatra,
                caste: "",
                subcaste: "",
                age: "",
                save_for_future: false,
                date_of_birth: null,
                place_of_birth: null,
                time_of_birth: null,
              },
            ],
            comment:
              vm.booking.comment +
              "( Nakshatra :" +
              vm.booking.nakshatra +
              ")( Gotra :" +
              vm.booking.gotra +
              ")( Rashi : " +
              vm.booking.rashi +
              ")",
            booked_by: "CSC",
          },
        };
        if (!this.booking.prasadam) {
          payload = {
            uri: "devotee/pooja_request/",
            data: {
              pooja: vm.booking.pooja_id,
              pooja_date: moment(String(vm.booking.booking_date)).format(
                "YYYY-MM-DD"
              ),
              name: vm.booking.name,
              devotee_number: vm.booking.mobile_no,
              is_prasadam_delivery: this.booking.prasadam,

              family_member: [
                {
                  id: null,
                  name: vm.booking.name,
                  father_name: "",
                  kula: "",
                  gotra: vm.booking.gotra,
                  rashi: vm.booking.rashi,
                  nakshatra: vm.booking.nakshatra,
                  caste: "",
                  subcaste: "",
                  age: "",
                  save_for_future: false,
                  date_of_birth: null,
                  place_of_birth: null,
                  time_of_birth: null,
                },
              ],
              comment:
                vm.booking.comment +
                "( Nakshatra :" +
                vm.booking.nakshatra +
                ")( Gotra :" +
                vm.booking.gotra +
                ")( Rashi : " +
                vm.booking.rashi +
                ")",
              booked_by: "CSC",
            },
          };
        }
        let loader = this.$loading.show();
        this.$store
          .dispatch("post", payload)
          .then((response) => {
            loader.hide();
            vm.payment = response.data;
            vm.request = false;
            vm.response = true;
            vm.getRZKey();
            vm.order_id = response.data.order_id;
          })
          .catch((errors) => {
            loader.hide();
            // alert(errors.response.data.errors[0].message[0]);
          });
      }
    },
    getRZKey() {
      let vm = this;
      this.$store
        .dispatch("get", { uri: "devotee/payment_key/" })
        .then((response) => {
          vm.rz_key = response.data.key;
          vm.scrollToOrderDetails();
        })
        .catch((errors) => {
          console.log(errors);
        });
    },
    scrollToOrderDetails() {
      this.$refs.orderDetails.scrollIntoView({ behavior: "smooth" });
    },
  },
};
</script>
