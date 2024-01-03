import { createPortal } from "react-dom";
import { BeatLoader } from "react-spinners";

export default function Loading() {
  const el = document.getElementById("loading");
  return el && createPortal(<BeatLoader color="#5e8b7e" />, el);
}
