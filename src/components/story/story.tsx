import { useEffect, useState } from "react";
import ReactJson from "react-json-view";

export default function Story(params: { story: object }) {
  const { story } = params;
  const [prefersDark, setPrefersDark] = useState(false);
  useEffect(() => {
    const prefersDark = window.matchMedia(
      "(prefers-color-scheme: dark)"
    ).matches;

    setPrefersDark(prefersDark);
  }, []);
  return (
    <ReactJson
      src={story}
      displayObjectSize={false}
      displayDataTypes={false}
      theme={prefersDark ? "monokai" : "rjv-default"}
    />
  );
}
