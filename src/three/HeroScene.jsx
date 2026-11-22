// Interactive 3D hero: a stylised solar plant that "builds itself" in the
// order Northern Sky works on site: fencing -> piling -> modules -> commissioning,
// with wind turbines turning behind it. Loaded lazily so it never blocks the page.
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useEffect, useMemo, useRef } from "react";
import * as THREE from "three";

const ROWS = 7;
const COLS = 11;
const PITCH_X = 2.5;
const PITCH_Z = 3.1;
const FARM_W = (COLS - 1) * PITCH_X;
const FARM_D = (ROWS - 1) * PITCH_Z;

const PANEL_COLOR = new THREE.Color("#1f4fb0");
const GLOW_COLOR = new THREE.Color("#ffd23f");
const POST_COLOR = "#b9c2cc";

const ease = (t) => (t <= 0 ? 0 : t >= 1 ? 1 : 1 - Math.pow(1 - t, 3));
const clamp01 = (t) => Math.min(1, Math.max(0, t));

// Timeline (seconds)
const T_FENCE = 0.2;
const T_POSTS = 0.9;
const T_PANELS = 1.9;
const T_SWEEP = 4.1;

function useTables() {
  return useMemo(() => {
    const list = [];
    for (let r = 0; r < ROWS; r++) {
      for (let c = 0; c < COLS; c++) {
        const x = c * PITCH_X - FARM_W / 2;
        const z = r * PITCH_Z - FARM_D / 2;
        const order = r * 0.16 + c * 0.035 + Math.random() * 0.05;
        list.push({ x, z, r, c, order });
      }
    }
    return list;
  }, []);
}

function Panels({ startRef, reduced }) {
  const tables = useTables();
  const panels = useRef();
  const posts = useRef();
  const dummy = useMemo(() => new THREE.Object3D(), []);
  const color = useMemo(() => new THREE.Color(), []);

  useEffect(() => {
    tables.forEach((_, i) => panels.current.setColorAt(i, PANEL_COLOR));
    panels.current.instanceColor.needsUpdate = true;
  }, [tables]);

  useFrame(({ clock }) => {
    const t = reduced ? 99 : clock.elapsedTime - startRef.current;
    tables.forEach((tb, i) => {
      // posts rise out of the ground
      const p = ease(clamp01((t - T_POSTS - tb.order * 0.6) / 0.45));
      dummy.position.set(tb.x, -0.55 + p * 0.55, tb.z);
      dummy.rotation.set(0, 0, 0);
      dummy.scale.set(1, Math.max(p, 0.001), 1);
      dummy.updateMatrix();
      posts.current.setMatrixAt(i, dummy.matrix);

      // modules drop into place
      const k = ease(clamp01((t - T_PANELS - tb.order) / 0.55));
      dummy.position.set(tb.x, 1.15 + (1 - k) * 3.2, tb.z);
      dummy.rotation.set(-0.42, 0, 0);
      const s = Math.max(k, 0.001);
      dummy.scale.set(s, s, s);
      dummy.updateMatrix();
      panels.current.setMatrixAt(i, dummy.matrix);

      // commissioning sweep: a green "energised" wave runs across the rows
      const w = t - T_SWEEP - (tb.c * 0.06 + tb.r * 0.03);
      const glow = w > 0 && w < 1.1 ? Math.sin((w / 1.1) * Math.PI) : 0;
      color.copy(PANEL_COLOR).lerp(GLOW_COLOR, glow * 0.75);
      panels.current.setColorAt(i, color);
    });
    posts.current.instanceMatrix.needsUpdate = true;
    panels.current.instanceMatrix.needsUpdate = true;
    panels.current.instanceColor.needsUpdate = true;
  });

  return (
    <group>
      <instancedMesh ref={posts} args={[null, null, tables.length]} castShadow>
        <boxGeometry args={[2.0, 1.1, 0.12]} />
        <meshStandardMaterial color={POST_COLOR} metalness={0.5} roughness={0.5} />
      </instancedMesh>
      <instancedMesh ref={panels} args={[null, null, tables.length]} castShadow>
        <boxGeometry args={[2.25, 0.06, 1.55]} />
        <meshStandardMaterial color="#ffffff" metalness={0.35} roughness={0.28} />
      </instancedMesh>
    </group>
  );
}

// Chain-link fence as delivered on site: galvanised steel angle posts,
// diamond chain-link mesh, three strands of barbed wire and a concertina coil on top.
function chainLinkTexture() {
  const c = document.createElement("canvas");
  c.width = c.height = 64;
  const g = c.getContext("2d");
  g.clearRect(0, 0, 64, 64);
  g.strokeStyle = "rgba(205,212,220,1)";
  g.lineWidth = 3;
  g.beginPath();
  g.moveTo(0, 32); g.lineTo(32, 0); g.lineTo(64, 32); g.lineTo(32, 64); g.closePath();
  g.stroke();
  const t = new THREE.CanvasTexture(c);
  t.wrapS = t.wrapT = THREE.RepeatWrapping;
  t.anisotropy = 4;
  return t;
}

function Fence({ startRef, reduced }) {
  const posts = useRef();
  const top = useRef();
  const margin = 2.6;
  const W = FENCE_W;
  const X0 = FENCE_X0;
  const D = FARM_D + margin * 2;
  const H = 1.7; // mesh height
  const gl = GATE_X0 - X0 - 0.3, gr = GATE_X1 - X0 + 0.3; // gate opening, fence-local x

  const segments = useMemo(() => [
    [[-W / 2, -D / 2], [W / 2, -D / 2]],
    [[W / 2, -D / 2], [W / 2, D / 2]],
    [[W / 2, D / 2], [gr, D / 2]],
    [[gl, D / 2], [-W / 2, D / 2]],
    [[-W / 2, D / 2], [-W / 2, -D / 2]],
  ], [W, D, gl, gr]);

  const pts = useMemo(() => {
    const list = [];
    let total = 0;
    segments.forEach(([a, b]) => {
      const len = Math.hypot(b[0] - a[0], b[1] - a[1]);
      const n = Math.max(1, Math.round(len / 2.4));
      for (let i = 0; i <= n; i++) {
        list.push({ x: a[0] + ((b[0] - a[0]) * i) / n, z: a[1] + ((b[1] - a[1]) * i) / n, o: total + (len * i) / n });
      }
      total += len;
    });
    return list.map((p) => ({ ...p, o: p.o / total }));
  }, [segments]);

  const meshTex = useMemo(() => chainLinkTexture(), []);
  const panels = useMemo(() => segments.map(([a, b]) => {
    const len = Math.hypot(b[0] - a[0], b[1] - a[1]);
    const t = meshTex.clone();
    t.needsUpdate = true;
    t.repeat.set(len / 0.22, H / 0.22);
    return { cx: (a[0] + b[0]) / 2, cz: (a[1] + b[1]) / 2, len, rot: -Math.atan2(b[1] - a[1], b[0] - a[0]), tex: t };
  }), [segments, meshTex]);

  // barbed wire strands + concertina coil as lines along every segment
  const wireLines = useMemo(() => {
    const barbed = new THREE.LineBasicMaterial({ color: "#7d8794" });
    const coilMat = new THREE.LineBasicMaterial({ color: "#c2cad3" });
    const out = [];
    segments.forEach(([a, b]) => {
      const dx = b[0] - a[0], dz = b[1] - a[1];
      const len = Math.hypot(dx, dz);
      const ux = dx / len, uz = dz / len;
      [H + 0.12, H + 0.27, H + 0.42].forEach((y) => {
        const g = new THREE.BufferGeometry().setFromPoints([new THREE.Vector3(a[0], y, a[1]), new THREE.Vector3(b[0], y, b[1])]);
        out.push(new THREE.Line(g, barbed));
      });
      const cp = [];
      const r = 0.24, pitch = 0.32, cy = H + 0.72;
      for (let d = 0; d <= len; d += 0.04) {
        const ang = (d / pitch) * Math.PI * 2;
        const off = Math.cos(ang) * r; // sideways offset (perpendicular to fence)
        cp.push(new THREE.Vector3(a[0] + ux * d - uz * off, cy + Math.sin(ang) * r, a[1] + uz * d + ux * off));
      }
      out.push(new THREE.Line(new THREE.BufferGeometry().setFromPoints(cp), coilMat));
    });
    return out;
  }, [segments]);

  const dummy = useMemo(() => new THREE.Object3D(), []);
  useFrame(({ clock }) => {
    const t = reduced ? 99 : clock.elapsedTime - startRef.current;
    pts.forEach((p, i) => {
      const k = ease(clamp01((t - T_FENCE - p.o * 0.7) / 0.3));
      dummy.position.set(p.x, ((H + 0.5) / 2) * k, p.z);
      dummy.scale.set(1, Math.max(k, 0.001), 1);
      dummy.updateMatrix();
      posts.current.setMatrixAt(i, dummy.matrix);
    });
    posts.current.instanceMatrix.needsUpdate = true;
    const wk = ease(clamp01((t - T_FENCE - 0.6) / 0.4));
    top.current.scale.set(1, Math.max(wk, 0.001), 1);
  });

  return (
    <group position={[X0, 0, 0]}>
      {/* galvanised steel angle posts */}
      <instancedMesh ref={posts} args={[null, null, pts.length]} castShadow>
        <boxGeometry args={[0.1, H + 0.5, 0.1]} />
        <meshStandardMaterial color="#a9b3bf" metalness={0.75} roughness={0.35} />
      </instancedMesh>
      <group ref={top}>
        {panels.map((p, i) => (
          <mesh key={i} position={[p.cx, H / 2, p.cz]} rotation={[0, p.rot, 0]}>
            <planeGeometry args={[p.len, H]} />
            <meshStandardMaterial map={p.tex} transparent alphaTest={0.3} side={THREE.DoubleSide} metalness={0.6} roughness={0.4} />
          </mesh>
        ))}
        {wireLines.map((l, i) => <primitive key={i} object={l} />)}
      </group>
    </group>
  );
}

