/**
 * apt3d.js — Tip-bazlı daireyi 3B kurar (Three.js) — kaliteli/atmosferik
 * Poligon odalardan: duvar(kapı/cam boşluklu) + per-oda dokulu zemin
 * (balık-kemiği parke / fayans / halı / balkon) + yuvarlatılmış parametrik
 * mobilya + lambalar + modern PBR ışık.
 */
import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import { mergeGeometries } from "three/addons/utils/BufferGeometryUtils.js";
import { RoomEnvironment } from "three/addons/environments/RoomEnvironment.js";
import { RoundedBoxGeometry } from "three/addons/geometries/RoundedBoxGeometry.js";

const WALL_FULL = 2.75, WALL_HALF = 1.2, WT_EXT = 0.2, WT_INT = 0.1;

export class Apt3D {
  constructor(container) {
    this.container = container;
    const w = container.clientWidth, h = container.clientHeight || 1;
    this.scene = new THREE.Scene();
    this.scene.background = this._gradientBg();

    this.camera = new THREE.PerspectiveCamera(42, w / h, 0.05, 200);
    this.renderer = new THREE.WebGLRenderer({ antialias: true });
    this._fullDpr = Math.min(devicePixelRatio || 1, (typeof window !== "undefined" && window.innerWidth < 820) ? 1.5 : 2); // mobilde framebuffer küçük -> RAM/GPU ↓
    this._lowDpr = Math.min(devicePixelRatio || 1, 1);
    this.renderer.setPixelRatio(this._fullDpr);
    this.renderer.setSize(w, h);
    this.renderer.shadowMap.enabled = true;
    this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    this.renderer.shadowMap.autoUpdate = false;   // sahne sabit; gölge her karede değil yalnız değişince -> GPU yükü ↓ (context kaybı önlenir)
    this.renderer.outputColorSpace = THREE.SRGBColorSpace;
    this.renderer.toneMapping = THREE.ACESFilmicToneMapping;
    this.renderer.toneMappingExposure = 1.2;
    container.appendChild(this.renderer.domElement);

    const pmrem = new THREE.PMREMGenerator(this.renderer);
    this.scene.environment = pmrem.fromScene(new RoomEnvironment(), 0.04).texture;

    this.controls = new OrbitControls(this.camera, this.renderer.domElement);
    this.controls.enableDamping = true; this.controls.dampingFactor = 0.08;
    this.controls.maxPolarAngle = Math.PI / 2.06; this.controls.minDistance = 3; this.controls.maxDistance = 28;
    // render-on-demand: yalnız sahne/kamera değişince çiz (boşta CPU ~0)
    this._dirty = true;
    this.controls.addEventListener("change", () => { this._dirty = true; });
    // döndürürken düşük çözünürlük -> akıcı; bırakınca net (CPU/GPU yükü ↓)
    this.controls.addEventListener("start", () => { this.renderer.setPixelRatio(this._lowDpr); this._dirty = true; });
    this.controls.addEventListener("end", () => { this.renderer.setPixelRatio(this._fullDpr); this._dirty = true; });

    // bol ışık: zeminler gölgede bile siyah görünmesin
    this.scene.add(new THREE.HemisphereLight(0xf4f7ff, 0x7b818f, 1.1));
    this.scene.add(new THREE.AmbientLight(0xffffff, 0.4));
    const key = new THREE.DirectionalLight(0xfff2dd, 1.0);
    key.position.set(6, 15, 5); key.castShadow = true;
    key.shadow.mapSize.set(1536, 1536);
    const s = 9; Object.assign(key.shadow.camera, { left: -s, right: s, top: s, bottom: -s, near: 1, far: 48 });
    key.shadow.bias = -0.0004; key.shadow.normalBias = 0.02; key.shadow.radius = 3; this.scene.add(key);
    const fill = new THREE.DirectionalLight(0xcfe0ff, 0.45); fill.position.set(-7, 8, -6); this.scene.add(fill);

    // zemin podyumu (sunum + temas gölgesi)
    const ground = new THREE.Mesh(new THREE.PlaneGeometry(80, 80), new THREE.MeshStandardMaterial({ color: "#141c2c", roughness: 1 }));
    ground.rotation.x = -Math.PI / 2; ground.position.y = -0.04; ground.receiveShadow = true; this.scene.add(ground);

    this._mats();
    this.root = new THREE.Group(); this.scene.add(this.root);
    this._wallH = WALL_FULL;
    this._animate = this._animate.bind(this); this._onResize = this._onResize.bind(this);
    window.addEventListener("resize", this._onResize);
    // Kart açılıp kapanması / reflow / scroll sonrası canvas'ı koru: boyut değişince yeniden ölçekle
    if (window.ResizeObserver) { this._ro = new ResizeObserver(() => this._onResize()); this._ro.observe(this.container); }
    // WebGL context kaybolursa (büyük sahnede olabilir) geri getir
    const cv = this.renderer.domElement;
    cv.addEventListener("webglcontextlost", (e) => e.preventDefault(), false);
    cv.addEventListener("webglcontextrestored", () => { this._onResize(); this.renderer.shadowMap.needsUpdate = true; }, false);
    this._animate();
  }

