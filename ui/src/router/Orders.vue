<script setup>
import ModalCreateNew from "../components/orders/ModalCreateNew.vue";
import RenderList from "../components/orders/RenderList.vue";

import { useQuery } from "@tanstack/vue-query";
import { getOrders } from "../services/orders";

const { data: orders, refetch: refetchOrders } = useQuery({
  queryKey: ["orders"],
  queryFn: getOrders,
  initialData: [],
});
</script>

<template>
  <div id="orders">
    <h1>Order Manager</h1>

    <ModalCreateNew :refetchOrders="refetchOrders" />

    <RenderList :orders="orders" :refetchOrders="refetchOrders" />
  </div>
</template>
