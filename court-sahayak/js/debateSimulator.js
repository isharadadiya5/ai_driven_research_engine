// AI Courtroom Argument & Mock Trial Simulator
// Simulates a commercial bench hearing with judicial pushback, counter-statutes, and argument scoring.

export class CourtroomDebateSimulator {
  constructor() {
    this.dialogueStream = document.getElementById("debate-dialogue-stream");
    this.inputForm = document.getElementById("debate-form");
    this.textInput = document.getElementById("debate-input-text");
    this.micBtn = document.getElementById("btn-mic-argument");
    this.clearBtn = document.getElementById("btn-clear-debate");
    this.quickPromptsContainer = document.getElementById("quick-argument-prompts");
    this.scoreDisplay = document.getElementById("live-argument-score");
    
    this.critiqueStrength = document.getElementById("critique-strength-text");
    this.critiqueVulnerability = document.getElementById("critique-vulnerability-text");
    this.critiqueRebuttal = document.getElementById("critique-rebuttal-text");
    this.objectionsList = document.getElementById("predicted-objections-list");

    this.currentCase = null;
    this.isListening = false;
    this.recognition = null;

    this.initSpeechRecognition();
    this.initEvents();
  }

  initSpeechRecognition() {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (SpeechRecognition) {
      this.recognition = new SpeechRecognition();
      this.recognition.continuous = false;
      this.recognition.interimResults = false;
      this.recognition.lang = "en-IN";

      this.recognition.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        if (this.textInput) {
          this.textInput.value = transcript;
          this.processArgument(transcript);
        }
      };

      this.recognition.onend = () => {
        this.isListening = false;
        if (this.micBtn) this.micBtn.style.color = "var(--text-muted)";
      };
    }
  }

  initEvents() {
    if (this.inputForm) {
      this.inputForm.addEventListener("submit", (e) => {
        e.preventDefault();
        const arg = this.textInput.value.trim();
        if (arg) {
          this.processArgument(arg);
          this.textInput.value = "";
        }
      });
    }

    if (this.micBtn) {
      this.micBtn.addEventListener("click", () => {
        if (!this.recognition) {
          alert("Speech recognition is not supported in this browser. Please type your argument.");
          return;
        }
        if (this.isListening) {
          this.recognition.stop();
        } else {
          this.recognition.start();
          this.isListening = true;
          this.micBtn.style.color = "var(--accent-crimson)";
        }
      });
    }

    if (this.clearBtn) {
      this.clearBtn.addEventListener("click", () => this.resetSimulation());
    }
  }

  loadCase(caseDossier) {
    this.currentCase = caseDossier;
    this.resetSimulation();

    // Render Quick Prompts
    if (this.quickPromptsContainer && caseDossier.debatePrompts) {
      this.quickPromptsContainer.innerHTML = "";
      caseDossier.debatePrompts.forEach((promptText) => {
        const pill = document.createElement("button");
        pill.type = "button";
        pill.className = "prompt-pill";
        pill.textContent = promptText;
        pill.addEventListener("click", () => {
          this.processArgument(promptText);
        });
        this.quickPromptsContainer.appendChild(pill);
      });
    }

    // Render Initial Bench greeting
    this.appendMessage(
      "bench",
      "Hon'ble Commercial Bench",
      `Court is now in session for ${caseDossier.suitNumber}: ${caseDossier.title}. Learned Counsel for Plaintiff/Defendant may advance submissions on maintainability, evidentiary admissibility under BSA 2023, and statutory claims.`
    );
  }

  resetSimulation() {
    if (this.dialogueStream) {
      this.dialogueStream.innerHTML = "";
    }
    if (this.scoreDisplay) {
      this.scoreDisplay.textContent = "85/100";
    }
  }

  appendMessage(senderType, senderName, text) {
    if (!this.dialogueStream) return;
    const bubble = document.createElement("div");
    bubble.className = `debate-bubble ${senderType}`;
    bubble.innerHTML = `
      <span class="bubble-sender">${senderName}</span>
      <p>${text}</p>
    `;
    this.dialogueStream.appendChild(bubble);
    this.dialogueStream.scrollTop = this.dialogueStream.scrollHeight;

    // Optional Speech synthesis for judicial voice
    if (senderType === "bench" && "speechSynthesis" in window) {
      try {
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.rate = 1.05;
        utterance.pitch = 0.95;
        window.speechSynthesis.speak(utterance);
      } catch (e) {
        // audio policy fallback
      }
    }
  }

  processArgument(argText) {
    // 1. Append advocate message
    this.appendMessage("advocate", "Learned Advocate", argText);

    // 2. Compute argument score & critique
    const lower = argText.toLowerCase();
    let score = 75;
    let benchResponse = "";
    let strength = "";
    let vulnerability = "";
    let rebuttal = "";
    let objections = [];

    if (lower.includes("gst") || lower.includes("invoice") || lower.includes("2b") || lower.includes("itc")) {
      score = 94;
      benchResponse = "The Bench notes your submission regarding Section 63 BSA electronic admissibility. Since the Defendant claimed Input Tax Credit on GST 2B, an admission in writing u/s 17 BSA is prima facie established. What is your response to Defendant's claim of unquantified defects in milestone delivery?";
      strength = "Flawlessly established admission of liability via Defendant's statutory GST filings.";
      vulnerability = "Must guard against counter-allegation of defective performance under Section 55 Contract Act.";
      rebuttal = "Point to Exhibit P-5 Independent Supervising Engineer Certificate certifying defect-free handover.";
      objections = [
        "Opposing Counsel: 'GST filing is merely a tax compliance entry, not a commercial admission of quality!'",
        "Opposing Counsel: 'Certificate under Section 63 BSA for GST portal exports is incomplete.'"
      ];
    } else if (lower.includes("section 12a") || lower.includes("mediation") || lower.includes("patil automation") || lower.includes("interim")) {
      score = 91;
      benchResponse = "Under Patil Automation (2022 SC), Section 12A pre-institution mediation is indeed mandatory unless urgent interim relief is bona fide contemplated. We have perused your Section 9 / Order XXXIX application. The Bench is satisfied that urgent dissipation of assets justifies dispensing with pre-institution mediation.";
      strength = "Directly tackled the procedural bar of Section 12A with Supreme Court binding precedent.";
      vulnerability = "Court will assess whether the urgency is genuine or manufactured solely to bypass mediation.";
      rebuttal = "Emphasize immediate threat of bank guarantee encashment or diversion of escrow funds.";
      objections = [
        "Opposing Counsel: 'Urgent interim application is an afterthought engineered solely to evade mediation!'"
      ];
    } else if (lower.includes("section 74") || lower.includes("liquidated") || lower.includes("kailash nath") || lower.includes("penalty")) {
      score = 89;
      benchResponse = "Under Kailash Nath Associates, liquidated damages stipulated in Clause 14 cannot be granted automatically as a penalty without proof of reasonable compensation for actual loss. How has the Plaintiff quantified the loss incurred?";
      strength = "Correctly invoked contractual liquidated damages ceiling.";
      vulnerability = "Risk of penalty clause being treated as in terrorem if actual ledger losses are not itemized.";
      rebuttal = "Demonstrate overhead idling charges and bank financing costs incurred during the 12-month delay.";
      objections = [
        "Opposing Counsel: 'Clause 14 is penal and extortionate, attracting complete bar under Section 74!'"
      ];
    } else if (lower.includes("138") || lower.includes("cheque") || lower.includes("139") || lower.includes("kalamani")) {
      score = 96;
      benchResponse = "Under Section 139 Negotiable Instruments Act and Kalamani Tex (2021 SC), once execution of the cheque is admitted, the statutory presumption of enforceable debt shifts the burden squarely upon the accused. We will issue warrants if repayment is not deposited.";
      strength = "Invoked statutory reverse burden of proof to pin liability on drawer directors.";
      vulnerability = "Verify that legal notice was posted within exactly 30 days of the bank return memo.";
      rebuttal = "Hand over postal dispatch receipt and India Post tracking certificate timestamped within 15 days.";
      objections = [
        "Opposing Counsel: 'Cheques were handed over as unsigned blank security collateral without underlying debt!'"
      ];
    } else {
      score = 82;
      benchResponse = "Counsel's submission is taken on record. The Bench directs both parties to submit a two-page bullet-point synopsis addressing the core issues framed under Order XIV CPC before 3:00 PM.";
      strength = "Clear submission on the general merits of the commercial suit.";
      vulnerability = "Need to cite exact statutory sections under Commercial Courts Act and BSA 2023.";
      rebuttal = "Structure argument with exact exhibit references (Exhibit P-1 to P-5).";
      objections = [
        "Opposing Counsel: 'Submissions lack specific paragraph references to the Commercial Plaint.'"
      ];
    }

    // Update UI components
    setTimeout(() => {
      this.appendMessage("bench", "Hon'ble Commercial Bench", benchResponse);
      if (this.scoreDisplay) this.scoreDisplay.textContent = `${score}/100`;
      if (this.critiqueStrength) this.critiqueStrength.textContent = strength;
      if (this.critiqueVulnerability) this.critiqueVulnerability.textContent = vulnerability;
      if (this.critiqueRebuttal) this.critiqueRebuttal.textContent = rebuttal;

      if (this.objectionsList) {
        this.objectionsList.innerHTML = objections.length > 0
          ? objections.map(obj => `<div style="background: rgba(239, 68, 68, 0.08); border-left: 3px solid var(--accent-crimson); padding: 8px 10px; border-radius: 4px; font-size: 12px; color: #fca5a5; margin-bottom: 6px;">${obj}</div>`).join("")
          : `<div style="font-size: 12px; color: #94a3b8;">No immediate procedural objections raised by the opposite bench.</div>`;
      }
    }, 400);
  }
}
