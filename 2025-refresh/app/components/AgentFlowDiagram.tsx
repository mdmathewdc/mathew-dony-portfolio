"use client";

import React, { useEffect, useRef } from "react";

export function AgentFlowDiagram() {
  const containerRef = useRef<HTMLDivElement>(null);
  const initialized = useRef(false);

  useEffect(() => {
    if (!containerRef.current || initialized.current) return;
    initialized.current = true;

    // Dynamic import to avoid SSR issues
    import("@joint/core").then((joint) => {
      const { dia, shapes, V } = joint;

      const graph = new dia.Graph({}, { cellNamespace: shapes });
      const paper = new dia.Paper({
        model: graph,
        cellViewNamespace: shapes,
        width: "100%",
        height: 400,
        gridSize: 10,
        async: true,
        frozen: true,
        sorting: dia.Paper.sorting.APPROX,
        background: { color: "#18181b" },
        clickThreshold: 10,
        interactive: false,
        defaultConnector: {
          name: "rounded",
        },
        defaultRouter: {
          name: "manhattan",
          args: {
            step: 10,
            endDirections: ["left"],
            startDirections: ["right"],
            padding: { bottom: 20, top: 20, left: 20, right: 20 },
          },
        },
      });

      containerRef.current?.appendChild(paper.el);

      // Add text styles
      paper.svg.prepend(
        V.createSVGStyle(`
          .joint-element text {
            fill: #ffffff;
            font-family: var(--font-satoshi-regular), sans-serif;
          }
        `)
      );

      // Single green color for all
      const nodeColor = { fill: "#22c55e", stroke: "#4ade80" };
      const linkColor = "#4ade80";

      function createNode(x: number, y: number, label: string) {
        const el = new shapes.standard.Rectangle({
          position: { x, y },
          size: { width: 140, height: 50 },
          attrs: {
            body: {
              fill: nodeColor.fill,
              stroke: nodeColor.stroke,
              strokeWidth: 2,
              rx: 12,
              ry: 12,
              filter: {
                name: "dropShadow",
                args: { dx: 0, dy: 4, blur: 8, color: "rgba(0,0,0,0.3)" },
              },
            },
            label: {
              text: label,
              fontSize: 13,
              fontWeight: 500,
              textVerticalAnchor: "middle",
              textAnchor: "middle",
            },
          },
          z: 2,
        });
        graph.addCell(el);
        return el;
      }

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      function createLink(source: any, target: any) {
        const l = new shapes.standard.Link({
          source: { id: source.id },
          target: { id: target.id },
          attrs: {
            line: {
              stroke: linkColor,
              strokeWidth: 3,
              strokeDasharray: "8 4",
              targetMarker: {
                type: "path",
                d: "M 10 -5 0 0 10 5 z",
                fill: linkColor,
              },
            },
          },
          z: 1,
        });
        graph.addCell(l);
        return l;
      }

      // Create nodes
      const userAgent = createNode(40, 175, "User");
      const supervisorAgent = createNode(240, 175, "Supervisor Agent");
      const emotionAgent = createNode(480, 90, "Emotion Agent");
      const memeAgent = createNode(480, 260, "Meme Agent");
      const mcpServer = createNode(700, 260, "MCP Server");

      // Create links
      const links = [
        createLink(userAgent, supervisorAgent),
        createLink(supervisorAgent, emotionAgent),
        createLink(supervisorAgent, memeAgent),
        createLink(memeAgent, mcpServer),
      ];

      paper.unfreeze();

      // Animate dashes using JavaScript
      let offset = 0;
      const animationInterval = setInterval(() => {
        offset = (offset - 1) % 24;
        links.forEach((link) => {
          link.attr("line/strokeDashoffset", offset);
        });
      }, 50);

      // Cleanup
      return () => {
        clearInterval(animationInterval);
        paper.remove();
        graph.clear();
      };
    });
  }, []);

  return (
    <div className="my-8 rounded-xl border border-zinc-800 bg-zinc-900/50 overflow-hidden">
      <div
        ref={containerRef}
        className="w-full h-[400px] overflow-auto"
        style={{ minHeight: 400 }}
      />
    </div>
  );
}
