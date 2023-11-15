<script setup>
import ModalCreateNew from "../components/books/ModalCreateNew.vue";
import RenderList from "../components/books/RenderList.vue";

import { useQuery } from "@tanstack/vue-query";
import { getBooks } from "../services/books";

const { data: books, refetch: refetchBooks } = useQuery({
  queryKey: ["books"],
  queryFn: getBooks,
  initialData: [],
});
</script>

<template>
  <div id="books">
    <h1>Book Manager</h1>

    <ModalCreateNew :refetchBooks="refetchBooks" />

    <RenderList :books="books" :refetchBooks="refetchBooks" />
  </div>
</template>
