<script setup>
import { useMutation } from "@tanstack/vue-query";
import { notify } from "@kyvg/vue3-notification";
import { reactive } from "vue";
import useVuelidate from "@vuelidate/core";
import { required } from "@vuelidate/validators";
import { createUser } from "../../services/users";

const { refetchUsers } = defineProps(["refetchUsers"]);

const formData = reactive({
  username: "",
});

const rules = {
  username: {
    required,
  },
};

const v$ = useVuelidate(rules, formData);

const { mutate } = useMutation({
  mutationFn: createUser,
  onSuccess: () => {
    refetchUsers();
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

async function handleSubmit() {
  const result = await v$.value.$validate();
  if (!result) return;
  mutate({
    username: formData.username,
  });

  formData.username = "";
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
            <h5 class="modal-title" id="exampleModalLabel">Create new User</h5>
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
                <label for="username" class="form-label">Username</label>
                <input
                  v-model="formData.username"
                  type="email"
                  class="form-control"
                  id="username"
                  placeholder="User name"
                />
                <span
                  class="text-danger"
                  v-for="error in v$.username.$errors"
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
