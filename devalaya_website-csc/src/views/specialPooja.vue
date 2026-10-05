<template>
  <main style="background-color: #fde5d1">
    <br />
    <br />
    <h3 class="fontie" style="color: black">Special puja's</h3>
    <br />
    <div class="container">
      <section>
        <div class="row g-4">
          <div
            class="col-sm-6 col-lg-4 col-xl-3"
            v-for="item in specialpooja"
            :key="item"
          >
            <a
              href="#"
              class="card shadow h-100"
              @click.prevent="viewSplEvent(splcategory, item.id)"
            >
              <div class="position-relative">
                <img
                  :src="item.image"
                  class="temple card-img-middle"
                  alt="Card image"
                />
                <div class="card-img-overlay p-3 z-index-1"></div>
              </div>
              <div class="card-body">
                <h5 class="card-title me-2">🙏 {{ item.name }}</h5>
              </div>
              <div class="card-footer">
                <div class="d-flex justify-content-between align-items-center">
                  <button
                    class="button p-0 mb-0"
                    style="width: -webkit-fill-available"
                  >
                    <span> View Details </span>
                  </button>
                </div>
              </div>
            </a>
          </div>
          <Paginate
            class="pagination pagination-sm"
            :maxPage="meta.maxPage"
            :totalPages="meta.lastPage"
            :currentPage="meta.page"
            @pagechanged="onPageChange"
          />
        </div>
      </section>
    </div>
  </main>
</template>

<script>
import Paginate from "@/components/Pagination.vue";
import "vue3-carousel/dist/carousel.css";
import { Carousel, Slide, Pagination, Navigation } from "vue3-carousel";

var moment = require("moment");

export default {
  name: "specialPooja",
  components: {
    Paginate,
    Carousel,
    Slide,
    Pagination,
    Navigation,
  },
  data() {
    return {
      moment: moment,
      meta: {
        page: 1,
        size: 12,
        count: 0,
        maxPage: 1,
        lastPage: 1,
        search: "",
        ordering: "name_en",
      },
      temples: [],
      specialpooja: [],
      splcategory: "",
      counts: "0",
    };
  },
  beforeRouteEnter(to, from, next) {
    next((vm) => {
      vm.$store
        .dispatch("get", {
          uri: "category/sub_category/?category=" + to.params.id,
        })
        .then((response) => {
          vm.specialpooja = response.data.results;
          vm.splcategory = response.data.results[0].category[0];
        })
        .catch((errors) => {
          console.log(errors);
        });
    });
  },

  mounted() {
    window.scrollTo(0, 0);
    this.eventsDetails();
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
    onPageChange(page) {
      this.meta.page = page;
      this.getTemples();
    },
    viewSplEvent(splcategory, name) {
      this.$router.push(
        "/List/category/" + splcategory + "/sub_category/" + name
      );
    },
    eventsDetails() {
      let vm = this;
      let loader = this.$loading.show();
      vm.$store
        .dispatch("get", { uri: "devotee/event/" })
        .then((response) => {
          loader.hide();
          vm.events = response.data.results;
          vm.counts = response.data.count;
        })
        .catch((errors) => {
          loader.hide();
          console.log(errors);
        });
    },
    searchEvent() {
      this.meta.page = 1;
      this.eventDetail();
    },
    eventDetail() {
      let vm = this;
      let loader = this.$loading.show();
      vm.$store
        .dispatch("get", { uri: "devotee/event/?search=" + vm.meta.search })
        .then((response) => {
          loader.hide();
          vm.events = response.data.results;
          vm.counts = response.data.count;
        })
        .catch((errors) => {
          loader.hide();
          console.log(errors);
        });
    },
  },
};
</script>