function Turbine({ position, scale = 1, speed = 0.6, reduced, phase = 0 }) {
  const rotor = useRef();
  useFrame((_, dt) => {
    if (!reduced && rotor.current) rotor.current.rotation.z -= dt * speed;
  });
  const white = <meshStandardMaterial color="#eef1f5" roughness={0.6} />;
  return (
    <group position={position} scale={scale}>
      <mesh position={[0, 7, 0]}>
        <cylinderGeometry args={[0.16, 0.34, 14, 14]} />
        {white}
      </mesh>
      <mesh position={[0, 14.1, -0.3]}>
        <boxGeometry args={[0.6, 0.6, 1.5]} />
        {white}
      </mesh>
      <group ref={rotor} position={[0, 14.1, 0.5]} rotation={[0, 0, phase]}>
        <mesh rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[0.3, 0.3, 0.5, 12]} />
          {white}
        </mesh>
        {[0, 1, 2].map((i) => (
          <group key={i} rotation={[0, 0, (i * Math.PI * 2) / 3]}>
            <mesh position={[0, 3.2, 0]}>
              <boxGeometry args={[0.42, 6.2, 0.06]} />
              {white}
            </mesh>
          </group>
        ))}
      </group>
    </group>
  );
}

// ── Roads, drains, site office and moving site vehicles ──
const ROAD_X = FARM_W / 2 + 3.4; // internal road runs along the right side of the array (group coords)
const FENCE_FRONT = (FARM_D + 5.2) / 2; // z of the front fence line
const GATE_X0 = ROAD_X - 2.4; // gate opening (covers road + drain culvert)
const GATE_X1 = ROAD_X + 1.4;
const CONTROL_ROOM = [FARM_W / 2 + 11.5, 9];
const SITE_OFFICE = [FARM_W / 2 + 17, 9];
// Plant boundary: from left of the array to beyond the substation, so every building is inside.
const FENCE_LEFT = -FARM_W / 2 - 2.6, FENCE_RIGHT = FARM_W / 2 + 20;
const FENCE_W = FENCE_RIGHT - FENCE_LEFT;
const FENCE_X0 = (FENCE_RIGHT + FENCE_LEFT) / 2;
const YARD_ROAD_Z = 6.2; // internal road to the control room / site office
const BACK_ROAD_Z = -FENCE_FRONT + 1.6; // service road behind the substation
const EAST_ROAD_X = FENCE_RIGHT - 1.1;

function Roads() {
  const asphalt = <meshStandardMaterial color="#5b6170" roughness={0.95} />;
  const gravel = <meshStandardMaterial color="#c9b68f" roughness={1} />;
  const concrete = <meshStandardMaterial color="#b8bcc2" roughness={0.9} />;
  const water = <meshStandardMaterial color="#5aa6e8" roughness={0.2} metalness={0.1} />;
  const ZB = -FENCE_FRONT + 0.8, ZF = FENCE_FRONT + 22; // road from the back of the plant out to the approach
  const D = ZF - ZB;
  const RZ = (ZF + ZB) / 2;
  const dashes = useMemo(() => Array.from({ length: Math.floor(D / 2.7) }, (_, i) => ZB + 1 + i * 2.7), [D, ZB]);
  const DRAIN_L = FENCE_FRONT - 0.4 - ZB; // roadside drain stops at the gate (culvert under the entrance)
  const DRAIN_Z = (FENCE_FRONT - 0.4 + ZB) / 2;
  const yardW = EAST_ROAD_X - ROAD_X;
  return (
    <group>
      {/* main access road (asphalt with centre line) from the gate towards the substation */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[ROAD_X, 0.02, RZ]} receiveShadow>
        <planeGeometry args={[2.2, D]} />
        {asphalt}
      </mesh>
      {dashes.map((z) => (
        <mesh key={z} rotation={[-Math.PI / 2, 0, 0]} position={[ROAD_X, 0.03, z]}>
          <planeGeometry args={[0.12, 1.2]} />
          <meshBasicMaterial color="#ffffff" />
        </mesh>
      ))}
      {/* road kerbs */}
      {[-1.15, 1.15].map((dx) => (
        <mesh key={dx} position={[ROAD_X + dx, 0.06, RZ]}>
          <boxGeometry args={[0.1, 0.12, D]} />
          {concrete}
        </mesh>
      ))}
      {/* storm-water drain beside the road: concrete-lined channel with water */}
      <Drain position={[ROAD_X - 1.75, 0, DRAIN_Z]} length={DRAIN_L} />
      {/* perimeter drains just outside the front and back fences */}
      <Drain position={[(-FARM_W / 2 - 2.6 + GATE_X0) / 2, 0, FENCE_FRONT + 0.9]} length={GATE_X0 + FARM_W / 2 + 2.6} rotate />
      <Drain position={[(GATE_X1 + 0.3 + FENCE_RIGHT) / 2, 0, FENCE_FRONT + 0.9]} length={FENCE_RIGHT - GATE_X1 - 0.3} rotate />
      <Drain position={[FENCE_X0, 0, -FENCE_FRONT - 0.9]} length={FENCE_W} rotate />
      {/* gravel yard roads: to the control room and site office, and round the substation */}
      {[YARD_ROAD_Z, BACK_ROAD_Z].map((z) => (
        <mesh key={z} rotation={[-Math.PI / 2, 0, 0]} position={[ROAD_X + yardW / 2, 0.016, z]} receiveShadow>
          <planeGeometry args={[yardW + 1.2, 1.3]} />
          {gravel}
        </mesh>
      ))}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[EAST_ROAD_X, 0.017, (YARD_ROAD_Z + BACK_ROAD_Z) / 2]} receiveShadow>
        <planeGeometry args={[1.3, YARD_ROAD_Z - BACK_ROAD_Z + 1.3]} />
        {gravel}
      </mesh>
      {/* culvert slab where the entrance crosses the drain */}
      <mesh position={[ROAD_X - 1.75, 0.1, FENCE_FRONT - 0.4]}>
        <boxGeometry args={[1.2, 0.2, 1.4]} />
        {concrete}
      </mesh>
      {/* gravel cross roads between blocks, each with its own side drain */}
      {[-FARM_D / 2 - 1.6, FARM_D / 2 + 1.6].map((z, i) => (
        <group key={i} position={[0, 0, z]}>
          <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0.2, 0.015, 0]} receiveShadow>
            <planeGeometry args={[FARM_W + 5, 1.3]} />
            {gravel}
          </mesh>
        </group>
      ))}
    </group>
  );
}

