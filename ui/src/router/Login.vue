<script setup>
import { useMutation } from "@tanstack/vue-query";
import { login } from "../services/users";
import { setToken } from "../utils/token.utils";

const { mutate } = useMutation({
  mutationFn: login,
  onSuccess: (token) => {
    if (token) {
      setToken(token);
      window.location.href = "/";
    }
  },
});

function handleLogin() {
  mutate({
    username: email.value,
    password: password.value,
  });
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
            v-model="email"
            type="email"
            class="form-control"
            id="email"
            placeholder="name@example.com"
          />
        </div>

        <div class="mb-3">
          <label for="password" class="form-label">Password</label>
          <input
            v-model="password"
            type="password"
            class="form-control"
            id="password"
            placeholder="********"
          />
        </div>

        <button class="btn btn-primary">Submit</button>
      </form>
    </div>
  </div>
</template>

<style scoped></style>
