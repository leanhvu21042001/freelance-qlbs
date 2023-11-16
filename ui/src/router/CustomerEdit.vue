<script setup>
import { useMutation, useQuery } from "@tanstack/vue-query";
import { reactive, ref, watchEffect } from "vue";
import { notify } from "@kyvg/vue3-notification";
import { useRoute } from "vue-router";
import { editCustomer, getSingleCustomer } from "../services/customers";
import { required, minLength, email } from "@vuelidate/validators";
import useVuelidate from "@vuelidate/core";

const route = useRoute();

const customerId = ref(route.params.id);
const formData = reactive({
  name: "",
  email: "",
  phone: "",
});

const rules = {
  name: { required, minLength: minLength(6) },
  email: { required, email },
  phone: { required, minLength: minLength(10) },
};

const v$ = useVuelidate(rules, formData);

const { data: customer } = useQuery({
  queryKey: ["get-customer", customerId.value],
  queryFn: () => getSingleCustomer(customerId.value),
});

watchEffect(() => {
  if (customer.value) {
    formData.name = customer.value.name;
    formData.email = customer.value.email;
    formData.phone = customer.value.phone;
  }
});

const { mutate } = useMutation({
  mutationFn: editCustomer,
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
    customerId: customerId.value,
    name: formData.name,
    email: formData.email,
    phone: formData.phone,
  });
}
</script>

<template>
  <div>
    <h1>Edit Customer {{ $route.params.id }}</h1>
    <div class="modal-content">
      <div class="modal-header"></div>
      <div class="modal-body">
        <form @submit.prevent="handleSubmit">
          <div class="mb-3">
            <label for="title" class="form-label">Name</label>
            <input
              v-model="formData.name"
              type="text"
              class="form-control"
              id="title"
              placeholder="Customer name"
            />
            <span
              class="text-danger"
              v-for="error in v$.name.$errors"
              :key="error.$uid"
            >
              {{ error.$message }}
            </span>
          </div>

          <div class="mb-3">
            <label for="title" class="form-label">Email</label>
            <input
              v-model="formData.email"
              type="email"
              class="form-control"
              id="title"
              placeholder="Customer email"
            />
            <span
              class="text-danger"
              v-for="error in v$.email.$errors"
              :key="error.$uid"
            >
              {{ error.$message }}
            </span>
          </div>

          <div class="mb-3">
            <label for="title" class="form-label">phone</label>
            <input
              v-model="formData.phone"
              type="text"
              class="form-control"
              id="title"
              placeholder="Customer phone"
            />
            <span
              class="text-danger"
              v-for="error in v$.phone.$errors"
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
