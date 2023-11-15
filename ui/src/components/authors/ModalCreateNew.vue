<script setup>
import { useMutation, useQuery } from "@tanstack/vue-query";
import { createAuthor, getAuthors } from "../../services/authors";
import { ref } from "vue";

const { refetchAuthors } = defineProps(["refetchAuthors"]);

const nameInput = ref("");

const { data: authors } = useQuery({
  queryKey: ["authors"],
  queryFn: getAuthors,
});

const { mutate } = useMutation({
  mutationFn: createAuthor,
  onSuccess: () => {
    refetchAuthors();
  },
});

function handleSubmit(event) {
  mutate({ name: nameInput.value });
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
            <h5 class="modal-title" id="exampleModalLabel">
              Create new Author
            </h5>
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
                <label for="title" class="form-label">Name</label>
                <input
                  v-model="nameInput"
                  type="text"
                  class="form-control"
                  id="title"
                  placeholder="Author name"
                />
              </div>

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
