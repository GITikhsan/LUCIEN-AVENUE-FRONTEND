<template>
  <div class="d-flex justify-content-center align-items-center min-vh-100 bg-light">
    <div class="card shadow p-4 text-center" style="max-width: 400px; width: 100%;">
      <h3 class="mb-3">Verify your email</h3>
      <p class="text-muted">We’ve sent a 4-digit code to your email. Enter it below to confirm.</p>

      <div class="d-flex justify-content-center gap-2 mb-4">
        <input
          v-for="(digit, index) in code"
          :key="index"
          ref="inputs"
          type="text"
          class="form-control text-center"
          maxlength="1"
          style="width: 60px; height: 60px; font-size: 1.5rem;"
          v-model="code[index]"
          @input="handleInput(index)"
          @keydown.backspace="handleBackspace(index)"
        />
      </div>

      <button
        class="btn btn-success w-100"
        :disabled="!isComplete"
        @click="submitCode"
      >
        Confirm Code
      </button>

      <div class="mt-3">
        <a href="#" class="text-success">Resend Code</a>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      code: ["", "", "", ""],
    };
  },
  computed: {
    isComplete() {
      return this.code.every((digit) => digit !== "");
    },
  },
  methods: {
    handleInput(index) {
      const input = this.$refs.inputs[index];
      const next = this.$refs.inputs[index + 1];
      if (input.value.length === 1 && next) {
        next.focus();
      }
    },
    handleBackspace(index) {
      const input = this.$refs.inputs[index];
      const prev = this.$refs.inputs[index - 1];
      if (input.value === "" && prev) {
        prev.focus();
      }
    },
    submitCode() {
      alert("Code entered: " + this.code.join(""));
    },
  },
  mounted() {
    this.$refs.inputs[0].focus();
  },
};
</script>

<style scoped>
.card {
  border-radius: 1rem;
}
</style>