  _mats() {
    const std = (o) => new THREE.MeshStandardMaterial(o);
    this.mat = {
      wall: std({ color: "#f3efe7", roughness: 0.95, envMapIntensity: 0.5 }),
      wood: std({ color: "#7c5536", roughness: 0.45, envMapIntensity: 0.7 }),
      woodD: std({ color: "#5d3d27", roughness: 0.5 }),
      woodL: std({ color: "#9c6f47", roughness: 0.55 }),
      fabric: std({ color: "#79828f", roughness: 0.95 }),      // gri-mavi koltuk
      fabricD: std({ color: "#5f6775", roughness: 0.95 }),
      bed: std({ color: "#9aa1ad", roughness: 0.9 }),
      duvet: std({ color: "#888f9c", roughness: 0.92 }),
      pillow: std({ color: "#eef1f5", roughness: 0.85 }),
      marble: std({ color: "#eef0f2", roughness: 0.18, metalness: 0.05, envMapIntensity: 1.1 }),
      metal: std({ color: "#c8ccd0", roughness: 0.25, metalness: 0.8 }),
      white: std({ color: "#f6f8fa", roughness: 0.2, envMapIntensity: 0.9 }),
      black: std({ color: "#171b21", roughness: 0.35, metalness: 0.3 }),
      screen: std({ color: "#0a0e14", roughness: 0.12, metalness: 0.2 }),
      pot: std({ color: "#6f5140", roughness: 0.8 }),
      plant: std({ color: "#4f7a48", roughness: 0.9 }),
      railing: std({ color: "#9aa1ab", roughness: 0.3, metalness: 0.7 }),
      wardrobe: std({ color: "#d7cfc2", roughness: 0.55, envMapIntensity: 0.6 }),   // modern mat greige
      mirror: std({ color: "#cfe0ee", roughness: 0.05, metalness: 0.92, envMapIntensity: 2.0 }),
      lampBase: std({ color: "#2a2f37", roughness: 0.4, metalness: 0.5 }),
      shade: std({ color: "#fff4dc", roughness: 0.6, emissive: 0xffd9a0, emissiveIntensity: 0.9 }),
      // Kırılmasız temiz cam: transmission kapalı -> arkadaki obje çiftlenmez/hayalet olmaz
      glass: new THREE.MeshPhysicalMaterial({
        color: "#cfe3f2", metalness: 0, roughness: 0.06,
        transmission: 0, transparent: true, opacity: 0.18,
        clearcoat: 1, clearcoatRoughness: 0.04,
        side: THREE.FrontSide, depthWrite: false, envMapIntensity: 0.7,
      }),
    };
    this.floorMat = {
      parke: { mat: std({ map: this._tex("parke"), roughness: 0.5, envMapIntensity: 0.85 }), tile: 1.4 },
      fayans: { mat: std({ map: this._tex("fayans"), roughness: 0.25, envMapIntensity: 1.0 }), tile: 0.5 },
      hali: { mat: std({ map: this._tex("hali"), roughness: 1 }), tile: 2.5 },
      balkon: { mat: std({ map: this._tex("balkon"), roughness: 0.7 }), tile: 0.7 },
    };
  }

  _gradientBg() {
    const c = document.createElement("canvas"); c.width = 32; c.height = 512; const x = c.getContext("2d");
    const g = x.createLinearGradient(0, 0, 0, 512);
    g.addColorStop(0, "#38496a"); g.addColorStop(0.45, "#1c2840"); g.addColorStop(1, "#0c1320");
    x.fillStyle = g; x.fillRect(0, 0, 32, 512);
    const t = new THREE.CanvasTexture(c); t.colorSpace = THREE.SRGBColorSpace; return t;
  }

