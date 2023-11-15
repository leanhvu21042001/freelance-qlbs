<script setup>
import { useMutation, useQuery } from "@tanstack/vue-query";
import { ref, watchEffect } from "vue";
import { useRoute } from "vue-router";
import { editAuthor, getSingleAuthor } from "../services/authors";

const route = useRoute();

const authorId = ref(route.params.id);
const nameInput = ref("");

const { data: author } = useQuery({
  queryKey: ["get-author", authorId.value],
  queryFn: () => getSingleAuthor(authorId.value),
});

watchEffect(() => {
  if (author.value) {
    nameInput.value = author.value.name;
  }
});

const { mutate } = useMutation({
  mutationFn: editAuthor,
});

function handleSubmit() {
  mutate({
    authorId: authorId.value,
    name: nameInput.value,
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
            <label for="name" class="form-label">Name</label>
            <input
              v-model="nameInput"
              type="text"
              class="form-control"
              id="name"
              placeholder="Author name"
            />
          </div>

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