function Drain({ position, length, rotate = false }) {
  // concrete-lined storm-water channel with flowing water (ripples move along it)
  const tex = useMemo(() => {
    const c = document.createElement("canvas");
    c.width = 32; c.height = 128;
    const g = c.getContext("2d");
    g.fillStyle = "#3f8fe3"; g.fillRect(0, 0, 32, 128);
    g.fillStyle = "rgba(255,255,255,0.55)";
    for (let i = 0; i < 6; i++) g.fillRect(6 + (i % 2) * 10, i * 22 + 4, 12, 3);
    const t = new THREE.CanvasTexture(c);
    t.wrapS = t.wrapT = THREE.RepeatWrapping;
    t.repeat.set(1, length / 2);
    return t;
  }, [length]);
  useFrame((_, dt) => { tex.offset.y -= dt * 0.35; });
  const concrete = <meshStandardMaterial color="#c3c7cc" roughness={0.9} />;
  return (
    <group position={position} rotation={[0, rotate ? Math.PI / 2 : 0, 0]}>
      {[-0.48, 0.48].map((dx) => (
        <mesh key={dx} position={[dx, 0.11, 0]}>
          <boxGeometry args={[0.16, 0.22, length]} />
          {concrete}
        </mesh>
      ))}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.03, 0]}>
        <planeGeometry args={[0.8, length]} />
        <meshStandardMaterial map={tex} roughness={0.25} metalness={0.1} />
      </mesh>
    </group>
  );
}

// Shared positions of moving vehicles, so the gate knows when to open.
const traffic = { z: [] };

function Gate({ reduced }) {
  const leaf = useRef();
  const open = useRef(0);
  const width = GATE_X1 - GATE_X0;
  useFrame((_, dt) => {
    const near = reduced || traffic.z.some((z) => Math.abs(z - FENCE_FRONT) < 6);
    open.current += ((near ? 1 : 0) - open.current) * Math.min(1, dt * 3);
    if (leaf.current) leaf.current.position.x = GATE_X0 + width / 2 - open.current * (width + 0.2);
  });
  const navy = <meshStandardMaterial color="#012060" roughness={0.5} />;
  return (
    <group>
      {[GATE_X0 - 0.3, GATE_X1 + 0.3].map((x) => (
        <group key={x} position={[x, 0, FENCE_FRONT]}>
          <mesh position={[0, 0.9, 0]} castShadow>
            <boxGeometry args={[0.5, 1.8, 0.5]} />
            <meshStandardMaterial color="#ffffff" />
          </mesh>
          <mesh position={[0, 1.86, 0]}>
            <boxGeometry args={[0.6, 0.12, 0.6]} />
            <meshStandardMaterial color="#92d14f" />
          </mesh>
        </group>
      ))}
      {/* sliding gate leaf: slides behind the fence when a vehicle arrives */}
      <group ref={leaf} position={[GATE_X0 + width / 2, 0, FENCE_FRONT + 0.15]}>
        <mesh position={[0, 0.72, 0]}>
          <boxGeometry args={[width, 0.08, 0.06]} />
          {navy}
        </mesh>
        <mesh position={[0, 1.3, 0]}>
          <boxGeometry args={[width, 0.08, 0.06]} />
          {navy}
        </mesh>
        <mesh position={[0, 0.2, 0]}>
          <boxGeometry args={[width, 0.08, 0.06]} />
          {navy}
        </mesh>
        {Array.from({ length: 9 }, (_, i) => (
          <mesh key={i} position={[-width / 2 + (i + 0.5) * (width / 9), 0.75, 0]}>
            <boxGeometry args={[0.05, 1.2, 0.05]} />
            {navy}
          </mesh>
        ))}
      </group>
    </group>
  );
}

function SecurityRoom({ position }) {
  return (
    <group position={position}>
      <mesh position={[0, 0.8, 0]} castShadow>
        <boxGeometry args={[1.5, 1.6, 1.5]} />
        <meshStandardMaterial color="#ffffff" roughness={0.6} />
      </mesh>
      <mesh position={[0, 1.66, 0]}>
        <boxGeometry args={[1.8, 0.12, 1.8]} />
        <meshStandardMaterial color="#012060" />
      </mesh>
      <mesh position={[-0.76, 1.0, 0]}>
        <boxGeometry args={[0.02, 0.5, 0.9]} />
        <meshStandardMaterial color="#8db6ff" emissive="#4f86e8" emissiveIntensity={0.25} />
      </mesh>
      <mesh position={[0, 1.0, 0.76]}>
        <boxGeometry args={[0.8, 0.45, 0.02]} />
        <meshStandardMaterial color="#8db6ff" emissive="#4f86e8" emissiveIntensity={0.25} />
      </mesh>
      <NameBoard text="Security" position={[0, 1.42, 0.765]} width={1.3} height={0.28} />
    </group>
  );
}

// Name board fixed on a building's front wall: green board, navy capitals (poster style).
function boardTexture(text) {
  const label = text.toUpperCase();
  const c = document.createElement("canvas");
  c.width = 512; c.height = 112;
  const g = c.getContext("2d");
  g.fillStyle = "#92d14f";
  g.fillRect(0, 0, 512, 112);
  g.fillStyle = "#012060";
  g.fillRect(0, 0, 512, 6); g.fillRect(0, 106, 512, 6);
  let size = 62;
  const fit = () => { g.font = `800 ${size}px Inter, 'Segoe UI', Arial, sans-serif`; return g.measureText(label).width; };
  while (fit() > 460 && size > 20) size -= 2;
  g.textAlign = "center";
  g.textBaseline = "middle";
  g.fillText(label, 256, 60);
  const t = new THREE.CanvasTexture(c);
  t.colorSpace = THREE.SRGBColorSpace;
  t.anisotropy = 8;
  return t;
}

function NameBoard({ text, position, width = 2, height = 0.42 }) {
  const map = useMemo(() => boardTexture(text), [text]);
  return (
    <mesh position={position}>
      <planeGeometry args={[width, height]} />
      <meshBasicMaterial map={map} toneMapped={false} />
    </mesh>
  );
}

// ── Construction machines ──
const YELLOW = "#f2b21b";

function Wheels({ positions, r = 0.25, w = 0.16 }) {
  return positions.map(([x, z], i) => (
    <mesh key={i} position={[x, r, z]} rotation={[0, 0, Math.PI / 2]}>
      <cylinderGeometry args={[r, r, w, 14]} />
      <meshStandardMaterial color="#1d2330" />
    </mesh>
  ));
}

