<template>
  <nav class="navbar navbar-toggleable-xl navbar-light bg-faded">
    <div class="container">
      <router-link active-class="active" class="navbar-brand" to="/">FeedLog</router-link>
      <div class="navbar-collapse collapse">
        <ul class="navbar-nav mr-auto">
          <li class="nav-item">
            <router-link active-class="active" class="nav-link" to="/history">History</router-link>
          </li>
        </ul>
        <ul class="navbar-nav">
          <li class="nav-item">
            <router-link active-class="active" class="nav-link" to="/settings">Settings</router-link>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>
<style scoped>
nav {
  margin-bottom: 40px;
}
</style>
