import api from "../api/api";
import useSignOut from "./useSignout";

export default function useBackUp() {
  const { signOut } = useSignOut();

  const backUp = async (token: string | null) => {
    try {
      const res = await api.get(`/api/review/backup`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (res.status === 403) signOut();
      if (res.status === 200) {
        const backupData = JSON.stringify(res.data, null, 2);

        const blob = new Blob([backupData], { type: "text/plain" });
        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.download = "backup.txt";
        link.click();

        URL.revokeObjectURL(url);
      }
    } catch (error) {
      console.error("Error downloading backup:", error);
    }
  };

  return { backUp };
}