// Tractor-mounted auger: drives along the front service road, stops and drills post holes.
function TractorAuger({ z, x0, x1, reduced, phase = 0 }) {
  const ref = useRef();
  const auger = useRef();
  const bit = useRef();
  useFrame(({ clock }, dt) => {
    const cycle = 7; // seconds: drive 4s, drill 3s
    const T = reduced ? 5 : (clock.elapsedTime + phase) % (cycle * 6);
    const leg = Math.floor(T / cycle), lt = T % cycle;
    const stops = 6;
    const pos = (i) => x0 + ((x1 - x0) * Math.abs(((i % (stops * 2)) + stops * 2) % (stops * 2) - stops)) / stops;
    const from = pos(leg), to = pos(leg + 1);
    const k = Math.min(1, lt / 4);
    const x = from + (to - from) * (k * k * (3 - 2 * k));
    ref.current.position.set(x, 0, z);
    ref.current.rotation.y = to >= from ? Math.PI / 2 : -Math.PI / 2;
    const drilling = lt > 4;
    const d = drilling ? Math.sin(((lt - 4) / 3) * Math.PI) : 0;
    if (auger.current) auger.current.position.y = 1.0 - d * 0.6;
    if (bit.current && (drilling || reduced)) bit.current.rotation.y += dt * 14;
  });
  return (
    <group ref={ref}>
      <mesh position={[0, 0.65, 0.25]} castShadow>
        <boxGeometry args={[0.7, 0.5, 1.1]} />
        <meshStandardMaterial color="#2f7fd8" roughness={0.5} />
      </mesh>
      <mesh position={[0, 1.15, -0.2]}>
        <boxGeometry args={[0.6, 0.6, 0.55]} />
        <meshStandardMaterial color="#e8eef6" transparent opacity={0.85} />
      </mesh>
      <Wheels positions={[[-0.42, -0.25], [0.42, -0.25]]} r={0.42} w={0.22} />
      <Wheels positions={[[-0.36, 0.65], [0.36, 0.65]]} r={0.25} w={0.16} />
      {/* auger mast behind the tractor */}
      <mesh position={[0, 1.25, -0.85]}>
        <boxGeometry args={[0.12, 2.3, 0.12]} />
        <meshStandardMaterial color={YELLOW} />
      </mesh>
      <group ref={auger} position={[0, 1.0, -1.0]}>
        <group ref={bit}>
          <mesh>
            <cylinderGeometry args={[0.05, 0.05, 1.8, 8]} />
            <meshStandardMaterial color="#6c7480" metalness={0.7} />
          </mesh>
          {[-0.6, -0.3, 0, 0.3, 0.6].map((y) => (
            <mesh key={y} position={[0, y, 0]} rotation={[0.35, 0, 0]}>
              <cylinderGeometry args={[0.16, 0.16, 0.03, 12]} />
              <meshStandardMaterial color="#8a929e" metalness={0.7} />
            </mesh>
          ))}
        </group>
      </group>
    </group>
  );
}

// Excavator digging: tracks, rotating cab, boom/arm/bucket in a dig cycle.
function Excavator({ position, rotation = 0, reduced }) {
  const house = useRef();
  const boom = useRef();
  const arm = useRef();
  const bucket = useRef();
  useFrame(({ clock }) => {
    const t = reduced ? 1 : clock.elapsedTime;
    const c = (t % 6) / 6; // 6-second dig cycle
    const swing = Math.sin(c * Math.PI * 2) * 0.9;
    if (house.current) house.current.rotation.y = swing;
    if (boom.current) boom.current.rotation.x = -0.55 + Math.sin(c * Math.PI * 4) * 0.25;
    if (arm.current) arm.current.rotation.x = 1.2 + Math.cos(c * Math.PI * 4) * 0.35;
    if (bucket.current) bucket.current.rotation.x = 0.6 + Math.sin(c * Math.PI * 4 + 1) * 0.5;
  });
  const orange = <meshStandardMaterial color="#f08a24" roughness={0.5} />;
  return (
    <group position={position} rotation={[0, rotation, 0]}>
      {[-0.55, 0.55].map((x) => (
        <mesh key={x} position={[x, 0.22, 0]} castShadow>
          <boxGeometry args={[0.38, 0.44, 2.0]} />
          <meshStandardMaterial color="#2b2f38" />
        </mesh>
      ))}
      <group ref={house} position={[0, 0.5, 0]}>
        <mesh position={[0, 0.35, -0.15]} castShadow>
          <boxGeometry args={[1.4, 0.55, 1.6]} />
          {orange}
        </mesh>
        <mesh position={[-0.35, 0.95, 0.25]}>
          <boxGeometry args={[0.6, 0.7, 0.7]} />
          <meshStandardMaterial color="#cfe0ff" transparent opacity={0.8} />
        </mesh>
        <group ref={boom} position={[0.3, 0.55, 0.55]}>
          <mesh position={[0, 0, 0.9]}>
            <boxGeometry args={[0.22, 0.26, 1.9]} />
            {orange}
          </mesh>
          <group ref={arm} position={[0, 0, 1.8]}>
            <mesh position={[0, 0, 0.7]}>
              <boxGeometry args={[0.16, 0.2, 1.4]} />
              {orange}
            </mesh>
            <group ref={bucket} position={[0, 0, 1.4]}>
              <mesh position={[0, -0.15, 0.15]}>
                <boxGeometry args={[0.5, 0.35, 0.4]} />
                <meshStandardMaterial color="#3a404c" />
              </mesh>
            </group>
          </group>
        </group>
      </group>
      {/* spoil heap */}
      <mesh position={[1.8, 0.2, 0.6]}>
        <sphereGeometry args={[0.7, 12, 8, 0, Math.PI * 2, 0, Math.PI / 2]} />
        <meshStandardMaterial color="#b98a5c" roughness={1} />
      </mesh>
    </group>
  );
}

// JCB-style backhoe loader: yellow body, glass cab, big rear wheels, front loader bucket
// and a rear digging arm working the drain.
function Backhoe({ position, rotation = 0, reduced }) {
  const swing = useRef();
  const boom = useRef();
  const dipper = useRef();
  const bucket = useRef();
  const loader = useRef();
  useFrame(({ clock }) => {
    const t = reduced ? 1.5 : clock.elapsedTime;
    const c = (t % 5) / 5;
    const dig = Math.sin(c * Math.PI * 2);
    if (swing.current) swing.current.rotation.y = Math.sin(c * Math.PI * 2 + 1.2) * 0.6;
    if (boom.current) boom.current.rotation.x = 0.55 + dig * 0.25;
    if (dipper.current) dipper.current.rotation.x = -1.3 - dig * 0.45;
    if (bucket.current) bucket.current.rotation.x = -0.4 + Math.cos(c * Math.PI * 2) * 0.6;
    if (loader.current) loader.current.rotation.x = -0.15 + Math.sin(t * 0.7) * 0.08;
  });
  const yellow = <meshStandardMaterial color="#f5b700" roughness={0.45} />;
  const dark = <meshStandardMaterial color="#2b2f38" />;
  return (
    <group position={position} rotation={[0, rotation, 0]}>
      {/* chassis and engine bonnet (front = +z) */}
      <mesh position={[0, 0.75, 0]} castShadow>
        <boxGeometry args={[1.1, 0.45, 2.6]} />
        {yellow}
      </mesh>
      <mesh position={[0, 1.05, 0.85]} castShadow>
        <boxGeometry args={[0.8, 0.35, 0.9]} />
        {yellow}
      </mesh>
      {/* cab */}
      <mesh position={[0, 1.55, -0.35]} castShadow>
        <boxGeometry args={[1.0, 1.0, 1.0]} />
        <meshStandardMaterial color="#cfe2ff" transparent opacity={0.75} metalness={0.2} roughness={0.1} />
      </mesh>
      <mesh position={[0, 2.08, -0.35]}>
        <boxGeometry args={[1.12, 0.08, 1.12]} />
        {yellow}
      </mesh>
      {/* wheels: big at the rear, smaller at the front */}
      {[-0.62, 0.62].map((x) => (
        <group key={x}>
          <mesh position={[x, 0.55, -0.7]} rotation={[0, 0, Math.PI / 2]}>
            <cylinderGeometry args={[0.55, 0.55, 0.32, 18]} />
            {dark}
          </mesh>
          <mesh position={[x, 0.38, 0.9]} rotation={[0, 0, Math.PI / 2]}>
            <cylinderGeometry args={[0.38, 0.38, 0.26, 16]} />
            {dark}
          </mesh>
        </group>
      ))}
      {/* front loader arms + bucket */}
      <group ref={loader} position={[0, 1.0, 0.6]}>
        {[-0.5, 0.5].map((x) => (
          <mesh key={x} position={[x, -0.15, 0.75]} rotation={[0.35, 0, 0]}>
            <boxGeometry args={[0.1, 0.12, 1.5]} />
            {yellow}
          </mesh>
        ))}
        <mesh position={[0, -0.55, 1.5]}>
          <boxGeometry args={[1.3, 0.5, 0.45]} />
          {yellow}
        </mesh>
      </group>
      {/* rear backhoe: swing post, boom, dipper, bucket */}
      <group ref={swing} position={[0, 0.9, -1.4]}>
        <mesh>
          <boxGeometry args={[0.35, 0.5, 0.3]} />
          {yellow}
        </mesh>
        <group ref={boom}>
          <mesh position={[0, 0.55, -0.75]} rotation={[0.6, 0, 0]}>
            <boxGeometry args={[0.18, 0.22, 1.7]} />
            {yellow}
          </mesh>
          <group ref={dipper} position={[0, 1.05, -1.45]}>
            <mesh position={[0, -0.65, 0]}>
              <boxGeometry args={[0.14, 1.3, 0.16]} />
              {yellow}
            </mesh>
            <group ref={bucket} position={[0, -1.3, 0]}>
              <mesh position={[0, -0.12, 0.12]}>
                <boxGeometry args={[0.45, 0.3, 0.35]} />
                {dark}
              </mesh>
            </group>
          </group>
        </group>
      </group>
      {/* trench being dug behind it, with a spoil heap */}
      <mesh position={[0, 0.015, -3.3]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[0.9, 2.2]} />
        <meshStandardMaterial color="#7a5a3c" roughness={1} />
      </mesh>
      <mesh position={[1.2, 0.05, -2.6]}>
        <sphereGeometry args={[0.6, 12, 8, 0, Math.PI * 2, 0, Math.PI / 2]} />
        <meshStandardMaterial color="#b98a5c" roughness={1} />
      </mesh>
    </group>
  );
}

