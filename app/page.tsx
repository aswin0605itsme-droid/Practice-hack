"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";

// 6 Core Features
const FEATURES = [
  {
    id: "edge-compute",
    title: "Sub-Millisecond Edge Runtime",
    description:
      "Execute compute workloads on a worldwide mesh spanning 300+ edge nodes. Zero cold starts, localized memory snapshotting, and predictive request dispatching.",
    badge: "0ms Cold Starts",
    icon: (
      <svg
        className="w-5 h-5 text-indigo-400"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth="1.75"
        stroke="currentColor"
        aria-hidden="true"
        focusable="false"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="m3.75 13.5 10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75Z"
        />
      </svg>
    ),
  },
  {
    id: "observability",
    title: "Real-Time Distributed Telemetry",
    description:
      "Inspect high-cardinality distributed traces, structured log events, and APM waterfall charts in real time without sampling or external monitoring agents.",
    badge: "100% Fidelity",
    icon: (
      <svg
        className="w-5 h-5 text-cyan-400"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth="1.75"
        stroke="currentColor"
        aria-hidden="true"
        focusable="false"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 0 1 3 19.875v-6.75ZM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V8.625ZM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V4.125Z"
        />
      </svg>
    ),
  },
  {
    id: "replication",
    title: "Active-Active Global Mesh",
    description:
      "Automated continuous state replication across multi-cloud regions. Built-in conflict-free replicated data types ensure immediate global consistency without lag.",
    badge: "32 POP Zones",
    icon: (
      <svg
        className="w-5 h-5 text-violet-400"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth="1.75"
        stroke="currentColor"
        aria-hidden="true"
        focusable="false"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M12 21a9.004 9.004 0 0 0 8.716-6.747M12 21a9.004 9.004 0 0 1-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 0 1 7.843 4.582M12 3a8.997 8.997 0 0 0-7.843 4.582m15.686 0A11.953 11.953 0 0 1 12 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0 1 21 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0 1 12 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 0 1 3 12c0-.778.099-1.533.284-2.253"
        />
      </svg>
    ),
  },
  {
    id: "security",
    title: "Zero-Trust MicroVM Isolation",
    description:
      "Every execution runs within a hardened, ephemeral MicroVM sandbox. End-to-end mTLS encryption, automated secret rotation, and SOC-2 Type II audit readiness.",
    badge: "Hardware Enclave",
    icon: (
      <svg
        className="w-5 h-5 text-emerald-400"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth="1.75"
        stroke="currentColor"
        aria-hidden="true"
        focusable="false"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M9 12.75 11.25 15 15 9.75m-3-7.036A11.959 11.959 0 0 1 3.598 6 11.99 11.99 0 0 0 3 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285Z"
        />
      </svg>
    ),
  },
  {
    id: "caching",
    title: "Intelligent Adaptive Caching",
    description:
      "Predictive machine learning algorithms proactively pre-warm edge caches ahead of high-traffic spikes, cutting primary database origin load by up to 88%.",
    badge: "88% Origin Relief",
    icon: (
      <svg
        className="w-5 h-5 text-amber-400"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth="1.75"
        stroke="currentColor"
        aria-hidden="true"
        focusable="false"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M20.25 6.375c0 2.278-3.694 4.125-8.25 4.125S3.75 8.653 3.75 6.375m16.5 0c0-2.278-3.694-4.125-8.25-4.125S3.75 4.097 3.75 6.375m16.5 0v11.25c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125V6.375m16.5 5.625c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125m16.5 5.625c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125"
        />
      </svg>
    ),
  },
  {
    id: "cicd",
    title: "Instant Branch Previews & Rollbacks",
    description:
      "Connect GitHub to spawn fully functional production preview environments for every pull request in under three seconds with single-click zero-downtime rollbacks.",
    badge: "< 3s Deployment",
    icon: (
      <svg
        className="w-5 h-5 text-pink-400"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth="1.75"
        stroke="currentColor"
        aria-hidden="true"
        focusable="false"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M15.59 14.37a6 6 0 0 1-5.84 7.38v-4.8m5.84-2.58a14.98 14.98 0 0 0 6.16-12.12A14.98 14.98 0 0 0 9.631 8.41m5.96 5.96a14.926 14.926 0 0 1-5.841 2.58m-.119-8.54a6 6 0 0 0-7.381 5.84h4.8m2.581-5.84a14.927 14.927 0 0 0-2.58 5.84m2.699 2.7c-.103.021-.207.041-.311.06a15.09 15.09 0 0 1-2.448-2.448 14.9 14.9 0 0 1 .06-.312m0 0L2.25 12l2.25-2.25m0 0 2.25 2.25"
        />
      </svg>
    ),
  },
];

// Python IDE Presets
const PYTHON_PRESETS: Record<
  string,
  { name: string; title: string; defaultCode: string }
> = {
  "cluster_benchmark.py": {
    name: "cluster_benchmark.py",
    title: "cluster_benchmark.py",
    defaultCode: `# cluster_benchmark.py
# HyperScale Python Edge Runtime Simulation
import math

def benchmark_edge_nodes(cluster_name="global-edge-prod", node_count=5):
    print("🚀 Initializing HyperScale Python Edge Runtime v2.0...")
    print(f"📡 Connecting to cluster '{cluster_name}' across 32 POP zones...")
    
    regions = ["iad-us-east", "fra-eu-central", "tyo-ap-northeast", "sin-ap-southeast", "lhr-eu-west"]
    latencies = []
    
    for i in range(node_count):
        region = regions[i % len(regions)]
        ping = round(8.4 + (i * 1.35), 2)
        latencies.append(ping)
        print(f"  [Node {i+1}] {region} Ping: {ping}ms | mTLS: OK")
        
    p99 = max(latencies)
    avg = round(sum(latencies) / len(latencies), 2)
    
    print("\\n📊 --- GLOBAL CLUSTER BENCHMARK ---")
    print(f"⚡ Average Latency : {avg} ms")
    print(f"⚡ p99 Latency     : {p99} ms")
    print(f"🎯 Cache Hit Ratio : 99.18%")
    print(f"🛡️ Zero-Trust Vault : VERIFIED (MicroVM Isolation Active)")
    return {"status": "HEALTHY", "p99_ms": p99}

result = benchmark_edge_nodes()
print(f"\\nFinal State: {result['status']}")`,
  },
  "neural_cache.py": {
    name: "neural_cache.py",
    title: "neural_cache.py",
    defaultCode: `# neural_cache.py
# Simulates AI-assisted edge cache surge relief

def calculate_cache_relief(requests_per_sec=80000, hit_ratio=0.885):
    print("🧠 HyperScale Adaptive AI Caching Engine")
    print(f"📥 Traffic Surge Influx : {requests_per_sec} req/sec")
    
    cache_hits = int(requests_per_sec * hit_ratio)
    origin_load = requests_per_sec - cache_hits
    relief_pct = round(hit_ratio * 100, 1)
    
    print(f"⚡ Edge Cached Hits     : {cache_hits} req/s")
    print(f"🛡️ Shielded Origin Load : {origin_load} req/s")
    print(f"📉 Primary Load Reduced  : -{relief_pct}%")
    print("✨ Predictive Pre-warming Active for next traffic window.")
    return relief_pct

calculate_cache_relief()`,
  },
  "latency_audit.py": {
    name: "latency_audit.py",
    title: "latency_audit.py",
    defaultCode: `# latency_audit.py
# Real-time multi-region roundtrip latency audit

def audit_global_pops():
    print("🌐 Initiating Global Edge POP Ping Latency Audit...")
    
    pops = [
        ("Frankfurt (fra-1)", 8.4),
        ("San Francisco (sfo-3)", 10.2),
        ("Tokyo (tyo-1)", 12.1),
        ("London (lhr-2)", 9.1),
        ("Singapore (sin-1)", 14.5),
        ("São Paulo (gru-1)", 18.2)
    ]
    
    for city, latency in pops:
        bar = "█" * int(latency / 2)
        print(f"  {city} : {latency}ms {bar}")
        
    print("\\n✅ All 32 regions verified under 20ms p99 SLA budget.")

audit_global_pops()`,
  },
};

