<script setup>
import moment from "moment";
import { useQuery } from "@tanstack/vue-query";
import { ref } from "vue";
import { useRoute } from "vue-router";
import { getSingleOrder } from "../services/orders";
const route = useRoute();

const orderId = ref(route.params.id);

const { data } = useQuery({
  queryKey: ["get-order", orderId.value],
  queryFn: () => getSingleOrder(orderId.value),
});
</script>

<template>
  <div>
    <div class="basic-info card">
      <div class="card-body">
        <h1>Detail Order #{{ $route.params.id }}</h1>
        <h2>
          Title: {{ data.order.orders.title }} -
          {{
            moment(data.order.orders.created_at).format("DD/MM/YYYY - HH:MM:SS")
          }}
        </h2>
      </div>
    </div>

    <div class="customer-info card">
      <div class="card-body">
        <p>
          Customer name: <strong>{{ data.order.customers.name }}</strong>
        </p>
        <p>
          Customer email: <strong>{{ data.order.customers.email }}</strong>
        </p>
        <p>
          Customer phone: <strong>{{ data.order.customers.phone }}</strong>
        </p>
      </div>
    </div>

    <div class="card">
      <div class="card-body">
        <table class="table">
          <thead>
            <tr>
              <th scope="col">#book id</th>
              <th scope="col">book title</th>
              <th scope="col">author</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(book, index) in data.books" :key="index">
              <th scope="row">#{{ book.books.id }}</th>
              <td>{{ book.books.title }}</td>
              <td>{{ book.authors.name }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>
