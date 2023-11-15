<script setup>
import { useMutation, useQuery } from "@tanstack/vue-query";
import { createCustomer, getCustomers } from "../../services/customers";
import { ref } from "vue";

const { refetchCustomers } = defineProps(["refetchCustomers"]);

const nameInput = ref("");
const emailInput = ref("");
const phoneInput = ref("");

const { mutate } = useMutation({
  mutationFn: createCustomer,
  onSuccess: () => {
    refetchCustomers();
  },
});

function handleSubmit(event) {
  mutate({
    name: nameInput.value,
    email: emailInput.value,
    phone: phoneInput.value,
  });
  event.target.reset();
}
</script>

<template>
  <div>
    <!-- Button trigger modal -->
    <button
      type="button"
      class="btn btn-primary mt-3 mb-4"
      data-bs-toggle="modal"
      data-bs-target="#modalCreateNew"
    >
      Create new
    </button>

    <!-- Modal -->
    <div
      class="modal fade"
      id="modalCreateNew"
      tabindex="-1"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">
              Create new Customer
            </h5>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
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

              <button class="btn btn-primary w-100 mt-4" type="submit">
                Save
              </button>
            </form>
          </div>
          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-secondary"
              data-bs-dismiss="modal"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