// Client-side Python execution engine
function executePythonLocally(sourceCode: string): { output: string[]; timeMs: number; error: string | null } {
  const startTime = performance.now();
  const output: string[] = [];

  try {
    const customPrint = (...args: unknown[]) => {
      output.push(args.map((a) => (typeof a === "object" && a !== null ? JSON.stringify(a) : String(a))).join(" "));
    };

    // Protect escaped newlines in string literals so they don't break line-by-line parsing
    let jsCode = sourceCode.replace(/\\n/g, "__ESCAPED_NEWLINE__");

    // Remove imports
    jsCode = jsCode.replace(/^\s*import\s+\w+.*$/gm, "");
    jsCode = jsCode.replace(/^\s*from\s+\w+\s+import\s+.*$/gm, "");

    // Math functions
    jsCode = jsCode.replace(/\bmath\.sin\b/g, "Math.sin");
    jsCode = jsCode.replace(/\bmath\.cos\b/g, "Math.cos");
    jsCode = jsCode.replace(/\bmath\.sqrt\b/g, "Math.sqrt");
    jsCode = jsCode.replace(/\bmath\.floor\b/g, "Math.floor");
    jsCode = jsCode.replace(/\bmath\.ceil\b/g, "Math.ceil");
    jsCode = jsCode.replace(/\bmath\.pi\b/g, "Math.PI");

    // Standard Python functions
    jsCode = jsCode.replace(/\bint\(([^)]+)\)/g, "Math.floor($1)");
    jsCode = jsCode.replace(/\bfloat\(([^)]+)\)/g, "Number($1)");
    jsCode = jsCode.replace(/\bround\(([^,\)]+),\s*(\d+)\)/g, "Number(($1).toFixed($2))");
    jsCode = jsCode.replace(/\bround\(([^,\)]+)\)/g, "Math.round($1)");
    jsCode = jsCode.replace(/\bsum\(([^)]+)\)/g, "($1).reduce((a: number, b: number) => a + b, 0)");
    jsCode = jsCode.replace(/\blen\(([^)]+)\)/g, "($1).length");
    jsCode = jsCode.replace(/\bmax\(([^)]+)\)/g, "Math.max(...$1)");
    jsCode = jsCode.replace(/\bmin\(([^)]+)\)/g, "Math.min(...$1)");
    jsCode = jsCode.replace(/\.append\(/g, ".push(");

    // Booleans and nulls
    jsCode = jsCode.replace(/\bTrue\b/g, "true");
    jsCode = jsCode.replace(/\bFalse\b/g, "false");
    jsCode = jsCode.replace(/\bNone\b/g, "null");

    // Logical operators
    jsCode = jsCode.replace(/\band\b/g, "&&");
    jsCode = jsCode.replace(/\bor\b/g, "||");
    jsCode = jsCode.replace(/\bnot\s+/g, "!");

    // Helper for Python range()
    const range = (startOrEnd: number, maybeEnd?: number, step = 1) => {
      const start = maybeEnd === undefined ? 0 : startOrEnd;
      const end = maybeEnd === undefined ? startOrEnd : maybeEnd;
      const arr: number[] = [];
      for (let i = start; step > 0 ? i < end : i > end; i += step) {
        arr.push(i);
      }
      return arr;
    };

    const enumerate = (iter: unknown[]) => iter.map((val, idx) => [idx, val]);

    // Parse lines and indentation into JS braces
    const rawLines = jsCode.split("\n");
    const formattedLines: string[] = [];
    const indentStack: number[] = [0];
    let inMultilineCollection = false;

    for (const rawLine of rawLines) {
      if (!rawLine.trim() || rawLine.trim().startsWith("#")) {
        continue;
      }

      const indent = rawLine.search(/\S/);

      if (!inMultilineCollection) {
        while (indentStack.length > 1 && indent < indentStack[indentStack.length - 1]) {
          indentStack.pop();
          formattedLines.push("}".padStart(indentStack[indentStack.length - 1] + 1, " "));
        }
      }

      let line = rawLine.trim();

      // String multiplication e.g. "█" * 5
      line = line.replace(/"([^"]+)"\s*\*\s*([^,\)\n;]+)/g, '"$1".repeat($2)');
      line = line.replace(/'([^']+)'\s*\*\s*([^,\)\n;]+)/g, "'$1'.repeat($2)");

      // Format specifiers in f-strings: {var:<22} or {var:,}
      line = line.replace(/\{([^}:]+):,\}/g, "${Number($1).toLocaleString()}");
      line = line.replace(/\{([^}:]+):[<>^]?\d+\}/g, "${$1}");

      // f-strings
      line = line.replace(/f"([^"]*)"/g, (_, p1) => "`" + p1.replace(/\{([^}]+)\}/g, "${$1}") + "`");
      line = line.replace(/f'([^']*)'/g, (_, p1) => "`" + p1.replace(/\{([^}]+)\}/g, "${$1}") + "`");

      // Restore escaped newlines in string literals
      line = line.replace(/__ESCAPED_NEWLINE__/g, "\\n");

      // Function definition
      if (line.startsWith("def ") && line.endsWith(":")) {
        const header = line.slice(4, -1);
        formattedLines.push(`${" ".repeat(indent)}function ${header} {`);
        indentStack.push(indent + 4);
        continue;
      }

      // For loops (including tuple unpacking)
      if (line.startsWith("for ") && line.endsWith(":")) {
        const content = line.slice(4, -1);
        const [varName, iterable] = content.split(/\s+in\s+/);
        if (varName.includes(",")) {
          formattedLines.push(`${" ".repeat(indent)}for (const [${varName.trim()}] of ${iterable.trim()}) {`);
        } else {
          formattedLines.push(`${" ".repeat(indent)}for (const ${varName.trim()} of ${iterable.trim()}) {`);
        }
        indentStack.push(indent + 4);
        continue;
      }

      // If / elif / else
      if (line.startsWith("if ") && line.endsWith(":")) {
        formattedLines.push(`${" ".repeat(indent)}if (${line.slice(3, -1)}) {`);
        indentStack.push(indent + 4);
        continue;
      }
      if (line.startsWith("elif ") && line.endsWith(":")) {
        formattedLines.push(`${" ".repeat(indent)}} else if (${line.slice(5, -1)}) {`);
        continue;
      }
      if (line === "else:") {
        formattedLines.push(`${" ".repeat(indent)}} else {`);
        continue;
      }

      // Handle multiline array / list
      const openBrackets = (line.match(/[\[\{]/g) || []).length;
      const closeBrackets = (line.match(/[\]\}]/g) || []).length;
      if (openBrackets > closeBrackets) {
        inMultilineCollection = true;
      } else if (closeBrackets > openBrackets) {
        inMultilineCollection = false;
      }

      // Convert tuples like ("Frankfurt (fra-1)", 8.4) into ["Frankfurt (fra-1)", 8.4] inside lists
      if (inMultilineCollection || (line.startsWith("(") && line.endsWith("),"))) {
        line = line.replace(/^\((.+)\)(,?)$/, "[$1]$2");
      }

      // Variable assignment
      if (
        !line.startsWith("return ") &&
        !line.startsWith("print(") &&
        line.includes("=") &&
        !line.includes("==") &&
        !line.includes("+=") &&
        !line.includes("-=") &&
        !inMultilineCollection
      ) {
        const first = line.split("=")[0].trim();
        if (/^[a-zA-Z_][a-zA-Z0-9_]*$/.test(first)) {
          formattedLines.push(`${" ".repeat(indent)}let ${line};`);
          continue;
        }
      }

      const needsSemicolon = !inMultilineCollection && !line.endsWith("{") && !line.endsWith(";") && !line.endsWith(",");
      formattedLines.push(`${" ".repeat(indent)}${line}${needsSemicolon ? ";" : ""}`);
    }

    while (indentStack.length > 1) {
      indentStack.pop();
      formattedLines.push("}");
    }

    const executableJS = formattedLines.join("\n");
    const runFunction = new Function("print", "range", "enumerate", "Math", executableJS);
    runFunction(customPrint, range, enumerate, Math);

    const endTime = performance.now();
    return {
      output,
      timeMs: Math.max(1, Math.round(endTime - startTime)),
      error: null,
    };
  } catch (err: unknown) {
    const endTime = performance.now();
    return {
      output,
      timeMs: Math.max(1, Math.round(endTime - startTime)),
      error: err instanceof Error ? err.message : String(err),
    };
  }
}

