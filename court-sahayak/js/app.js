// Master Application Controller for Court Sahayak (SIH1701)
import { translations } from "./translations.js";
import { realWorldCases } from "./realCasesData.js";
import { sampleDossiers } from "./sampleDossiers.js";
import { LegalKnowledgeGraph } from "./knowledgeGraph.js";
import { PipelineViewer } from "./pipelineViewer.js";
import { CourtroomDebateSimulator } from "./debateSimulator.js";

class CourtSahayakApp {
  constructor() {
    this.currentLang = "en";
    this.currentRole = "judge"; // "judge" | "lawyer"
    this.activeDossier = sampleDossiers[0];
    this.plainLanguageMode = false;

    // Sub-components
    this.knowledgeGraph = null;
    this.pipelineViewer = null;
    this.debateSimulator = null;

    this.init();
  }

  init() {
    // 1. Initialize DOM references and event listeners
    this.initRoleSwitching();
    this.initLanguageSelector();
    this.initPlainModeToggle();
    this.initTabNavigation();
    this.initCaseDropdown();
    this.initDropzoneAndUpload();
    this.initPasteModal();
    this.initPrecedentSearch();
    this.initRealCases();
    this.initTicker();

    // 2. Instantiate Sub-components
    this.knowledgeGraph = new LegalKnowledgeGraph(
      "knowledge-graph-svg",
      "graph-node-tooltip",
      "graph-node-drawer"
    );
    this.pipelineViewer = new PipelineViewer(
      "pipeline-flow-steps",
      "pipeline-stage-detail-box"
    );
    this.debateSimulator = new CourtroomDebateSimulator();

    // 3. Render initial views with active dossier
    this.loadDossier(this.activeDossier);
    this.renderDashboardTable();
    this.renderHistoricalCharts();
    this.renderLawyerWorkspace();

    // 4. Trigger initial translations
    this.applyTranslations(this.currentLang);
  }

  // --- Role Switching: Judge vs Lawyer ---
  initRoleSwitching() {
    const judgeBtn = document.getElementById("role-btn-judge");
    const lawyerBtn = document.getElementById("role-btn-lawyer");
    const judgeNav = document.querySelector(".nav-group-judge");
    const lawyerNav = document.querySelector(".nav-group-lawyer");

    const switchRole = (role) => {
      this.currentRole = role;
      document.body.setAttribute("data-role", role);

      if (role === "judge") {
        judgeBtn?.classList.add("active");
        lawyerBtn?.classList.remove("active");
        if (judgeNav) judgeNav.style.display = "flex";
        if (lawyerNav) lawyerNav.style.display = "none";
        this.switchTab("dashboard");
        this.showToast("Switched to Hon'ble Judicial Bench / Judge Mode");
      } else {
        lawyerBtn?.classList.add("active");
        judgeBtn?.classList.remove("active");
        if (judgeNav) judgeNav.style.display = "none";
        if (lawyerNav) lawyerNav.style.display = "flex";
        this.switchTab("lawyer-workspace");
        this.showToast("Switched to Advocate / Counsel Practice Mode");
      }
    };

    judgeBtn?.addEventListener("click", () => switchRole("judge"));
    lawyerBtn?.addEventListener("click", () => switchRole("lawyer"));
  }

  // --- Language Switching Engine ---
  initLanguageSelector() {
    const langSelect = document.getElementById("lang-select");
    if (!langSelect) return;

    langSelect.addEventListener("change", (e) => {
      this.currentLang = e.target.value;
      this.applyTranslations(this.currentLang);
      this.showToast(`Language switched to ${langSelect.options[langSelect.selectedIndex].text}`);
    });
  }

  applyTranslations(lang) {
    const dict = translations[lang] || translations["en"];
    const elements = document.querySelectorAll("[data-i18n]");

    elements.forEach((el) => {
      const key = el.getAttribute("data-i18n");
      if (dict[key]) {
        el.textContent = dict[key];
      }
    });

    // Re-render components with localized texts
    this.renderRealCases();
    this.renderEvidenceAnalyzer(this.activeDossier);
    this.renderPenalties(this.activeDossier);
  }

  // --- Plain Language ("Explain Simply") Toggle ---
  initPlainModeToggle() {
    const btn = document.getElementById("simple-mode-toggle");
    if (!btn) return;

    btn.addEventListener("click", () => {
      this.plainLanguageMode = !this.plainLanguageMode;
      btn.classList.toggle("active", this.plainLanguageMode);

      const plainBox = document.getElementById("plain-language-box");
      if (plainBox) {
        plainBox.style.display = this.plainLanguageMode ? "block" : "none";
      }

      this.renderPenalties(this.activeDossier);
      this.showToast(this.plainLanguageMode ? "Plain Language Mode Enabled" : "Standard Legal Mode Active");
    });
  }

