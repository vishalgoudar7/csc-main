<template>
  <main style="background-color: #fde5d1">
    <div class="container">
      <section>
        <div class="container" style="text-align: left">
          <div class="row">
            <div class="col-12 text-center" style="padding-top: 30px">
              <h3 class="mb-0">EXPLORE MORE EVENTS</h3>
            </div>
          </div>
          <div class="row">
            <div class="col-xl-8 mx-auto">
              <div
                class="bg-blur bg-white bg-opacity-10 border border-light border-opacity-25 rounded-3 p-4"
              >
                <div class="row g-3 justify-content-center align-items-center">
                  <div class="col-lg-10">
                    <div class="form-input-dropdown position-relative">
                      <input
                        v-model="meta.search"
                        placeholder="Search for Event"
                        class="form-control form-control-lg me-1 ps-5"
                        @keyup.enter="searchEvent"
                        type="text"
                      />
                    </div>
                  </div>
                  <div class="col-lg-2 d-grid">
                    <a
                      class="btn btn-lg btn-primary mb-0"
                      href="#"
                      @click.prevent="searchEvent"
                      >Search</a
                    >
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="row g-4" v-if="counts == '0'">
            <br />
            <br />
            <br />
          </div>
          <div class="row g-4" v-if="counts != '0'">
            <div
              class="col-sm-6 col-lg-4 col-xl-3"
              v-for="item in events"
              :key="item"
            >
              <a
                href="#"
                class="card shadow h-100"
                @click.prevent="viewEvent(item.name)"
              >
                <div class="position-relative">
                  <div v-if="item.temple == null">
                    <img
                      style="height: 200px; max-width: 80px"
                      src="@/assets/banners/Default.png"
                      alt="Card image"
                    />
                  </div>
                  <div v-else>
                    <img :src="item.image" alt="Card image" />
                  </div>
                </div>
                <div class="card-body">
                  <ul class="list-group list-group-borderless mb-0">
                    <li class="list-group-item small pb-0">
                      <h5>{{ item.temple.name }}</h5>
                    </li>
                    <li class="list-group-item small pb-0">
                      🙏 {{ item.pooja.name }}
                    </li>
                    <li class="list-group-item small pb-0">
                      📍 {{ item.temple.state }}
                    </li>
                  </ul>
                </div>
                <div class="card-footer">
                  <div
                    class="d-flex justify-content-between align-items-center"
                  >
                    <button class="button p-0 mb-0" style="width: 100%">
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
  name: "Eventlist",
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
        date: "2",
      },
      temples: [],
      events: [],
      counts: "0",
    };
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
    viewEvent(name) {
      this.$router.push("search/" + name);
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
