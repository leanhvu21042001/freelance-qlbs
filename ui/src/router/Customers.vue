<script setup>
import ModalCreateNew from "../components/customers/ModalCreateNew.vue";
import RenderList from "../components/customers/RenderList.vue";

import { useQuery } from "@tanstack/vue-query";
import { getCustomers } from "../services/customers";

const { data: customers, refetch: refetchCustomers } = useQuery({
  queryKey: ["customers"],
  queryFn: getCustomers,
  initialData: [],
});
</script>

<template>
  <div id="customers">
    <h1>Customer Manager</h1>
    <ModalCreateNew :refetchCustomers="refetchCustomers" />
    <RenderList :customers="customers" :refetchCustomers="refetchCustomers" />
  </div>
</template>