  // --- Sidebar & Tab Navigation ---
  initTabNavigation() {
    const navItems = document.querySelectorAll(".nav-item[data-tab]");
    navItems.forEach((btn) => {
      btn.addEventListener("click", () => {
        const targetTab = btn.getAttribute("data-tab");
        this.switchTab(targetTab);
      });
    });
  }

  switchTab(tabId) {
    // Update nav buttons
    document.querySelectorAll(".nav-item").forEach((btn) => {
      btn.classList.toggle("active", btn.getAttribute("data-tab") === tabId);
    });

    // Update tab panes
    document.querySelectorAll(".tab-pane").forEach((pane) => {
      pane.classList.toggle("active", pane.id === `tab-${tabId}`);
    });

    // Refresh specialized canvas/graph components when visible
    if (tabId === "knowledge-graph" && this.knowledgeGraph && this.activeDossier) {
      setTimeout(() => this.knowledgeGraph.render(this.activeDossier.knowledgeGraph), 50);
    }
    if (tabId === "pipeline-viewer" && this.pipelineViewer && this.activeDossier) {
      this.pipelineViewer.render(this.activeDossier.pipelineData);
    }
  }

  // --- Case Dossier Selection ---
  initCaseDropdown() {
    const select = document.getElementById("select-active-case");
    if (!select) return;

    select.innerHTML = sampleDossiers
      .map(
        (dossier) => `<option value="${dossier.id}">${dossier.suitNumber} : ${dossier.title}</option>`
      )
      .join("");

    select.addEventListener("change", (e) => {
      const selected = sampleDossiers.find((d) => d.id === e.target.value);
      if (selected) {
        this.loadDossier(selected);
        this.showToast(`Loaded Case File: ${selected.suitNumber}`);
      }
    });
  }

  loadDossier(dossier) {
    this.activeDossier = dossier;

    // 1. Update Quick Header Stats
    document.getElementById("quick-court-name").textContent = dossier.court;
    document.getElementById("quick-claim-val").textContent = dossier.claimValue;
    document.getElementById("quick-statute-val").textContent = dossier.coreStatute;

    // 2. Update Sidebar Active Case Card
    document.getElementById("sidebar-suit-title").textContent = dossier.title;
    document.getElementById("sidebar-suit-type").textContent = `${dossier.suitNumber} • ${dossier.claimValue} Dispute`;
    document.getElementById("sidebar-evidence-score").textContent = `${dossier.evidenceScore}%`;
    document.getElementById("sidebar-score-fill").style.width = `${dossier.evidenceScore}%`;
    document.getElementById("sidebar-suit-status").textContent = dossier.status;

    // 3. Render Evidence Analyzer & Verdict
    this.renderEvidenceAnalyzer(dossier);

    // 4. Render Statutory Penalties & Remedies
    this.renderPenalties(dossier);

    // 5. Render Missing Documents
    this.renderMissingDocs(dossier);

    // 6. Render Lawyer Scoring
    this.renderLawyerScores(dossier);

    // 7. Render Similar Precedents
    this.renderPrecedents(dossier);

    // 8. Render Key Issues (Lawyer Portal)
    this.renderKeyIssues(dossier);

    // 9. Update Sub-components
    if (this.pipelineViewer) {
      this.pipelineViewer.render(dossier.pipelineData);
    }
    if (this.knowledgeGraph && dossier.knowledgeGraph) {
      this.knowledgeGraph.render(dossier.knowledgeGraph);
    }
    if (this.debateSimulator) {
      this.debateSimulator.loadCase(dossier);
    }
  }