function SiteOffice({ position }) {
  const flag = useRef();
  useFrame(({ clock }) => {
    if (flag.current) flag.current.rotation.y = Math.sin(clock.elapsedTime * 3) * 0.25;
  });
  return (
    <group position={position}>
      <mesh position={[0, 0.9, 0]} castShadow>
        <boxGeometry args={[3.2, 1.8, 1.6]} />
        <meshStandardMaterial color="#ffffff" roughness={0.6} />
      </mesh>
      <mesh position={[0, 1.85, 0]}>
        <boxGeometry args={[3.4, 0.1, 1.8]} />
        <meshStandardMaterial color="#012060" />
      </mesh>
      <mesh position={[-0.7, 1.05, 0.81]}>
        <boxGeometry args={[0.9, 0.6, 0.02]} />
        <meshStandardMaterial color="#8db6ff" emissive="#4f86e8" emissiveIntensity={0.2} />
      </mesh>
      <mesh position={[0.8, 0.7, 0.81]}>
        <boxGeometry args={[0.5, 1.2, 0.02]} />
        <meshStandardMaterial color="#012060" />
      </mesh>
      <NameBoard text="Site Office" position={[0, 1.57, 0.815]} width={2.6} height={0.34} />
      <mesh position={[1.9, 1.8, 0]}>
        <cylinderGeometry args={[0.04, 0.04, 3.6, 8]} />
        <meshStandardMaterial color="#d6dce3" />
      </mesh>
      <group ref={flag} position={[1.9, 3.3, 0]}>
        <mesh position={[0.45, 0, 0]}>
          <boxGeometry args={[0.9, 0.55, 0.02]} />
          <meshStandardMaterial color="#92d14f" side={THREE.DoubleSide} />
        </mesh>
      </group>
    </group>
  );
}

// Route for site traffic: in through the gate, down the main road, round the substation,
// back along the yard road past the control room, and out through the gate again.
function useLoopRoute() {
  return useMemo(() => {
    // Inbound traffic uses the west lane, outbound the east lane (the side the yard road joins),
    // so the route never crosses itself and vehicles cannot meet head-on.
    const IN = ROAD_X - 0.55, OUT = ROAD_X + 0.55;
    const pts = [
      [IN, FENCE_FRONT + 26], [IN, FENCE_FRONT + 4], [IN, 0], [IN, BACK_ROAD_Z + 1.6],
      [IN + 1.8, BACK_ROAD_Z], [EAST_ROAD_X - 1.6, BACK_ROAD_Z], [EAST_ROAD_X, BACK_ROAD_Z + 1.6],
      [EAST_ROAD_X, YARD_ROAD_Z - 1.6], [EAST_ROAD_X - 1.6, YARD_ROAD_Z], [OUT + 2.0, YARD_ROAD_Z],
      [OUT + 0.4, YARD_ROAD_Z + 1.5], [OUT, FENCE_FRONT], [OUT, FENCE_FRONT + 26],
    ].map(([x, z]) => new THREE.Vector3(x, 0, z));
    const curve = new THREE.CatmullRomCurve3(pts, true, "centripetal", 0.5);
    return { curve, len: curve.getLength() };
  }, []);
}

function LoopVehicle({ id, speed, offset = 0, reduced, children }) {
  const ref = useRef();
  const { curve, len } = useLoopRoute();
  const p = useMemo(() => new THREE.Vector3(), []);
  const tan = useMemo(() => new THREE.Vector3(), []);
  useFrame(({ clock }) => {
    if (!ref.current) return;
    const u = reduced ? offset : ((clock.elapsedTime * speed) / len + offset) % 1;
    curve.getPointAt(u, p);
    curve.getTangentAt(u, tan);
    ref.current.position.copy(p);
    ref.current.rotation.y = Math.atan2(tan.x, tan.z);
    traffic.z[id] = p.z;
  });
  return <group ref={ref}>{children}</group>;
}

// Tipper / cargo truck (like our Eicher): white cab, yellow body with a load of sand.
function TruckModel() {
  return (
    <group>
      <mesh position={[0, 0.45, 0]} castShadow>
        <boxGeometry args={[0.85, 0.22, 3.0]} />
        <meshStandardMaterial color="#2b2f38" />
      </mesh>
      <mesh position={[0, 1.0, 1.05]} castShadow>
        <boxGeometry args={[0.95, 0.9, 0.85]} />
        <meshStandardMaterial color="#ffffff" roughness={0.5} />
      </mesh>
      <mesh position={[0, 1.15, 1.48]}>
        <planeGeometry args={[0.8, 0.38]} />
        <meshStandardMaterial color="#8db6ff" />
      </mesh>
      <mesh position={[0, 0.75, 1.48]}>
        <planeGeometry args={[0.95, 0.12]} />
        <meshStandardMaterial color="#012060" />
      </mesh>
      <mesh position={[0, 0.6, -0.45]}>
        <boxGeometry args={[0.95, 0.08, 1.95]} />
        <meshStandardMaterial color={YELLOW} />
      </mesh>
      {[-0.46, 0.46].map((x) => (
        <mesh key={x} position={[x, 0.85, -0.45]}>
          <boxGeometry args={[0.05, 0.45, 1.95]} />
          <meshStandardMaterial color={YELLOW} />
        </mesh>
      ))}
      {[0.5, -1.4].map((z) => (
        <mesh key={z} position={[0, 0.85, z]}>
          <boxGeometry args={[0.95, 0.45, 0.05]} />
          <meshStandardMaterial color={YELLOW} />
        </mesh>
      ))}
      <mesh position={[0, 0.95, -0.45]} scale={[0.85, 0.5, 1.6]}>
        <sphereGeometry args={[0.5, 12, 8, 0, Math.PI * 2, 0, Math.PI / 2]} />
        <meshStandardMaterial color="#c9a46f" roughness={1} />
      </mesh>
      <Wheels positions={[[-0.45, 1.0], [0.45, 1.0], [-0.45, -0.7], [0.45, -0.7], [-0.45, -1.15], [0.45, -1.15]]} r={0.26} />
    </group>
  );
}

