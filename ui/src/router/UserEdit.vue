<script setup>
import { useMutation, useQuery } from "@tanstack/vue-query";
import { ref, watchEffect } from "vue";
import { useRoute } from "vue-router";
import { editUser, getSingleUser } from "../services/users";

const route = useRoute();

const userId = ref(route.params.id);
const nameInput = ref("");

const { data: user } = useQuery({
  queryKey: ["get-user", userId.value],
  queryFn: () => getSingleUser(userId.value),
});

watchEffect(() => {
  if (user.value) {
    nameInput.value = user.value.name;
  }
});

const { mutate } = useMutation({
  mutationFn: editUser,
});

function handleSubmit() {
  mutate({
    userId: userId.value,
    username: nameInput.value,
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
              v-model="nameInput"
              type="email"
              class="form-control"
              id="title"
              placeholder="User name"
            />
          </div>

          <button class="btn btn-primary w-100 mt-4" type="submit">Save</button>
        </form>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">
          Close
        </button>
      </div>
    </div>
  </div>
</template>
