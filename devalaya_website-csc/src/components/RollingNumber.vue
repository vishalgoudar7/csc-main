<!-- components/RollingNumber.vue -->

<template>
  <div class="rolling-number">
    <span v-for="(digit, index) in numberArray" :key="index" class="digit">
      {{ digit }}
    </span>
  </div>
</template>

<script>
export default {
  props: {
    targetNumber: {
      type: Number,
      required: true,
    },
  },
  data() {
    return {
      currentNumber: 0,
      animationDuration: 50000,
    };
  },
  computed: {
    numberArray() {
      return this.currentNumber.toString().split("").map(Number);
    },
  },
  methods: {
    startRolling() {
      const increment = Math.ceil(
        this.targetNumber / (this.animationDuration / 100)
      );

      const intervalId = setInterval(() => {
        this.currentNumber += increment;

        if (this.currentNumber >= this.targetNumber) {
          this.currentNumber = this.targetNumber;
          clearInterval(intervalId);
        }
      }, 100);
    },
  },
  mounted() {
    this.startRolling();
  },
};
</script>

<style scoped>
.rolling-number {
  font-size: 24px;
  display: inline-flex;
}

.digit {
  transition: transform 0.1s ease-in-out;
  display: inline-block;
}
</style>