// Transit concrete mixer: yellow cab, tilted drum that turns while driving.
function MixerModel({ reduced }) {
  const drum = useRef();
  useFrame((_, dt) => { if (drum.current && !reduced) drum.current.rotation.y += dt * 2.2; });
  return (
    <group>
      <mesh position={[0, 0.45, 0]} castShadow>
        <boxGeometry args={[0.85, 0.22, 3.0]} />
        <meshStandardMaterial color="#2b2f38" />
      </mesh>
      <mesh position={[0, 1.0, 1.1]} castShadow>
        <boxGeometry args={[0.95, 0.9, 0.75]} />
        <meshStandardMaterial color="#ffffff" roughness={0.5} />
      </mesh>
      <mesh position={[0, 1.15, 1.48]}>
        <planeGeometry args={[0.8, 0.38]} />
        <meshStandardMaterial color="#8db6ff" />
      </mesh>
      {/* drum: axis along the truck, rising towards the rear opening */}
      <group position={[0, 1.3, -0.4]} rotation={[-Math.PI / 2 + 0.22, 0, 0]}>
        <group ref={drum}>
          <mesh castShadow>
            <cylinderGeometry args={[0.36, 0.55, 1.5, 18]} />
            <meshStandardMaterial color="#f2b21b" roughness={0.45} />
          </mesh>
          <mesh position={[0, 0.65, 0]}>
            <cylinderGeometry args={[0.24, 0.36, 0.25, 18]} />
            <meshStandardMaterial color="#f2b21b" roughness={0.45} />
          </mesh>
          {[-0.4, 0, 0.4].map((y, i) => (
            <mesh key={y} position={[0, y, 0]} rotation={[0.35, i, 0]}>
              <torusGeometry args={[0.47 - y * 0.12, 0.035, 6, 24]} />
              <meshStandardMaterial color="#012060" />
            </mesh>
          ))}
        </group>
      </group>
      <Wheels positions={[[-0.45, 1.0], [0.45, 1.0], [-0.45, -0.7], [0.45, -0.7], [-0.45, -1.15], [0.45, -1.15]]} r={0.26} />
    </group>
  );
}

function Clouds({ reduced }) {
  const ref = useRef();
  const clouds = useMemo(() => [
    [-40, 22, -110, 1.6], [-5, 27, -140, 2.1], [30, 20, -95, 1.3], [60, 25, -130, 1.8], [-70, 19, -90, 1.2],
  ], []);
  useFrame((_, dt) => {
    if (reduced || !ref.current) return;
    ref.current.children.forEach((c) => {
      c.position.x += dt * 0.9;
      if (c.position.x > 110) c.position.x = -110;
    });
  });
  return (
    <group ref={ref}>
      {clouds.map(([x, y, z, s], i) => (
        <group key={i} position={[x, y, z]} scale={[s * 4.5, s, s * 1.5]}>
          {[[-1, 0, 0, 1], [0, 0.35, 0, 1.3], [1.1, 0, 0, 0.95]].map(([cx, cy, cz, r], j) => (
            <mesh key={j} position={[cx, cy, cz]}>
              <sphereGeometry args={[r, 14, 10]} />
              <meshBasicMaterial color="#ffffff" transparent opacity={0.9} fog={false} />
            </mesh>
          ))}
        </group>
      ))}
    </group>
  );
}

function Buildings() {
  // inverter stations along the central road and a main control room
  const stations = [-FARM_D / 2 + PITCH_Z * 1.5, FARM_D / 2 - PITCH_Z * 1.5];
  return (
    <group>
      {stations.map((z, i) => (
        <group key={i} position={[FARM_W / 2 + 6, 0, z]}>
          <mesh position={[0, 0.15, 0]} receiveShadow>
            <boxGeometry args={[2.6, 0.3, 2.0]} />
            <meshStandardMaterial color="#c9ccd0" />
          </mesh>
          <mesh position={[0, 0.85, 0]} castShadow>
            <boxGeometry args={[2.2, 1.1, 1.3]} />
            <meshStandardMaterial color="#f2f4f7" roughness={0.5} />
          </mesh>
          <mesh position={[0, 1.6, 0]}>
            <boxGeometry args={[2.7, 0.08, 1.9]} />
            <meshStandardMaterial color="#012060" />
          </mesh>
          <NameBoard text="Inverter Station" position={[0, 1.17, 0.66]} width={1.9} height={0.3} />
        </group>
      ))}
      {/* control room */}
      <group position={[CONTROL_ROOM[0], 0, CONTROL_ROOM[1]]}>
        <mesh position={[0, 1.1, 0]} castShadow>
          <boxGeometry args={[4.2, 2.2, 2.6]} />
          <meshStandardMaterial color="#e9ecf0" roughness={0.6} />
        </mesh>
        <mesh position={[0, 2.3, 0]}>
          <boxGeometry args={[4.5, 0.15, 2.9]} />
          <meshStandardMaterial color="#012060" />
        </mesh>
        <mesh position={[0, 1.05, 1.31]}>
          <boxGeometry args={[3.4, 0.5, 0.02]} />
          <meshStandardMaterial color="#ffd28a" emissive="#ffb347" emissiveIntensity={0.9} />
        </mesh>
        <NameBoard text="Control Room" position={[0, 1.78, 1.315]} width={3.2} height={0.5} />
      </group>
    </group>
  );
}


// ── Grid: substation, battery storage, transmission line and moving energy ──
const T_POWER = 5.4; // energy starts flowing once the plant is "commissioned"
const PULSE_COLOR = new THREE.Color("#ffc21a");

function Pylon({ position, rotation = 0, scale = 1 }) {
  const steel = <meshStandardMaterial color="#c9d1db" metalness={0.6} roughness={0.45} />;
  const H = 13;
  const legs = [[-1, -1], [1, -1], [1, 1], [-1, 1]];
  return (
    <group position={position} rotation={[0, rotation, 0]} scale={scale}>
      {legs.map(([lx, lz], i) => {
        const bx = lx * 1.1, bz = lz * 1.1, tx = lx * 0.25, tz = lz * 0.25;
        const len = Math.hypot(bx - tx, H, bz - tz);
        const mid = [(bx + tx) / 2, H / 2, (bz + tz) / 2];
        const dir = new THREE.Vector3(tx - bx, H, tz - bz).normalize();
        const q = new THREE.Quaternion().setFromUnitVectors(new THREE.Vector3(0, 1, 0), dir);
        return (
          <mesh key={i} position={mid} quaternion={q}>
            <boxGeometry args={[0.15, len, 0.15]} />
            {steel}
          </mesh>
        );
      })}
      {[3, 6.5, 10].map((y) => (
        <mesh key={y} position={[0, y, 0]}>
          <boxGeometry args={[2.2 - y * 0.14, 0.07, 0.07]} />
          {steel}
        </mesh>
      ))}
      {[[H - 2.6, 4.2], [H - 0.9, 3.2]].map(([y, w], i) => (
        <mesh key={i} position={[0, y, 0]}>
          <boxGeometry args={[w, 0.12, 0.14]} />
          {steel}
        </mesh>
      ))}
      <mesh position={[0, H + 0.5, 0]}>
        <boxGeometry args={[0.12, 1.1, 0.12]} />
        {steel}
      </mesh>
    </group>
  );
}

// Attachment points of the three phase conductors relative to a pylon.
const PHASES = [[-2.1, 10.4 - 0], [2.1, 10.4], [0, 12.1]];