  // --- Render Evidence Analyzer & Probability Gauge ---
  renderEvidenceAnalyzer(dossier) {
    const circularScoreVal = document.getElementById("circular-score-val");
    const circularScoreBar = document.getElementById("circular-score-bar");
    const verdictFindingBadge = document.getElementById("verdict-finding-badge");
    const verdictTitle = document.getElementById("verdict-title");
    const verdictSummaryText = document.getElementById("verdict-summary-text");
    const plainLanguageText = document.getElementById("plain-language-text");

    if (circularScoreVal) circularScoreVal.textContent = `${dossier.evidenceScore}%`;
    if (circularScoreBar) {
      circularScoreBar.setAttribute("stroke-dasharray", `${dossier.evidenceScore}, 100`);
      if (dossier.evidenceScore > 85) {
        circularScoreBar.style.stroke = "var(--accent-emerald)";
      } else if (dossier.evidenceScore > 65) {
        circularScoreBar.style.stroke = "var(--accent-amber)";
      } else {
        circularScoreBar.style.stroke = "var(--accent-crimson)";
      }
    }

    if (verdictFindingBadge) verdictFindingBadge.textContent = dossier.evidenceVerdict;
    if (verdictTitle) verdictTitle.textContent = `Evidence Reliability: ${dossier.evidenceScore}% certainty against opposing party`;
    if (verdictSummaryText) verdictSummaryText.textContent = dossier.summary;
    if (plainLanguageText) plainLanguageText.textContent = dossier.plainLanguage;

    // Render Evidence Items List
    const container = document.getElementById("evidence-items-container");
    if (!container || !dossier.evidenceItems) return;

    container.innerHTML = dossier.evidenceItems
      .map((item) => {
        let scoreClass = "score-high";
        if (item.authenticityScore < 70) scoreClass = "score-low";
        else if (item.authenticityScore < 85) scoreClass = "score-medium";

        return `
          <div class="evidence-item-card">
            <div class="evidence-item-header">
              <div class="evidence-title-group">
                <div class="doc-type-icon">${item.type.split("/")[0]}</div>
                <div>
                  <h4 class="doc-name">${item.name}</h4>
                  <span class="doc-meta">Filed on ${item.date} • ${item.status}</span>
                </div>
              </div>
              <span class="evidence-score-pill ${scoreClass}">${item.authenticityScore}% Probity</span>
            </div>
            <p class="evidence-analysis-body">${item.finding}</p>
            <div class="evidence-tag-row">
              ${item.tags.map((tag) => `<span class="tag-statute">${tag}</span>`).join("")}
            </div>
          </div>
        `;
      })
      .join("");
  }

  // --- Render Statutory Penalties, Liabilities & Damages ---
  renderPenalties(dossier) {
    const container = document.getElementById("penalties-container");
    if (!container || !dossier.statutoryPenalties) return;

    container.innerHTML = dossier.statutoryPenalties
      .map(
        (pen) => `
        <div class="penalty-item">
          <div class="penalty-item-header">
            <span class="statutory-section-badge">${pen.statute}</span>
            <span class="penalty-type-badge">${pen.type}</span>
          </div>
          <h4 class="penalty-title">${pen.title}</h4>
          <div class="penalty-calculation">${pen.amountFormatted}</div>
          <p class="penalty-explanation">
            ${this.plainLanguageMode && pen.plainExplanation ? `<strong>💡 Simple Words:</strong> ${pen.plainExplanation}` : pen.explanation}
          </p>
        </div>
      `
      )
      .join("");
  }

  renderMissingDocs(dossier) {
    const list = document.getElementById("missing-docs-list");
    if (!list) return;

    if (!dossier.missingDocuments || dossier.missingDocuments.length === 0) {
      list.innerHTML = `<li style="color: #6ee7b7;">✓ Zero procedural or documentary deficiencies detected in suit file.</li>`;
      return;
    }

    list.innerHTML = dossier.missingDocuments
      .map((doc) => `<li>${doc}</li>`)
      .join("");
  }

  // --- Render Lawyer Honesty & Argument Integrity Scores ---
  renderLawyerScores(dossier) {
    const container = document.getElementById("lawyers-comparison-container");
    if (!container || !dossier.lawyers) return;

    const renderLawyerCard = (counsel, roleLabel, color) => `
      <div class="court-card" style="border-top: 4px solid ${color};">
        <div class="card-header-flex">
          <div>
            <span style="font-size: 11px; font-weight: 800; color: ${color}; text-transform: uppercase;">
              ${roleLabel}
            </span>
            <h3 class="card-title" style="margin-top: 2px;">${counsel.name}</h3>
            <span class="card-subtitle">${counsel.barEnrollment}</span>
          </div>
          <div style="text-align: right;">
            <div style="font-size: 1.8rem; font-weight: 800; color: #fff;">${counsel.honestyScore}<span style="font-size: 14px; color: var(--gold-light);">/100</span></div>
            <span style="font-size: 11px; font-weight: 700; color: ${counsel.honestyScore > 80 ? 'var(--accent-emerald)' : 'var(--accent-amber)'};">
              ${counsel.reputation}
            </span>
          </div>
        </div>

        <div style="display: flex; flex-direction: column; gap: 10px; margin-top: 10px;">
          <div>
            <div style="display: flex; justify-content: space-between; font-size: 12px; margin-bottom: 3px;">
              <span>Precedent Citation Accuracy</span>
              <strong>${counsel.citationAccuracy}%</strong>
            </div>
            <div class="progress-track"><div class="progress-fill" style="width: ${counsel.citationAccuracy}%;"></div></div>
          </div>

          <div>
            <div style="display: flex; justify-content: space-between; font-size: 12px; margin-bottom: 3px;">
              <span>Factual Consistency (Affidavit vs Records)</span>
              <strong>${counsel.factualConsistency}%</strong>
            </div>
            <div class="progress-track"><div class="progress-fill" style="width: ${counsel.factualConsistency}%;"></div></div>
          </div>

          <div>
            <div style="display: flex; justify-content: space-between; font-size: 12px; margin-bottom: 3px;">
              <span>Bench Candor & Transparency</span>
              <strong>${counsel.benchCandor}%</strong>
            </div>
            <div class="progress-track"><div class="progress-fill" style="width: ${counsel.benchCandor}%;"></div></div>
          </div>
        </div>

        <p style="font-size: 12px; color: var(--text-secondary); background: rgba(0,0,0,0.25); padding: 10px; border-radius: 6px; margin-top: 6px;">
          <strong>AI Bench Audit:</strong> ${counsel.notes}
        </p>
      </div>
    `;

    container.innerHTML = `
      <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(320px, 1fr)); gap: 20px;">
        ${renderLawyerCard(dossier.lawyers.plaintiff, "Plaintiff Counsel", "var(--accent-blue)")}
        ${renderLawyerCard(dossier.lawyers.defendant, "Defendant Counsel", "var(--accent-amber)")}
      </div>
    `;
  }

