import { create } from "zustand";

export const useClassificationStore = create((set) => ({
    classifications: [],
    setClassifications: (classifications) => set({ classifications }),
    createClassification: async (newClassification) => {
        if (!newClassification.name || !newClassification.class) {
            return { success: false, message: "Please fill in all fields." };
        }
        const res = await fetch("/app/classifications", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(newClassification),
        });
        const data = await res.json();
        set((state) => ({ classifications: [...state.classifications, data.data] }));
        return { success: true, message: "Classification Added successfully" };
    },
    fetchClassifications: async () => {
        const res = await fetch("/app/classifications");
        const data = await res.json();
        set({ classifications: data.data });
    },
    deleteClassification: async (pid) => {
        const res = await fetch(`/app/classifications/${pid}`, {
            method: "DELETE",
        });
        const data = await res.json();
        if (!data.success) return { success: false, message: data.message };

        // update the ui immediately, without needing a refresh
        set((state) => ({ classifications: state.classifications.filter((classification) => classification._id !== pid) }));
        return { success: true, message: data.message };
    },
    updateClassification: async (pid, updatedClassification) => {
        const res = await fetch(`/app/classifications/${pid}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(updatedClassification),
        });
        const data = await res.json();
        if (!data.success) return { success: false, message: data.message };

        // update the ui immediately, without needing a refresh
        set((state) => ({
            classifications: state.classifications.map((classification) => (classification._id === pid ? data.data : classification)),
        }));

        return { success: true, message: data.message };
    },
}));