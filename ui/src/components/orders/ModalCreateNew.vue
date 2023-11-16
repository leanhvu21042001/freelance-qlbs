<script setup>
import { useMutation, useQuery } from "@tanstack/vue-query";
import { reactive, ref } from "vue";
import { notify } from "@kyvg/vue3-notification";
import { required } from "@vuelidate/validators";
import useVuelidate from "@vuelidate/core";

import { createOrder } from "../../services/orders";
import { getCustomers } from "../../services/customers";
import { getBooks } from "../../services/books";

const { refetchOrders } = defineProps(["refetchOrders"]);

const formData = reactive({
  title: "",
  customer: "",
  books: [],
});

const rules = {
  title: {
    required,
  },
  customer: {
    required,
  },
  books: {
    required,
  },
};

const v$ = useVuelidate(rules, formData);

const { data: books } = useQuery({
  queryKey: ["books"],
  queryFn: getBooks,
  initialData: [],
});

const { data: customers } = useQuery({
  queryKey: ["customers"],
  queryFn: getCustomers,
  initialData: [],
});

const { mutate } = useMutation({
  mutationFn: createOrder,
  onSuccess: () => {
    refetchOrders();
    notify({
      title: "Created 🎉",
    });
  },
  onError: () => {
    notify({
      type: "error",
      title: "Create Not Success",
    });
  },
});

async function handleSubmit() {
  const result = await v$.value.$validate();
  if (!result) return;

  mutate({
    order_title: formData.title,
    customer_id: formData.customer,
    book_ids: formData.books,
  });
  formData.title = "";
  formData.customer = "";
  formData.books = [];
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
            <h5 class="modal-title" id="exampleModalLabel">Create new Order</h5>
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
                <label for="title" class="form-label">Order title</label>
                <input
                  v-model="formData.title"
                  type="text"
                  class="form-control"
                  id="title"
                  placeholder="Order title"
                />
                <span
                  class="text-danger"
                  v-for="error in v$.title.$errors"
                  :key="error.$uid"
                >
                  {{ error.$message }}
                </span>
              </div>
              <div class="mb-3">
                <label for="customer" class="form-label">Customer</label>
                <select
                  id="customer"
                  class="form-select"
                  aria-label="select customer"
                  v-model="formData.customer"
                >
                  <option :disabled="true" :selected="true">
                    Select Customer
                  </option>
                  <option
                    v-for="(customerOption, index) in customers"
                    :key="customerOption.id"
                    :value="customerOption.id"
                  >
                    {{ customerOption.name }}
                  </option>
                </select>
                <span
                  class="text-danger"
                  v-for="error in v$.customer.$errors"
                  :key="error.$uid"
                >
                  {{ error.$message }}
                </span>
              </div>

              <div class="mb-3">
                <select
                  v-model="formData.books"
                  class="form-select"
                  aria-label="select books"
                  multiple
                >
                  >
                  <option :disabled="true" :selected="true">
                    Select books
                  </option>
                  <option
                    v-for="(bookOption, index) in books"
                    :key="bookOption.books.id"
                    :value="bookOption.books.id"
                  >
                    {{ bookOption.books.title }}
                  </option>
                </select>
                <span
                  class="text-danger"
                  v-for="error in v$.books.$errors"
                  :key="error.$uid"
                >
                  {{ error.$message }}
                </span>
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