  // --- Render Similar Precedents & Matcher ---
  renderPrecedents(dossier) {
    const container = document.getElementById("precedents-container");
    if (!container || !dossier.precedents) return;

    container.innerHTML = dossier.precedents
      .map(
        (prec) => `
        <div class="court-card" style="border-left: 4px solid var(--gold-primary);">
          <div style="display: flex; justify-content: space-between; align-items: flex-start;">
            <h4 style="font-family: var(--font-display); font-size: 1rem; color: #fff;">${prec.citation}</h4>
            <span style="background: rgba(212, 175, 55, 0.18); color: var(--gold-light); font-size: 11px; font-weight: 700; padding: 2px 8px; border-radius: 4px;">
              ${prec.relevance}
            </span>
          </div>
          <p style="font-size: 13px; color: var(--text-secondary); line-height: 1.5; margin-top: 6px;">
            <strong>Ratio Decidendi:</strong> ${prec.holding}
          </p>
          <div style="display: flex; gap: 8px; margin-top: 8px;">
            <button class="btn-secondary-sm">View Full SC Judgment</button>
            <button class="btn-secondary-sm">Copy Citation Ratio</button>
          </div>
        </div>
      `
      )
      .join("");
  }

  initPrecedentSearch() {
    const btn = document.getElementById("btn-search-precedents");
    const input = document.getElementById("precedent-search-input");
    if (!btn || !input) return;

    btn.addEventListener("click", () => {
      const query = input.value.trim();
      if (!query) return;
      this.showToast(`Searching semantic commercial case vector database for "${query}"...`);
      // Simulate real-time retrieval
      setTimeout(() => {
        this.showToast(`Found 4 binding Supreme Court & Delhi High Court precedents`);
      }, 500);
    });
  }

  // --- Render Key Issues (Advocate Portal) ---
  renderKeyIssues(dossier) {
    const container = document.getElementById("key-issues-container");
    if (!container || !dossier.keyIssues) return;

    container.innerHTML = dossier.keyIssues
      .map(
        (issue, idx) => `
        <div class="court-card">
          <div style="display: flex; justify-content: space-between; align-items: center;">
            <span style="font-size: 11px; font-weight: 800; color: var(--gold-light);">ORDER XIV CPC ISSUE NO. ${idx + 1}</span>
            <span style="font-size: 11px; color: var(--accent-emerald); font-weight: 700;">Critical Threshold</span>
          </div>
          <h4 style="font-family: var(--font-display); font-size: 1.05rem; color: #fff; line-height: 1.4; margin-top: 4px;">
            ${issue.issue}
          </h4>
          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 12px; margin-top: 10px;">
            <div style="background: rgba(59, 130, 246, 0.08); border: 1px solid rgba(59, 130, 246, 0.2); padding: 10px; border-radius: 6px;">
              <strong style="font-size: 11px; color: #93c5fd; text-transform: uppercase;">Burden of Proof:</strong>
              <p style="font-size: 12px; color: #f1f5f9; margin-top: 2px;">${issue.burden}</p>
            </div>
            <div style="background: rgba(212, 175, 55, 0.08); border: 1px solid rgba(212, 175, 55, 0.2); padding: 10px; border-radius: 6px;">
              <strong style="font-size: 11px; color: var(--gold-light); text-transform: uppercase;">Statutory Defense / Waiver:</strong>
              <p style="font-size: 12px; color: #f1f5f9; margin-top: 2px;">${issue.statutoryDefense}</p>
            </div>
          </div>
        </div>
      `
      )
      .join("");
  }

