import { defineStore } from "pinia";
import {
    addDoc,
    collection,
    deleteDoc,
    doc,
    getDoc,
    getDocs,
    query,
    updateDoc,
    where,
} from "firebase/firestore/lite";
import { auth, db } from "../firebaseConfig";
import { nanoid } from "nanoid";
import router from "../router";

export const useDatabaseStore = defineStore("database", {
    state: () => ({
        documents: [],
        loadingDoc: false,
        loadingAdd: false,
        loadingDelete: false,
    }),
    actions: {
        async getUrls() {
            if (this.documents.length !== 0) {
                return;
            }

            this.loadingDoc = true;
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
                this.loadingDoc = false;
            }
        },
        async addUrl(name) {
            this.loadingAdd = true;
            try {
                const objetoDoc = {
                    name,
                    short: nanoid(6),
                    user: auth.currentUser.uid,
                };
                const docRef = await addDoc(collection(db, "urls"), objetoDoc);
                // console.log(docRef.id);
                this.documents.push({
                    ...objetoDoc,
                    id: docRef.id,
                });
            } catch (error) {
                console.log(error);
            } finally {
                this.loadingAdd = false;
            }
        },
        async leerUrl(id) {
            try {
                const docRef = doc(db, "urls", id);
                const docSnap = await getDoc(docRef);

                if (!docSnap.exists()) {
                    throw new Error("No existe el documento");
                }

                if (docSnap.data().user !== auth.currentUser.uid) {
                    throw new Error("No le pertenece ese documento");
                }

                return docSnap.data().name;
            } catch (error) {
                console.log(error.message);
            } finally {
            }
        },
        async updateUrl(id, name) {
            try {
                const docRef = doc(db, "urls", id);
                const docSnap = await getDoc(docRef);

                if (!docSnap.exists()) {
                    throw new Error("No existe el documento");
                }

                if (docSnap.data().user !== auth.currentUser.uid) {
                    throw new Error("No le pertenece ese documento");
                }

                await updateDoc(docRef, {
                    name,
                });

                this.documents = this.documents.map((item) =>
                    item.id === id ? { ...item, name: name } : item
                );
                router.push("/");
            } catch (error) {
                console.log(error.message);
            } finally {
            }
        },
        async deleteUrl(id) {
            this.loadingDelete = true;
            try {
                const docRef = doc(db, "urls", id);
                const docSnap = await getDoc(docRef);

                if (!docSnap.exists()) {
                    throw new Error("No existe el documento");
                }

                if (docSnap.data().user !== auth.currentUser.uid) {
                    throw new Error("No le pertenece ese documento");
                }

                await deleteDoc(docRef);
                this.documents = this.documents.filter((item) => item.id !== id);
            } catch (error) {
                console.log(error.message);
            } finally {
                this.loadingDelete = false;
            }
        },
    },
});
