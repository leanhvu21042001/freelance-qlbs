<script setup>
import { useMutation } from "@tanstack/vue-query";
import { notify } from "@kyvg/vue3-notification";
import { deleteCustomer } from "../../services/customers";

const { customers, refetchCustomers } = defineProps([
  "customers",
  "refetchCustomers",
]);

const { mutate } = useMutation({
  mutationFn: deleteCustomer,
  onSuccess: () => {
    refetchCustomers();
     notify({
      title: "Deleted 🎉",
    });
  },
});

const handleDeleteCustomer = (customerId) => {
  mutate(customerId);
};
</script>

<template>
  <table class="table">
    <thead>
      <tr>
        <th scope="col">#</th>
        <th scope="col">Name</th>
        <th scope="col">Email</th>
        <th scope="col">Phone</th>
        <th scope="col">Handle</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(customer, index) in customers" :key="index">
        <th scope="row">#{{ customer.id }}</th>
        <td>{{ customer.name }}</td>
        <td>{{ customer.email }}</td>
        <td>{{ customer.phone }}</td>
        <td>
          <router-link
            class="nav-link"
            aria-current="page"
            :to="`/customers/${customer.id}`"
          >
            <button class="mx-1 btn btn-warning">Edit</button>
          </router-link>

          <button
            @click="() => handleDeleteCustomer(customer.id)"
            class="mx-1 btn btn-danger"
          >
            Delete
          </button>
        </td>
      </tr>
    </tbody>
  </table>
</template>