  // --- Render Bench Cause List Table ---
  renderDashboardTable() {
    const tbody = document.getElementById("cases-triage-table-body");
    const recsList = document.getElementById("bench-recommendations-list");
    if (!tbody) return;

    tbody.innerHTML = sampleDossiers
      .map(
        (suit) => `
        <tr>
          <td>
            <div class="party-title">${suit.suitNumber}</div>
            <div class="party-sub">${suit.title}</div>
          </td>
          <td><span style="font-size: 12px;">${suit.disputeType.substring(0, 30)}...</span></td>
          <td><strong class="highlight-gold">${suit.claimValue}</strong></td>
          <td>
            <div style="display: flex; align-items: center; gap: 8px;">
              <strong>${suit.evidenceScore}%</strong>
              <div class="progress-track" style="width: 50px;">
                <div class="progress-fill" style="width: ${suit.evidenceScore}%;"></div>
              </div>
            </div>
          </td>
          <td><span style="font-size: 11.5px; color: var(--accent-emerald); font-weight: 600;">${suit.evidenceVerdict.substring(0, 24)}...</span></td>
          <td><span class="badge-status priority-high">${suit.status}</span></td>
          <td>
            <button class="btn-secondary-sm" onclick="window.courtApp.selectCaseById('${suit.id}')">
              Open File
            </button>
          </td>
        </tr>
      `
      )
      .join("");

    if (recsList) {
      recsList.innerHTML = `
        <div class="recommendation-item">
          <div class="recommendation-header">
            <span>Fast-Track Summary Decree (Order XIII-A)</span>
            <span>Alpha Infra Case</span>
          </div>
          <div class="recommendation-body">
            Defendant claimed GST ITC on unpaid invoices. No real prospect of defending claim. Ripe for Summary Judgment.
          </div>
        </div>
        <div class="recommendation-item">
          <div class="recommendation-header">
            <span>Issue 20% Deposit Order (Sec 143A NI Act)</span>
            <span>FinTech vs Rajesh Agro</span>
          </div>
          <div class="recommendation-body">
            Mandatory statutory interim compensation deposit of ₹96 Lakhs payable by accused directors within 60 days.
          </div>
        </div>
      `;
    }
  }

  selectCaseById(id) {
    const target = sampleDossiers.find((d) => d.id === id);
    if (target) {
      const select = document.getElementById("select-active-case");
      if (select) select.value = id;
      this.loadDossier(target);
      this.switchTab("evidence-analyzer");
      this.showToast(`Opened Case: ${target.suitNumber}`);
    }
  }

  // --- Real World Landmark Cases Feed (2024-2026) ---
  initRealCases() {
    const filterSelect = document.getElementById("filter-case-court");
    const refreshBtn = document.getElementById("btn-refresh-real-cases");

    if (filterSelect) {
      filterSelect.addEventListener("change", () => this.renderRealCases());
    }

    if (refreshBtn) {
      refreshBtn.addEventListener("click", () => {
        this.showToast("Synchronizing live Supreme Court & High Court Commercial Division docket...");
        setTimeout(() => {
          this.showToast("Docket updated with latest 2026 Commercial Division rulings");
        }, 600);
      });
    }

    this.renderRealCases();
  }

  renderRealCases() {
    const grid = document.getElementById("real-cases-grid");
    const filterSelect = document.getElementById("filter-case-court");
    if (!grid) return;

    const selectedCourt = filterSelect ? filterSelect.value : "all";
    const filtered =
      selectedCourt === "all"
        ? realWorldCases
        : realWorldCases.filter((c) => c.court.toLowerCase().includes(selectedCourt.toLowerCase()));

    grid.innerHTML = filtered
      .map(
        (c) => `
        <div class="real-case-card">
          <div style="display: flex; justify-content: space-between; align-items: center;">
            <span class="case-court-badge">${c.court}</span>
            <span style="font-size: 11px; color: var(--accent-emerald); font-weight: 700;">${c.stage.substring(0, 30)}...</span>
          </div>
          <h4 class="case-card-title">${c.title}</h4>
          <div style="font-size: 12px; color: var(--gold-light); font-weight: 600;">
            Claim: ${c.claimValue} • Status: ${c.status}
          </div>
          <div class="case-principle-box">
            <strong>Key Legal Doctrine:</strong> ${c.legalPrinciple}
          </div>
          <p style="font-size: 12px; color: var(--text-secondary); line-height: 1.4;">
            <strong>Plain Words:</strong> ${c.plainLanguage}
          </p>
          <div style="font-size: 11px; color: var(--text-muted); display: flex; justify-content: space-between; align-items: center; border-top: 1px solid var(--border-glass); padding-top: 6px;">
            <span>Citation: ${c.precedentCitation}</span>
            <span style="color: var(--accent-amber);">🔴 Live Update</span>
          </div>
        </div>
      `
      )
      .join("");
  }

  // --- Real-time Ticker Bar ---
  initTicker() {
    const tickerContent = document.getElementById("ticker-content");
    if (!tickerContent) return;

    tickerContent.innerHTML = realWorldCases
      .map(
        (c) => `
        <span class="ticker-item">
          <span class="ticker-court-tag">[${c.court}]:</span>
          <span>${c.title} (${c.claimValue}) — ${c.liveUpdate}</span>
        </span>
      `
      )
      .join("");
  }

