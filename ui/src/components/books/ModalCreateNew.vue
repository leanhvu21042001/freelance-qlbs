<script setup>
import { useMutation, useQuery } from "@tanstack/vue-query";
import { notify } from "@kyvg/vue3-notification";
import { reactive, ref } from "vue";
import { required } from "@vuelidate/validators";
import useVuelidate from "@vuelidate/core";
import { getAuthors } from "../../services/authors";
import { createBook } from "../../services/books";

const { refetchBooks } = defineProps(["refetchBooks"]);

const formData = reactive({
  author: "",
  title: "",
});
const rules = {
  author: { required },
  title: { required },
};

const v$ = useVuelidate(rules, formData);

const { data: authors } = useQuery({
  queryKey: ["authors"],
  queryFn: getAuthors,
});

const { mutate } = useMutation({
  mutationFn: createBook,
  onSuccess: () => {
    refetchBooks();
    notify({
      title: "Created 🎉",
    });
  },
  onError: () => {
    notify({
      type: "error",
      title: "Create Not Success",
    });
  },
});

async function handleSubmit(event) {
  const result = await v$.value.$validate();

  if (!result) return;

  mutate({ title: formData.title, author_id: formData.author });
  formData.author = "";
  formData.title = "";
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

              <div class="mb-3">
                <label for="Author" class="form-label">Author</label>
                <select
                  id="Author"
                  class="form-select"
                  aria-label="select authors"
                  v-model="formData.author"
                >
                  <option :disabled="true" :selected="true">
                    Select Author
                  </option>
                  <option
                    v-for="(authorOption, index) in authors"
                    :key="authorOption.id"
                    :value="authorOption.id"
                  >
                    {{ authorOption.name }}
                  </option>
                </select>
                <span
                  class="text-danger"
                  v-for="error in v$.author.$errors"
                  :key="error.$uid"
                >
                  {{ error.$message }}
                </span>
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
