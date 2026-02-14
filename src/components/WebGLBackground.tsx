"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";

// Per-route theme palettes as [r,g,b] triplets (0-1)
const PALETTES: Record<string, { a: [number, number, number]; b: [number, number, number] }> = {
  home: {
    a: [0.04, 0.04, 0.08], // dark near-black
    b: [0.12, 0.06, 0.22], // deep violet accent
  },
  blog: {
    a: [0.06, 0.06, 0.07], // muted charcoal
    b: [0.10, 0.10, 0.12], // near-grey
  },
  playground: {
    a: [0.02, 0.04, 0.12], // dark navy
    b: [0.18, 0.04, 0.22], // vibrant purple-pink
  },
};

function routeToPalette(pathname: string) {
  if (pathname.startsWith("/blog")) return PALETTES.blog;
  if (pathname.startsWith("/playground")) return PALETTES.playground;
  return PALETTES.home;
}

const VERT = `
attribute vec2 a_pos;
void main() { gl_Position = vec4(a_pos, 0.0, 1.0); }
`;

const FRAG = `
precision mediump float;

uniform float u_time;
uniform vec2  u_res;
uniform vec3  u_colA;
uniform vec3  u_colB;
uniform float u_static; // 1 = static (reduced-motion)

// Value noise helpers
vec2 hash2(vec2 p) {
  p = vec2(dot(p, vec2(127.1, 311.7)), dot(p, vec2(269.5, 183.3)));
  return -1.0 + 2.0 * fract(sin(p) * 43758.5453);
}
float noise(vec2 p) {
  vec2 i = floor(p);
  vec2 f = fract(p);
  vec2 u = f * f * (3.0 - 2.0 * f);
  return mix(
    mix(dot(hash2(i + vec2(0,0)), f - vec2(0,0)),
        dot(hash2(i + vec2(1,0)), f - vec2(1,0)), u.x),
    mix(dot(hash2(i + vec2(0,1)), f - vec2(0,1)),
        dot(hash2(i + vec2(1,1)), f - vec2(1,1)), u.x),
    u.y
  );
}
float fbm(vec2 p) {
  float v = 0.0;
  float a = 0.5;
  for (int i = 0; i < 5; i++) {
    v += a * noise(p);
    p  = p * 2.0 + vec2(1.7, 9.2);
    a *= 0.5;
  }
  return v;
}

void main() {
  vec2 uv = gl_FragCoord.xy / u_res;
  uv.y = 1.0 - uv.y;

  float t = u_static > 0.5 ? 0.0 : u_time * 0.12;

  // Flowing noise domain-warp
  vec2 q = vec2(fbm(uv * 2.2 + vec2(0.0, t)),
                fbm(uv * 2.2 + vec2(5.2, t + 1.3)));
  vec2 r = vec2(fbm(uv * 2.0 + 4.0 * q + vec2(1.7, 9.2) + 0.15 * t),
                fbm(uv * 2.0 + 4.0 * q + vec2(8.3, 2.8) + 0.12 * t));

  float f = fbm(uv * 1.5 + 4.0 * r + t * 0.05);
  f = 0.5 + 0.5 * f;

  // Radial vignette to darken edges
  float dist = length(uv - 0.5) * 1.4;
  float vig  = 1.0 - smoothstep(0.3, 1.1, dist);

  vec3 col = mix(u_colA, u_colB, clamp(f * vig, 0.0, 1.0));

  // Subtle grain
  float grain = (fract(sin(dot(gl_FragCoord.xy, vec2(12.9898, 78.233))) * 43758.5453) - 0.5) * 0.025;
  col += grain;

  gl_FragColor = vec4(clamp(col, 0.0, 1.0), 1.0);
}
`;

function initGL(
  canvas: HTMLCanvasElement,
): WebGLRenderingContext | null {
  const opts: WebGLContextAttributes = { antialias: false, powerPreference: "low-power" };
  return (
    (canvas.getContext("webgl", opts) as WebGLRenderingContext | null) ||
    (canvas.getContext("experimental-webgl", opts) as WebGLRenderingContext | null)
  );
}

function compile(gl: WebGLRenderingContext, type: number, src: string) {
  const s = gl.createShader(type)!;
  gl.shaderSource(s, src);
  gl.compileShader(s);
  return s;
}

function buildProgram(gl: WebGLRenderingContext) {
  const prog = gl.createProgram()!;
  gl.attachShader(prog, compile(gl, gl.VERTEX_SHADER, VERT));
  gl.attachShader(prog, compile(gl, gl.FRAGMENT_SHADER, FRAG));
  gl.linkProgram(prog);
  return prog;
}

export default function WebGLBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const pathname = usePathname();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    // Adaptive pixel ratio: cap at 1 on mobile/low-res
    const isMobile = window.innerWidth < 768;
    const dpr = Math.min(isMobile ? 1 : window.devicePixelRatio, 1.5);

    const gl = initGL(canvas);
    if (!gl) {
      // WebGL unavailable — canvas stays transparent, CSS background shows
      return;
    }

    const prog = buildProgram(gl);
    gl.useProgram(prog);

    // Full-screen quad
    const buf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]),
      gl.STATIC_DRAW,
    );
    const posLoc = gl.getAttribLocation(prog, "a_pos");
    gl.enableVertexAttribArray(posLoc);
    gl.vertexAttribPointer(posLoc, 2, gl.FLOAT, false, 0, 0);

    // Uniforms
    const uTime   = gl.getUniformLocation(prog, "u_time");
    const uRes    = gl.getUniformLocation(prog, "u_res");
    const uColA   = gl.getUniformLocation(prog, "u_colA");
    const uColB   = gl.getUniformLocation(prog, "u_colB");
    const uStatic = gl.getUniformLocation(prog, "u_static");

    const palette = routeToPalette(pathname);
    gl.uniform3fv(uColA, palette.a);
    gl.uniform3fv(uColB, palette.b);
    gl.uniform1f(uStatic, prefersReduced ? 1.0 : 0.0);

    // Resize
    const resize = () => {
      const w = Math.floor(window.innerWidth  * dpr);
      const h = Math.floor(window.innerHeight * dpr);
      canvas.width  = w;
      canvas.height = h;
      gl.viewport(0, 0, w, h);
      gl.uniform2f(uRes, w, h);
    };
    resize();
    window.addEventListener("resize", resize);

    let raf = 0;
    let start = performance.now();

    const tick = (now: number) => {
      gl.uniform1f(uTime, (now - start) / 1000);
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
      raf = requestAnimationFrame(tick);
    };

    if (prefersReduced) {
      // Draw once
      gl.uniform1f(uTime, 0);
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
    } else {
      raf = requestAnimationFrame(tick);
    }

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      gl.getExtension("WEBGL_lose_context")?.loseContext();
    };
  }, [pathname]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      style={{
        position: "fixed",
        inset: 0,
        width: "100%",
        height: "100%",
        zIndex: -1,
        pointerEvents: "none",
        display: "block",
      }}
    />
  );
}
