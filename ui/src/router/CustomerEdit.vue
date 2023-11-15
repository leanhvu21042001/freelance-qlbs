<script setup>
import { useMutation, useQuery } from "@tanstack/vue-query";
import { ref, watchEffect } from "vue";
import { useRoute } from "vue-router";
import { editCustomer, getSingleCustomer } from "../services/customers";

const route = useRoute();

const customerId = ref(route.params.id);
const nameInput = ref("");
const emailInput = ref("");
const phoneInput = ref("");

const { data: customer } = useQuery({
  queryKey: ["get-customer", customerId.value],
  queryFn: () => getSingleCustomer(customerId.value),
});

watchEffect(() => {
  if (customer.value) {
    nameInput.value = customer.value.name;
    nameInput.value = customer.value.name;
    emailInput.value = customer.value.email;
    phoneInput.value = customer.value.phone;
  }
});

const { mutate } = useMutation({
  mutationFn: editCustomer,
});

function handleSubmit() {
  mutate({
    customerId: customerId.value,
    name: nameInput.value,
    email: emailInput.value,
    phone: phoneInput.value,
  });
}
</script>

<template>
  <div>
    <h1>Edit Customer {{ $route.params.id }}</h1>
    <div class="modal-content">
      <div class="modal-header"></div>
      <div class="modal-body">
        <form @submit.prevent="handleSubmit">
          <div class="mb-3">
            <label for="title" class="form-label">Name</label>
            <input
              v-model="nameInput"
              type="text"
              class="form-control"
              id="title"
              placeholder="Customer name"
            />
          </div>

          <div class="mb-3">
            <label for="title" class="form-label">Email</label>
            <input
              v-model="emailInput"
              type="email"
              class="form-control"
              id="title"
              placeholder="Customer email"
            />
          </div>

          <div class="mb-3">
            <label for="title" class="form-label">phone</label>
            <input
              v-model="phoneInput"
              type="text"
              class="form-control"
              id="title"
              placeholder="Customer phone"
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