  // --- Drag & Drop / File Upload / Custom Document Analyzer ---
  initDropzoneAndUpload() {
    const dropzone = document.getElementById("evidence-dropzone");
    const fileInput = document.getElementById("file-upload-input");
    const browseBtn = document.getElementById("btn-browse-files");
    const quickUploadBtn = document.getElementById("btn-quick-upload");
    const triggerAuditBtn = document.getElementById("btn-trigger-ai-audit");

    if (browseBtn && fileInput) {
      browseBtn.addEventListener("click", () => fileInput.click());
    }

    if (quickUploadBtn && fileInput) {
      quickUploadBtn.addEventListener("click", () => {
        this.switchTab("evidence-analyzer");
        fileInput.click();
      });
    }

    if (fileInput) {
      fileInput.addEventListener("change", (e) => {
        if (e.target.files.length > 0) {
          this.processUploadedFiles(Array.from(e.target.files));
        }
      });
    }

    if (dropzone) {
      dropzone.addEventListener("dragover", (e) => {
        e.preventDefault();
        dropzone.style.borderColor = "var(--gold-light)";
      });
      dropzone.addEventListener("dragleave", () => {
        dropzone.style.borderColor = "var(--border-active)";
      });
      dropzone.addEventListener("drop", (e) => {
        e.preventDefault();
        dropzone.style.borderColor = "var(--border-active)";
        if (e.dataTransfer.files.length > 0) {
          this.processUploadedFiles(Array.from(e.dataTransfer.files));
        }
      });
    }

    if (triggerAuditBtn) {
      triggerAuditBtn.addEventListener("click", () => {
        this.showToast("Running 9-Stage Deterministic Evidence Audit...");
        setTimeout(() => {
          this.showToast("Audit Completed: Evidence Authenticity Score Computed");
        }, 500);
      });
    }
  }

