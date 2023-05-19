import { defineStore } from "pinia";
import { addDoc, collection, getDocs, query, where } from "firebase/firestore/lite";
import { auth, db } from "../firebaseConfig";
import { nanoid } from "nanoid";

export const useDatabaseStore = defineStore("database", {
	state: () => ({
		documents: [],
		loadingDoc: false,
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
			try {
				const objetoDoc = {
					name,
					short: nanoid(6),
					user: auth.currentUser.uid,
				};
				const docRef = await addDoc(collection(db, "urls"), objetoDoc);
				// console.log(docRef);
				this.documents.push({
					...objetoDoc,
					id: docRef.id,
				});
			} catch (error) {
				console.log(error);
			} finally {
			}
		},
	},
});
