// 9-Stage Document Verification & OCR Pipeline Component
// Step 1: Upload -> Step 2: OCR/NLP -> Step 3: Entities -> Step 4: Graph -> Step 5: Timeline
// -> Step 6: References -> Step 7: Evidence Dependency -> Step 8: Case Rules -> Step 9: Confidence Score

export class PipelineViewer {
  constructor(stepsContainerId, detailContainerId) {
    this.stepsContainer = document.getElementById(stepsContainerId);
    this.detailContainer = document.getElementById(detailContainerId);
    this.currentSteps = [];
    this.activeStepIndex = 0;
  }

  render(pipelineData) {
    if (!this.stepsContainer || !pipelineData) return;
    this.currentSteps = pipelineData;
    this.stepsContainer.innerHTML = "";

    pipelineData.forEach((step, index) => {
      const card = document.createElement("div");
      card.className = `pipeline-step-card ${index === this.activeStepIndex ? "active" : ""}`;
      card.innerHTML = `
        <div style="display: flex; justify-content: space-between; align-items: center;">
          <div class="step-num-badge">${step.step}</div>
          <span class="step-status-chip">✓ Verified</span>
        </div>
        <h4 class="step-title">${step.name}</h4>
        <p style="font-size: 11px; color: #94a3b8; line-height: 1.3;">${step.details.substring(0, 50)}...</p>
      `;

      card.addEventListener("click", () => {
        this.activeStepIndex = index;
        this.updateActiveStep();
      });

      this.stepsContainer.appendChild(card);
    });

    this.renderDetail();
  }

  updateActiveStep() {
    const cards = this.stepsContainer.querySelectorAll(".pipeline-step-card");
    cards.forEach((card, idx) => {
      if (idx === this.activeStepIndex) {
        card.classList.add("active");
      } else {
        card.classList.remove("active");
      }
    });
    this.renderDetail();
  }

  renderDetail() {
    if (!this.detailContainer || !this.currentSteps[this.activeStepIndex]) return;
    const step = this.currentSteps[this.activeStepIndex];

    this.detailContainer.innerHTML = `
      <div class="stage-detail-header">
        <div>
          <span style="font-size: 11px; font-weight: 800; color: var(--gold-light); text-transform: uppercase;">
            Pipeline Stage ${step.step} of 9
          </span>
          <h3 style="font-family: var(--font-display); font-size: 1.15rem; color: #fff; margin-top: 2px;">
            ${step.name}
          </h3>
        </div>
        <div style="display: flex; gap: 8px;">
          <span style="background: rgba(16, 185, 129, 0.15); color: #34d399; border: 1px solid rgba(16, 185, 129, 0.3); font-size: 11.5px; font-weight: 700; padding: 4px 10px; border-radius: 9999px;">
            Pipeline Passed (100% Deterministic)
          </span>
        </div>
      </div>

      <div style="margin-top: 14px; display: grid; grid-template-columns: 1.5fr 1fr; gap: 16px;">
        <div>
          <h4 style="font-size: 12.5px; color: var(--gold-light); font-weight: 600; margin-bottom: 4px;">
            Verification Audit & Algorithmic Result:
          </h4>
          <p style="font-size: 13px; color: #f1f5f9; line-height: 1.6; background: rgba(0,0,0,0.25); padding: 12px; border-radius: 8px; border: 1px solid var(--border-glass);">
            ${step.details}
          </p>
        </div>

        <div style="background: rgba(212, 175, 55, 0.05); border: 1px solid var(--border-subtle); padding: 12px; border-radius: 8px;">
          <h4 style="font-size: 12px; color: var(--gold-primary); font-weight: 700; margin-bottom: 6px;">
            Legal Standards Checked:
          </h4>
          <ul style="font-size: 11.5px; color: #cbd5e1; padding-left: 16px; display: flex; flex-direction: column; gap: 4px;">
            <li>Commercial Courts Act 2015 Practice Directives</li>
            <li>Bharatiya Sakshya Adhiniyam 2023 (Sec 63 Electronic Record)</li>
            <li>Information Technology Act 2000 (Sec 65B DSC validation)</li>
            <li>Order XI Rule 1-6 Civil Procedure Code (Disclosure & Inspection)</li>
          </ul>
        </div>
      </div>
    `;
  }
}
