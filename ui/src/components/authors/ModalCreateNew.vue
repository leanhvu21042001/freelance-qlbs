<script setup>
import { useMutation } from "@tanstack/vue-query";
import { createAuthor } from "../../services/authors";
import { reactive, ref } from "vue";
import { required, minLength, email } from "@vuelidate/validators";
import useVuelidate from "@vuelidate/core";

const { refetchAuthors } = defineProps(["refetchAuthors"]);

const formData = reactive({
  name: "",
});
const rules = {
  name: { required, minLength: minLength(6) },
};

const v$ = useVuelidate(rules, formData);

const { mutate } = useMutation({
  mutationFn: createAuthor,
  onSuccess: () => {
    refetchAuthors();
  },
});

async function handleSubmit() {
  const result = await v$.value.$validate();
  if (!result) return;

  mutate({ name: formData.name });
  formData.name = "";
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
                <label for="name" class="form-label">Name</label>
                <input
                  v-model="formData.name"
                  type="text"
                  class="form-control"
                  id="name"
                  placeholder="Author name"
                />
                <span
                  class="text-danger"
                  v-for="error in v$.name.$errors"
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
