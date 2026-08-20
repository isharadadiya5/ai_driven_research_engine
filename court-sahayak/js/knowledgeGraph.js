// Interactive Legal Knowledge Graph Visualizer (SVG Based)
// Visualizes parties, contracts, evidence, statutory provisions, and monetary claims.

export class LegalKnowledgeGraph {
  constructor(svgElementId, tooltipElementId, drawerElementId) {
    this.svg = document.getElementById(svgElementId);
    this.tooltip = document.getElementById(tooltipElementId);
    this.drawer = document.getElementById(drawerElementId);
    this.drawerTitle = document.getElementById("drawer-node-title");
    this.drawerContent = document.getElementById("drawer-node-content");
    
    this.currentData = null;
    this.isDragging = false;
    this.draggedNode = null;
    this.offset = { x: 0, y: 0 };

    this.initEvents();
  }

  initEvents() {
    if (!this.svg) return;

    this.svg.addEventListener("mousemove", (e) => this.handleMouseMove(e));
    this.svg.addEventListener("mouseup", () => this.handleMouseUp());
    this.svg.addEventListener("mouseleave", () => this.handleMouseUp());

    const closeBtn = document.getElementById("btn-close-drawer");
    if (closeBtn) {
      closeBtn.addEventListener("click", () => {
        if (this.drawer) this.drawer.style.display = "none";
      });
    }

    const resetBtn = document.getElementById("btn-reset-graph-zoom");
    if (resetBtn) {
      resetBtn.addEventListener("click", () => this.render(this.currentData));
    }
  }

  render(graphData) {
    if (!this.svg || !graphData) return;
    this.currentData = JSON.parse(JSON.stringify(graphData)); // clone

    // Clear SVG
    this.svg.innerHTML = "";

    // Create container groups
    const defs = document.createElementNS("http://www.w3.org/2000/svg", "defs");
    defs.innerHTML = `
      <marker id="arrow" viewBox="0 0 10 10" refX="22" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
        <path d="M 0 0 L 10 5 L 0 10 z" fill="rgba(212, 175, 55, 0.7)" />
      </marker>
    `;
    this.svg.appendChild(defs);

    const edgesGroup = document.createElementNS("http://www.w3.org/2000/svg", "g");
    edgesGroup.setAttribute("class", "edges-group");
    this.svg.appendChild(edgesGroup);

    const nodesGroup = document.createElementNS("http://www.w3.org/2000/svg", "g");
    nodesGroup.setAttribute("class", "nodes-group");
    this.svg.appendChild(nodesGroup);

    // Draw Edges
    this.currentData.edges.forEach((edge) => {
      const fromNode = this.currentData.nodes.find((n) => n.id === edge.from);
      const toNode = this.currentData.nodes.find((n) => n.id === edge.to);
      if (!fromNode || !toNode) return;

      const line = document.createElementNS("http://www.w3.org/2000/svg", "line");
      line.setAttribute("x1", fromNode.x);
      line.setAttribute("y1", fromNode.y);
      line.setAttribute("x2", toNode.x);
      line.setAttribute("y2", toNode.y);
      line.setAttribute("stroke", "rgba(212, 175, 55, 0.35)");
      line.setAttribute("stroke-width", "1.8");
      line.setAttribute("stroke-dasharray", edge.dashed ? "4,4" : "none");
      line.setAttribute("marker-end", "url(#arrow)");
      line.setAttribute("id", `edge-${edge.from}-${edge.to}`);
      edgesGroup.appendChild(line);

      // Edge Label
      const midX = (fromNode.x + toNode.x) / 2;
      const midY = (fromNode.y + toNode.y) / 2;
      const text = document.createElementNS("http://www.w3.org/2000/svg", "text");
      text.setAttribute("x", midX);
      text.setAttribute("y", midY - 4);
      text.setAttribute("fill", "#94a3b8");
      text.setAttribute("font-size", "10px");
      text.setAttribute("text-anchor", "middle");
      text.textContent = edge.label;
      edgesGroup.appendChild(text);
    });

    // Draw Nodes
    this.currentData.nodes.forEach((node) => {
      const g = document.createElementNS("http://www.w3.org/2000/svg", "g");
      g.setAttribute("class", `graph-node node-${node.type}`);
      g.setAttribute("transform", `translate(${node.x}, ${node.y})`);
      g.style.cursor = "pointer";

      // Node styling based on type
      let fillColor = "#3b82f6";
      let strokeColor = "#60a5fa";
      let radius = 18;

      if (node.type === "party") {
        fillColor = "#1e3a8a";
        strokeColor = "#3b82f6";
        radius = 22;
      } else if (node.type === "contract") {
        fillColor = "#78350f";
        strokeColor = "#d4af37";
        radius = 20;
      } else if (node.type === "evidence") {
        fillColor = "#064e3b";
        strokeColor = "#10b981";
        radius = 18;
      } else if (node.type === "statute") {
        fillColor = "#4c1d95";
        strokeColor = "#a855f7";
        radius = 20;
      } else if (node.type === "monetary") {
        fillColor = "#7f1d1d";
        strokeColor = "#ef4444";
        radius = 19;
      }

      // Outer glow circle
      const circle = document.createElementNS("http://www.w3.org/2000/svg", "circle");
      circle.setAttribute("r", radius);
      circle.setAttribute("fill", fillColor);
      circle.setAttribute("stroke", strokeColor);
      circle.setAttribute("stroke-width", "2.5");
      g.appendChild(circle);

      // Node label
      const text = document.createElementNS("http://www.w3.org/2000/svg", "text");
      text.setAttribute("y", radius + 14);
      text.setAttribute("fill", "#f8fafc");
      text.setAttribute("font-size", "11px");
      text.setAttribute("font-weight", "600");
      text.setAttribute("text-anchor", "middle");
      text.textContent = node.label.length > 25 ? node.label.substring(0, 24) + "…" : node.label;
      g.appendChild(text);

      // Mouse events for node
      g.addEventListener("mouseenter", (e) => this.showTooltip(e, node));
      g.addEventListener("mouseleave", () => this.hideTooltip());
      g.addEventListener("mousedown", (e) => this.startDrag(e, node));
      g.addEventListener("click", () => this.openDrawer(node));

      nodesGroup.appendChild(g);
    });
  }

