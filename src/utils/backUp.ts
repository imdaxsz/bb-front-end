import api from "../api/api";

export const backUp = async (token: string | null) => {
  try {
    const response = await api.get(`/api/review/backup`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const backupData = JSON.stringify(response.data, null, 2);

    const blob = new Blob([backupData], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "backup.txt";
    link.click();

    URL.revokeObjectURL(url);
  } catch (error) {
    console.error("Error downloading backup:", error);
  }
};
