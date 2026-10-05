<template>
  <main style="background-color: #fde5d1">
    <div
      style="padding: 20px"
      class="container"
      v-if="this.$store.getters.signInMbl"
    >
      <div class="card shadow mb-4" style="text-align: left">
        <div class="card-header border-bottom">
          <h5 class="mb-0" style="display: contents">Suggest Temple</h5>
        </div>
        <!--  -->
        <div
          v-if="alert"
          class="alert alert-success alert-dismissible fade show"
          role="alert"
        >
          <strong>Successfully suggested a temple.</strong>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="alert"
            aria-label="Close"
          ></button>
        </div>
        <!--  -->
        <div class="card-body">
          <div class="mb-2">
            <label class="form-label">
              Temple Name<span class="text-red">*</span></label
            >
            <input
              type="text"
              v-model="suggest.name_en"
              class="form-control"
              placeholder="Temple Name"
              :class="{ 'is-invalid': error.name_en != '' }"
            />
            <span class="invalid-feedback">{{ error.name_en }}</span>
          </div>
          <div class="mb-2">
            <label class="form-label"
              >Details <span class="text-red">*</span></label
            >
            <input
              type="text"
              v-model="suggest.details_en"
              class="form-control"
              placeholder="Details"
              :class="{ 'is-invalid': error.details_en != '' }"
            />
            <span v-if="error.details_en != ''" class="invalid-feedback">{{
              error.details_en
            }}</span>
          </div>
          <div class="mb-2">
            <label class="form-label"
              >Temple address <span class="text-red">*</span></label
            >
            <input
              type="text"
              v-model="suggest.address"
              class="form-control"
              placeholder="Address"
              :class="{ 'is-invalid': error.address != '' }"
            />
            <span v-if="error.address != ''" class="invalid-feedback">{{
              error.address
            }}</span>
          </div>
          <div class="mb-2">
            <label class="form-label"
              >State <span class="text-red">*</span></label
            >
            <input
              type="text"
              v-model="suggest.state_en"
              class="form-control"
              placeholder="State"
              :class="{ 'is-invalid': error.state_en != '' }"
            />
            <span v-if="error.state_en != ''" class="invalid-feedback">{{
              error.state_en
            }}</span>
          </div>
          <div class="mb-2">
            <label class="form-label"
              >District <span class="text-red">*</span></label
            >
            <input
              type="text"
              v-model="suggest.district_en"
              class="form-control"
              placeholder="District"
              :class="{ 'is-invalid': error.district_en != '' }"
            />
            <span v-if="error.district_en != ''" class="invalid-feedback">{{
              error.district_en
            }}</span>
          </div>
          <div class="mb-2">
            <label class="form-label"
              >City <span class="text-red">*</span></label
            >
            <input
              type="text"
              v-model="suggest.city_en"
              class="form-control"
              placeholder="City"
              :class="{ 'is-invalid': error.city_en != '' }"
            />
            <span v-if="error.city_en != ''" class="invalid-feedback">{{
              error.city_en
            }}</span>
          </div>
          <div class="mb-2">
            <label class="form-label"
              >Area <span class="text-red">*</span></label
            >
            <input
              type="text"
              v-model="suggest.area_en"
              class="form-control"
              placeholder="Area"
              :class="{ 'is-invalid': error.area_en != '' }"
            />
            <span v-if="error.area_en != ''" class="invalid-feedback">{{
              error.area_en
            }}</span>
          </div>
          <div class="mb-2">
            <label class="form-label"
              >Taluk <span class="text-red">*</span></label
            >
            <input
              type="text"
              v-model="suggest.taluk_en"
              class="form-control"
              placeholder="Taluk"
              :class="{ 'is-invalid': error.taluk_en != '' }"
            />
            <span v-if="error.taluk_en != ''" class="invalid-feedback">{{
              error.taluk_en
            }}</span>
          </div>
          <div class="mb-2">
            <label class="form-label"
              >Pincode <span class="text-red">*</span></label
            >
            <input
              type="number"
              v-model="suggest.pincode"
              class="form-control"
              placeholder="Pincode"
              :class="{ 'is-invalid': error.pincode != '' }"
            />
            <span v-if="error.pincode != ''" class="invalid-feedback">{{
              error.pincode
            }}</span>
          </div>
          <div class="mb-2">
            <label class="form-label"
              >Pandit Name <span class="text-red">*</span></label
            >
            <input
              type="text"
              v-model="panditName"
              class="form-control"
              placeholder="Pandit Name"
              :class="{ 'is-invalid': error.panditName != '' }"
            />
            <span v-if="error.panditName != ''" class="invalid-feedback">{{
              error.panditName
            }}</span>
          </div>
          <div class="mb-2">
            <label class="form-label"
              >Pandit Number <span class="text-red">*</span></label
            >
            <input
              type="number"
              v-model="panditNumber"
              class="form-control"
              placeholder="+919000000000"
              :class="{ 'is-invalid': error.panditNumber != '' }"
            />
            <span v-if="error.panditNumber != ''" class="invalid-feedback">{{
              error.panditNumber
            }}</span>
          </div>
          <div class="mb-2">
            <label class="form-label">Gods </label>
            <select class="form-control" v-model="selectedGod">
              <option v-for="(pooja, key) in god" :value="pooja?.id">
                {{ pooja?.name }}
              </option>
            </select>
          </div>
          <div class="mb-2">
            <label class="form-label"
              >Image Title<span class="text-red">*</span></label
            >
            <input
              type="text"
              v-model="imagetitle"
              class="form-control"
              placeholder="Image Title"
              :class="{ 'is-invalid': error.imagetitle != '' }"
            />
            <span v-if="error.imagetitle != ''" class="invalid-feedback">{{
              error.imagetitle
            }}</span>
          </div>
          <div class="mb-2">
            <label class="form-label"
              >Image file<span class="text-red">*</span></label
            >
            <input
              type="file"
              ref="file"
              accept="image/*"
              @change="readImage()"
            />
            <img
              :src="this.previewimage"
              alt=""
              style="max-width: 100%; width: 250px; object-fit: cover"
            />
          </div>
          <div class="mb-2">
            <label class="form-label"
              >Video Title<span class="text-red">*</span></label
            >
            <input
              type="text"
              v-model="videotitle"
              class="form-control"
              placeholder="Video Title"
              :class="{ 'is-invalid': error.videotitle != '' }"
            />
            <span v-if="error.videotitle != ''" class="invalid-feedback">{{
              error.videotitle
            }}</span>
          </div>
          <div class="mb-2">
            <label class="form-label"
              >Video file :<span class="text-red">*</span></label
            >
            <input type="file" accept="video/*" @change="readVideo()" />
            <video
              style="height: auto"
              id="video-preview"
              controls
              v-show="file != ''"
            />
          </div>
          <div id="addbutton" class="mb-0">
            <button @click="addtemple()" class="btn btn-primary w-100">
              Suggest Temple
            </button>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<script>