  _tex(kind) {
    const c = document.createElement("canvas"); c.width = c.height = 512; const x = c.getContext("2d");
    if (kind === "parke") {
      // balık-kemiği (herringbone) — açık beyaz-kahve, planklar arası ton farkı
      x.fillStyle = "#a4703f"; x.fillRect(0, 0, 512, 512);
      const pw = 96, ph = 34; x.lineWidth = 2;
      const plank = (cx, cy, ang) => {
        x.save(); x.translate(cx, cy); x.rotate(ang);
        const light = Math.random() > 0.5;
        const L = light ? 56 + Math.random() * 6 : 44 + Math.random() * 6;        // kahverengi meşe: iki ton
        x.fillStyle = `hsl(29, ${light ? 44 : 50}%, ${L}%)`;
        x.fillRect(-pw / 2, -ph / 2, pw, ph);
        x.strokeStyle = "rgba(90,65,40,.35)"; x.strokeRect(-pw / 2, -ph / 2, pw, ph);
        x.strokeStyle = "rgba(110,80,50,.14)";
        for (let i = -pw / 2 + 8; i < pw / 2; i += 12) { x.beginPath(); x.moveTo(i, -ph / 2); x.lineTo(i, ph / 2); x.stroke(); }
        x.restore();
      };
      const step = 68;
      for (let r = -1; r < 9; r++) for (let cc = -1; cc < 9; cc++) {
        const bx = cc * step * 2 + (r % 2) * step;
        const by = r * step;
        plank(bx, by, Math.PI / 4);
        plank(bx + step, by, -Math.PI / 4);
      }
      const t = new THREE.CanvasTexture(c); t.wrapS = t.wrapT = THREE.RepeatWrapping; return t;
    }
    if (kind === "fayans") {
      // basit kare fayans deseni: açık karolar + derz çizgileri
      x.fillStyle = "#dde4ea"; x.fillRect(0, 0, 512, 512);
      const tile = 128;
      for (let i = 0; i < 4; i++) for (let j = 0; j < 4; j++) {
        const shade = 226 + Math.floor(Math.random() * 14);
        x.fillStyle = `rgb(${shade},${shade + 4},${shade + 8})`;
        x.fillRect(i * tile + 3, j * tile + 3, tile - 6, tile - 6);
      }
      x.strokeStyle = "#b3bcc6"; x.lineWidth = 6;
      for (let p = 0; p <= 512; p += tile) { x.beginPath(); x.moveTo(p, 0); x.lineTo(p, 512); x.moveTo(0, p); x.lineTo(512, p); x.stroke(); }
      const t = new THREE.CanvasTexture(c); t.wrapS = t.wrapT = THREE.RepeatWrapping; return t;
    }
    if (kind === "hali") {
      x.fillStyle = "#b3a690"; x.fillRect(0, 0, 512, 512);
      for (let i = 0; i < 24000; i++) { x.fillStyle = `rgba(${118 + Math.random() * 40},${104 + Math.random() * 34},${80 + Math.random() * 28},.5)`; x.fillRect(Math.random() * 512, Math.random() * 512, 2, 2); }
      const t = new THREE.CanvasTexture(c); t.wrapS = t.wrapT = THREE.RepeatWrapping; return t;
    }
    x.fillStyle = "#9b978f"; x.fillRect(0, 0, 512, 512);
    x.strokeStyle = "rgba(60,60,60,.3)"; x.lineWidth = 4;
    for (let p = 0; p <= 512; p += 84) { x.beginPath(); x.moveTo(0, p); x.lineTo(512, p); x.stroke(); }
    const t = new THREE.CanvasTexture(c); t.wrapS = t.wrapT = THREE.RepeatWrapping; return t;
  }

  load(type) {
    this.root.clear(); this.type = type;
    const [W, H] = type.env; this.cx = W / 2; this.cz = H / 2;

    for (const r of type.rooms) {
      this.root.add(this._floorPoly(r.poly, this.floorMat[r.floor] || this.floorMat.parke));
      if (r.railing) this._railing(r.poly);
    }

    this._wallSegs = this._buildWallSegs(type); this._buildWalls();

    const glassG = [];
    for (const op of type.glass || []) {
      const seg = op.o === "h" ? [op.a, op.at, op.b, op.at] : [op.at, op.a, op.at, op.b];
      const g = this._segBox(seg, 1.7, 0.05); if (g) { g.translate(0, 1.0, 0); glassG.push(g); }
    }
    if (glassG.length) this.root.add(new THREE.Mesh(mergeGeometries(glassG), this.mat.glass));

    this.furnGroup = new THREE.Group();
    for (const f of type.furniture) { const grp = this._furn(f); if (grp) this.furnGroup.add(grp); }
    this.root.add(this.furnGroup);

    this.renderer.shadowMap.needsUpdate = true;   // yeni sahne -> gölgeyi bir kez hesapla
    this._dirty = true;
    this._frame(W, H);
  }

