<script setup>
import { useMutation } from "@tanstack/vue-query";

import { deleteAuthor } from "../../services/authors";

const { authors, refetchAuthors } = defineProps(["authors", "refetchAuthors"]);

const { mutate } = useMutation({
  mutationFn: deleteAuthor,
  onSuccess: () => {
    refetchAuthors();
  },
});

const handleDeleteAuthor = (authorId) => {
  mutate(authorId);
};
</script>

<template>
  <table class="table">
    <thead>
      <tr>
        <th scope="col">#</th>
        <th scope="col">Author</th>
        <th scope="col">Handle</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(author, index) in authors" :key="index">
        <th scope="row">#{{ author.id }}</th>
        <td>{{ author.name }}</td>
        <td>
          <router-link
            class="nav-link"
            aria-current="page"
            :to="`/authors/${author.id}`"
          >
            <button class="mx-1 btn btn-warning">Edit</button></router-link
          >

          <button
            @click="() => handleDeleteAuthor(author.id)"
            class="mx-1 btn btn-danger"
          >
            Delete
          </button>
        </td>
      </tr>
    </tbody>
  </table>
</template>
