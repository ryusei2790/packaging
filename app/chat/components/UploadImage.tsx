import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from "../../../lib/firebase";

export const uploadImage = async (file: File): Promise<string> => {
    try {
        const storageRef = ref(storage, `images/${file.name}`);
        await uploadBytes(storageRef, file);
        const url = await getDownloadURL(storageRef);
        return url;
    } catch (error) {
        console.error("画像のアップロードに失敗しました:", error);
        throw new Error("画像のアップロードに失敗しました");
    }
};