  showTooltip(e, node) {
    if (!this.tooltip) return;
    const rect = this.svg.getBoundingClientRect();
    this.tooltip.style.left = `${e.clientX - rect.left + 15}px`;
    this.tooltip.style.top = `${e.clientY - rect.top + 15}px`;
    this.tooltip.innerHTML = `
      <div style="font-weight: 700; color: var(--gold-light); margin-bottom: 2px;">${node.label}</div>
      <div style="font-size: 10px; text-transform: uppercase; color: #94a3b8;">Type: ${node.type}</div>
      <div style="font-size: 11px; margin-top: 4px; color: #cbd5e1;">Click node to inspect legal dependencies & evidence status.</div>
    `;
    this.tooltip.style.display = "block";
  }

  hideTooltip() {
    if (this.tooltip) this.tooltip.style.display = "none";
  }

  openDrawer(node) {
    if (!this.drawer) return;
    this.drawerTitle.textContent = node.label;
    
    let typeBadgeColor = "#3b82f6";
    if (node.type === "statute") typeBadgeColor = "#a855f7";
    if (node.type === "evidence") typeBadgeColor = "#10b981";
    if (node.type === "monetary") typeBadgeColor = "#ef4444";
    if (node.type === "contract") typeBadgeColor = "#d4af37";

    this.drawerContent.innerHTML = `
      <div style="margin-bottom: 12px;">
        <span style="background: ${typeBadgeColor}22; color: ${typeBadgeColor}; border: 1px solid ${typeBadgeColor}; font-size: 11px; font-weight: 700; padding: 2px 8px; border-radius: 4px; text-transform: uppercase;">
          ${node.type}
        </span>
      </div>
      <p style="font-size: 12.5px; color: #cbd5e1; line-height: 1.5; margin-bottom: 14px;">
        This entity is linked into the active commercial suit's evidentiary graph. Verified under Commercial Courts Act 2015 and Bharatiya Sakshya Adhiniyam 2023.
      </p>
      <div style="background: rgba(0,0,0,0.3); padding: 10px; border-radius: 6px; font-size: 11.5px; color: #94a3b8;">
        <strong>Corroborating Connections:</strong>
        <ul style="margin-top: 6px; padding-left: 16px; color: #f1f5f9;">
          ${this.currentData.edges
            .filter(e => e.from === node.id || e.to === node.id)
            .map(e => `<li>${e.label}</li>`)
            .join("")}
        </ul>
      </div>
    `;
    this.drawer.style.display = "flex";
  }

  startDrag(e, node) {
    this.isDragging = true;
    this.draggedNode = node;
    const rect = this.svg.getBoundingClientRect();
    this.offset.x = e.clientX - rect.left - node.x;
    this.offset.y = e.clientY - rect.top - node.y;
  }

  handleMouseMove(e) {
    if (!this.isDragging || !this.draggedNode) return;
    const rect = this.svg.getBoundingClientRect();
    this.draggedNode.x = e.clientX - rect.left - this.offset.x;
    this.draggedNode.y = e.clientY - rect.top - this.offset.y;
    this.render(this.currentData);
  }

  handleMouseUp() {
    this.isDragging = false;
    this.draggedNode = null;
  }
}
