<script setup>
import { useMutation, useQuery } from "@tanstack/vue-query";
import { getAuthors } from "../services/authors";
import { editBook, getSingleBook } from "../services/books";
import { ref, watchEffect } from "vue";
import { useRoute } from "vue-router";

const route = useRoute();

const bookId = ref(route.params.id);
const authorSelect = ref(1);
const titleInput = ref("");

const { data: book } = useQuery({
  queryKey: ["get-book", bookId.value],
  queryFn: () => getSingleBook(bookId.value),
});

const { data: authors } = useQuery({
  queryKey: ["authors"],
  queryFn: getAuthors,
});

watchEffect(() => {
  console.log("hihi", book.value);
  if (book.value) {
    titleInput.value = book.value.title;
    authorSelect.value = book.value.author_id;
  }
});

const { mutate } = useMutation({
  mutationFn: editBook,
});

function handleSubmit(event) {
  mutate({
    bookId: bookId.value,
    title: titleInput.value,
    author_id: authorSelect.value,
  });
}
</script>

<template>
  <div>
    <h1>Edit Book {{ $route.params.id }}</h1>
    <div class="modal-content">
      <div class="modal-header"></div>
      <div class="modal-body">
        <form @submit.prevent="handleSubmit">
          <div class="mb-3">
            <label for="title" class="form-label">Title</label>
            <input
              v-model="titleInput"
              type="text"
              class="form-control"
              id="title"
              placeholder="Book title"
            />
          </div>

          <label for="Author" class="form-label">Author</label>
          <select
            id="Author"
            class="form-select"
            aria-label="select authors"
            v-model="authorSelect"
          >
            <option :disabled="true" :selected="true">Select Author</option>
            <option
              v-for="(authorOption, index) in authors"
              :key="authorOption.id"
              :value="authorOption.id"
            >
              {{ authorOption.name }}
            </option>
          </select>

          <button class="btn btn-primary w-100 mt-4" type="submit">Save</button>
        </form>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">
          Close
        </button>
      </div>
    </div>
  </div>
</template>
