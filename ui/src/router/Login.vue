<script setup>
import { useMutation } from "@tanstack/vue-query";
import { login } from "../services/users";
import { setToken } from "../utils/token.utils";
import useVuelidate from "@vuelidate/core";
import { required, email } from "@vuelidate/validators";
import { reactive } from "vue";

const formData = reactive({
  username: "",
  password: "",
});

const rules = {
  username: {
    required,
    email,
  },
  password: {
    required,
  },
};

const v$ = useVuelidate(rules, formData);

const { mutate } = useMutation({
  mutationFn: login,
  onSuccess: (token) => {
    if (token) {
      setToken(token);
      window.location.href = "/";
    }
  },
});

async function handleLogin() {
  const result = await v$.value.$validate();
  if (!result) return;
  mutate(formData);
}
</script>

<template>
  <div id="login">
    <div
      class="container d-flex justify-content-center align-items-center vh-100"
    >
      <form class="w-70" @submit.prevent="handleLogin">
        <h1>Login to manager</h1>
        <div class="mb-3">
          <label for="email" class="form-label">Email</label>
          <input
            v-model="formData.username"
            type="email"
            class="form-control"
            id="email"
            placeholder="name@example.com"
          />
          <span
            class="text-danger"
            v-for="error in v$.username.$errors"
            :key="error.$uid"
          >
            {{ error.$message }}
          </span>
        </div>

        <div class="mb-3">
          <label for="password" class="form-label">Password</label>
          <input
            v-model="formData.password"
            type="password"
            class="form-control"
            id="password"
            placeholder="********"
          />
          <span
            class="text-danger"
            v-for="error in v$.password.$errors"
            :key="error.$uid"
          >
            {{ error.$message }}
          </span>
        </div>

        <button class="btn btn-primary">Submit</button>
      </form>
    </div>
  </div>
</template>

<style scoped></style>
