<script setup>
import { useMutation, useQuery } from "@tanstack/vue-query";
import { reactive, ref, watchEffect } from "vue";
import { useRoute } from "vue-router";
import { required } from "@vuelidate/validators";
import useVuelidate from "@vuelidate/core";
import { editUser, getSingleUser } from "../services/users";

const route = useRoute();

const userId = ref(route.params.id);
const formData = reactive({
  username: "",
});

const rules = {
  username: {
    required,
  },
};

const v$ = useVuelidate(rules, formData);

const { data: user } = useQuery({
  queryKey: ["get-user", userId.value],
  queryFn: () => getSingleUser(userId.value),
});

watchEffect(() => {
  if (user.value) {
    formData.username = user.value.username;
  }
});

const { mutate } = useMutation({
  mutationFn: editUser,
});

async function handleSubmit() {
  const result = await v$.value.$validate();
  if (!result) return;
  mutate({
    userId: userId.value,
    username: formData.username,
  });
}
</script>

<template>
  <div>
    <h1>Edit User {{ $route.params.id }}</h1>
    <div class="modal-content">
      <div class="modal-header"></div>
      <div class="modal-body">
        <form @submit.prevent="handleSubmit">
          <div class="mb-3">
            <label for="title" class="form-label">Name</label>
            <input
              v-model="formData.username"
              type="email"
              class="form-control"
              id="title"
              placeholder="User name"
            />
            <span
              class="text-danger"
              v-for="error in v$.username.$errors"
              :key="error.$uid"
            >
              {{ error.$message }}
            </span>
          </div>

          <button class="btn btn-primary w-100 mt-4" type="submit">Save</button>
        </form>
      </div>
    </div>
  </div>
</template>
