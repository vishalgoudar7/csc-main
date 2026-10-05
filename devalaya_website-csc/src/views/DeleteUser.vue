<template>
  <div class="container">
    <div class="card">
      <h2 class="mt-4 mb-4">Before Deleting Your Account</h2>
      <p>You need to understand what all data will be deleted:</p>

      <div class="data-section">
        <h4>Account Information:</h4>
        <ul>
          <li>
            Your username, email address, and any other personal information
            associated with your account.
          </li>
        </ul>
      </div>

      <div class="data-section">
        <h4>Profile Data:</h4>
        <ul>
          <li>
            Information you provided in your profile, such as your name, profile
            picture, and bio.
          </li>
        </ul>
      </div>

      <div class="data-section">
        <h4>Usage Data:</h4>
        <ul>
          <li>
            Information about how you've used the app, including activity logs,
            history, or usage statistics.
          </li>
        </ul>
      </div>

      <div class="data-section">
        <h4>Content:</h4>
        <ul>
          <li>
            Any content you created, uploaded, or posted on the platform, such
            as posts, comments, images, videos, etc.
          </li>
        </ul>
      </div>

      <div class="data-section">
        <h4>Connections and Contacts:</h4>
        <ul>
          <li>
            Information about your connections, friends, or contacts within the
            app.
          </li>
        </ul>
      </div>

      <div class="data-section">
        <h4>Settings and Preferences:</h4>
        <ul>
          <li>
            Your app settings and preferences, such as notification preferences
            or custom configurations.
          </li>
        </ul>
      </div>
    </div>
    <div class="confirmation-checkbox">
      <input type="checkbox" id="confirmCheckbox" v-model="confirmCheckbox" />
      <label for="confirmCheckbox">
        &nbsp; I confirm that I want to delete my account.</label
      >
    </div>

    <button
      class="deletebutton"
      @click="deleteAccount"
      :disabled="!confirmCheckbox"
    >
      Delete My Account
    </button>
    <dialog id="delete" style="background-color: white; max-width: 400px">
      <div class="contact-form">
        <form
          id="contact"
          target="_blank"
          action="https://formsubmit.co/support@devalayas.com"
          method="POST"
        >
          <input
            type="hidden"
            name="_cc"
            value="preetham2u@gmail.com,arthur.ps@gmail.com,info@devalayas.com"
          />
          <input
            type="hidden"
            name="_subject"
            value="DEVALAYAS.IN New Form Submission!"
          />
          <div class="row">
            <h5 class="col-12 text-center">
              <p>Are you sure you want to delete?</p>
            </h5>
            <div class="col-lg-6 col-sm-12">
              <fieldset>
                <input
                  type="text"
                  v-model="userName"
                  class="form-control"
                  placeholder="Full Name"
                />
              </fieldset>
            </div>

            <div class="col-lg-6 col-sm-12">
              <fieldset>
                <input
                  type="phone"
                  name="phone"
                  class="form-control"
                  placeholder="Phone Number"
                />
              </fieldset>
            </div>
          </div>
          <div class="form-group">
            <textarea
              placeholder="Mention Your Query"
              class="form-control"
              name="Reason to delete"
              rows="10"
            ></textarea>
          </div>
          <button type="submit" class="form-control">Confirm Delete</button>
        </form>
        <button @click="closeModal" class="close-button">Cancel Delete</button>
      </div>
    </dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      emailId: "",
      mobileNo: "",
      userName: "",
      user: this.$store.getters.user,
      confirmCheckbox: false,
      isModalOpen: false,
    };
  },
  mounted() {
    window.scrollTo(0, 0);
  },
  methods: {
    openModal() {
      this.isModalOpen = true;
    },
    closeModal() {
      document.getElementById("delete").close();
      this.isModalOpen = false;
    },
    deleteAccount() {
      if (this.confirmCheckbox) {
        document.getElementById("delete").showModal();
      }
    },
  },
};
</script>

<style scoped>
.deletebutton {
  display: inline-block;
  border-color: transparent;
  border-radius: 23px;
  background: #ff5757;
  color: #fff;
  padding: 10px;
  font-size: 25 px;
  width: 400px;
  transition: all 0.5s;
  cursor: pointer;
  margin-bottom: 20px;
}
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal {
  background: #fff;
  padding: 20px;
  border-radius: 10px;
  text-align: center;
}

.close-button {
  margin-top: 10px;
  padding: 5px 10px;
  background: #ccc;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}
/* Add your styling here */
.delete-account {
  max-width: 600px;
  margin: auto;
  padding: 20px;
  background-color: #f0f0f0;
  border-radius: 10px;
  text-align: left;
}

.confirmation-checkbox {
  margin-top: 20px;
}
.data-section {
  padding: 20px;
  margin-bottom: 20px;
  background-color: #f7f7f7;
  border: 1px solid #e0e0e0;
  text-align: left;
}

/* Add additional styling as needed */
</style>
