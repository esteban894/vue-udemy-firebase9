import { defineStore } from "pinia";
import { collection, query, where, getDocs } from "firebase/firestore/lite";
import { auth, db } from "../firebaseConfig";

export const useDatabaseStore = defineStore("database", {
    state: () => ({
        documents: [],
    }),
    actions: {
        async getUrls() {
            try {
                const q = query(collection(db, "urls"), where("user", "==", auth.currentUser.uid));
                const querySnapshot = await getDocs(q);
                querySnapshot.forEach((doc) => {
                    this.documents.push({
                        id: doc.id,
                        ...doc.data(),
                    });
                });
            } catch (error) {
                console.log(error);
            } finally {
            }
        },
    },
});
