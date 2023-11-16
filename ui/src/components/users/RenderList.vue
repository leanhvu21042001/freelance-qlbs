<script setup>
import moment from "moment";
import { useMutation } from "@tanstack/vue-query";
import { notify } from "@kyvg/vue3-notification";

import { deleteUser } from "../../services/users";

const { users, refetchUsers } = defineProps(["users", "refetchUsers"]);

const { mutate } = useMutation({
  mutationFn: deleteUser,
  onSuccess: () => {
    refetchUsers();
    notify({
      title: "Deleted 🎉",
    });
  },
});

const handleDeleteUser = (userId) => {
  mutate(userId);
};
</script>

<template>
  <table class="table">
    <thead>
      <tr>
        <th scope="col">#</th>
        <th scope="col">username</th>
        <th scope="col">Created at</th>
        <th scope="col">Handle</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(user, index) in users" :key="index">
        <th scope="row">#{{ user.id }}</th>
        <td>{{ user.username }}</td>
        <td>
          {{ moment(user.created_at).format("DD/MM/YYYY - HH:mm:ss") }}
        </td>
        <td>
          <router-link
            class="nav-link"
            aria-current="page"
            :to="`/users/${user.id}`"
          >
            <button class="mx-1 btn btn-warning">Edit</button>
          </router-link>

          <button
            @click="() => handleDeleteUser(user.id)"
            class="mx-1 btn btn-danger"
          >
            Delete
          </button>
        </td>
      </tr>
    </tbody>
  </table>
</template>
