<script setup>
import ModalCreateNew from "../components/users/ModalCreateNew.vue";
import RenderList from "../components/users/RenderList.vue";

import { useQuery } from "@tanstack/vue-query";
import { getUsers } from "../services/users";

const { data: users, refetch: refetchUsers } = useQuery({
  queryKey: ["users"],
  queryFn: getUsers,
  initialData: [],
});
</script>

<template>
  <div id="users">
    <h1>User Manager</h1>
    <ModalCreateNew :refetchUsers="refetchUsers" />
    <RenderList :users="users" :refetchUsers="refetchUsers" />
  </div>
</template>
