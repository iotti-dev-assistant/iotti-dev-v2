"use client";

import dynamic from "next/dynamic";

// Dynamic import with ssr:false keeps WebGL code out of the server bundle
const WebGLBackground = dynamic(() => import("./WebGLBackground"), {
  ssr: false,
  loading: () => null,
});

export default function WebGLBackgroundLoader() {
  return <WebGLBackground />;
}