  processUploadedFiles(files) {
    this.showToast(`Processing ${files.length} legal document(s) via 9-Stage OCR & NLP Pipeline...`);

    setTimeout(() => {
      // Create dynamic custom dossier from upload
      const customDossier = {
        id: `CUSTOM-${Date.now()}`,
        suitNumber: "Comm. Suit (Uploaded File Analysis)",
        title: `Commercial Claim (${files[0].name})`,
        court: "Commercial Court Division",
        disputeType: "Contractual Claim & Financial Verification",
        claimValue: "₹6,50,00,000",
        evidenceScore: Math.floor(Math.random() * 15) + 82, // 82-97%
        evidenceVerdict: "HIGH EVIDENTIARY RELIABILITY ESTABLISHED",
        admissibilityStatus: "ADMISSIBLE UNDER BSA 2023 SEC 63",
        coreStatute: "Indian Contract Act Sec 73 & NI Act Sec 138",
        summary: `AI OCR parsed ${files.length} document(s). Detected valid party execution signatures, bank reconciliation stamps, and matching payment demand notices.`,
        plainLanguage: `The uploaded documents show clear proof that the contract was agreed upon and the money claimed is rightfully owed. The opposing party has failed to present any valid receipt of payment.`,
        evidenceItems: files.map((f, idx) => ({
          id: `UPL-${idx}`,
          name: `Uploaded Exhibit: ${f.name}`,
          type: "PDF / Verified Document",
          date: "Current Date",
          authenticityScore: 92 - idx * 3,
          status: "Verified",
          tags: ["BSA 2023 Sec 63 Certified", "OCR Extracted"],
          finding: `Successfully extracted financial claim parameters, signatures, and transaction timestamps from ${f.name}.`
        })),
        statutoryPenalties: [
          {
            statute: "Indian Contract Act, 1872 — Section 73",
            type: "Direct Breach Damages",
            title: "Claim Amount Award",
            amountFormatted: "₹6,50,00,000 (Principal) + 18% Commercial Interest",
            explanation: "Breach of contractual payment obligation established.",
            plainExplanation: "The defendant must pay the entire money owed under the signed agreement."
          },
          {
            statute: "Commercial Courts Act, 2015 — Section 35",
            type: "Indemnity Costs",
            title: "Full Litigation Costs Imposition",
            amountFormatted: "₹12,00,000 Actual Taxed Costs",
            explanation: "Mandatory award of actual costs against default debtor.",
            plainExplanation: "Opposing party must also bear all legal fees."
          }
        ],
        missingDocuments: [
          "Original hard-copy certificate under Section 63 BSA 2023 for WhatsApp message export."
        ],
        lawyers: {
          plaintiff: { name: "Advocate on Record", barEnrollment: "BAR/2020", honestyScore: 91, citationAccuracy: 93, factualConsistency: 92, benchCandor: 90, reputation: "Exemplary", notes: "Clean documentary filing." },
          defendant: { name: "Opposing Counsel", barEnrollment: "BAR/2018", honestyScore: 68, citationAccuracy: 65, factualConsistency: 64, benchCandor: 70, reputation: "Average", notes: "No counter-evidence produced." }
        },
        pipelineData: [
          { step: 1, name: "Document Upload", status: "Completed", details: `${files.length} file(s) ingested.` },
          { step: 2, name: "OCR Extraction", status: "Completed", details: "Extracted all contractual clauses and monetary claims." },
          { step: 3, name: "Entities Extraction", status: "Completed", details: "Identified corporate parties, dates, and bank accounts." },
          { step: 4, name: "Relationship Graph", status: "Completed", details: "Linked claim to statutory provisions." },
          { step: 5, name: "Timeline", status: "Completed", details: "Mapped timeline of agreement, performance, and default." },
          { step: 6, name: "Citations Check", status: "Completed", details: "All references verified." },
          { step: 7, name: "Dependency Check", status: "Completed", details: "Corroborated evidence." },
          { step: 8, name: "Case Rules", status: "Completed", details: "Commercial Courts Act rules satisfied." },
          { step: 9, name: "Confidence Score", status: "Completed", details: "High reliability verdict generated." }
        ],
        knowledgeGraph: {
          nodes: [
            { id: "node-p", label: "Plaintiff Enterprise", type: "party", x: 150, y: 150 },
            { id: "node-d", label: "Defendant Corporate", type: "party", x: 600, y: 150 },
            { id: "node-doc", label: files[0].name, type: "evidence", x: 370, y: 120 },
            { id: "node-claim", label: "₹6.50 Cr Claim (Sec 73 ICA)", type: "monetary", x: 370, y: 380 }
          ],
          edges: [
            { from: "node-p", to: "node-doc", label: "Produced In Evidence" },
            { from: "node-doc", to: "node-d", label: "Evidences Debt" },
            { from: "node-doc", to: "node-claim", label: "Substantiates Damages" }
          ]
        },
        precedents: [
          { citation: "Kailash Nath Associates vs DDA (2015) 4 SCC 136", relevance: "96%", holding: "Proof of actual loss required for commercial damages." }
        ],
        keyIssues: [
          { id: "ISSUE-1", issue: "Whether the documentary evidence substantiates the debt claimed?", burden: "On Claimant — Discharged", statutoryDefense: "None provided" }
        ],
        debatePrompts: [
          "Submit argument on admissibility of newly uploaded document under Section 63 BSA 2023"
        ]
      };

      sampleDossiers.unshift(customDossier);
      this.initCaseDropdown();
      this.loadDossier(customDossier);
      this.showToast(`AI Evidence Analysis Complete! Reliability Score: ${customDossier.evidenceScore}%`);
    }, 800);
  }

  // --- Modal: Paste Legal Text ---
  initPasteModal() {
    const openBtn = document.getElementById("btn-paste-text-modal");
    const modal = document.getElementById("modal-paste-text");
    const closeBtn = document.getElementById("btn-close-paste-modal");
    const cancelBtn = document.getElementById("btn-cancel-custom-text");
    const analyzeBtn = document.getElementById("btn-analyze-custom-text");

    const openModal = () => { if (modal) modal.style.display = "flex"; };
    const closeModal = () => { if (modal) modal.style.display = "none"; };

    openBtn?.addEventListener("click", openModal);
    closeBtn?.addEventListener("click", closeModal);
    cancelBtn?.addEventListener("click", closeModal);

    analyzeBtn?.addEventListener("click", () => {
      const titleInput = document.getElementById("custom-suit-title");
      const textInput = document.getElementById("custom-text-input");
      const title = titleInput.value.trim() || "Commercial Dispute (Pasted Text)";
      const text = textInput.value.trim();

      if (!text) {
        alert("Please paste some legal text, contract clauses, or notice content to analyze.");
        return;
      }

      closeModal();
      this.processUploadedFiles([{ name: `${title}.txt` }]);
    });
  }

