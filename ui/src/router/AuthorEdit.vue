<script setup>
import { useMutation, useQuery } from "@tanstack/vue-query";
import { reactive, ref, watchEffect } from "vue";
import { useRoute } from "vue-router";
import { editAuthor, getSingleAuthor } from "../services/authors";
import { required, minLength, email } from "@vuelidate/validators";
import useVuelidate from "@vuelidate/core";
import { notify } from "@kyvg/vue3-notification";

const route = useRoute();

const authorId = ref(route.params.id);
const formData = reactive({
  name: "",
});

const rules = {
  name: { required, minLength: minLength(6) },
};

const v$ = useVuelidate(rules, formData);

const { data: author } = useQuery({
  queryKey: ["get-author", authorId.value],
  queryFn: () => getSingleAuthor(authorId.value),
});

watchEffect(() => {
  if (author.value) {
    formData.name = author.value.name;
  }
});

const { mutate } = useMutation({
  mutationFn: editAuthor,
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
    authorId: authorId.value,
    name: formData.name,
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

          <button class="btn btn-primary w-100 mt-4" type="submit">Save</button>
        </form>
      </div>
    </div>
  </div>
</template>
