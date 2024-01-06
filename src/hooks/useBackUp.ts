import { backUpReviews } from "api/ReviewApi";
import { handleUnauthorizated } from "lib/error";

export default function useBackUp() {
  const backUp = async () => {
    try {
      const res = await backUpReviews();
      const backupData = JSON.stringify(res, null, 2);
      const blob = new Blob([backupData], { type: "text/plain" });
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = "backup.txt";
      link.click();

      URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Error downloading backup:", error);
      handleUnauthorizated(error, "alert");
    }
  };

  return { backUp };
}