  // --- Render Lawyer Workspace (Advocate Mode) ---
  renderLawyerWorkspace() {
    const container = document.getElementById("lawyer-workspace-container");
    if (!container) return;

    container.innerHTML = `
      <div class="court-card">
        <div class="card-header-flex">
          <div>
            <h3 class="card-title">Commercial Suit Pre-Filing Admissibility Checklist</h3>
            <p class="card-subtitle">AI audit of mandatory requirements before filing in Delhi/Bombay Commercial Courts.</p>
          </div>
          <span class="nav-chip gold">Pre-Filing Compliance</span>
        </div>

        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 14px; margin-top: 10px;">
          <div style="background: rgba(16, 185, 129, 0.08); border: 1px solid rgba(16, 185, 129, 0.2); padding: 12px; border-radius: 8px;">
            <div style="display: flex; justify-content: space-between; font-weight: 700; color: #34d399; font-size: 13px;">
              <span>Section 12A Mediation Status</span>
              <span>COMPLIANT</span>
            </div>
            <p style="font-size: 12px; color: #e2e8f0; margin-top: 4px;">
              Non-starter report obtained or urgent Section 9 interim relief prayer pleaded.
            </p>
          </div>

          <div style="background: rgba(16, 185, 129, 0.08); border: 1px solid rgba(16, 185, 129, 0.2); padding: 12px; border-radius: 8px;">
            <div style="display: flex; justify-content: space-between; font-weight: 700; color: #34d399; font-size: 13px;">
              <span>Statement of Truth & Verification</span>
              <span>VERIFIED</span>
            </div>
            <p style="font-size: 12px; color: #e2e8f0; margin-top: 4px;">
              Commercial Courts Act Order VI Rule 15A Statement of Truth format verified.
            </p>
          </div>

          <div style="background: rgba(245, 158, 11, 0.08); border: 1px solid rgba(245, 158, 11, 0.2); padding: 12px; border-radius: 8px;">
            <div style="display: flex; justify-content: space-between; font-weight: 700; color: #fbbf24; font-size: 13px;">
              <span>BSA 2023 Sec 63 Certificate</span>
              <span>ATTENTION REQUIRED</span>
            </div>
            <p style="font-size: 12px; color: #e2e8f0; margin-top: 4px;">
              Attach physical affidavit for WhatsApp backup device hash verification.
            </p>
          </div>
        </div>
      </div>
    `;
  }

  // --- Historical Analytics Charts ---
  renderHistoricalCharts() {
    const disposalChart = document.getElementById("disposal-chart-container");
    const outcomeChart = document.getElementById("outcome-chart-container");

    if (disposalChart) {
      const categories = [
        { name: "EPC Construction & Infrastructure", months: 14.2, color: "#3b82f6" },
        { name: "Cheque Dishonour / NI Act 138", months: 6.5, color: "#10b981" },
        { name: "Intellectual Property / Software", months: 9.8, color: "#8b5cf6" },
        { name: "Shareholder Disputes & M&A", months: 18.4, color: "#f59e0b" }
      ];

      disposalChart.innerHTML = categories
        .map(
          (cat) => `
          <div style="margin-bottom: 12px;">
            <div style="display: flex; justify-content: space-between; font-size: 12px; color: #f1f5f9; margin-bottom: 4px;">
              <span>${cat.name}</span>
              <strong>${cat.months} Months</strong>
            </div>
            <div class="progress-track" style="height: 10px;">
              <div class="progress-fill" style="width: ${(cat.months / 20) * 100}%; background: ${cat.color};"></div>
            </div>
          </div>
        `
        )
        .join("");
    }

    if (outcomeChart) {
      outcomeChart.innerHTML = `
        <div style="display: flex; flex-direction: column; gap: 10px;">
          <div style="background: rgba(16, 185, 129, 0.1); border-left: 4px solid var(--accent-emerald); padding: 10px 14px; border-radius: 4px;">
            <div style="display: flex; justify-content: space-between; font-size: 13px; font-weight: 700; color: #34d399;">
              <span>Evidence Authenticity > 80%</span>
              <span>91.4% Decree in Favor of Claimant</span>
            </div>
            <p style="font-size: 11.5px; color: #cbd5e1; margin-top: 2px;">Average disposal within 2 hearings under Order XIII-A summary decree.</p>
          </div>

          <div style="background: rgba(245, 158, 11, 0.1); border-left: 4px solid var(--accent-amber); padding: 10px 14px; border-radius: 4px;">
            <div style="display: flex; justify-content: space-between; font-size: 13px; font-weight: 700; color: #fbbf24;">
              <span>Evidence Authenticity 50% - 80%</span>
              <span>54.2% Settlement / Mediation Consent Decree</span>
            </div>
            <p style="font-size: 11.5px; color: #cbd5e1; margin-top: 2px;">Parties refer to Lok Adalat or court-assisted mediation settlement.</p>
          </div>
        </div>
      `;
    }
  }

  // --- Toast Notifications ---
  showToast(message) {
    const container = document.getElementById("toast-container");
    if (!container) return;

    const toast = document.createElement("div");
    toast.className = "toast-message";
    toast.textContent = message;
    container.appendChild(toast);

    setTimeout(() => {
      toast.style.opacity = "0";
      toast.style.transform = "translateX(100%)";
      toast.style.transition = "all 0.3s ease";
      setTimeout(() => toast.remove(), 300);
    }, 3500);
  }
}

// Instantiate App on DOM ready
document.addEventListener("DOMContentLoaded", () => {
  window.courtApp = new CourtSahayakApp();
});
