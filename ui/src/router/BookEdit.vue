<script setup>
import { useMutation, useQuery } from "@tanstack/vue-query";
import { getAuthors } from "../services/authors";
import { editBook, getSingleBook } from "../services/books";
import { reactive, ref, watchEffect } from "vue";
import { useRoute } from "vue-router";
import { required } from "@vuelidate/validators";
import useVuelidate from "@vuelidate/core";
import { notify } from "@kyvg/vue3-notification";

const route = useRoute();

const bookId = ref(route.params.id);
const formData = reactive({
  author: undefined,
  title: "",
});
const rules = {
  author: { required },
  title: { required },
};

const v$ = useVuelidate(rules, formData);

const { data: book } = useQuery({
  queryKey: ["get-book", bookId.value],
  queryFn: () => getSingleBook(bookId.value),
});

const { data: authors } = useQuery({
  queryKey: ["authors"],
  queryFn: getAuthors,
});

watchEffect(() => {
  if (book.value) {
    formData.title = book.value.title;
    formData.author = book.value.author_id;
  }
});

const { mutate } = useMutation({
  mutationFn: editBook,
  onSuccess: () => {
    notify({
      title: "Updated 🎉",
    });
  },
  onError: () => {
    notify({
      type: "error",
      title: "Edit Not Success",
    });
  },
});

async function handleSubmit() {
  const result = await v$.value.$validate();
  if (!result) return;
  mutate({
    bookId: bookId.value,
    title: formData.title,
    author_id: formData.author,
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
              v-model="formData.title"
              type="text"
              class="form-control"
              id="title"
              placeholder="Book title"
            />
            <span
              class="text-danger"
              v-for="error in v$.title.$errors"
              :key="error.$uid"
            >
              {{ error.$message }}
            </span>
          </div>

          <label for="Author" class="form-label">Author</label>
          <select
            id="Author"
            class="form-select"
            aria-label="select authors"
            v-model="formData.author"
          >
            <option :disabled="true" :selected="true">Select Author</option>
            <option
              v-for="(authorOption, index) in authors"
              :key="authorOption.id"
              :value="authorOption.id"
            >
              {{ authorOption.name }}
            </option>
            <span
              class="text-danger"
              v-for="error in v$.author.$errors"
              :key="error.$uid"
            >
              {{ error.$message }}
            </span>
          </select>

          <button class="btn btn-primary w-100 mt-4" type="submit">Save</button>
        </form>
      </div>
    </div>
  </div>
</template>
