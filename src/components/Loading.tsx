import ReactDOM from "react-dom";
import { BeatLoader } from 'react-spinners';

export default function Loading() {
  const el = document.getElementById("loading");
  return el && ReactDOM.createPortal(<BeatLoader color="#5e8b7e" />, el);
}
