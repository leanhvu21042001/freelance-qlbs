<script setup>
import moment from "moment";
import { useMutation } from "@tanstack/vue-query";

import { deleteOrder } from "../../services/orders";

const { orders, refetchOrders } = defineProps(["orders", "refetchOrders"]);

const { mutate } = useMutation({
  mutationFn: deleteOrder,
  onSuccess: () => {
    refetchOrders();
  },
});

const handleDeleteOrder = (orderId) => {
  mutate(orderId);
};
</script>

<template>
  <table class="table">
    <thead>
      <tr>
        <th scope="col">#</th>
        <th scope="col">Order title</th>
        <th scope="col">Customer name</th>
        <th scope="col">Customer email</th>
        <th scope="col">Customer phone</th>
        <th scope="col">Created at</th>
        <th scope="col">Handle</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(order, index) in orders" :key="index">
        <th scope="row">#{{ order.orders.id }}</th>
        <td>{{ order.orders.title }}</td>
        <td>{{ order.customers.name }}</td>
        <td>{{ order.customers.email }}</td>
        <td>{{ order.customers.phone }}</td>
        <td>
          {{ moment(order.orders.created_at).format("DD/MM/YYYY - HH:mm:ss") }}
        </td>
        <td>
          <router-link
            class="nav-link"
            aria-current="page"
            :to="`/orders/${order.orders.id}`"
          >
            <button class="mx-1 btn btn-success">Detail</button>
          </router-link>

          <button
            @click="() => handleDeleteOrder(order.orders.id)"
            class="mx-1 btn btn-danger"
          >
            Delete
          </button>
        </td>
      </tr>
    </tbody>
  </table>
</template>
