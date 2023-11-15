<script setup>
import { useMutation, useQuery } from "@tanstack/vue-query";
import { createOrder } from "../../services/orders";
import { ref } from "vue";
import { getCustomers } from "../../services/customers";
import { getBooks } from "../../services/books";

const { refetchOrders } = defineProps(["refetchOrders"]);

const orderTitle = ref("");
const customer = ref("");
const selectBooks = ref([]);

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
  },
});

function handleSubmit(event) {
  mutate({
    order_title: orderTitle.value,
    customer_id: customer.value,
    book_ids: selectBooks.value,
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
                  v-model="orderTitle"
                  type="text"
                  class="form-control"
                  id="title"
                  placeholder="Order title"
                />
              </div>
              <div class="mb-3">
                <select
                  class="form-select"
                  aria-label="select customer"
                  v-model="customer"
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
              </div>

              {{ selectBooks }}
              <div class="mb-3">
                <select
                  v-model="selectBooks"
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
