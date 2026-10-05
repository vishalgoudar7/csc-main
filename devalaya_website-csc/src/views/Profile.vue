<template>
  <main style="background-color: #fde5d1">
    <section class="pt-4">
      <div class="container vstack gap-4">
        <div v-if="updated" class="alert alert-success alert-dismissible fade show" role="alert">
          <strong>Successfully Updated Profile.</strong>
        </div>
        <div class="row">
          <div class="col-12">
            <div class="card border">
              <div class="card-header border-bottom">
                <h5 class="card-header-title">PROFILE</h5>
              </div>
              <div class="card-body">
                <div class="row" style="text-align: justify">
                  <div class="col-md-3 mb-4">
                    <span>Name:</span>
                    <span class="h6 fw-normal ms-1 mb-0">{{ user.name }}</span>
                  </div>
                  <div class="col-md-3 mb-4">
                    <span>Email Id :</span>
                    <span class="h6 fw-normal ms-1 mb-0">{{ user.email }}</span>
                  </div>
                  <div class="col-md-3 mb-4">
                    <span>Mobile Number:</span>
                    <span class="h6 fw-normal ms-1 mb-0">{{ user.mobile_number }}</span>
                  </div>                  
                  <div class="col-md-3 mb-4">
                    <span>DOB :</span>
                    <span class="h6 fw-normal ms-1 mb-0">{{ user.dob }}</span>
                  </div>
                  <div class="col-md-3 mb-4">
                    <span>Gender:</span>
                    <span class="h6 fw-normal ms-1 mb-0">{{ user.gender }}</span>
                  </div>
                  <div class="col-md-12 mb-4">
                    <span>Address :</span>
                    <span class="h6 fw-normal ms-1 mb-0">{{ user.address }}</span>
                  </div>
                  <!-- <div class="col-md-3 mb-4">
                    <span>Religion :</span>
                    <span class="h6 fw-normal ms-1 mb-0">{{ user.religion }}</span>
                  </div>
                  <div class="col-md-3 mb-4">
                    <span>Caste :</span>
                    <span class="h6 fw-normal ms-1 mb-0">{{ user.caste }}</span>
                  </div>
                  <div class="col-md-3 mb-4">
                    <span>Sub Caste :</span>
                    <span class="h6 fw-normal ms-1 mb-0">{{ user.subcaste }}</span>
                  </div> -->
                  <div class="col-md-3 mb-4">
                    <span>State :</span>
                    <span class="h6 fw-normal ms-1 mb-0">{{ user.state }}</span>
                  </div>
                  <div class="col-md-3 mb-4">
                    <span>District :</span>
                    <span class="h6 fw-normal ms-1 mb-0">{{ user.district }}</span>
                  </div>
                  <div class="col-md-3 mb-4">
                    <span>City :</span>
                    <span class="h6 fw-normal ms-1 mb-0">{{ user.city }}</span>
                  </div>
                  <div class="col-md-3 mb-4">
                    <span>Pincode :</span>
                    <span class="h6 fw-normal ms-1 mb-0">{{ user.pincode }}</span>
                  </div>                 
                  <!-- <div class="col-md-6">
                    <ul class="list-group list-group-borderless">
                      <li class="list-group-item mb-3">
                        <span>Mobile Number:</span>
                        <span class="h6 fw-normal ms-1 mb-0">{{
                          this.mobileNo
                        }}</span>
                      </li>
                      <li class="list-group-item mb-3">
                        <span>DOB:</span>
                        <span class="h6 fw-normal ms-1 mb-0">{{
                          this.dob_user
                        }}</span>
                      </li>
                    </ul>
                  </div> -->
                  <!-- Information item -->
                  <!-- <div class="col-md-6">
                    <ul class="list-group list-group-borderless">
                      <li class="list-group-item mb-3">
                        <span>Name:</span>
                        <span class="h6 fw-normal ms-1 mb-0">{{
                          this.userName
                        }}</span>
                      </li>
                      <li class="list-group-item mb-3">
                        <span>Email ID:</span>
                        <span class="h6 fw-normal ms-1 mb-0">{{
                          this.emailId
                        }}</span>
                      </li>
                    </ul>
                  </div>  -->
                </div>
                <!-- <button v-on:click="editProfile()" class="button p-0 mb-0">
                  EDIT
                </button> -->
                <router-link to="/profile_update" class="button p-0 mb-0">Edit</router-link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    <dialog id="profileupdate" style="border: 1px solid #ccc; border-radius: 8px">
      <div class="flex-item-centre" style="text-align: left">
        <ul>
          <li class="list-group-item mb-3">
            <span>User Name :</span>
            <input class="form-control" style="float: right" v-model="userName" placeholder="Name" />
          </li>
          <li class="list-group-item mb-3">
            <span>Email Id :</span>
            <input class="form-control" style="float: right" v-model="emailId" placeholder="Email Id" />
          </li>
          <li class="list-group-item mb-3">
            <span>DOB :</span>
            <VueDatePicker v-model="dob_user" auto-apply :enable-time-picker="false" placeholder="Select DOB">
            </VueDatePicker>
          </li>
        </ul>
      </div>
      <div style="text-align: center">
        <button class="button p-0 mb-0" type="button" v-on:click="closeProfilemodel()">
          Cancel</button>&nbsp;
        <button class="button p-0 mb-0" type="button" v-on:click="SubmitProfile()">
          Submit
        </button>
      </div>
    </dialog>
  </main>
</template>
<script>
import VueDatePicker from "@vuepic/vue-datepicker";

export default {
  name: "Profile",
  components: {
    VueDatePicker,
  },

  data() {
    return {
      dob_user: "",
      user: this.$store.getters.user,
      data: [],
      emailId: "",
      mobileNo: "",
      userName: "",
      address: '',
      updated: false,
      registerUser: {
        name: "",
        email: "",
        dob: "",
      },
      convertedDate: {
        year: "",
        month: "",
        date: "",
      },
      user: {}
    };
  },

  mounted() {
    window.scrollTo(0, 0);
    this.getProfile();
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
    SubmitProfile() {
      let vm = this;
      const dateObject = new Date(this.dob_user);
      this.convertedDate.year = dateObject.getFullYear();
      this.convertedDate.month = dateObject.getMonth() + 1;
      this.convertedDate.date = dateObject.getDate();
      vm.registerUser.name = vm.userName;
      vm.registerUser.email = vm.emailId;
      vm.registerUser.dob =
        this.convertedDate.year +
        "-" +
        this.convertedDate.month +
        "-" +
        this.convertedDate.date;
      vm.$store
        .dispatch("put", {
          uri: "devotee/profile/update/",
          data: vm.registerUser,
        })
        .then((response) => {
          vm.updated = true;
          document.getElementById("profileupdate").close();
        })
        .catch((error) => {
          console.log(error);
        });
    },
    closeProfilemodel() {
      document.getElementById("profileupdate").close();
      window.location.reload();
    },
    editProfile() {
      document.getElementById("profileupdate").showModal();
    },
    getProfile() {
      let vm = this;
      let loader = this.$loading.show();
      vm.$store
        .dispatch("get", { uri: "devotee/profile/" })
        .then((updateinfo) => {
          loader.hide();
          vm.emailId = updateinfo.data.email;
          vm.mobileNo = updateinfo.data.mobile_number;
          vm.userName = updateinfo.data.name;
          vm.dob_user = updateinfo.data.dob;
          //
          this.user = updateinfo.data;
        })
        .catch((error) => {
          loader.hide();
          console.log(error);
        });
    },
  },
};
</script>
