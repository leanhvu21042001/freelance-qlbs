<script setup>
import { getToken, removeToken } from "../utils/token.utils";

const token = getToken();

const handleLogout = (event) => {
  removeToken();
  window.location.href = "/login";
};
</script>
<template>
  <header class="app-header">
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
      <div class="container-fluid">
        <button
          class="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNavAltMarkup"
          aria-controls="navbarNavAltMarkup"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
          <div class="navbar-nav" v-show="token">
            <router-link class="nav-link" aria-current="page" to="/"
              >Books</router-link
            >
            <router-link class="nav-link" aria-current="page" to="/authors"
              >Authors</router-link
            >
            <router-link class="nav-link" aria-current="page" to="/customers"
              >Customers</router-link
            >
            <router-link class="nav-link" aria-current="page" to="/users"
              >Users</router-link
            >
            <router-link class="nav-link" aria-current="page" to="/orders"
              >Orders</router-link
            >
          </div>
        </div>

        <button v-show="token" @click="handleLogout" class="btn" type="button">
          Logout
        </button>
      </div>
    </nav>
  </header>
</template>