// Reusable Spotlight Container for Every Box (Tighter, smaller glow + scale)
interface SpotlightBoxProps {
  children: React.ReactNode;
  className?: string;
  glowRadius?: number;
  rounded?: string;
  innerBg?: string;
  hoverScale?: string;
}

function SpotlightBox({
  children,
  className = "",
  glowRadius = 150,
  rounded = "rounded-2xl",
  innerBg = "bg-zinc-950",
  hoverScale = "hover:scale-[1.03] hover:-translate-y-1.5",
}: SpotlightBoxProps) {
  const boxRef = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState({ x: -1000, y: -1000 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!boxRef.current) return;
    const rect = boxRef.current.getBoundingClientRect();
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  const innerRounded =
    rounded === "rounded-3xl"
      ? "rounded-[22.5px]"
      : rounded === "rounded-xl"
      ? "rounded-[10.5px]"
      : "rounded-[14.5px]";

  return (
    <div
      ref={boxRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`group relative p-[1.5px] transition-all duration-300 ease-out focus-within:ring-2 focus-within:ring-indigo-400 focus-within:ring-offset-2 focus-within:ring-offset-zinc-950 ${rounded} ${hoverScale} ${className}`}
    >
      {/* 1. Outside Glowing Halo (Compact, tighter radius so only outside border lights up) */}
      <div
        className={`pointer-events-none absolute -inset-[2px] ${rounded} blur-[4px] transition-opacity duration-300`}
        style={{
          opacity: isHovered ? 0.75 : 0,
          background: `radial-gradient(${glowRadius}px circle at ${mousePos.x}px ${mousePos.y}px, rgba(99, 102, 241, 0.9), rgba(168, 85, 247, 0.6) 40%, transparent 75%)`,
        }}
        aria-hidden="true"
      />

      {/* 2. Perimeter 1.5px Border Track illuminated precisely around the mouse pointer */}
      <div
        className={`pointer-events-none absolute inset-0 ${rounded} bg-zinc-800/80 transition-colors duration-300 overflow-hidden`}
        aria-hidden="true"
      >
        <div
          className="absolute inset-0 transition-opacity duration-150"
          style={{
            opacity: isHovered ? 1 : 0,
            background: `radial-gradient(${glowRadius}px circle at ${mousePos.x}px ${mousePos.y}px, #818cf8 0%, #a855f7 35%, #38bdf8 65%, transparent 75%)`,
          }}
        />
      </div>

      {/* 3. Solid Dark Inside: Opaque dark interior prevents light from entering the card */}
      <div className={`relative z-10 w-full h-full ${innerBg} ${innerRounded}`}>
        {children}
      </div>
    </div>
  );
}

// Spotlight Feature Card
function SpotlightFeatureCard({
  feature,
}: {
  feature: (typeof FEATURES)[number];
}) {
  return (
    <SpotlightBox
      rounded="rounded-2xl"
      glowRadius={150}
      hoverScale="hover:scale-[1.03] hover:-translate-y-1.5"
    >
      <article className="w-full h-full p-7 sm:p-8 flex flex-col justify-between">
        <div>
          {/* Header with Icon Pill Container & Badge */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br from-indigo-950/80 via-zinc-900/90 to-zinc-950 border border-indigo-500/30 shadow-[0_0_15px_rgba(99,102,241,0.15)] group-hover:border-indigo-400/60 group-hover:scale-105 transition-all">
              {feature.icon}
            </div>
            <span className="text-xs font-mono font-medium text-zinc-400 bg-zinc-900 px-3 py-1 rounded-full border border-zinc-800 shadow-inner">
              {feature.badge}
            </span>
          </div>

          {/* Feature Title (H3) */}
          <h3 className="text-xl font-bold text-zinc-100 group-hover:text-white transition-colors">
            {feature.title}
          </h3>

          {/* High-Contrast Description */}
          <p className="mt-3 text-sm sm:text-base text-zinc-400 leading-relaxed">
            {feature.description}
          </p>
        </div>

        {/* Feature Action Link */}
        <div className="mt-6 pt-4 border-t border-zinc-900">
          <a
            href="#cta"
            aria-label={`Explore documentation for ${feature.title}`}
            className="inline-flex items-center text-sm font-semibold text-indigo-400 hover:text-indigo-300 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400 rounded-md"
          >
            Documentation &amp; SDKs
            <svg
              className="w-4 h-4 ml-1.5 group-hover:translate-x-1 transition-transform"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
              focusable="false"
            >
              <path d="M5 12h14" />
              <path d="m12 5 7 7-7 7" />
            </svg>
          </a>
        </div>
      </article>
    </SpotlightBox>
  );
}

// Video Game Gun Aim Reticle & Hotbar HUD Custom Cursor
function GameAimCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);
  const [aimState, setAimState] = useState<"interactive" | "unselectable" | "outside">("outside");
  const [isClicking, setIsClicking] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Only mount on devices with fine pointer (mouse)
    if (typeof window === "undefined" || !window.matchMedia("(pointer: fine)").matches) {
      return;
    }

    let mouseX = -100;
    let mouseY = -100;
    let currentX = -100;
    let currentY = -100;
    let rafId: number;

    const classifyTarget = (target: HTMLElement | null): "interactive" | "unselectable" | "outside" => {
      if (!target) return "outside";

      // 1. Outside content area (ambient body canvas, main wrapper, or full-width section backdrop)
      if (
        target === document.body ||
        target === document.documentElement ||
        target.id === "main-content" ||
        target.tagName === "SECTION" ||
        target.classList.contains("bg-zinc-950") ||
        target.classList.contains("min-h-screen")
      ) {
        return "outside";
      }

      // 2. Clickable or Typable Content -> ONLY THIS IS GREEN!
      const clickableElement = target.closest(
        "button, a, input, textarea, select, [role='button'], [role='tab'], summary, label"
      );
      if (clickableElement) {
        if (clickableElement.matches(":disabled, [aria-disabled='true']")) {
          return "unselectable"; // Disabled button/element -> RED
        }
        return "interactive"; // Only clickable/typable elements -> GREEN
      }

      // 3. Any other content on the website (text, headings, paragraphs, spans, code, unselectable items) -> RED
      const isContent = Boolean(
        target.closest(
          "h1, h2, h3, h4, h5, h6, p, span, code, pre, li, td, th, b, strong, em, i, article, div[role='tabpanel'], svg, img, .select-none, [aria-hidden='true']"
        )
      );

      if (isContent) {
        return "unselectable"; // Non-clickable content -> RED
      }

      // Default to ambient outside area -> DARKER BLUE
      return "outside";
    };

    const onMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      setIsVisible(true);

      // Instant center pinpoint dot placement
      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0)`;
      }

      // Classify the target under the pointer
      const target = e.target as HTMLElement | null;
      setAimState(classifyTarget(target));
    };

    const onMouseDown = () => setIsClicking(true);
    const onMouseUp = () => setIsClicking(false);
    const onMouseLeave = () => setIsVisible(false);
    const onMouseEnter = () => setIsVisible(true);

    const animate = () => {
      const speed = 0.22;
      currentX += (mouseX - currentX) * speed;
      currentY += (mouseY - currentY) * speed;

      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate3d(${currentX}px, ${currentY}px, 0)`;
      }
      rafId = requestAnimationFrame(animate);
    };

    window.addEventListener("pointermove", onMouseMove);
    window.addEventListener("mousedown", onMouseDown);
    window.addEventListener("mouseup", onMouseUp);
    document.addEventListener("mouseleave", onMouseLeave);
    document.addEventListener("mouseenter", onMouseEnter);
    rafId = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("pointermove", onMouseMove);
      window.removeEventListener("mousedown", onMouseDown);
      window.removeEventListener("mouseup", onMouseUp);
      document.removeEventListener("mouseleave", onMouseLeave);
      document.removeEventListener("mouseenter", onMouseEnter);
      cancelAnimationFrame(rafId);
    };
  }, []);

  if (!isVisible) return null;

  // Visual scheme definitions:
  // - Green: ONLY for elements that can be clicked / typed
  // - Red: for non-clickable content / text / unselectable items
  // - Darker Blue: outside area / ambient canvas
  const stateThemes = {
    interactive: {
      dot: "bg-emerald-400 shadow-[0_0_10px_#34d399]",
      reticle: "border-emerald-400 shadow-[0_0_14px_rgba(52,211,153,0.5)] rotate-90",
      ticks: "bg-emerald-400",
      brackets: "border-emerald-400",
      badge: "text-emerald-300 bg-emerald-950/85 border-emerald-600/70",
      statusText: "TARGET // CLICKABLE",
      cells: "bg-emerald-400 shadow-[0_0_4px_#34d399]",
    },
    unselectable: {
      dot: "bg-rose-500 shadow-[0_0_10px_#f43f5e]",
      reticle: "border-rose-500 shadow-[0_0_14px_rgba(244,63,94,0.5)] rotate-45",
      ticks: "bg-rose-500",
      brackets: "border-rose-500",
      badge: "text-rose-300 bg-rose-950/85 border-rose-600/70",
      statusText: "TARGET // NON-CLICK",
      cells: "bg-rose-500 shadow-[0_0_4px_#f43f5e]",
    },
    outside: {
      dot: "bg-blue-600 shadow-[0_0_8px_#2563eb]",
      reticle: "border-blue-700/80 shadow-[0_0_10px_rgba(29,78,216,0.35)] rotate-0",
      ticks: "bg-blue-600",
      brackets: "border-blue-600/70",
      badge: "text-blue-300 bg-blue-950/85 border-blue-800/60",
      statusText: "RADAR // SCANNING",
      cells: "bg-blue-600/60",
    },
  };

  const theme = stateThemes[aimState];

  return (
    <>
      {/* 1. Pinpoint Center Crosshair Dot (instant positioning) */}
      <div
        ref={dotRef}
        className="pointer-events-none fixed top-0 left-0 -translate-x-1/2 -translate-y-1/2 z-[100] transition-opacity duration-150"
        aria-hidden="true"
      >
        <div
          className={`w-1.5 h-1.5 rounded-full transition-all duration-150 ${
            isClicking
              ? "scale-150 bg-white shadow-[0_0_14px_#ffffff]"
              : theme.dot
          }`}
        />
      </div>

      {/* 2. Video Game Gun Aim Reticle & Hotbar HUD (smooth trailing) */}
      <div
        ref={cursorRef}
        className="pointer-events-none fixed top-0 left-0 -translate-x-1/2 -translate-y-1/2 z-[99] transition-opacity duration-200"
        aria-hidden="true"
      >
        <div
          className={`relative flex items-center justify-center transition-all duration-200 ${
            isClicking
              ? "scale-75"
              : aimState !== "outside"
              ? "scale-110"
              : "scale-100"
          }`}
        >
          {/* Aim Crosshair Reticle Ring & Notches */}
          <div
            className={`w-10 h-10 rounded-full border border-dashed transition-all duration-200 flex items-center justify-center ${theme.reticle}`}
          >
            {/* Crosshair ticks */}
            <div className={`absolute top-0 w-0.5 h-1.5 transition-colors duration-150 ${theme.ticks}`} />
            <div className={`absolute bottom-0 w-0.5 h-1.5 transition-colors duration-150 ${theme.ticks}`} />
            <div className={`absolute left-0 h-0.5 w-1.5 transition-colors duration-150 ${theme.ticks}`} />
            <div className={`absolute right-0 h-0.5 w-1.5 transition-colors duration-150 ${theme.ticks}`} />
          </div>

          {/* Tactical Corner Aim Brackets (FPS HUD style) */}
          <div
            className={`absolute -inset-1.5 transition-all duration-200 ${
              aimState !== "outside" ? "scale-100 opacity-100" : "scale-90 opacity-60"
            }`}
          >
            <div className={`absolute top-0 left-0 w-2 h-2 border-t-2 border-l-2 transition-colors duration-150 ${theme.brackets}`} />
            <div className={`absolute top-0 right-0 w-2 h-2 border-t-2 border-r-2 transition-colors duration-150 ${theme.brackets}`} />
            <div className={`absolute bottom-0 left-0 w-2 h-2 border-b-2 border-l-2 transition-colors duration-150 ${theme.brackets}`} />
            <div className={`absolute bottom-0 right-0 w-2 h-2 border-b-2 border-r-2 transition-colors duration-150 ${theme.brackets}`} />
          </div>

          {/* Video Game Hotbar / Ammo & Status Meter HUD under the aim */}
          <div className="absolute top-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-0.5 whitespace-nowrap font-mono select-none">
            <span
              className={`text-[9px] font-bold tracking-widest px-1 py-0.2 rounded border transition-colors ${
                isClicking
                  ? "text-white bg-zinc-900 border-white/60 shadow-[0_0_8px_rgba(255,255,255,0.4)]"
                  : theme.badge
              }`}
            >
              {isClicking ? "FIRE // ENGAGED" : theme.statusText}
            </span>

            {/* Tactical 4-segment power/charge hotbar */}
            <div className="flex items-center gap-0.5">
              <span className={`w-1.5 h-1 rounded-sm transition-colors duration-150 ${theme.cells}`} />
              <span className={`w-1.5 h-1 rounded-sm transition-colors duration-150 ${theme.cells}`} />
              <span className={`w-1.5 h-1 rounded-sm transition-colors duration-150 ${theme.cells}`} />
              <span className={`w-1.5 h-1 rounded-sm transition-colors duration-150 ${isClicking ? "bg-white shadow-[0_0_4px_#ffffff]" : theme.cells}`} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default function Home() {
  const [activeTab, setActiveTab] = useState<"config" | "telemetry" | "logs">("config");
  const [copied, setCopied] = useState(false);
  const [email, setEmail] = useState("");
  const [formStatus, setFormStatus] = useState<"idle" | "success" | "error">("idle");
  const [feedbackMessage, setFeedbackMessage] = useState("");

  const handleCopyCode = async () => {
    try {
      await navigator.clipboard.writeText(CODE_SNIPPET);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  const handleSubscribe = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!email || !email.includes("@")) {
      setFormStatus("error");
      setFeedbackMessage("Please provide a valid work email address.");
      return;
    }
    setFormStatus("success");
    setFeedbackMessage("Cluster access requested! Check your inbox for your cryptographic API token.");
    setEmail("");
  };

  return (
    <div className="relative min-h-screen bg-zinc-950 text-zinc-100 flex flex-col selection:bg-indigo-600 selection:text-white overflow-hidden">
      {/* Video Game Gun Aim Hotbar Custom Cursor */}
      <GameAimCursor />

      {/* 1. Visual Atmosphere: Subtle background grid with radial mask fading */}
      <div
        className="absolute inset-0 bg-[linear-gradient(to_right,#27272a22_1px,transparent_1px),linear-gradient(to_bottom,#27272a22_1px,transparent_1px)] bg-[size:48px_48px] [mask-image:radial-gradient(ellipse_70%_55%_at_50%_0%,#000_65%,transparent_100%)] pointer-events-none -z-10"
        aria-hidden="true"
      />

      {/* Keyboard Accessibility Skip Link */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:px-5 focus:py-3 focus:bg-indigo-600 focus:text-white focus:text-sm focus:font-semibold focus:rounded-xl focus:shadow-2xl focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-zinc-950 focus:outline-none transition-all"
      >
        Skip to main content
      </a>

      {/* Global Header & Navigation */}
      <header className="sticky top-0 z-40 w-full border-b border-zinc-800/80 bg-zinc-950/80 backdrop-blur-xl transition-colors">
        <nav
          aria-label="Main Navigation"
          className="max-w-7xl mx-auto flex items-center justify-between px-4 sm:px-6 lg:px-8 h-16"
        >
          {/* Brand Logo */}
          <Link
            href="/"
            className="flex items-center gap-2.5 rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400 focus-visible:ring-offset-2 focus-visible:ring-offset-zinc-950 px-1 py-1 group"
            aria-label="HyperScale homepage"
          >
            <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-indigo-600 via-indigo-500 to-violet-400 flex items-center justify-center shadow-lg shadow-indigo-500/25 group-hover:shadow-indigo-500/40 transition-shadow">
              <svg
                className="w-5 h-5 text-white"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
                focusable="false"
              >
                <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
              </svg>
            </div>
            <span className="font-bold text-lg tracking-tight text-white">
              Hyper<span className="text-indigo-400">Scale</span>
            </span>
          </Link>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center gap-1">
            <a
              href="#features"
              className="px-3.5 py-2 text-sm font-medium text-zinc-300 hover:text-white hover:bg-zinc-900/60 rounded-lg transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400 focus-visible:ring-offset-2 focus-visible:ring-offset-zinc-950"
            >
              Features
            </a>
            <a
              href="#terminal"
              className="px-3.5 py-2 text-sm font-medium text-zinc-300 hover:text-white hover:bg-zinc-900/60 rounded-lg transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400 focus-visible:ring-offset-2 focus-visible:ring-offset-zinc-950"
            >
              IDE Architecture
            </a>
            <a
              href="#telemetry"
              className="px-3.5 py-2 text-sm font-medium text-zinc-300 hover:text-white hover:bg-zinc-900/60 rounded-lg transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400 focus-visible:ring-offset-2 focus-visible:ring-offset-zinc-950"
            >
              Telemetry
            </a>
            <a
              href="#cta"
              className="px-3.5 py-2 text-sm font-medium text-zinc-300 hover:text-white hover:bg-zinc-900/60 rounded-lg transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400 focus-visible:ring-offset-2 focus-visible:ring-offset-zinc-950"
            >
              Pricing
            </a>
          </div>

          {/* Header Action Buttons */}
          <div className="flex items-center gap-3">
            <a
              href="#cta"
              className="hidden sm:inline-flex items-center justify-center min-h-[40px] px-3.5 py-1.5 text-sm font-medium text-zinc-300 hover:text-white rounded-lg transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400 focus-visible:ring-offset-2 focus-visible:ring-offset-zinc-950"
            >
              Sign In
            </a>
            <a
              href="#cta"
              className="relative inline-flex items-center justify-center min-h-[42px] px-4 py-2 text-sm font-semibold text-white bg-indigo-600 hover:bg-indigo-500 rounded-xl transition-all shadow-md shadow-indigo-600/30 hover:shadow-indigo-600/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400 focus-visible:ring-offset-2 focus-visible:ring-offset-zinc-950 active:scale-95"
            >
              Start Free
            </a>
          </div>
        </nav>
      </header>

      {/* Main Landmark */}
      <main id="main-content" tabIndex={-1} className="flex-1 focus:outline-none">
        {/* =========================================================================
            HERO SECTION
            ========================================================================= */}
        <section
          aria-labelledby="hero-title"
          className="relative pt-16 pb-20 md:pt-28 md:pb-36 overflow-hidden"
        >
          {/* Animated Ambient Glow (Aurora / Mesh Gradient) */}
          <div
            className="absolute top-10 left-1/2 -translate-x-1/2 w-[650px] sm:w-[950px] h-[380px] sm:h-[480px] pointer-events-none opacity-45 blur-[110px] -z-10 animate-ambient-pulse"
            aria-hidden="true"
          >
            <div className="w-full h-full bg-gradient-to-tr from-indigo-700/50 via-violet-600/30 to-cyan-500/25 rounded-full" />
          </div>

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            {/* Glowing Pill Badge with Live Status Dot */}
            <div className="relative inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full border border-indigo-500/30 bg-zinc-900/80 backdrop-blur-xl text-xs sm:text-sm font-medium text-zinc-300 mb-8 shadow-[0_0_20px_rgba(99,102,241,0.15)] hover:border-indigo-400/50 transition-all">
              <span className="relative flex h-2 w-2" aria-hidden="true">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
              </span>
              <span className="text-zinc-200 font-semibold tracking-wide">HyperScale 2.0 Engine</span>
              <span className="text-zinc-600" aria-hidden="true">•</span>
              <a
                href="#features"
                className="text-indigo-400 hover:text-indigo-300 flex items-center gap-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400 rounded"
              >
                Explore Release <span aria-hidden="true">&rarr;</span>
              </a>
            </div>

            {/* Multi-Layer Text Gradient H1 */}
            <h1
              id="hero-title"
              className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight max-w-4xl mx-auto leading-[1.08] sm:leading-[1.1]"
            >
              <span className="block bg-clip-text text-transparent bg-gradient-to-b from-white via-zinc-200 to-zinc-500">
                Build faster. Scale infinitely.
              </span>
              <span className="block mt-2 bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 via-violet-300 to-cyan-300">
                Ship with absolute certainty.
              </span>
            </h1>

            {/* High-Contrast Supporting Subheadline */}
            <p className="mt-6 text-lg sm:text-xl text-zinc-300 max-w-2xl mx-auto leading-relaxed font-normal">
              The intelligent, globally distributed cloud runtime engineered for modern full-stack teams.
              Zero cold starts, sub-15ms edge responses, and automated multi-region consistency.
            </p>

            {/* Dual CTA Group with Shimmer Button */}
            <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4 max-w-md mx-auto">
              {/* Primary CTA with Shimmer Effect & Active Scale Down */}
              <a
                href="#cta"
                className="relative group overflow-hidden w-full sm:w-auto inline-flex items-center justify-center min-h-[48px] px-8 py-3.5 text-base font-semibold text-white bg-indigo-600 hover:bg-indigo-500 rounded-xl transition-all shadow-[0_0_25px_rgba(99,102,241,0.35)] hover:shadow-[0_0_35px_rgba(99,102,241,0.55)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400 focus-visible:ring-offset-2 focus-visible:ring-offset-zinc-950 active:scale-95"
              >
                <span
                  className="absolute inset-0 w-1/2 h-full bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 -translate-x-full group-hover:animate-shimmer pointer-events-none"
                  aria-hidden="true"
                />
                <span className="relative z-10 flex items-center">
                  Deploy Free Cluster
                  <svg
                    className="w-4 h-4 ml-2.5 transition-transform group-hover:translate-x-1"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                    focusable="false"
                  >
                    <line x1="5" y1="12" x2="19" y2="12" />
                    <polyline points="12 5 19 12 12 19" />
                  </svg>
                </span>
              </a>

              {/* Secondary CTA */}
              <a
                href="#terminal"
                className="w-full sm:w-auto inline-flex items-center justify-center min-h-[48px] px-7 py-3.5 text-base font-semibold text-zinc-200 hover:text-white bg-zinc-900/90 hover:bg-zinc-800 border border-zinc-700/80 hover:border-zinc-600 rounded-xl transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-400 focus-visible:ring-offset-2 focus-visible:ring-offset-zinc-950 active:scale-95 shadow-sm"
              >
                Inspect Live IDE
              </a>
            </div>

            {/* Stat Counters with Spotlight Cursor Glowing Outside Border & Scale */}
            <div
              id="telemetry"
              className="mt-14 grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 max-w-4xl mx-auto text-left"
            >
              {/* Stat 1 */}
              <SpotlightBox rounded="rounded-xl" glowRadius={130} hoverScale="hover:scale-[1.03] hover:-translate-y-1">
                <div className="p-4">
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-zinc-400">Guaranteed SLA</span>
                    <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-400 bg-emerald-950/60 border border-emerald-800/50 px-2 py-0.5 rounded-full">
                      <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" strokeWidth="2.5" stroke="currentColor" aria-hidden="true">
                        <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 15.75 7.5-7.5 7.5 7.5" />
                      </svg>
                      +99.999%
                    </span>
                  </div>
                  <p className="mt-2 text-2xl sm:text-3xl font-bold text-white tracking-tight">99.999%</p>
                  <p className="text-xs text-zinc-500 mt-0.5">Continuous Multi-Region</p>
                </div>
              </SpotlightBox>

              {/* Stat 2 */}
              <SpotlightBox rounded="rounded-xl" glowRadius={130} hoverScale="hover:scale-[1.03] hover:-translate-y-1">
                <div className="p-4">
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-zinc-400">Global p99 Latency</span>
                    <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-400 bg-emerald-950/60 border border-emerald-800/50 px-2 py-0.5 rounded-full">
                      <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" strokeWidth="2.5" stroke="currentColor" aria-hidden="true">
                        <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
                      </svg>
                      ↓ 4.8ms
                    </span>
                  </div>
                  <p className="mt-2 text-2xl sm:text-3xl font-bold text-indigo-400 tracking-tight">11.2 ms</p>
                  <p className="text-xs text-zinc-500 mt-0.5">300+ Point of Presence</p>
                </div>
              </SpotlightBox>

              {/* Stat 3 */}
              <SpotlightBox rounded="rounded-xl" glowRadius={130} hoverScale="hover:scale-[1.03] hover:-translate-y-1">
                <div className="p-4">
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-zinc-400">Cache Hit Ratio</span>
                    <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-400 bg-emerald-950/60 border border-emerald-800/50 px-2 py-0.5 rounded-full">
                      <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" strokeWidth="2.5" stroke="currentColor" aria-hidden="true">
                        <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 15.75 7.5-7.5 7.5 7.5" />
                      </svg>
                      ↑ 1.4%
                    </span>
                  </div>
                  <p className="mt-2 text-2xl sm:text-3xl font-bold text-emerald-400 tracking-tight">99.18%</p>
                  <p className="text-xs text-zinc-500 mt-0.5">Predictive AI Pre-warming</p>
                </div>
              </SpotlightBox>

              {/* Stat 4 */}
              <SpotlightBox rounded="rounded-xl" glowRadius={130} hoverScale="hover:scale-[1.03] hover:-translate-y-1">
                <div className="p-4">
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-zinc-400">Cold Starts</span>
                    <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-cyan-400 bg-cyan-950/60 border border-cyan-800/50 px-2 py-0.5 rounded-full">
                      ⚡ Instant
                    </span>
                  </div>
                  <p className="mt-2 text-2xl sm:text-3xl font-bold text-white tracking-tight">0.00%</p>
                  <p className="text-xs text-zinc-500 mt-0.5">MicroVM Snapshotting</p>
                </div>
              </SpotlightBox>
            </div>

            {/* Interactive Dark IDE Terminal Card with Spotlight Cursor Glowing Outside Border */}
            <div id="terminal" className="mt-14 max-w-4xl mx-auto text-left">
              <h2 className="sr-only">Interactive Cloud Configuration IDE</h2>
              <SpotlightBox
                rounded="rounded-2xl"
                glowRadius={170}
                hoverScale="hover:scale-[1.015] hover:-translate-y-1"
                className="shadow-[0_0_50px_-12px_rgba(0,0,0,0.8)]"
              >
                <div className="overflow-hidden rounded-[14.5px]">
                  {/* IDE Chrome Top Bar */}
                  <div className="flex items-center justify-between px-4 py-2.5 border-b border-zinc-800/80 bg-zinc-900/70">
                    {/* macOS Window Controls */}
                    <div className="flex items-center gap-2" aria-hidden="true">
                      <span className="w-3 h-3 rounded-full bg-[#ff5f56] inline-block shadow-sm" />
                      <span className="w-3 h-3 rounded-full bg-[#ffbd2e] inline-block shadow-sm" />
                      <span className="w-3 h-3 rounded-full bg-[#27c93f] inline-block shadow-sm" />
                    </div>

                    {/* IDE File Tabs with ARIA semantics */}
                    <div role="tablist" aria-label="IDE source files" className="flex items-center gap-1">
                      <button
                        role="tab"
                        id="tab-config"
                        aria-selected={activeTab === "config"}
                        aria-controls="panel-config"
                        onClick={() => setActiveTab("config")}
                        className={`flex items-center gap-2 px-3 py-1 text-xs font-mono rounded-md transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400 ${
                          activeTab === "config"
                            ? "bg-zinc-800 text-indigo-300 border border-zinc-700/80"
                            : "text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800/40"
                        }`}
                      >
                        <svg className="w-3.5 h-3.5 text-indigo-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                          <polyline points="14 2 14 8 20 8" />
                        </svg>
                        hyperscale.config.ts
                      </button>

                      <button
                        role="tab"
                        id="tab-telemetry-ide"
                        aria-selected={activeTab === "telemetry"}
                        aria-controls="panel-telemetry-ide"
                        onClick={() => setActiveTab("telemetry")}
                        className={`flex items-center gap-2 px-3 py-1 text-xs font-mono rounded-md transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400 ${
                          activeTab === "telemetry"
                            ? "bg-zinc-800 text-indigo-300 border border-zinc-700/80"
                            : "text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800/40"
                        }`}
                      >
                        <svg className="w-3.5 h-3.5 text-cyan-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                          <polygon points="12 2 2 7 12 12 22 7 12 2" />
                          <polyline points="2 17 12 22 22 17" />
                          <polyline points="2 12 12 17 22 12" />
                        </svg>
                        edge-runtime.ts
                      </button>

                      <button
                        role="tab"
                        id="tab-logs-ide"
                        aria-selected={activeTab === "logs"}
                        aria-controls="panel-logs-ide"
                        onClick={() => setActiveTab("logs")}
                        className={`hidden sm:flex items-center gap-2 px-3 py-1 text-xs font-mono rounded-md transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400 ${
                          activeTab === "logs"
                            ? "bg-zinc-800 text-indigo-300 border border-zinc-700/80"
                            : "text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800/40"
                        }`}
                      >
                        <svg className="w-3.5 h-3.5 text-emerald-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                          <polyline points="4 17 10 11 4 5" />
                          <line x1="12" y1="19" x2="20" y2="19" />
                        </svg>
                        telemetry.json
                      </button>
                    </div>

                    {/* Copy Button with Tooltip & Live Feedback */}
                    <div className="relative">
                      <button
                        type="button"
                        onClick={handleCopyCode}
                        aria-label={copied ? "Code copied to clipboard" : "Copy code snippet to clipboard"}
                        className="inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium text-zinc-300 bg-zinc-800/80 hover:bg-zinc-700 border border-zinc-700/70 rounded-md transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400"
                      >
                        {copied ? (
                          <>
                            <svg className="w-3.5 h-3.5 text-emerald-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
                              <polyline points="20 6 9 17 4 12" />
                            </svg>
                            <span className="text-emerald-400">Copied!</span>
                          </>
                        ) : (
                          <>
                            <svg className="w-3.5 h-3.5 text-zinc-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                              <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
                              <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
                            </svg>
                            <span>Copy</span>
                          </>
                        )}
                      </button>
                      <span role="status" aria-live="polite" className="sr-only">
                        {copied ? "Code copied to clipboard" : ""}
                      </span>
                    </div>
                  </div>

                  {/* IDE Code Content with Line Numbers & High-Fidelity Highlighting */}
                  <div className="p-4 sm:p-6 font-mono text-xs sm:text-sm overflow-x-auto leading-relaxed bg-zinc-950/95">
                    {activeTab === "config" && (
                      <div role="tabpanel" id="panel-config" aria-labelledby="tab-config">
                        <div className="flex">
                          {/* Line Numbers */}
                          <div className="select-none text-zinc-600 pr-4 text-right w-7 font-mono text-xs flex flex-col space-y-0.5" aria-hidden="true">
                            {Array.from({ length: 19 }).map((_, i) => (
                              <span key={i}>{i + 1}</span>
                            ))}
                          </div>
                          {/* Code Spans */}
                          <pre className="text-zinc-300 font-mono text-xs sm:text-sm">
                            <code>
                              <span className="text-zinc-500">{"// hyperscale.config.ts"}</span>
                              {"\n"}
                              <span className="text-purple-400">import</span> {"{ defineCluster }"}{" "}
                              <span className="text-purple-400">from</span>{" "}
                              <span className="text-emerald-400">&quot;@hyperscale/core&quot;</span>;{"\n\n"}
                              <span className="text-purple-400">export default</span>{" "}
                              <span className="text-cyan-300">defineCluster</span>({"{"}
                              {"\n  "}
                              <span className="text-zinc-400">project:</span>{" "}
                              <span className="text-emerald-400">&quot;enterprise-api&quot;</span>,{"\n  "}
                              <span className="text-zinc-400">runtime:</span>{" "}
                              <span className="text-emerald-400">&quot;edge-v2&quot;</span>,{"\n  "}
                              <span className="text-zinc-400">regions:</span> [
                              <span className="text-emerald-400">&quot;us-east&quot;</span>,{" "}
                              <span className="text-emerald-400">&quot;eu-central&quot;</span>,{" "}
                              <span className="text-emerald-400">&quot;ap-northeast&quot;</span>
                              ],{"\n  "}
                              <span className="text-indigo-300">routing:</span> {"{"}
                              {"\n    "}
                              <span className="text-zinc-400">strategy:</span>{" "}
                              <span className="text-emerald-400">&quot;geo-proximity&quot;</span>,{"\n    "}
                              <span className="text-zinc-400">maxLatencyBudgetMs:</span>{" "}
                              <span className="text-amber-300">15</span>,{"\n  "}
                              {"}"},{"\n  "}
                              <span className="text-indigo-300">caching:</span> {"{"}
                              {"\n    "}
                              <span className="text-zinc-400">mode:</span>{" "}
                              <span className="text-emerald-400">&quot;predictive-ml&quot;</span>,{"\n    "}
                              <span className="text-zinc-400">staleWhileRevalidate:</span>{" "}
                              <span className="text-amber-300">3600</span>,{"\n  "}
                              {"}"},{"\n  "}
                              <span className="text-indigo-300">security:</span> {"{"}
                              {"\n    "}
                              <span className="text-zinc-400">microVMIsolation:</span>{" "}
                              <span className="text-cyan-300">true</span>,{"\n    "}
                              <span className="text-zinc-400">mTLSStrict:</span>{" "}
                              <span className="text-cyan-300">true</span>,{"\n  "}
                              {"}"},{"\n"}
                              {"});"}
                            </code>
                          </pre>
                        </div>
                      </div>
                    )}

                    {activeTab === "telemetry" && (
                      <div role="tabpanel" id="panel-telemetry-ide" aria-labelledby="tab-telemetry-ide">
                        <div className="flex">
                          <div className="select-none text-zinc-600 pr-4 text-right w-7 font-mono text-xs flex flex-col space-y-0.5" aria-hidden="true">
                            {Array.from({ length: 12 }).map((_, i) => (
                              <span key={i}>{i + 1}</span>
                            ))}
                          </div>
                          <pre className="text-zinc-300 font-mono text-xs sm:text-sm">
                            <code>
                              <span className="text-zinc-500">{"// edge-runtime.ts"}</span>
                              {"\n"}
                              <span className="text-purple-400">export async function</span>{" "}
                              <span className="text-cyan-300">onRequest</span>(req:{" "}
                              <span className="text-indigo-300">EdgeRequest</span>) {"{"}
                              {"\n  "}
                              <span className="text-purple-400">const</span> edgeCache ={" "}
                              <span className="text-purple-400">await</span>{" "}
                              <span className="text-cyan-300">openCache</span>();{"\n  "}
                              <span className="text-purple-400">const</span> cached ={" "}
                              <span className="text-purple-400">await</span> edgeCache.
                              <span className="text-cyan-300">match</span>(req.url);{"\n  "}
                              <span className="text-purple-400">if</span> (cached) {"{"}
                              {"\n    "}
                              <span className="text-purple-400">return</span> cached.
                              <span className="text-cyan-300">withHeader</span>(
                              <span className="text-emerald-400">&quot;X-Edge-Hit&quot;</span>,{" "}
                              <span className="text-emerald-400">&quot;true&quot;</span>);{"\n  "}
                              {"}"}
                              {"\n  "}
                              <span className="text-purple-400">return</span>{" "}
                              <span className="text-cyan-300">dispatchToMicroVM</span>(req);{"\n"}
                              {"}"}
                            </code>
                          </pre>
                        </div>
                      </div>
                    )}

                    {activeTab === "logs" && (
                      <div role="tabpanel" id="panel-logs-ide" aria-labelledby="tab-logs-ide">
                        <pre className="text-zinc-300 font-mono text-xs sm:text-sm">
                          <code>
                            {"{\n"}
                            {"  "}<span className="text-indigo-400">&quot;event&quot;</span>: <span className="text-emerald-400">&quot;CLUSTER_PROVISIONED&quot;</span>,{"\n"}
                            {"  "}<span className="text-indigo-400">&quot;regions_synced&quot;</span>: [<span className="text-emerald-400">&quot;fra1&quot;</span>, <span className="text-emerald-400">&quot;iad1&quot;</span>, <span className="text-emerald-400">&quot;tyo1&quot;</span>],{"\n"}
                            {"  "}<span className="text-indigo-400">&quot;cold_start_ms&quot;</span>: <span className="text-amber-300">0</span>,{"\n"}
                            {"  "}<span className="text-indigo-400">&quot;p99_latency_ms&quot;</span>: <span className="text-amber-300">11.2</span>,{"\n"}
                            {"  "}<span className="text-indigo-400">&quot;mTLS_status&quot;</span>: <span className="text-emerald-400">&quot;VERIFIED&quot;</span>,{"\n"}
                            {"  "}<span className="text-indigo-400">&quot;state&quot;</span>: <span className="text-emerald-400">&quot;HEALTHY_ACTIVE&quot;</span>{"\n"}
                            {"}"}
                          </code>
                        </pre>
                      </div>
                    )}
                  </div>
                </div>
              </SpotlightBox>
            </div>
          </div>
        </section>

        {/* =========================================================================
            FEATURE GRID SECTION (Spotlight Glassmorphism Cards)
            ========================================================================= */}
        <section
          id="features"
          aria-labelledby="features-title"
          className="py-24 md:py-36 relative border-t border-zinc-800/80 bg-zinc-950"
        >
          {/* Subtle Grid Accent in Background */}
          <div
            className="absolute inset-0 bg-[radial-gradient(#312e8118_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none -z-10"
            aria-hidden="true"
          />

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Section Header */}
            <div className="text-center max-w-3xl mx-auto">
              <span className="text-xs sm:text-sm font-semibold tracking-wider uppercase text-indigo-400 bg-indigo-950/60 px-4 py-1.5 rounded-full border border-indigo-500/30 shadow-[0_0_15px_rgba(99,102,241,0.15)]">
                Spotlight Capabilities
              </span>
              <h2
                id="features-title"
                className="mt-6 text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white leading-tight"
              >
                Engineered for extreme performance and unyielding uptime
              </h2>
              <p className="mt-4 text-base sm:text-lg text-zinc-400 leading-relaxed">
                Everything required to run resilient, scalable production services across the globe without
                the burden of manual cluster orchestration.
              </p>
            </div>

            {/* 6-Card Responsive Grid with Cursor-Tracking Glowing Outside Border & Hover Scale */}
            <div className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
              {FEATURES.map((feature) => (
                <SpotlightFeatureCard key={feature.id} feature={feature} />
              ))}
            </div>
          </div>
        </section>

        {/* =========================================================================
            CALL-TO-ACTION (CTA) SECTION (Spotlight Outer Glowing Border)
            ========================================================================= */}
        <section
          id="cta"
          aria-labelledby="cta-title"
          className="py-20 md:py-32 relative overflow-hidden bg-zinc-950"
        >
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <SpotlightBox
              rounded="rounded-3xl"
              glowRadius={180}
              hoverScale="hover:scale-[1.01] hover:-translate-y-1"
              innerBg="bg-gradient-to-b from-zinc-900/90 via-zinc-900/60 to-zinc-950"
              className="shadow-[0_0_50px_-10px_rgba(99,102,241,0.2)]"
            >
              <div className="p-8 sm:p-14 md:p-16 text-center relative overflow-hidden">
                {/* Electric Background Mesh */}
                <div
                  className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-indigo-600/25 via-transparent to-transparent pointer-events-none"
                  aria-hidden="true"
                />

                <div className="relative z-10 max-w-2xl mx-auto">
                  <span className="text-xs sm:text-sm font-semibold tracking-wider uppercase text-indigo-400 bg-indigo-950/70 px-4 py-1.5 rounded-full border border-indigo-500/30">
                    Instant Onboarding
                  </span>

                  <h2
                    id="cta-title"
                    className="mt-6 text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-white leading-tight"
                  >
                    Ready to accelerate your engineering velocity?
                  </h2>

                  <p className="mt-4 text-base sm:text-lg text-zinc-300 leading-relaxed font-normal">
                    Join thousands of forward-thinking engineering teams deploying globally on HyperScale today.
                    Launch your first multi-region cluster in under 120 seconds.
                  </p>

                  {/* Accessible Subscription / Action Form */}
                  <form
                    onSubmit={handleSubscribe}
                    className="mt-8 flex flex-col sm:flex-row items-center gap-3 max-w-md mx-auto"
                    noValidate
                  >
                    <label htmlFor="cta-email" className="sr-only">
                      Work Email Address
                    </label>
                    <input
                      id="cta-email"
                      name="email"
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Enter your work email"
                      aria-describedby={formStatus !== "idle" ? "cta-feedback" : undefined}
                      className="w-full sm:flex-1 min-h-[48px] px-4 py-3 bg-zinc-950/90 border border-zinc-700/80 rounded-xl text-zinc-100 placeholder-zinc-500 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400 focus-visible:border-transparent transition-all shadow-inner"
                    />
                    <button
                      type="submit"
                      className="relative group overflow-hidden w-full sm:w-auto inline-flex items-center justify-center min-h-[48px] px-7 py-3 text-sm font-semibold text-white bg-indigo-600 hover:bg-indigo-500 rounded-xl transition-all shadow-lg shadow-indigo-600/30 hover:shadow-indigo-600/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400 focus-visible:ring-offset-2 focus-visible:ring-offset-zinc-950 active:scale-95"
                    >
                      <span
                        className="absolute inset-0 w-1/2 h-full bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 -translate-x-full group-hover:animate-shimmer pointer-events-none"
                        aria-hidden="true"
                      />
                      <span className="relative z-10">Start Free Trial</span>
                    </button>
                  </form>

                  {/* Accessible Feedback Alert Message */}
                  {formStatus !== "idle" && (
                    <div
                      id="cta-feedback"
                      role="status"
                      aria-live="polite"
                      className={`mt-4 text-sm font-medium ${
                        formStatus === "success" ? "text-emerald-400" : "text-rose-400"
                      }`}
                    >
                      {feedbackMessage}
                    </div>
                  )}

                  {/* Reassurance Social Proof */}
                  <div className="mt-8 pt-6 border-t border-zinc-800/80 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs text-zinc-400">
                    <span className="flex items-center gap-1.5">
                      <svg
                        className="w-4 h-4 text-emerald-400"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        aria-hidden="true"
                        focusable="false"
                      >
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 0 1 0 1.414l-8 8a1 1 0 0 1-1.414 0l-4-4a1 1 0 0 1 1.414-1.414L8 12.586l7.293-7.293a1 1 0 0 1 1.414 0Z"
                          clipRule="evenodd"
                        />
                      </svg>
                      No credit card required
                    </span>
                    <span className="flex items-center gap-1.5">
                      <svg
                        className="w-4 h-4 text-emerald-400"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        aria-hidden="true"
                        focusable="false"
                      >
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 0 1 0 1.414l-8 8a1 1 0 0 1-1.414 0l-4-4a1 1 0 0 1 1.414-1.414L8 12.586l7.293-7.293a1 1 0 0 1 1.414 0Z"
                          clipRule="evenodd"
                        />
                      </svg>
                      14-day Enterprise trial included
                    </span>
                    <span className="flex items-center gap-1.5">
                      <svg
                        className="w-4 h-4 text-emerald-400"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        aria-hidden="true"
                        focusable="false"
                      >
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 0 1 0 1.414l-8 8a1 1 0 0 1-1.414 0l-4-4a1 1 0 0 1 1.414-1.414L8 12.586l7.293-7.293a1 1 0 0 1 1.414 0Z"
                          clipRule="evenodd"
                        />
                      </svg>
                      Cancel anytime with 1 click
                    </span>
                  </div>
                </div>
              </div>
            </SpotlightBox>
          </div>
        </section>
      </main>

      {/* =========================================================================
          GLOBAL ACCESSIBLE FOOTER
          ========================================================================= */}
      <footer
        aria-label="Site Footer"
        className="mt-auto border-t border-zinc-800/80 bg-zinc-950 py-12 lg:py-16 text-zinc-400"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8">
            {/* Brand Column */}
            <div className="col-span-2 md:col-span-4 lg:col-span-2">
              <Link
                href="/"
                className="flex items-center gap-2.5 rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400 px-1 py-1 w-fit group"
                aria-label="HyperScale homepage"
              >
                <div className="w-7 h-7 rounded-lg bg-indigo-600 flex items-center justify-center group-hover:bg-indigo-500 transition-colors">
                  <svg
                    className="w-4 h-4 text-white"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                    focusable="false"
                  >
                    <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
                  </svg>
                </div>
                <span className="font-bold text-lg text-white">HyperScale</span>
              </Link>
              <p className="mt-3 text-sm text-zinc-400 max-w-sm leading-relaxed">
                The next-generation distributed runtime for mission-critical web applications and APIs.
                Autonomous edge scaling with sub-millisecond p99.
              </p>

              {/* Status Indicator with pulsing green dot */}
              <div className="mt-4 flex items-center gap-2 text-xs text-zinc-300">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 inline-block animate-pulse" aria-hidden="true" />
                <span>All 32 Global POPs Operational (99.999% SLA)</span>
              </div>
            </div>

            {/* Platform Links */}
            <div>
              <h3 className="text-sm font-semibold text-zinc-100 tracking-wider uppercase">
                Platform
              </h3>
              <ul className="mt-4 space-y-2.5 text-sm">
                <li>
                  <a
                    href="#features"
                    className="hover:text-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400 rounded"
                  >
                    Edge Runtime
                  </a>
                </li>
                <li>
                  <a
                    href="#features"
                    className="hover:text-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400 rounded"
                  >
                    Global Cache
                  </a>
                </li>
                <li>
                  <a
                    href="#terminal"
                    className="hover:text-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400 rounded"
                  >
                    Observability
                  </a>
                </li>
                <li>
                  <a
                    href="#features"
                    className="hover:text-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400 rounded"
                  >
                    Zero-Trust MicroVM
                  </a>
                </li>
              </ul>
            </div>

            {/* Resources Links */}
            <div>
              <h3 className="text-sm font-semibold text-zinc-100 tracking-wider uppercase">
                Resources
              </h3>
              <ul className="mt-4 space-y-2.5 text-sm">
                <li>
                  <a
                    href="#terminal"
                    className="hover:text-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400 rounded"
                  >
                    Documentation
                  </a>
                </li>
                <li>
                  <a
                    href="#features"
                    className="hover:text-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400 rounded"
                  >
                    API Reference
                  </a>
                </li>
                <li>
                  <a
                    href="#terminal"
                    className="hover:text-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400 rounded"
                  >
                    Architecture Guides
                  </a>
                </li>
                <li>
                  <a
                    href="#telemetry"
                    className="hover:text-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400 rounded"
                  >
                    System Status
                  </a>
                </li>
              </ul>
            </div>

            {/* Company & Legal Links */}
            <div>
              <h3 className="text-sm font-semibold text-zinc-100 tracking-wider uppercase">
                Company & Legal
              </h3>
              <ul className="mt-4 space-y-2.5 text-sm">
                <li>
                  <a
                    href="#telemetry"
                    className="hover:text-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400 rounded"
                  >
                    Security & Trust
                  </a>
                </li>
                <li>
                  <a
                    href="#telemetry"
                    className="hover:text-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400 rounded"
                  >
                    Compliance (SOC2)
                  </a>
                </li>
                <li>
                  <a
                    href="#cta"
                    className="hover:text-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400 rounded"
                  >
                    Privacy Policy
                  </a>
                </li>
                <li>
                  <a
                    href="#cta"
                    className="hover:text-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400 rounded"
                  >
                    Terms of Service
                  </a>
                </li>
              </ul>
            </div>
          </div>

          {/* Bottom Bar & Social Media Links */}
          <div className="mt-12 pt-8 border-t border-zinc-800/80 flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-xs text-zinc-400">
              &copy; {new Date().getFullYear()} HyperScale Inc. All rights reserved. Built with Next.js and Tailwind CSS.
            </p>

            {/* Accessible Social Media Links */}
            <div className="flex items-center gap-3">
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-lg flex items-center justify-center text-zinc-400 hover:text-white hover:bg-zinc-900 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400"
                aria-label="Visit HyperScale on GitHub (opens in a new tab)"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true" focusable="false">
                  <path
                    fillRule="evenodd"
                    d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0 0 22 12.017C22 6.484 17.522 2 12 2Z"
                    clipRule="evenodd"
                  />
                </svg>
              </a>

              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-lg flex items-center justify-center text-zinc-400 hover:text-white hover:bg-zinc-900 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400"
                aria-label="Visit HyperScale on X Twitter (opens in a new tab)"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true" focusable="false">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </a>

              <a
                href="https://discord.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-lg flex items-center justify-center text-zinc-400 hover:text-white hover:bg-zinc-900 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400"
                aria-label="Join the HyperScale Community Discord (opens in a new tab)"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true" focusable="false">
                  <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028 14.09 14.09 0 0 0 1.226-1.994.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.929 1.793 8.18 1.793 12.061 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.894.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.028zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
