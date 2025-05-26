import { create } from "zustand";

export const useTimberStore = create((set) => ({
	timbers: [],
	setTimbers: (timbers) => set({ timbers }),
	createTimber: async (newTimber) => {
		if (!newTimber.name || !newTimber.class) {
			return { success: false, message: "Please fill in all fields." };
		}
		const res = await fetch("/app/timbers", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(newTimber),
		});
		const data = await res.json();
		set((state) => ({ timbers: [...state.timbers, data.data] }));
		return { success: true, message: "Timber Added successfully" };
	},
	fetchTimbers: async () => {
		const res = await fetch("/app/timbers");
		const data = await res.json();
		set({ timbers: data.data });
	},
	deleteTimber: async (pid) => {
		const res = await fetch(`/app/timbers/${pid}`, {
			method: "DELETE",
		});
		const data = await res.json();
		if (!data.success) return { success: false, message: data.message };

		// update the ui immediately, without needing a refresh
		set((state) => ({ timbers: state.timbers.filter((timber) => timber._id !== pid) }));
		return { success: true, message: data.message };
	},
	updateTimber: async (pid, updatedTimber) => {
		const res = await fetch(`/app/timbers/${pid}`, {
			method: "PUT",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(updatedTimber),
		});
		const data = await res.json();
		if (!data.success) return { success: false, message: data.message };

		// update the ui immediately, without needing a refresh
		set((state) => ({
			timbers: state.timbers.map((timber) => (timber._id === pid ? data.data : timber)),
		}));

		return { success: true, message: data.message };
	},
}));