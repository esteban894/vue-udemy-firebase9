<script setup>
import { ref } from "vue";

import { useUserStore } from "../stores/user";
import { useDatabaseStore } from "../stores/database";

const userStore = useUserStore();
const databaseStore = useDatabaseStore();

databaseStore.getUrls();

const url = ref("");

const handleSubmit = () => {
	// validaciones de url...
	databaseStore.addUrl(url.value);
};
</script>

<template>
	<div>
		<h1>Home</h1>
		<p>{{ userStore.userData?.email }}</p>

		<form @submit.prevent="handleSubmit">
			<input type="text" placeholder="Ingrese URL" v-model="url" />
			<button type="submit">Agregar</button>
		</form>

		<p v-if="databaseStore.loadingDoc">Gargando docs</p>
		<ul v-else>
			<li v-for="item of databaseStore.documents" :key="item.id">
				{{ item.id }}
				<br />
				{{ item.name }}
				<br />
				{{ item.short }}
				<button>Eliminar</button>
			</li>
		</ul>
	</div>
</template>