  _floorPoly(poly, fm) {
    const contour = poly.map(([x, y]) => new THREE.Vector2(x - this.cx, y - this.cz));
    const faces = THREE.ShapeUtils.triangulateShape(contour, []);
    const pos = [], uv = [], nor = [];
    contour.forEach((p) => { pos.push(p.x, 0.013, p.y); uv.push(p.x / fm.tile, p.y / fm.tile); nor.push(0, 1, 0); });
    const idx = []; faces.forEach((f) => idx.push(f[0], f[1], f[2]));
    const g = new THREE.BufferGeometry();
    g.setAttribute("position", new THREE.Float32BufferAttribute(pos, 3));
    g.setAttribute("uv", new THREE.Float32BufferAttribute(uv, 2));
    g.setAttribute("normal", new THREE.Float32BufferAttribute(nor, 3));
    g.setIndex(idx);
    const m = new THREE.Mesh(g, fm.mat); m.receiveShadow = true; return m;
  }

  _railing(poly) {
    const Hh = 1.1;
    const cx = this.type.env[0] / 2, cz = this.type.env[1] / 2;          // daire merkezi
    const interior = this.type.rooms.filter((r) => !r.railing);          // balkon olmayan odalar
    const inPoly = (x, y, pl) => { let o = false; for (let i = 0, j = pl.length - 1; i < pl.length; j = i++) { const xi = pl[i][0], yi = pl[i][1], xj = pl[j][0], yj = pl[j][1]; if ((yi > y) !== (yj > y) && x < ((xj - xi) * (y - yi)) / (yj - yi) + xi) o = !o; } return o; };
    for (let i = 0; i < poly.length; i++) {
      const a = poly[i], b = poly[(i + 1) % poly.length];
      // kenar orta noktasını daire merkezine doğru it; iç odaya düşüyorsa o kenar PAYLAŞILAN duvar -> korkuluk yok
      const mx = (a[0] + b[0]) / 2, my = (a[1] + b[1]) / 2;
      const dx = cx - mx, dy = cz - my, L = Math.hypot(dx, dy) || 1;
      const tx = mx + (dx / L) * 0.35, ty = my + (dy / L) * 0.35;
      if (interior.some((r) => inPoly(tx, ty, r.poly))) continue;        // iç (paylaşılan) kenar
      const seg = [a[0], a[1], b[0], b[1]];
      const gp = this._segBox(seg, Hh - 0.14, 0.02); if (gp) { gp.translate(0, (Hh - 0.14) / 2 + 0.06, 0); this.root.add(new THREE.Mesh(gp, this.mat.glass)); }
      const rail = this._segBox(seg, 0.06, 0.06); if (rail) { rail.translate(0, Hh, 0); this.root.add(new THREE.Mesh(rail, this.mat.railing)); }
      const base = this._segBox(seg, 0.05, 0.07); if (base) { base.translate(0, 0.04, 0); this.root.add(new THREE.Mesh(base, this.mat.railing)); }
    }
  }

  _buildWallSegs(type) {
    const H = {}, V = {}; const key = (n) => Math.round(n * 100) / 100;
    const addH = (y, a, b) => (H[key(y)] ||= []).push([Math.min(a, b), Math.max(a, b)]);
    const addV = (x, a, b) => (V[key(x)] ||= []).push([Math.min(a, b), Math.max(a, b)]);
    let xmin = Infinity, xmax = -Infinity, ymin = Infinity, ymax = -Infinity;
    for (const r of type.rooms) {
      if (r.railing) continue;   // balkonlara duvar örme (camlı korkuluk _railing ile gelir)
      const p = r.poly;
      for (let i = 0; i < p.length; i++) {
        const [x1, y1] = p[i], [x2, y2] = p[(i + 1) % p.length];
        if (Math.abs(y1 - y2) < 0.001) addH(y1, x1, x2);
        else if (Math.abs(x1 - x2) < 0.001) addV(x1, y1, y2);
        xmin = Math.min(xmin, x1); xmax = Math.max(xmax, x1); ymin = Math.min(ymin, y1); ymax = Math.max(ymax, y1);
      }
    }
    this._bounds = { xmin, xmax, ymin, ymax };
    const merge = (arr) => { arr.sort((a, b) => a[0] - b[0]); const o = []; for (const iv of arr) { const l = o[o.length - 1]; if (l && iv[0] <= l[1] + 0.001) l[1] = Math.max(l[1], iv[1]); else o.push([...iv]); } return o; };
    const sub = (ivs, a, b) => ivs.flatMap(([s, e]) => { if (b <= s + 0.001 || a >= e - 0.001) return [[s, e]]; const r = []; if (a > s) r.push([s, a]); if (b < e) r.push([b, e]); return r; });
    for (const k in H) H[k] = merge(H[k]); for (const k in V) V[k] = merge(V[k]);
    for (const op of [...(type.doors || []), ...(type.glass || [])]) { const tbl = op.o === "h" ? H : V; const k = key(op.at); if (tbl[k]) tbl[k] = sub(tbl[k], op.a, op.b); }
    const ext = (o, at) => o === "h" ? (Math.abs(at - ymin) < 0.05 || Math.abs(at - ymax) < 0.05) : (Math.abs(at - xmin) < 0.05 || Math.abs(at - xmax) < 0.05);
    const segs = [];
    for (const k in H) for (const [a, b] of H[k]) segs.push({ s: [a, +k, b, +k], ext: ext("h", +k) });
    for (const k in V) for (const [a, b] of V[k]) segs.push({ s: [+k, a, +k, b], ext: ext("v", +k) });
    return segs;
  }

