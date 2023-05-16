<script setup>
import { useUserStore } from "./stores/user";

const userStore = useUserStore();
</script>
<template>
	<div>
		<h1>App</h1>
		<nav v-if="!userStore.loadingSession">
			<router-link class="router-link" to="/" v-if="userStore.userData">Home</router-link>
			<router-link class="router-link" to="/login" v-if="!userStore.userData"
				>Login</router-link
			>
			<router-link class="router-link" to="/register" v-if="!userStore.userData"
				>Register</router-link
			>
			<button @click="userStore.logoutUser" v-if="userStore.userData">Logout</button>
		</nav>
		<div v-else>Cargando usuario...</div>
		<router-view></router-view>
	</div>
</template>
<style>
.router-link,
button {
	border: 1px solid black;
	border-radius: 5px;
	padding: 5px;
	margin: 5px;
}
</style>
