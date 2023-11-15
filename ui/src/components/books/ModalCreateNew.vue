<script setup>
import { useMutation, useQuery } from "@tanstack/vue-query";
import { getAuthors } from "../../services/authors";
import { createBook } from "../../services/books";
import { ref } from "vue";

const { refetchBooks } = defineProps(["refetchBooks"]);

const authorSelect = ref(1);
const titleInput = ref('');

const { data: authors } = useQuery({
  queryKey: ["authors"],
  queryFn: getAuthors,
});

const { mutate } = useMutation({
  mutationFn: createBook,
  onSuccess: () => {
    refetchBooks();
  },
});

function handleSubmit(event) {
  mutate({ title: titleInput.value, author_id: authorSelect.value });
  event.target.reset();
}
</script>

<template>
  <div>
    <!-- Button trigger modal -->
    <button
      type="button"
      class="btn btn-primary mt-3 mb-4"
      data-bs-toggle="modal"
      data-bs-target="#modalCreateNew"
    >
      Create new
    </button>

    <!-- Modal -->
    <div
      class="modal fade"
      id="modalCreateNew"
      tabindex="-1"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">Create new Book</h5>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
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

              <select
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

              <button class="btn btn-primary w-100 mt-4" type="submit">
                Save
              </button>
            </form>
          </div>
          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-secondary"
              data-bs-dismiss="modal"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