  _buildWalls() {
    if (this.wallMesh) this.root.remove(this.wallMesh);
    const geos = [];
    for (const w of this._wallSegs) { const g = this._segBox(w.s, this._wallH, w.ext ? WT_EXT : WT_INT); if (g) { g.translate(0, this._wallH / 2, 0); geos.push(g); } }
    this.wallMesh = geos.length ? new THREE.Mesh(mergeGeometries(geos), this.mat.wall) : null;
    if (this.wallMesh) { this.wallMesh.castShadow = true; this.wallMesh.receiveShadow = true; this.root.add(this.wallMesh); }
  }

  _segBox([x1, z1, x2, z2], h, t) {
    const X1 = x1 - this.cx, Z1 = z1 - this.cz, X2 = x2 - this.cx, Z2 = z2 - this.cz;
    const dx = X2 - X1, dz = Z2 - Z1, len = Math.hypot(dx, dz); if (len < 0.02) return null;
    const g = new THREE.BoxGeometry(len + t, h, t);
    const m = new THREE.Matrix4().makeRotationY(-Math.atan2(dz, dx)); m.setPosition((X1 + X2) / 2, 0, (Z1 + Z2) / 2);
    g.applyMatrix4(m); return g;
  }

  // ---- mobilya ----
  _furn(f) {
    const [x, y, w, d] = f.rect;
    const cx = x + w / 2 - this.cx, cz = y + d / 2 - this.cz;
    const g = new THREE.Group(); g.position.set(cx, 0, cz);
    const M = this.mat;
    const RB = (bw, bh, bd, mat, px, py, pz) => {
      const rad = Math.min(0.05, bw / 2.2, bh / 2.2, bd / 2.2);
      const m = new THREE.Mesh(new RoundedBoxGeometry(Math.max(bw, 0.02), Math.max(bh, 0.02), Math.max(bd, 0.02), 2, Math.max(rad, 0.005)), mat);
      m.position.set(px, py, pz); m.castShadow = true; m.receiveShadow = true; g.add(m); return m;
    };
    const cyl = (r1, r2, hh, mat, px, py, pz) => { const m = new THREE.Mesh(new THREE.CylinderGeometry(r1, r2, hh, 18), mat); m.position.set(px, py, pz); m.castShadow = true; g.add(m); return m; };

    switch (f.t) {
      case "bed": {
        RB(w, 0.18, d, M.wood, 0, 0.12, 0);                         // karyola
        RB(w - 0.1, 0.22, d - 0.1, M.bed, 0, 0.32, 0.04);           // şilte
        RB(w + 0.08, 0.62, 0.12, M.woodL, 0, 0.43, -d / 2 + 0.02);  // başlık
        RB(w * 0.42, 0.14, d * 0.26, M.pillow, -w * 0.2, 0.45, -d / 2 + 0.34);
        RB(w * 0.42, 0.14, d * 0.26, M.pillow, w * 0.2, 0.45, -d / 2 + 0.34);
        RB(w - 0.06, 0.1, d * 0.62, M.duvet, 0, 0.46, d * 0.12);     // yorgan
        break;
      }
      case "nightstand": {
        RB(w, 0.42, d, M.woodL, 0, 0.21, 0);
        if (f.lamp) { cyl(0.04, 0.05, 0.26, M.lampBase, 0, 0.55, 0); cyl(0.11, 0.08, 0.16, M.shade, 0, 0.74, 0); const pl = new THREE.PointLight(0xffd39a, 6, 3.2, 2); pl.position.set(0, 0.78, 0); g.add(pl); }
        break;
      }
      case "wardrobe": {
        RB(w, 2.32, d, M.wardrobe, 0, 1.16, 0);                                       // modern mat gövde
        if (w > d) {                                                                  // GENİŞ gömme dolap: kapaklar ön (-z) yüzde, x boyunca
          const n = Math.max(2, Math.round(w / 0.6));
          for (let i = 1; i < n; i++) RB(0.02, 2.22, 0.03, M.woodD, -w / 2 + w * i / n, 1.16, -d / 2 - 0.004);                 // kapı oluğu
          for (let i = 0; i < n; i++) RB(0.05, 0.95, 0.02, M.black, -w / 2 + w * (i + 0.5) / n, 1.16, -d / 2 - 0.012);          // dikey kulp (kapı başına)
        } else {                                                                      // normal derin dolap: kapaklar +x yüzde
          const n = Math.max(2, Math.round(d / 0.6));
          for (let i = 1; i < n; i++) RB(0.03, 2.22, 0.018, M.woodD, w / 2 + 0.004, 1.16, -d / 2 + d * i / n);
          for (let i = 0; i < n; i++) RB(0.018, 0.95, 0.05, M.black, w / 2 + 0.012, 1.16, -d / 2 + d * (i + 0.5) / n + d / n * 0.32);
        }
        break;
      }
      case "sofaL": {
        const sx = f.face === "topleft" ? -1 : 1;                            // kısa kol solda mı sağda mı
        RB(w, 0.3, d * 0.55, M.fabric, 0, 0.17, -d * 0.225);                 // uzun oturma (üst)
        RB(w, 0.4, 0.16, M.fabric, 0, 0.4, -d / 2 + 0.08);                   // üst arkalık
        RB(w * 0.36, 0.3, d, M.fabric, sx * (w / 2 - w * 0.18), 0.17, 0);    // kısa oturma (yan)
        RB(0.16, 0.4, d, M.fabric, sx * (w / 2 - 0.08), 0.4, 0);             // yan arkalık
        RB(0.14, 0.34, d * 0.5, M.fabricD, -sx * (w / 2 - 0.07), 0.34, -d * 0.22); // kolçak
        RB(w * 0.8, 0.12, d * 0.4, M.fabricD, 0, 0.3, -d * 0.2);             // minder
        RB(w * 0.26, 0.16, d * 0.26, M.pillow, -sx * w * 0.28, 0.34, -d * 0.18);
        break;
      }
      case "armchair": { RB(w, 0.3, d, M.fabric, 0, 0.17, 0); RB(w, 0.4, 0.14, M.fabric, 0, 0.4, -d / 2 + 0.07); RB(0.12, 0.34, d, M.fabric, -w / 2 + 0.06, 0.36, 0); RB(0.12, 0.34, d, M.fabric, w / 2 - 0.06, 0.36, 0); RB(w * 0.8, 0.12, d * 0.7, M.fabricD, 0, 0.3, 0.02); break; }
      case "sofa": {  // 2 kişilik — tekli koltuk tasarımıyla aynı (kolçak + 2 minder); arkalık -z
        RB(w, 0.3, d, M.fabric, 0, 0.17, 0);
        RB(w, 0.42, 0.16, M.fabric, 0, 0.4, -d / 2 + 0.08);            // arkalık
        RB(0.13, 0.36, d, M.fabric, -w / 2 + 0.07, 0.37, 0);          // sol kol
        RB(0.13, 0.36, d, M.fabric, w / 2 - 0.07, 0.37, 0);           // sağ kol
        RB(w * 0.4, 0.13, d * 0.72, M.fabricD, -w * 0.21, 0.3, 0.03); // minder 1
        RB(w * 0.4, 0.13, d * 0.72, M.fabricD, w * 0.21, 0.3, 0.03);  // minder 2
        break;
      }
      case "pouf": cyl(w / 2, w / 2, 0.34, M.fabricD, 0, 0.17, 0); break;
      case "stool": { cyl(w / 2 * 0.8, w / 2 * 0.7, 0.12, M.wood, 0, 0.62, 0); cyl(0.03, 0.03, 0.6, M.metal, 0, 0.3, 0); break; }
      case "table": {
        RB(w, 0.05, d, M.woodL, 0, 0.74, 0);
        [[-w / 2 + 0.06, -d / 2 + 0.06], [w / 2 - 0.06, -d / 2 + 0.06], [-w / 2 + 0.06, d / 2 - 0.06], [w / 2 - 0.06, d / 2 - 0.06]].forEach(([lx, lz]) => RB(0.05, 0.72, 0.05, M.woodD, lx, 0.37, lz));
        break;
      }
      case "console": {  // TV ünitesi: TV ortada üstte; uzun eksene göre doğru yöne bakar
        const tv = f.tv || 0.9;
        RB(w, 0.4, d, M.woodD, 0, 0.2, 0);
        if (w >= d) { RB(tv, tv * 0.58, 0.05, M.screen, 0, 0.4 + tv * 0.32, 0); RB(tv * 0.45, 0.05, 0.1, M.black, 0, 0.42, 0); }   // uzun x -> ekran ±z
        else { RB(0.05, tv * 0.58, tv, M.screen, 0, 0.4 + tv * 0.32, 0); RB(0.1, 0.05, tv * 0.45, M.black, 0, 0.42, 0); }            // uzun z -> ekran ±x
        break;
      }
      case "counter": { RB(w, 0.86, d, M.woodD, 0, 0.43, 0); RB(w + 0.04, 0.06, d + 0.04, M.marble, 0, 0.9, 0); break; }
      case "stove": { RB(w, 0.04, d, M.black, 0, 0.93, 0); const o = [[-.13, -.1], [.13, -.1], [-.13, .1], [.13, .1]]; o.forEach(([ox, oz]) => cyl(0.07, 0.07, 0.01, M.metal, ox, 0.96, oz)); break; }
      case "sink": { RB(w, 0.05, d, M.metal, 0, 0.91, 0); RB(w * 0.6, 0.02, d * 0.6, M.black, 0, 0.9, 0); cyl(0.015, 0.015, 0.22, M.metal, 0, 1.0, -d * 0.3); break; }
      case "fridge": { RB(w, 1.85, d, M.white, 0, 0.93, 0); RB(0.04, 0.5, 0.03, M.metal, w / 2 - 0.08, 1.2, d / 2); RB(w, 0.02, d, M.metal, 0, 1.0, 0); break; }
      case "wc": { RB(w, 0.4, d * 0.72, M.white, 0, 0.2, d * 0.1); RB(w * 0.82, 0.5, d * 0.24, M.white, 0, 0.45, -d / 2 + 0.12); break; }
      case "basin": { RB(w, 0.16, d, M.marble, 0, 0.84, 0); const b = new THREE.Mesh(new THREE.CylinderGeometry(d * 0.32, d * 0.22, 0.12, 18), M.white); b.position.set(0, 0.86, 0); g.add(b); cyl(0.012, 0.012, 0.18, M.metal, 0, 0.98, -d * 0.28); break; }
      case "shower": { const tray = RB(w, 0.06, d, M.white, 0, 0.03, 0); const gp1 = new THREE.Mesh(new THREE.BoxGeometry(0.03, 1.9, d), M.glass); gp1.position.set(w / 2, 0.95, 0); g.add(gp1); const gp2 = new THREE.Mesh(new THREE.BoxGeometry(w, 1.9, 0.03), M.glass); gp2.position.set(0, 0.95, d / 2); g.add(gp2); cyl(0.04, 0.04, 0.04, M.metal, -w / 2 + 0.12, 1.8, -d / 2 + 0.12); break; }
      case "chair": {
        RB(w, 0.05, d, M.woodL, 0, 0.45, 0);
        RB(w, 0.42, 0.05, M.woodL, 0, 0.66, -d / 2 + 0.03);
        [[-w / 2 + 0.04, -d / 2 + 0.04], [w / 2 - 0.04, -d / 2 + 0.04], [-w / 2 + 0.04, d / 2 - 0.04], [w / 2 - 0.04, d / 2 - 0.04]].forEach(([lx, lz]) => RB(0.04, 0.45, 0.04, M.woodD, lx, 0.22, lz));
        break;
      }
      case "desk": {
        RB(w, 0.04, d, M.woodL, 0, 0.75, 0);
        [[-w / 2 + 0.05, -d / 2 + 0.05], [w / 2 - 0.05, -d / 2 + 0.05], [-w / 2 + 0.05, d / 2 - 0.05], [w / 2 - 0.05, d / 2 - 0.05]].forEach(([lx, lz]) => RB(0.05, 0.74, 0.05, M.woodD, lx, 0.37, lz));
        break;
      }
      case "vanity": {
        RB(w, 0.04, d, M.woodL, 0, 0.75, 0);
        RB(w, 0.46, d * 0.55, M.woodL, 0, 0.23, d * 0.18);             // çekmece
        RB(w * 0.78, 0.72, 0.03, M.mirror, 0, 1.28, -d / 2 + 0.04);    // ayna
        RB(w * 0.84, 0.78, 0.02, M.woodD, 0, 1.28, -d / 2 + 0.025);    // ayna çerçevesi
        break;
      }
      case "mirror": { RB(w, 1.0, 0.04, M.mirror, 0, 1.35, 0); RB(w + 0.05, 1.05, 0.02, M.woodD, 0, 1.35, -0.01); break; }
      case "pendant": { const top = f.h || 1.95; cyl(0.005, 0.005, top - 1.45, M.lampBase, 0, (top + 1.45) / 2, 0); cyl(0.14, 0.1, 0.18, M.shade, 0, 1.4, 0); const pl = new THREE.PointLight(0xffe0b0, 14, 5, 2); pl.position.set(0, 1.35, 0); g.add(pl); break; }
      case "plant": { cyl(w * 0.32, w * 0.26, 0.32, M.pot, 0, 0.16, 0); const s = new THREE.Mesh(new THREE.IcosahedronGeometry(Math.max(w, d) * 0.42, 1), M.plant); s.position.y = 0.62; s.scale.y = 1.35; s.castShadow = true; g.add(s); break; }
      case "rug": { const m = new THREE.Mesh(new THREE.PlaneGeometry(w, d), new THREE.MeshStandardMaterial({ color: f.color || "#9aa7b4", roughness: 1 })); m.rotation.x = -Math.PI / 2; m.position.y = 0.02; m.receiveShadow = true; g.add(m); break; }
      default: return null;
    }
    if (f.face && ["chair", "basin", "wc", "table", "stool", "armchair", "console", "wardrobe", "bed", "sofa", "desk", "vanity", "mirror"].includes(f.t)) {
      const rot = { north: 0, top: 0, south: Math.PI, bottom: Math.PI, east: Math.PI / 2, west: -Math.PI / 2, back: Math.PI }[f.face] || 0;
      g.rotation.y = rot;
    }
    return g;
  }