function sag(a, b, drop, steps = 18) {
  const pts = [];
  for (let i = 0; i <= steps; i++) {
    const t = i / steps;
    const p = new THREE.Vector3().lerpVectors(a, b, t);
    p.y -= Math.sin(t * Math.PI) * drop;
    pts.push(p);
  }
  return pts;
}

function useGridLayout(farmX) {
  return useMemo(() => {
    const sub = new THREE.Vector3(farmX + FARM_W / 2 + 13.6, 0, -3.6);
    // Line heads back into the distance, weaving between the wind turbines.
    const towers = [
      [sub.x + 3, -17], [sub.x + 2, -40], [sub.x - 4, -63], [sub.x - 14, -87], [sub.x - 28, -112], [sub.x - 46, -138],
    ].map(([x, z]) => new THREE.Vector3(x, 0, z));
    const yaw = (a, b) => Math.atan2(b.x - a.x, b.z - a.z) + Math.PI / 2;
    const rot = towers.map((t, i) => yaw(towers[Math.max(0, i - 1)], towers[Math.min(towers.length - 1, i + 1)]));
    // conductors: three continuous paths from the substation gantry outwards
    const paths = PHASES.map(([off, h]) => {
      const pts = [new THREE.Vector3(sub.x + off * 0.4, 5.2, sub.z - 1.5)];
      towers.forEach((t, i) => {
        const r = rot[i];
        pts.push(new THREE.Vector3(t.x + Math.cos(r) * off, h, t.z - Math.sin(r) * off));
      });
      const full = [];
      for (let i = 0; i < pts.length - 1; i++) {
        const seg = sag(pts[i], pts[i + 1], 1.1);
        full.push(...(i ? seg.slice(1) : seg));
      }
      return full;
    });
    // feeder paths: from each module row along the road to the substation (power collection)
    const feeders = [];
    for (let r = 0; r < ROWS; r++) {
      const z = r * PITCH_Z - FARM_D / 2;
      feeders.push([
        new THREE.Vector3(farmX - FARM_W / 2, 0.25, z + 0.9),
        new THREE.Vector3(farmX + FARM_W / 2 + 2.2, 0.25, z + 0.9),
        new THREE.Vector3(farmX + FARM_W / 2 + 2.2, 0.25, -4),
        new THREE.Vector3(sub.x - 3, 0.25, -4),
      ]);
    }
    return { sub, towers, rot, paths, feeders };
  }, [farmX]);
}

function FeederLines({ feeders, startRef, reduced }) {
  const mat = useMemo(() => new THREE.LineBasicMaterial({ color: "#92d14f", transparent: true, opacity: 0, toneMapped: false }), []);
  const lines = useMemo(() => feeders.map((pts) => new THREE.Line(new THREE.BufferGeometry().setFromPoints(pts), mat)), [feeders, mat]);
  useFrame(({ clock }) => {
    const t = clock.elapsedTime - startRef.current - T_POWER;
    mat.opacity = reduced ? 0.5 : Math.max(0, Math.min(0.55, t * 0.5));
  });
  return lines.map((l, i) => <primitive key={i} object={l} />);
}

function Wires({ paths }) {
  const lines = useMemo(
    () =>
      paths.map((pts) => {
        const g = new THREE.BufferGeometry().setFromPoints(pts);
        return new THREE.Line(g, new THREE.LineBasicMaterial({ color: "#f3f6fa", transparent: true, opacity: 0.9 }));
      }),
    [paths]
  );
  return lines.map((l, i) => <primitive key={i} object={l} />);
}

function EnergyPulses({ startRef, reduced, curves, perCurve, speed, size, delay = 0 }) {
  const ref = useRef();
  const dummy = useMemo(() => new THREE.Object3D(), []);
  const count = curves.length * perCurve;
  const v = useMemo(() => new THREE.Vector3(), []);
  useFrame(({ clock }) => {
    const t = reduced ? 0 : clock.elapsedTime - startRef.current - T_POWER - delay;
    const on = !reduced && t > 0 ? Math.min(1, t / 1.2) : 0;
    let i = 0;
    curves.forEach((c, ci) => {
      for (let k = 0; k < perCurve; k++) {
        const u = (((t * speed) / c.len + k / perCurve + ci * 0.137) % 1 + 1) % 1;
        c.curve.getPointAt(u, v);
        dummy.position.copy(v);
        const s = on * size * (0.7 + 0.3 * Math.sin((u + k) * 20));
        dummy.scale.setScalar(Math.max(s, 0.0001));
        dummy.updateMatrix();
        ref.current.setMatrixAt(i++, dummy.matrix);
      }
    });
    ref.current.instanceMatrix.needsUpdate = true;
  });
  return (
    <instancedMesh ref={ref} args={[null, null, count]} frustumCulled={false}>
      <sphereGeometry args={[1, 10, 8]} />
      <meshBasicMaterial color={PULSE_COLOR} toneMapped={false} fog={false} />
    </instancedMesh>
  );
}

function Substation({ position, startRef, reduced }) {
  const leds = useRef([]);
  useFrame(({ clock }) => {
    const t = clock.elapsedTime - startRef.current - T_POWER;
    leds.current.forEach((m, i) => {
      if (!m) return;
      m.emissiveIntensity = reduced ? 1 : t > 0 ? 0.6 + 0.6 * Math.max(0, Math.sin(clock.elapsedTime * 3 + i)) : 0.05;
    });
  });
  const steel = <meshStandardMaterial color="#c9d1db" metalness={0.6} roughness={0.45} />;
  return (
    <group position={position}>
      {/* yard slab */}
      <mesh position={[0, 0.05, 0]} receiveShadow>
        <boxGeometry args={[9, 0.1, 9]} />
        <meshStandardMaterial color="#9a9488" roughness={1} />
      </mesh>
      {/* power transformers */}
      {[-2, 1.5].map((x, i) => (
        <group key={i} position={[x, 0, 1.2]}>
          <mesh position={[0, 0.9, 0]} castShadow>
            <boxGeometry args={[2, 1.6, 1.4]} />
            <meshStandardMaterial color="#5f7d6a" roughness={0.6} />
          </mesh>
          {[-0.5, 0, 0.5].map((bx) => (
            <mesh key={bx} position={[bx, 2.1, 0]}>
              <cylinderGeometry args={[0.08, 0.12, 0.9, 8]} />
              <meshStandardMaterial color="#d8c7a5" />
            </mesh>
          ))}
        </group>
      ))}
      {/* gantry where the line leaves */}
      {[-2.4, 2.4].map((x) => (
        <mesh key={x} position={[x, 2.7, -1.5]}>
          <boxGeometry args={[0.18, 5.4, 0.18]} />
          {steel}
        </mesh>
      ))}
      <mesh position={[0, 5.3, -1.5]}>
        <boxGeometry args={[5.2, 0.18, 0.18]} />
        {steel}
      </mesh>
      {/* battery energy storage containers */}
      {[0, 1, 2].map((i) => (
        <group key={i} position={[-3 + i * 3, 0, 4]}>
          <mesh position={[0, 0.75, 0]} castShadow>
            <boxGeometry args={[2.6, 1.3, 1.1]} />
            <meshStandardMaterial color="#f1f3f6" roughness={0.5} />
          </mesh>
          <mesh position={[0, 0.95, 0.56]}>
            <boxGeometry args={[2.2, 0.08, 0.02]} />
            <meshStandardMaterial ref={(m) => (leds.current[i] = m)} color="#92d14f" emissive="#92d14f" emissiveIntensity={0.05} toneMapped={false} />
          </mesh>
        </group>
      ))}
    </group>
  );
}

