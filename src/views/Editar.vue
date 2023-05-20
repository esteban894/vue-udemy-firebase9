<script setup>
import { onMounted } from "vue";
import { useRoute } from "vue-router";
import { useDatabaseStore } from "../stores/database";
import { ref } from "vue";

const databaseStore = useDatabaseStore();

const route = useRoute();

const url = ref("");

const handleSubmit = () => {
    // validaciones de la url...
    databaseStore.updateUrl(route.params.id, url.value);
};

onMounted(async () => {
    url.value = await databaseStore.leerUrl(route.params.id);
});
</script>
<template>
    <div>
        <h1>Editar</h1>
        <form @submit.prevent="handleSubmit">
            <input type="text" placeholder="Ingrese URL" v-model="url" />
            <button type="submit">Editar</button>
        </form>
    </div>
</template>