  _frame(W, H) {
    const r = Math.max(W, H);
    this.controls.target.set(0, 0.2, 0);
    this.camera.position.set(r * 0.62, r * 1.18, r * 0.88); // daha yukarı/geri -> tüm daire çerçevede, duvarların üstünden
    this.camera.updateProjectionMatrix(); this.controls.update();
  }

  zoom(factor) {
    const t = this.controls.target;
    const dir = new THREE.Vector3().subVectors(this.camera.position, t);
    let dist = dir.length() * factor;
    dist = Math.max(this.controls.minDistance, Math.min(this.controls.maxDistance, dist));
    dir.setLength(dist);
    this.camera.position.copy(t).add(dir);
    this.controls.update();
  }
  zoomIn() { this.zoom(0.82); }
  zoomOut() { this.zoom(1.22); }

  setFurniture(on) { if (this.furnGroup) this.furnGroup.visible = on; this.renderer.shadowMap.needsUpdate = true; this._dirty = true; }
  setWallHeight(full) { this._wallH = full ? WALL_FULL : WALL_HALF; this._buildWalls(); this.renderer.shadowMap.needsUpdate = true; this._dirty = true; }
  resize() { this._onResize(); }
  _onResize() { const w = this.container.clientWidth, h = this.container.clientHeight; if (!w || !h) return; this.camera.aspect = w / h; this.camera.updateProjectionMatrix(); this.renderer.setSize(w, h); this._dirty = true; }
  _animate() {
    this._raf = requestAnimationFrame(this._animate);
    this.controls.update();                 // damping; hareket varsa 'change' -> _dirty
    if (this._dirty) { this.renderer.render(this.scene, this.camera); this._dirty = false; }
  }

  dispose() {
    if (this._raf) cancelAnimationFrame(this._raf);
    window.removeEventListener("resize", this._onResize);
    if (this._ro) this._ro.disconnect();
    try { this.controls.dispose(); } catch (e) {}
    this.scene.traverse((o) => {
      if (o.geometry) o.geometry.dispose();
      if (o.material) (Array.isArray(o.material) ? o.material : [o.material]).forEach((m) => { for (const k in m) { if (m[k] && m[k].isTexture) m[k].dispose(); } m.dispose(); });
    });
    this.renderer.dispose();
    const el = this.renderer.domElement;
    if (el && el.parentNode) el.parentNode.removeChild(el);
  }
}
