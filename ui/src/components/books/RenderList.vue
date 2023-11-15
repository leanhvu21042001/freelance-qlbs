<script setup>
import { useMutation } from "@tanstack/vue-query";

import { deleteBook } from "../../services/books";

const { books, refetchBooks } = defineProps(["books", "refetchBooks"]);

const { mutate } = useMutation({
  mutationFn: deleteBook,
  onSuccess: () => {
    refetchBooks();
  },
});

const handleDeleteBook = (bookId) => {
  console.log(bookId);
  mutate(bookId);
};
</script>

<template>
  <table class="table">
    <thead>
      <tr>
        <th scope="col">#</th>
        <th scope="col">Book Title</th>
        <th scope="col">Author</th>
        <th scope="col">Handle</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(book, index) in books" :key="index">
        <th scope="row">#{{ book.books.id }}</th>
        <td>{{ book.books.title }}</td>
        <td>{{ book.authors.name }}</td>
        <td>
          <router-link
            class="nav-link"
            aria-current="page"
            :to="`/books/${book.books.id}`"
          >
            <button class="mx-1 btn btn-warning">Edit</button></router-link
          >

          <button
            @click="() => handleDeleteBook(book.books.id)"
            class="mx-1 btn btn-danger"
          >
            Delete
          </button>
        </td>
      </tr>
    </tbody>
  </table>
</template>