function Grid({ farmX, startRef, reduced }) {
  const { sub, towers, rot, paths, feeders } = useGridLayout(farmX);
  const lineCurves = useMemo(
    () => paths.map((pts) => { const curve = new THREE.CatmullRomCurve3(pts); return { curve, len: curve.getLength() }; }),
    [paths]
  );
  const feederCurves = useMemo(
    () => feeders.map((pts) => { const curve = new THREE.CatmullRomCurve3(pts, false, "catmullrom", 0); return { curve, len: curve.getLength() }; }),
    [feeders]
  );
  return (
    <group>
      <Substation position={sub} startRef={startRef} reduced={reduced} />
      {towers.map((t, i) => (
        <Pylon key={i} position={t} rotation={rot[i]} />
      ))}
      <Wires paths={paths} />
      <FeederLines feeders={feeders} startRef={startRef} reduced={reduced} />
      <EnergyPulses startRef={startRef} reduced={reduced} curves={feederCurves} perCurve={3} speed={9} size={0.16} />
      <EnergyPulses startRef={startRef} reduced={reduced} curves={lineCurves} perCurve={9} speed={22} size={0.24} delay={0.8} />
    </group>
  );
}

const skyMaterial = new THREE.ShaderMaterial({
  side: THREE.BackSide,
  depthWrite: false,
  fog: false,
  uniforms: {
    top: { value: new THREE.Color("#2a5fd0") },
    mid: { value: new THREE.Color("#7ba7e8") },
    horizon: { value: new THREE.Color("#e4eef4") },
    sunDir: { value: new THREE.Vector3(-0.4, 0.35, -1).normalize() },
  },
  vertexShader: `varying vec3 vDir; void main(){ vDir = normalize(position); gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.0); }`,
  fragmentShader: `uniform vec3 top; uniform vec3 mid; uniform vec3 horizon; uniform vec3 sunDir; varying vec3 vDir;
    void main(){
      float h = vDir.y;
      vec3 c = mix(horizon, mid, smoothstep(0.0, 0.18, h));
      c = mix(c, top, smoothstep(0.18, 0.6, h));
      float sun = pow(max(dot(normalize(vDir), sunDir), 0.0), 24.0);
      c += vec3(1.0, 0.97, 0.88) * sun * 0.35;
      if (h < 0.0) c = horizon;
      gl_FragColor = vec4(c, 1.0);
    }`,
});

function Sky() {
  return (
    <mesh material={skyMaterial} renderOrder={-1}>
      <sphereGeometry args={[260, 32, 16]} />
    </mesh>
  );
}

function CameraRig({ pointer, reduced }) {
  const { camera, size } = useThree();
  const target = useMemo(() => new THREE.Vector3(), []);
  useFrame(({ clock }) => {
    const aspect = size.width / size.height;
    const narrow = aspect < 1.1;
    // Keep the same horizontal view on every screen size and zoom level, so the
    // scene never looks "zoomed in" on shorter or narrower windows.
    const hfov = narrow ? 70 : 64;
    const vfov = THREE.MathUtils.clamp(
      THREE.MathUtils.radToDeg(2 * Math.atan(Math.tan(THREE.MathUtils.degToRad(hfov / 2)) / aspect)),
      30,
      75
    );
    if (Math.abs(camera.fov - vfov) > 0.1) {
      camera.fov = vfov;
      camera.updateProjectionMatrix();
    }
    // On wide screens push the plant to the right so the headline sits on open sky.
    // The scene now sits in its own section (no headline over it), so frame the whole plant centrally.
    const base = narrow ? [13, 11, 30] : [7, 12.5, 39];
    const look = narrow ? [15, 0.8, -1] : [9, 1.6, -3];
    const t = clock.elapsedTime;
    const drift = reduced ? 0 : Math.sin(t * 0.12) * 0.8;
    const px = reduced ? 0 : pointer.current.x;
    const py = reduced ? 0 : pointer.current.y;
    camera.position.x += (base[0] + drift + px * 2.2 - camera.position.x) * 0.04;
    camera.position.y += (base[1] - py * 1.2 - camera.position.y) * 0.04;
    camera.position.z += (base[2] - camera.position.z) * 0.04;
    target.set(look[0] + px * 0.6, look[1], look[2]);
    camera.lookAt(target);
  });
  return null;
}

function Scene({ reduced, onReady }) {
  const startRef = useRef(0);
  const pointer = useRef({ x: 0, y: 0 });
  const { clock, size } = useThree();
  const farmX = 0;

  useEffect(() => {
    startRef.current = clock.elapsedTime + 0.2;
    onReady?.();
    const move = (e) => {
      pointer.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      pointer.current.y = (e.clientY / window.innerHeight) * 2 - 1;
    };
    window.addEventListener("pointermove", move, { passive: true });
    return () => window.removeEventListener("pointermove", move);
  }, [clock, onReady]);

  return (
    <>
      <Sky />
      <fog attach="fog" args={["#e4eef4", 60, 210]} />
      <hemisphereLight args={["#cfe0ff", "#6f9a4a", 1.25]} />
      <ambientLight intensity={0.35} />
      <directionalLight position={[-20, 30, 10]} intensity={1.6} color="#fff6e5" />
      <directionalLight
        position={[18, 22, 18]}
        intensity={1.0}
        color="#dfe7ff"
        castShadow
        shadow-mapSize={[1024, 1024]}
        shadow-camera-left={-30}
        shadow-camera-right={30}
        shadow-camera-top={30}
        shadow-camera-bottom={-30}
      />
      <mesh rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[480, 480]} />
        <meshStandardMaterial color="#9cc66a" roughness={1} />
      </mesh>
      <group position={[farmX, 0, 0]}>
        <Fence startRef={startRef} reduced={reduced} />
        <Panels startRef={startRef} reduced={reduced} />
        <Roads />
        <Buildings />
        <Gate reduced={reduced} />
        <SecurityRoom position={[GATE_X1 + 1.6, 0, FENCE_FRONT - 1.3]} />
        {/* own fleet on site: Eicher truck and Bolero pickup */}
        <LoopVehicle id={0} speed={3.4} offset={0.08} reduced={reduced}><TruckModel /></LoopVehicle>
        <LoopVehicle id={1} speed={3.4} offset={0.55} reduced={reduced}><MixerModel reduced={reduced} /></LoopVehicle>
        <TractorAuger z={FARM_D / 2 + 1.6} x0={-FARM_W / 2 + 1} x1={FARM_W / 2 - 1} reduced={reduced} />
        <TractorAuger z={-FARM_D / 2 - 1.6} x0={-FARM_W / 2 + 1} x1={FARM_W / 2 - 1} reduced={reduced} phase={11} />
        <Backhoe position={[FARM_W / 2 + 10.8, 0, 3.0]} rotation={Math.PI / 2} reduced={reduced} />
        {/* building names */}
      </group>
      <Clouds reduced={reduced} />
      <Grid farmX={farmX} startRef={startRef} reduced={reduced} />
      <Turbine position={[-30, 0, -70]} scale={1.05} speed={0.55} reduced={reduced} />
      <Turbine position={[-4, 0, -85]} scale={1.2} speed={0.45} reduced={reduced} phase={1} />
      <Turbine position={[22, 0, -66]} scale={1.1} speed={0.6} reduced={reduced} phase={2} />
      <Turbine position={[48, 0, -90]} scale={1.15} speed={0.5} reduced={reduced} phase={0.5} />
      <CameraRig pointer={pointer} reduced={reduced} />
    </>
  );
}

export default function HeroScene({ active = true, reduced = false, onReady }) {
  const lowPower = typeof navigator !== "undefined" && (navigator.hardwareConcurrency || 8) <= 4;
  return (
    <Canvas
      className="site-canvas"
      frameloop={active ? (reduced ? "demand" : "always") : "never"}
      dpr={[1, lowPower ? 1.25 : 1.75]}
      shadows={!lowPower}
      gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      camera={{ fov: 38, near: 0.5, far: 300, position: [-3, 8.5, 31] }}
      aria-hidden="true"
    >
      <Scene reduced={reduced} onReady={onReady} />
    </Canvas>
  );
}