export default {
  name: "SuggestTemple",
  data() {
    return {
      signedIn: this.$store.getters.signIn,
      alert: false,
      panditName: "",
      selectedgod: "",
      panditNumber: "",
      selectedGod: "",
      value: "",
      images: [],
      videos: [],
      suggest: {
        name_en: "",
        details_en: "",
        taluk_en: "",
        district_en: "",
        area_en: "",
        city_en: "",
        state_en: "",
        pincode: "",
        address: "",
        rath: false,
        gods: "",
      },
      results: [],
      god: [],
      text: [],
      video: null,
      previewvideo: null,
      previewimage: null,
      videoid: "",
      imageid: "",
      image: null,
      videotitle: "",
      imagetitle: "",
      error: {
        name_en: "",
        details_en: "",
        taluk_en: "",
        district_en: "",
        area_en: "",
        city_en: "",
        pincode: "",
        address: "",
        videotitle: "",
        imagetitle: "",
        panditName: "",
        panditNumber: "",
        state_en: "",
      },
    };
  },

  mounted() {
    window.scrollTo(0, 0);
    let vm = this;
    vm.getgods();
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
    previewVideo() {
      let video = document.getElementById("video-preview");
      let reader = new FileReader();
      reader.readAsDataURL(this.file);
      reader.addEventListener("load", function () {
        video.src = reader.result;
      });
    },

    readImage() {
      let vm = this;
      vm.error.imagetitle = "";
      if (vm.imagetitle == "") {
        vm.imagetitle = "Temple Image";
      }
      if (vm.error.imagetitle == "") {
        let formData = new FormData();
        this.image = this.$refs.file.files[0];
        this.previewimage = URL.createObjectURL(this.image);
        formData.append("title_en ", this.imagetitle);
        formData.append("image  ", this.image);
        formData.append("type", "Image");
        this.$store
          .dispatch("post", { uri: "devotee/temple/image/", data: formData })
          .then((response) => {
            // console.log(response);
            this.imageid = response.data.id;
          })
          .catch((errors) => {
            console.log(errors);
          });
      }
    },

    readVideo() {
      let vm = this;
      vm.error.videotitle = "";
      if (vm.videotitle == "") {
        vm.videotitle = "Temple Video";
      }
      if (vm.error.videotitle == "") {
        let loader = this.$loading.show();
        let formData = new FormData();
        this.file = event.target.files[0];
        formData.append("title_en", this.videotitle);
        formData.append("description_en ", this.videotitle);
        formData.append("video_file", this.file);
        this.$store
          .dispatch("post", { uri: "devotee/temple/video/", data: formData })
          .then((response) => {
            // console.log(response);
            this.videoid = response.data.id;
            this.previewVideo();
            loader.hide();
          })
          .catch((errors) => {
            console.log(errors);
            loader.hide();
          });
      }
    },

    addtemple() {
      window.scrollTo(0, 0);
      let vm = this;
      const regex = /^[1-9]{1}\d{2}\s?\d{3}$/;
      const phoneregex = /^[6-9]\d{9}$/gi;
      vm.error.name_en = "";
      vm.error.details_en = "";
      vm.error.taluk_en = "";
      vm.error.district_en = "";
      vm.error.area_en = "";
      vm.error.city_en = "";
      vm.error.pincode = "";
      vm.error.address = "";
      vm.error.videotitle = "";
      vm.error.imagetitle = "";
      vm.error.panditName = "";
      vm.error.panditNumber = "";
      vm.error.state_en = "";
      if (vm.suggest.name_en == "") {
        vm.error.name_en = "Temple name is required";
      }
      if (vm.suggest.details_en == "") {
        vm.error.details_en = "Temple details is required";
      }
      if (vm.suggest.taluk_en == "") {
        vm.error.taluk_en = "Temple taluk is required";
      }
      if (vm.suggest.district_en == "") {
        vm.error.district_en = "Temple district is required";
      }
      if (vm.suggest.area_en == "") {
        vm.error.area_en = "Temple area is required";
      }
      if (vm.suggest.address == "") {
        vm.error.address = "Temple address is required";
      }
      if (vm.videotitle == "") {
        vm.error.videotitle = "Video title is required";
      }
      if (vm.imagetitle == "") {
        vm.error.imagetitle = "Image title is required";
      }
      if (vm.panditName == "") {
        vm.error.panditName = "Temple pandit name is required";
      }
      if (vm.panditNumber == "") {
        vm.error.panditNumber = "Temple pandit number is required";
      }
      if (vm.error.panditNumber == "") {
        if (!phoneregex.test(vm.panditNumber)) {
          vm.error.panditNumber = "The pandit mobile number is invalid";
        }
      }
      if (vm.suggest.pincode == "") {
        vm.error.pincode = "Pincode is required";
      }
      if (vm.error.pincode == "") {
        if (!regex.test(vm.suggest.pincode)) {
          vm.error.pincode = "Pincode is invalid";
        }
      }
      if (vm.suggest.state_en == "") {
        vm.error.state_en = "Temple state is required";
      }
      if (vm.suggest.city_en == "") {
        vm.error.city_en = "Temple city is required";
      }
      if (
        vm.error.name_en == "" &&
        vm.error.details_en == "" &&
        vm.error.taluk_en == "" &&
        vm.error.district_en == "" &&
        vm.error.area_en == "" &&
        vm.error.city_en == "" &&
        vm.error.pincode == "" &&
        vm.error.address == "" &&
        vm.error.videotitle == "" &&
        vm.error.imagetitle == "" &&
        vm.error.panditName == "" &&
        vm.error.panditNumber == "" &&
        vm.error.state_en == ""
      ) {
        let data = {
          name_en: vm.suggest.name_en,
          details_en:
            vm.suggest.details_en +
            " Pandit Name : " +
            this.panditName +
            ", Pandit Number : +91" +
            this.panditNumber,
          taluk_en: vm.suggest.taluk_en,
          district_en: vm.suggest.district_en,
          area_en: vm.suggest.area_en,
          city_en: vm.suggest.city_en,
          state_en: vm.suggest.state_en,
          pincode: vm.suggest.pincode,
          address: vm.suggest.address,
          rath: false,
          gods: [vm.selectedGod],
          images: [this.imageid],
          videos: [this.videoid],
        };
        let loader = this.$loading.show();
        this.$store
          .dispatch("post", { uri: "devotee/temple/create/", data: data })
          .then((response) => {
            loader.hide();
            this.alert = true;
          })
          .catch((errors) => {
            loader.hide();
            console.log(errors);
          });
      }
    },

    getgods() {
      let vm = this;
      vm.$store
        .dispatch("get", { uri: "pujari/god/" })
        .then((response) => {
          vm.god = response.data.results;
          for (let i = 0; i < response.data.count; i++) {
            vm.text += [i] + response.data.results[i].name + "<br>";
          }
        })
        .catch((errors) => {
          console.log(errors);
        });
    },
  },
};
</script>
<style></style>
