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

      const containerWidth = containerRef.current?.clientWidth || 800;
      const diagramWidth = 880; // Total width of diagram content
      const diagramHeight = 400;
      const isMobile = containerWidth < 640;
      const scale = isMobile ? Math.min(containerWidth / diagramWidth, 0.85) : 1;

      const graph = new dia.Graph({}, { cellNamespace: shapes });
      const paper = new dia.Paper({
        model: graph,
        cellViewNamespace: shapes,
        width: containerWidth,
        height: diagramHeight,
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

      // Enable panning and pinch zoom
      let isPanning = false;
      let isPinching = false;
      let startX = 0;
      let startY = 0;
      let startTx = 0;
      let startTy = 0;
      let initialPinchDistance = 0;
      let initialScale = scale;
      let currentScale = scale;

      const getDistance = (t1: Touch, t2: Touch) => {
        const dx = t1.clientX - t2.clientX;
        const dy = t1.clientY - t2.clientY;
        return Math.sqrt(dx * dx + dy * dy);
      };

      const getPinchCenter = (t1: Touch, t2: Touch) => {
        return {
          x: (t1.clientX + t2.clientX) / 2,
          y: (t1.clientY + t2.clientY) / 2,
        };
      };

      const onMouseDown = (e: MouseEvent) => {
        isPanning = true;
        startX = e.clientX;
        startY = e.clientY;
        const translate = paper.translate();
        startTx = translate.tx;
        startTy = translate.ty;
        if (containerRef.current) {
          containerRef.current.style.cursor = "grabbing";
        }
      };

      const onTouchStart = (e: TouchEvent) => {
        if (e.touches.length === 2) {
          isPinching = true;
          isPanning = false;
          initialPinchDistance = getDistance(e.touches[0], e.touches[1]);
          initialScale = currentScale;
        } else if (e.touches.length === 1) {
          isPanning = true;
          isPinching = false;
          startX = e.touches[0].clientX;
          startY = e.touches[0].clientY;
          const translate = paper.translate();
          startTx = translate.tx;
          startTy = translate.ty;
        }
      };

      const onMouseMove = (e: MouseEvent) => {
        if (!isPanning) return;
        const dx = e.clientX - startX;
        const dy = e.clientY - startY;
        paper.translate(startTx + dx, startTy + dy);
      };

      const onTouchMove = (e: TouchEvent) => {
        if (isPinching && e.touches.length === 2) {
          e.preventDefault();
          const newDistance = getDistance(e.touches[0], e.touches[1]);
          const scaleRatio = newDistance / initialPinchDistance;
          const newScale = Math.min(Math.max(initialScale * scaleRatio, 0.3), 2);
          
          // Get pinch center relative to container
          const rect = containerRef.current?.getBoundingClientRect();
          if (rect) {
            const center = getPinchCenter(e.touches[0], e.touches[1]);
            const centerX = center.x - rect.left;
            const centerY = center.y - rect.top;
            
            // Calculate new translation to zoom around pinch center
            const translate = paper.translate();
            const scaleDiff = newScale / currentScale;
            const newTx = centerX - (centerX - translate.tx) * scaleDiff;
            const newTy = centerY - (centerY - translate.ty) * scaleDiff;
            
            paper.scale(newScale, newScale);
            paper.translate(newTx, newTy);
            currentScale = newScale;
          }
        } else if (isPanning && e.touches.length === 1) {
          const dx = e.touches[0].clientX - startX;
          const dy = e.touches[0].clientY - startY;
          paper.translate(startTx + dx, startTy + dy);
        }
      };

      const onPointerUp = () => {
        isPanning = false;
        isPinching = false;
        if (containerRef.current) {
          containerRef.current.style.cursor = "grab";
        }
      };

      paper.el.addEventListener("mousedown", onMouseDown);
      paper.el.addEventListener("touchstart", onTouchStart, { passive: true });
      document.addEventListener("mousemove", onMouseMove);
      document.addEventListener("touchmove", onTouchMove, { passive: false });
      document.addEventListener("mouseup", onPointerUp);
      document.addEventListener("touchend", onPointerUp);

      // Add text styles
      paper.svg.prepend(
        V.createSVGStyle(`
          .joint-element text {
            fill: #ffffff;
            font-family: var(--font-satoshi-regular), sans-serif;
          }
        `)
      );

      // Node colors
      const colors = {
        user: { fill: "#dc2626", stroke: "#ef4444" }, // Red
        agent: { fill: "#2563eb", stroke: "#3b82f6" }, // Blue
        mcp: { fill: "#9333ea", stroke: "#a855f7" }, // Purple
      };
      const linkColor = "#6b7280"; // Gray for links

      function createNode(
        x: number,
        y: number,
        label: string,
        color: { fill: string; stroke: string }
      ) {
        const el = new shapes.standard.Rectangle({
          position: { x, y },
          size: { width: 140, height: 50 },
          attrs: {
            body: {
              fill: color.fill,
              stroke: color.stroke,
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

      // Create nodes with different colors
      const userAgent = createNode(40, 175, "User", colors.user);
      const supervisorAgent = createNode(240, 175, "Supervisor Agent", colors.agent);
      const emotionAgent = createNode(480, 90, "Emotion Agent", colors.agent);
      const memeAgent = createNode(480, 260, "Meme Agent", colors.agent);
      const mcpServer = createNode(700, 260, "MCP Server", colors.mcp);

      // Create links
      const links = [
        createLink(userAgent, supervisorAgent),
        createLink(supervisorAgent, emotionAgent),
        createLink(supervisorAgent, memeAgent),
        createLink(memeAgent, mcpServer),
      ];

      paper.unfreeze();

      // Apply scale and center the diagram
      paper.scale(scale, scale);
      
      // Center the diagram in the container
      const scaledWidth = diagramWidth * scale;
      const scaledHeight = 360 * scale; // Approximate content height
      const offsetX = (containerWidth - scaledWidth) / 2;
      const offsetY = (diagramHeight - scaledHeight) / 2;
      paper.translate(offsetX > 0 ? offsetX : 0, offsetY > 0 ? offsetY : 0);

      // Set initial cursor
      if (containerRef.current) {
        containerRef.current.style.cursor = "grab";
      }

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
        paper.el.removeEventListener("mousedown", onMouseDown);
        paper.el.removeEventListener("touchstart", onTouchStart);
        document.removeEventListener("mousemove", onMouseMove);
        document.removeEventListener("touchmove", onTouchMove);
        document.removeEventListener("mouseup", onPointerUp);
        document.removeEventListener("touchend", onPointerUp);
        paper.remove();
        graph.clear();
      };
    });
  }, []);

  return (
    <div className="my-8 rounded-xl border border-zinc-800 bg-zinc-900/50 overflow-hidden">
      <div
        ref={containerRef}
        className="w-full h-[400px] overflow-hidden touch-none select-none"
        style={{ minHeight: 400 }}
      />
    </div>
  );
}
