import { useEffect } from "react";
import CinematicLayout from "../../components/arisetek/CinematicLayout";

export default function ArisetekHome() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return <CinematicLayout />;
}
