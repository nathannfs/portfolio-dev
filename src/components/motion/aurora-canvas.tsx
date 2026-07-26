"use client"

import { Mesh, Program, Renderer, Triangle } from "ogl"
import { useEffect, useRef, useState } from "react"

import { prefersReducedMotion } from "@/hooks/use-reduced-motion-safe"

const VERT = /* glsl */ `
  attribute vec2 uv;
  attribute vec2 position;
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = vec4(position, 0.0, 1.0);
  }
`

const FRAG = /* glsl */ `
  precision highp float;
  uniform float uTime;
  uniform vec2 uResolution;
  varying vec2 vUv;

  float hash(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
  float noise(vec2 p){
    vec2 i = floor(p), f = fract(p);
    vec2 u = f*f*(3.0-2.0*f);
    return mix(mix(hash(i), hash(i+vec2(1,0)), u.x),
               mix(hash(i+vec2(0,1)), hash(i+vec2(1,1)), u.x), u.y);
  }
  float fbm(vec2 p){
    float v = 0.0, a = 0.5;
    for(int i=0;i<5;i++){ v += a*noise(p); p*=2.0; a*=0.5; }
    return v;
  }

  void main(){
    vec2 uv = vUv;
    float t = uTime * 0.05;
    float f = fbm(uv*3.0 + vec2(t, t*0.6));
    f = fbm(uv*3.0 + f + vec2(-t*0.4, t));

    vec3 cyan   = vec3(0.133, 0.827, 0.933);
    vec3 blue   = vec3(0.231, 0.510, 0.965);
    vec3 violet = vec3(0.545, 0.361, 0.965);

    vec3 col = mix(blue, cyan, smoothstep(0.2, 0.6, f));
    col = mix(col, violet, smoothstep(0.5, 0.9, f));

    float glow = smoothstep(1.0, 0.2, length(uv - vec2(0.5, 0.35)));
    float alpha = f * glow * 0.55;
    gl_FragColor = vec4(col, alpha);
  }
`

export function AuroraCanvas({ className }: { className?: string }) {
  const hostRef = useRef<HTMLDivElement>(null)
  const [active, setActive] = useState(false)

  useEffect(() => {
    if (prefersReducedMotion() || !hostRef.current) {
      return
    }
    setActive(true)

    const host = hostRef.current
    const renderer = new Renderer({
      alpha: true,
      dpr: Math.min(window.devicePixelRatio, 2),
    })
    const gl = renderer.gl
    gl.canvas.style.width = "100%"
    gl.canvas.style.height = "100%"
    host.appendChild(gl.canvas)

    const program = new Program(gl, {
      vertex: VERT,
      fragment: FRAG,
      uniforms: {
        uTime: { value: 0 },
        uResolution: { value: [host.clientWidth, host.clientHeight] },
      },
      transparent: true,
    })
    const mesh = new Mesh(gl, { geometry: new Triangle(gl), program })

    function resize() {
      renderer.setSize(host.clientWidth, host.clientHeight)
      program.uniforms.uResolution.value = [host.clientWidth, host.clientHeight]
    }
    resize()
    window.addEventListener("resize", resize)

    let raf = 0
    function loop(time: number) {
      program.uniforms.uTime.value = time * 0.001
      renderer.render({ scene: mesh })
      raf = requestAnimationFrame(loop)
    }
    raf = requestAnimationFrame(loop)

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener("resize", resize)
      gl.canvas.remove()
      const ext = gl.getExtension("WEBGL_lose_context")
      ext?.loseContext()
    }
  }, [])

  return (
    <div aria-hidden="true" className={className}>
      {/* SSR-safe static fallback — paints immediately, never the LCP */}
      <div className="absolute inset-0 bg-aurora-radial opacity-60" />
      <div
        className="absolute inset-0"
        ref={hostRef}
        style={{ opacity: active ? 1 : 0, transition: "opacity 1s ease" }}
      />
    </div>
  )
}
