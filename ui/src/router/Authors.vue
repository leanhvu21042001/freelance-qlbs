<script setup>
import ModalCreateNew from "../components/authors/ModalCreateNew.vue";
import RenderList from "../components/authors/RenderList.vue";

import { useQuery } from "@tanstack/vue-query";
import { getAuthors } from "../services/authors";

const { data: authors, refetch: refetchAuthors } = useQuery({
  queryKey: ["authors"],
  queryFn: getAuthors,
  initialData: [],
});
</script>

<template>
  <div id="authors">
    <h1>Author Manager</h1>
    <ModalCreateNew :refetchAuthors="refetchAuthors" />
    <RenderList :authors="authors" :refetchAuthors="refetchAuthors" />
  </div>
</template>
