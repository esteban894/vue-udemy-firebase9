<script setup>
import { useUserStore } from "../stores/user";
import { useDatabaseStore } from "../stores/database";

const userStore = useUserStore();
const databaseStore = useDatabaseStore()

databaseStore.getUrls()
</script>

<template>
	<div>
		<h1>Home</h1>
		<p>{{ userStore.userData?.email }}</p>
		<ul>
			<li v-for="item of databaseStore.documents" :key="item.id">
				{{ item.name }}
				<br>
				{{ item.id }}
				<br>
				{{ item.short }}
				<button>Eliminar</button>
			</li>
		</ul>
	</div>
</template>
