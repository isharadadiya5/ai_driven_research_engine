// Sample Commercial Case Dossiers with Full Evidence, Statutory Calculations, 
// 9-Stage Pipeline Data, Knowledge Graphs, and Lawyer Scores

export const sampleDossiers = [
  {
    id: "CS-COMM-104-2025",
    suitNumber: "Comm. Suit No. 104/2025",
    title: "Alpha Infra Corp vs. Apex Infra Logistics Ltd",
    court: "Commercial Court (District Commercial Bench), New Delhi",
    judge: "Hon'ble Shri Justice R. K. Mahajan",
    disputeType: "Breach of EPC Construction Contract & Non-Payment",
    claimValue: "₹14,50,00,000",
    claimValueNumeric: 145000000,
    filingDate: "14-Jan-2025",
    hearingDate: "Today (Final Arguments)",
    status: "Hearing Today",
    priority: "high",
    evidenceScore: 88.4,
    evidenceVerdict: "PRIMA FACIE BREACH ESTABLISHED",
    admissibilityStatus: "ADMISSIBLE (BSA 2023 / Sec 63)",
    coreStatute: "ICA Sec 73/74 & Comm Courts Act Sec 35",
    
    // Overall AI summary & Plain Language
    summary: "Comprehensive analysis of 7 uploaded contract and transaction documents establishes an 88.4% corroboration confidence. Unpaid milestone invoices (INV-8921 to INV-8925) directly match the signed EPC agreement and independent engineer completion logs.",
    plainLanguage: "Alpha Infra completed the road and flyover construction as agreed in the contract. Apex Infra used the completed infrastructure but did not pay the remaining ₹14.50 Crores. Apex Infra's claim that the work was defective was rejected because their own supervising engineer had already signed off the completion certificates.",

    // Evidence Items breakdown
    evidenceItems: [
      {
        id: "DOC-01",
        name: "Exhibit P-1: Master EPC Construction Agreement",
        type: "PDF / Contract",
        date: "12-Mar-2023",
        authenticityScore: 96,
        status: "Verified Genuine",
        tags: ["Contract Act Sec 10", "Stamp Duty Paid"],
        finding: "Both parties' digital signatures verified via MCA DSC root authority. Liquidated damages clause (Cl. 14.2) unambiguously mandates payment within 30 days of milestone clearance."
      },
      {
        id: "DOC-02",
        name: "Exhibit P-2: Unpaid Invoices (INV-8921 to 8925) & GST Return E-Way Bills",
        type: "PDF / Tax Invoice",
        date: "18-Oct-2024",
        authenticityScore: 94,
        status: "Verified Genuine",
        tags: ["GST Portal Verified", "BSA 2023 Sec 63"],
        finding: "GST 2B reconciliation shows Defendant claimed Input Tax Credit (ITC) on all 5 invoices, legally admitting receipt of goods and services."
      },
      {
        id: "DOC-03",
        name: "Exhibit P-3: Certified Bank Statement & Ledger Summary",
        type: "DOCX / Ledger",
        date: "05-Nov-2024",
        authenticityScore: 91,
        status: "Certified",
        tags: ["Bankers Books Evidence Act", "BSA Sec 63"],
        finding: "SBI Commercial Branch manager certificate confirms zero credit transfer against the ₹14.50 Crore claim."
      },
      {
        id: "DOC-04",
        name: "Exhibit P-4: WhatsApp & Email Communications of Managing Director",
        type: "TXT / Chat Export",
        date: "22-Dec-2024",
        authenticityScore: 82,
        status: "Conditionally Admissible",
        tags: ["BSA 2023 Sec 63 Certificate Attached"],
        finding: "Defendant MD admitted liability in writing: 'Funds will be released once our overseas tranche closes.' Valid electronic admission u/s 17 BSA 2023."
      },
      {
        id: "DOC-05",
        name: "Exhibit P-5: Independent Site Engineer Handover Certificate",
        type: "PDF / Report",
        date: "10-Nov-2024",
        authenticityScore: 78,
        status: "Corroborated",
        tags: ["Expert Report u/s 39 BSA"],
        finding: "Supervising engineer certified 100% completion of Stage 4 flyover structure with zero critical structural defects."
      }
    ],

    // Statutory Punishments, Penalties & Damages
    statutoryPenalties: [
      {
        statute: "Indian Contract Act, 1872 — Section 73",
        type: "Civil Compensatory Damages",
        title: "Actual Proved Contractual Debt & Loss",
        amountFormatted: "₹14,50,00,000 (Principal Claim)",
        formula: "Unpaid Milestone Invoices (INV-8921 to 8925) minus admitted retentions",
        explanation: "Defendant is strictly liable to place Plaintiff in the same financial position as if the contract had been fully performed.",
        plainExplanation: "The defendant must pay the full ₹14.50 Crores for the work completed by the contractor."
      },
      {
        statute: "Commercial Courts Act, 2015 — Section 35 & CPC Sec 34",
        type: "Commercial Pre & Post-Decree Interest",
        title: "Mandatory Commercial Interest @ 18% p.a.",
        amountFormatted: "₹2,61,00,000 (Accrued Commercial Interest)",
        formula: "₹14.50 Cr × 18% p.a. × 12 months delay",
        explanation: "Commercial Courts Act mandates realistic commercial lending interest rates to deter dilatory non-payment tactics by corporate debtors.",
        plainExplanation: "Because the defendant delayed payment for a year, they must pay an additional ₹2.61 Crores in interest."
      },
      {
        statute: "Indian Contract Act, 1872 — Section 74",
        type: "Liquidated Damages for Breach",
        title: "Contractual Liquidated Damages Penalty",
        amountFormatted: "₹1,45,00,000 (10% Capped Contractual Penalty)",
        formula: "Clause 14.2 of Master EPC Agreement (Capped at 10%)",
        explanation: "Pre-estimated genuine damages for breach of completion schedule as affirmed in Kailash Nath Associates vs DDA (2015).",
        plainExplanation: "The contract clearly had a 10% penalty clause if either side broke their promise without valid reason."
      },
      {
        statute: "Commercial Courts Act, 2015 — Section 35 (Cost Follows Event)",
        type: "Actual Real Costs Decree",
        title: "Full Legal Fees & Arbitration Costs Imposition",
        amountFormatted: "₹18,50,000 (Advocate & Administrative Costs)",
        formula: "Taxed advocate fees + court filing stamps + registry fees",
        explanation: "Under the 2015 Act, frivolous litigation automatically attracts actual indemnity costs against the losing party.",
        plainExplanation: "Apex Infra must also pay the entire lawyer fees and court expenses incurred by Alpha Infra."
      }
    ],

    // Missing Document Alerts
    missingDocuments: [
      "Physical Original of Subcontractor Joint Measurement Book (M-Book Part IV) missing witness seal.",
      "Section 63 BSA 2023 Electronic Certificate for WhatsApp messages from backup mobile device (Pending verification)."
    ],

    // Lawyer Credibility & Honesty Scoring
    lawyers: {
      plaintiff: {
        name: "Adv. Raghavan Nambiar (Senior Advocate)",
        barEnrollment: "D/1420/2004 (Delhi Bar Council)",
        honestyScore: 92,
        citationAccuracy: 96,
        factualConsistency: 94,
        benchCandor: 90,
        reputation: "Exemplary",
        notes: "Accurate statutory citations (Kailash Nath, Patil Automation). Documents well-indexed under Commercial Court Practice Directions."
      },
      defendant: {
        name: "Adv. K. K. Sharma",
        barEnrollment: "D/889/2012 (Delhi Bar Council)",
        honestyScore: 64,
        citationAccuracy: 60,
        factualConsistency: 58,
        benchCandor: 68,
        reputation: "Caution Noted",
        notes: "Attempted to cite overruled High Court precedent on Section 12A mediation. Suppressed Defendant's GST Input Tax Credit ledger."
      }
    },

    // 9-Stage Pipeline Status
    pipelineData: [
      { step: 1, name: "Document Upload & Ingestion", status: "Completed", details: "7 files ingested (PDF, DOCX, TXT), Hash SHA-256 generated." },
      { step: 2, name: "OCR & Multilingual NLP Extraction", status: "Completed", details: "Optical recognition parsed English, Hindi, and numeric financial ledgers with 99.1% character fidelity." },
      { step: 3, name: "Entities, Dates & Reference Extraction", status: "Completed", details: "Extracted 14 Corporate Entities, 32 Transaction Dates, 5 Invoice References, ₹14.50 Cr claim amount." },
      { step: 4, name: "Document Relationship Graph", status: "Completed", details: "Constructed bipartite graph linking Contract Cl. 14.2 $\\to$ Invoices $\\to$ Bank Statement $\\to$ Default Notice." },
      { step: 5, name: "Timeline Reconstruction", status: "Completed", details: "Chronology mapped from 12-Mar-2023 (Agreement) to 22-Dec-2024 (Admitted Default)." },
      { step: 6, name: "Explicit Reference & Citation Check", status: "Completed", details: "All 5 Invoices validated against GST Portal e-Way system." },
      { step: 7, name: "Evidence Dependency Check", status: "Completed", details: "Bank statement corroborates lack of payment; MD WhatsApp text corroborates acknowledgment of debt." },
      { step: 8, name: "Case-Type Statutory Rules Verification", status: "Completed", details: "Checked requirements under Commercial Courts Act (pre-institution mediation exception satisfied)." },
      { step: 9, name: "Deficiency Detection & Confidence Score", status: "Completed", details: "Overall Authenticity Score computed: 88.4%. Flagged 1 uncertified WhatsApp device certificate." }
    ],

    // Knowledge Graph data
    knowledgeGraph: {
      nodes: [
        { id: "node-p", label: "Alpha Infra Corp (Plaintiff)", type: "party", x: 120, y: 150 },
        { id: "node-d", label: "Apex Infra Logistics (Defendant)", type: "party", x: 620, y: 150 },
        { id: "node-contract", label: "Master EPC Agreement (Cl. 14.2)", type: "contract", x: 370, y: 80 },
        { id: "node-invoices", label: "5 Unpaid Invoices (₹14.50 Cr)", type: "evidence", x: 260, y: 280 },
        { id: "node-bank", label: "SBI Bank Account (Zero Credit)", type: "evidence", x: 480, y: 280 },
        { id: "node-gst", label: "GST Input Tax Credit Ledger", type: "evidence", x: 620, y: 320 },
        { id: "node-sec73", label: "Sec 73 Contract Act (Damages)", type: "statute", x: 200, y: 440 },
        { id: "node-sec74", label: "Sec 74 Contract Act (Penalty)", type: "statute", x: 370, y: 440 },
        { id: "node-interest", label: "18% Commercial Interest (CPC 34)", type: "monetary", x: 540, y: 440 }
      ],
      edges: [
        { from: "node-p", to: "node-contract", label: "Executed Agreement" },
        { from: "node-d", to: "node-contract", label: "Signed & Bound" },
        { from: "node-contract", to: "node-invoices", label: "Mandated Milestone" },
        { from: "node-p", to: "node-invoices", label: "Issued & Billed" },
        { from: "node-d", to: "node-gst", label: "Claimed Tax Credit" },
        { from: "node-d", to: "node-bank", label: "Defaulted Payment" },
        { from: "node-invoices", to: "node-sec73", label: "Triggers Liability" },
        { from: "node-contract", to: "node-sec74", label: "Contractual Cap" },
        { from: "node-invoices", to: "node-interest", label: "Accrues 18% Int" }
      ]
    },

    // Precedents
    precedents: [
      {
        citation: "Kailash Nath Associates vs. Delhi Development Authority (2015) 4 SCC 136",
        relevance: "98% Similarity",
        holding: "Section 74 of the Contract Act requires proof of actual damage or loss, except in cases where damage cannot be quantified."
      },
      {
        citation: "Patil Automation Pvt Ltd vs. Rakheja Engineers Pvt Ltd (2022) 10 SCC 1",
        relevance: "94% Similarity",
        holding: "Pre-institution mediation under Section 12A Commercial Courts Act is mandatory, save where urgent interim relief is contemplated."
      }
    ],

    // Key issues for Lawyer Mode
    keyIssues: [
      {
        id: "ISSUE-1",
        issue: "Whether the Defendant committed a material breach of the EPC Agreement by withholding ₹14.50 Crores without issuance of a contractual defect notice?",
        burden: "On Plaintiff (Alpha Infra) — Fully Discharged by Invoices & GST ITC returns",
        statutoryDefense: "Defendant's claim of unquantified defects barred by waiver under Clause 18."
      },
      {
        id: "ISSUE-2",
        issue: "Whether the Plaintiff is entitled to commercial interest @ 18% per annum under Section 34 CPC and Section 16 MSMED Act?",
        burden: "On Plaintiff — Discharged via MSME Registration Certificate dated 2021",
        statutoryDefense: "Statutory mandatory rate applies override contractual default."
      }
    ],

    // Courtroom Debate starter
    debatePrompts: [
      "Submit argument on admission of debt via GST 2B returns",
      "Argue why Section 12A mediation bar is inapplicable due to urgent interim injunction",
      "Demonstrate why liquidated damages under Clause 14.2 are enforceable under Section 74 ICA"
    ]
  },

  {
    id: "CS-COMM-219-2025",
    suitNumber: "Comm. Suit No. 219/2025",
    title: "FinTech Capital Global vs. Rajesh Agro Ventures Ltd & Directors",
    court: "Special Commercial Court for Financial Disputes, Mumbai",
    judge: "Hon'ble Smt. Justice Meenal Deshmukh",
    disputeType: "Commercial Cheque Dishonour, Loan Default & Corporate Fraud",
    claimValue: "₹4,80,00,000",
    claimValueNumeric: 48000000,
    filingDate: "03-Feb-2025",
    hearingDate: "Tomorrow",
    status: "Summons Issued",
    priority: "high",
    evidenceScore: 94.6,
    evidenceVerdict: "CRIMINAL & CIVIL CULPABILITY HIGHLY PROBABLE",
    admissibilityStatus: "FULLY ADMISSIBLE (NI Act / BSA 2023)",
    coreStatute: "NI Act Sec 138/141 & Companies Act Sec 447",

    summary: "Documentary evidence of 4 dishonoured commercial cheques totaling ₹4.80 Crores backed by bank return memos ('Account Frozen / Insufficient Funds') and statutory demand notices delivered via registered speed post with tracking reports.",
    plainLanguage: "Rajesh Agro took a ₹4.80 Crore business loan and gave cheques for repayment. When the cheques were deposited, they bounced because there was no money in the account. Even after receiving formal 15-day legal notices, the directors did not pay.",

    evidenceItems: [
      {
        id: "DOC-101",
        name: "Exhibit P-1: Original Dishonoured Cheques (Nos. 440191 - 440194)",
        type: "Physical / Cheque",
        date: "15-Dec-2024",
        authenticityScore: 98,
        status: "Verified Genuine",
        tags: ["NI Act Sec 138", "Bank CTS-2010 Verified"],
        finding: "Original CTS-2010 cheques bearing authorized director signatures. Signature match confirmed with bank records."
      },
      {
        id: "DOC-102",
        name: "Exhibit P-2: HDFC Bank Cheque Return Memos (Reason Code 01 & 55)",
        type: "PDF / Memo",
        date: "18-Dec-2024",
        authenticityScore: 99,
        status: "Certified",
        tags: ["Bankers Books Evidence Act", "BSA Sec 63"],
        finding: "Bank memos officially certify dishonour due to 'Insufficient Funds' and 'Account Frozen by Law Enforcement'."
      },
      {
        id: "DOC-103",
        name: "Exhibit P-3: Statutory Demand Notice & India Post Tracking Delivery Proof",
        type: "PDF / Notice",
        date: "24-Dec-2024",
        authenticityScore: 95,
        status: "Verified Delivered",
        tags: ["NI Act Sec 138(b)", "General Clauses Act Sec 27"],
        finding: "Speed post delivered to registered corporate office on 28-Dec-2024. Statutory 15-day cure window expired on 12-Jan-2025 with zero payment."
      }
    ],

    statutoryPenalties: [
      {
        statute: "Negotiable Instruments Act, 1881 — Section 138",
        type: "Criminal Imprisonment & Double Fine",
        title: "Imprisonment up to 2 Years & Mandatory Double Fine",
        amountFormatted: "₹9,60,00,000 (Double Cheque Amount Fine) + 2 Yrs Imprisonment",
        formula: "2 × ₹4.80 Crore Dishonoured Value",
        explanation: "Section 138 mandates penal deterrence for commercial dishonour. Courts routinely impose double the cheque amount as fine, distributed to complainant as compensation under CrPC 357.",
        plainExplanation: "Under the cheque bounce law, the directors can be sentenced to up to 2 years in jail and ordered to pay double the cheque amount (₹9.60 Crores)."
      },
      {
        statute: "Negotiable Instruments Act, 1881 — Section 143A",
        type: "Mandatory Interim Compensation",
        title: "Immediate 20% Deposit Order within 60 Days",
        amountFormatted: "₹96,00,000 (Immediate 20% Deposit to Complainant)",
        formula: "20% of ₹4.80 Crore total dishonoured cheque value",
        explanation: "Court is empowered to order the accused to deposit 20% interim compensation at the stage of framing charges.",
        plainExplanation: "Before the full trial finishes, the court will force the borrower to deposit ₹96 Lakhs right away into court."
      },
      {
        statute: "Companies Act, 2013 — Section 447",
        type: "Corporate Criminal Fraud Liability",
        title: "Cognizable Non-Bailable Fraud Penalty",
        amountFormatted: "Fine up to ₹14,40,00,000 (3x Value) + 6 Months to 10 Years Prison",
        formula: "Fraud exceeding ₹50 Lakhs / 1% of turnover",
        explanation: "Issuing cheques with prior knowledge of frozen accounts constitutes fraudulent inducement and deception punishable under Section 447.",
        plainExplanation: "Issuing cheques when knowing the account is frozen is serious corporate fraud. Directors face minimum 6 months to 10 years imprisonment."
      }
    ],

    missingDocuments: [
      "Board Resolution copy authorizing the specific signing director (To be summoned u/s 91 CrPC/Order XI CPC)."
    ],

    lawyers: {
      plaintiff: {
        name: "Adv. Ananya Sengupta",
        barEnrollment: "MAH/2011/2009",
        honestyScore: 95,
        citationAccuracy: 98,
        factualConsistency: 96,
        benchCandor: 92,
        reputation: "Exemplary",
        notes: "Strict adherence to NI Act statutory notice timelines and postal delivery endorsements."
      },
      defendant: {
        name: "Adv. Vikram Gokhale",
        barEnrollment: "MAH/4512/2016",
        honestyScore: 70,
        citationAccuracy: 65,
        factualConsistency: 62,
        benchCandor: 74,
        reputation: "Average",
        notes: "Pleaded defense of 'Security Cheques' without producing repayment receipts or discharge ledgers."
      }
    },

    pipelineData: [
      { step: 1, name: "Document Upload & Ingestion", status: "Completed", details: "3 Banking & Postal Exhibits uploaded." },
      { step: 2, name: "OCR & NLP Extraction", status: "Completed", details: "Extracted Cheque Nos, MICR codes, Return Memo Reason Code 01 & 55." },
      { step: 3, name: "Entities & Dates", status: "Completed", details: "Identified Drawer, Payee, Drawee Bank, Notice dispatch date, 15-day cure window." },
      { step: 4, name: "Relationship Graph", status: "Completed", details: "Linked Loan Agreement $\\to$ Cheque $\\to$ Return Memo $\\to$ Speed Post." },
      { step: 5, name: "Timeline Reconstruction", status: "Completed", details: "Dishonour (18-Dec) $\\to$ Notice (24-Dec) $\\to$ Delivery (28-Dec) $\\to$ Cause of Action (13-Jan)." },
      { step: 6, name: "Citation & Reference Check", status: "Completed", details: "Verified postal consignment track report with India Post API server." },
      { step: 7, name: "Evidence Dependency Check", status: "Completed", details: "Statutory presumption u/s 139 NI Act activated in favour of holder." },
      { step: 8, name: "Statutory Rules Verification", status: "Completed", details: "Complaint filed within 30-day limitation window of Section 142(1)(b)." },
      { step: 9, name: "Confidence Score & Verdict", status: "Completed", details: "Evidence Confidence Score: 94.6%." }
    ],

    knowledgeGraph: {
      nodes: [
        { id: "node-p", label: "FinTech Capital Global", type: "party", x: 140, y: 160 },
        { id: "node-d", label: "Rajesh Agro Ventures Ltd", type: "party", x: 600, y: 160 },
        { id: "node-chq", label: "4 Dishonoured Cheques (₹4.80 Cr)", type: "evidence", x: 370, y: 100 },
        { id: "node-memo", label: "HDFC Return Memos (Reason 01)", type: "evidence", x: 260, y: 300 },
        { id: "node-notice", label: "Statutory Legal Notice (Delivered)", type: "evidence", x: 480, y: 300 },
        { id: "node-sec138", label: "Sec 138 NI Act (Double Fine + 2Yrs)", type: "statute", x: 220, y: 440 },
        { id: "node-sec143a", label: "Sec 143A (20% Interim Comp)", type: "monetary", x: 380, y: 440 },
        { id: "node-sec447", label: "Sec 447 Companies Act (Fraud)", type: "statute", x: 550, y: 440 }
      ],
      edges: [
        { from: "node-d", to: "node-chq", label: "Issued Cheques" },
        { from: "node-p", to: "node-chq", label: "Deposited for Clearing" },
        { from: "node-chq", to: "node-memo", label: "Dishonoured by Bank" },
        { from: "node-p", to: "node-notice", label: "Dispatched Notice" },
        { from: "node-notice", to: "node-d", label: "Delivered & Unpaid" },
        { from: "node-memo", to: "node-sec138", label: "Creates Culpability" },
        { from: "node-chq", to: "node-sec143a", label: "Mandatory 20% Deposit" },
        { from: "node-d", to: "node-sec447", label: "Director Fraud Liability" }
      ]
    },

    precedents: [
      {
        citation: "Dashrath Rupsingh Rathod vs. State of Maharashtra (2014) 9 SCC 129 / NI Amendment Act 2015",
        relevance: "99% Similarity",
        holding: "Jurisdiction lies exclusively with the court within whose local territory the account-maintaining bank branch of the payee is located."
      },
      {
        citation: "Kalamani Tex vs. P. Balasubramanian (2021) 5 SCC 283",
        relevance: "96% Similarity",
        holding: "Once execution of cheque is admitted, Section 139 mandates a reverse burden of proof on the accused to establish absence of debt."
      }
    ],

    keyIssues: [
      {
        id: "ISSUE-1",
        issue: "Whether the statutory notice u/s 138(b) was validly served at the registered office of the corporate borrower under Section 27 General Clauses Act?",
        burden: "On Complainant — Proved by Track Report and MCA Master Data",
        statutoryDefense: "Deemed service applies once postal dispatch to registered address is established."
      }
    ],

    debatePrompts: [
      "Argue application for 20% interim compensation under Section 143A NI Act",
      "Submit arguments on reverse statutory presumption under Section 139 NI Act",
      "Oppose defendant's plea of stolen blank cheque by citing Kalamani Tex precedent"
    ]
  },

  {
    id: "CS-COMM-305-2025",
    suitNumber: "Comm. Suit No. 305/2025",
    title: "Nexus MedTech Solutions vs. V-Health Diagnostic Labs & Ors",
    court: "Delhi High Court (Commercial Division)",
    judge: "Hon'ble Shri Justice Prateek Jalan",
    disputeType: "Software Licensing Breach, IP Infringement & Unpaid Royalties",
    claimValue: "₹8,20,00,000",
    claimValueNumeric: 82000000,
    filingDate: "18-Jan-2025",
    hearingDate: "Next Week",
    status: "Interim Relief Hearing",
    priority: "medium",
    evidenceScore: 79.2,
    evidenceVerdict: "PROBABLE IP INFRINGEMENT & SOFTWARE PIRACY",
    admissibilityStatus: "ADMISSIBLE UNDER BSA 2023 SEC 63",
    coreStatute: "Copyright Act Sec 51/55 & Specific Relief Act Sec 38",

    summary: "Diagnostic SaaS telemetry server logs establish unauthorized cloning and multi-tenant deployment across 48 unlicensed clinical branches in breach of the single-site Enterprise License Agreement.",
    plainLanguage: "Nexus sold software to V-Health for use in 1 diagnostic center. Instead of paying for extra licenses, V-Health copied the software and ran it in 48 clinics across India without paying royalties.",

    evidenceItems: [
      {
        id: "DOC-201",
        name: "Exhibit P-1: Enterprise Software License Agreement (Single-Site Limit)",
        type: "PDF / IP License",
        date: "04-May-2023",
        authenticityScore: 92,
        status: "Verified Genuine",
        tags: ["Copyright Act 1957", "IP Licensing"],
        finding: "Clause 3.1 clearly limits deployment to 1 physical server at Mumbai headquarters. Multi-site deployment requires prior written tier upgrade."
      },
      {
        id: "DOC-202",
        name: "Exhibit P-2: Telemetry API Ping Logs & Cloud IP Geolocation Records",
        type: "TXT / Server Logs",
        date: "14-Jan-2025",
        authenticityScore: 84,
        status: "Certified Digital Evidence",
        tags: ["BSA 2023 Sec 63", "Digital Forensics"],
        finding: "48 distinct public IP addresses simultaneously transmitted cryptographic API tokens linked to Plaintiff's proprietary neural imaging module."
      }
    ],

    statutoryPenalties: [
      {
        statute: "Specific Relief Act, 1963 — Section 38 & Order XXXIX Rules 1 & 2 CPC",
        type: "Permanent Mandatory Injunction",
        title: "Immediate Cease & Desist / Server Takedown Injunction",
        amountFormatted: "Immediate Operational Restraint Across 48 Clinics",
        formula: "Order XXXIX Rule 1(b) Injunction",
        explanation: "Immediate restraint order preventing continuing commercial use and database synchronization.",
        plainExplanation: "The court can immediately order the clinics to stop using the copied software right now."
      },
      {
        statute: "Copyright Act, 1957 — Section 55 & Contract Act Sec 73",
        type: "Damages & Account of Profits",
        title: "Statutory License Fees & Profits Restitution",
        amountFormatted: "₹8,20,00,000 (Commercial Royalties + Account of Profits)",
        formula: "48 unlicensed sites × ₹15 Lakhs/site/year license rate + punitive damages",
        explanation: "Plaintiff is entitled to statutory license fees as well as profits earned through unauthorized exploitation.",
        plainExplanation: "V-Health must pay back all the money they saved and profits they earned by using the pirate software."
      }
    ],

    missingDocuments: [
      "Independent Court Commissioner forensic clone image of V-Health on-premise servers (Local Commissioner requested)."
    ],

    lawyers: {
      plaintiff: {
        name: "Adv. Tarun Gulati",
        barEnrollment: "D/310/1998",
        honestyScore: 90,
        citationAccuracy: 92,
        factualConsistency: 90,
        benchCandor: 88,
        reputation: "Exemplary",
        notes: "Well-drafted digital evidence affidavit under Section 63 BSA 2023."
      },
      defendant: {
        name: "Adv. Ramesh V.",
        barEnrollment: "D/1099/2015",
        honestyScore: 72,
        citationAccuracy: 75,
        factualConsistency: 70,
        benchCandor: 72,
        reputation: "Average",
        notes: "Contended that telemetry logs were generated during test simulations."
      }
    },

    pipelineData: [
      { step: 1, name: "Document Upload & Ingestion", status: "Completed", details: "License Agreement & Cloud logs uploaded." },
      { step: 2, name: "OCR & Multilingual Extraction", status: "Completed", details: "Parsed IP license terms & server JSON telemetry dumps." },
      { step: 3, name: "Entities & References", status: "Completed", details: "Extracted 48 IP addresses, license limits, token signatures." },
      { step: 4, name: "Relationship Graph", status: "Completed", details: "Mapped Contract $\\to$ Software Build $\\to$ Remote Server Pings." },
      { step: 5, name: "Timeline Reconstruction", status: "Completed", details: "Initial license (May 2023) $\\to$ unauthorized expansion (Aug 2024 - Jan 2025)." },
      { step: 6, name: "Citation Check", status: "Completed", details: "Checked against Delhi HC Practice Directions for Digital IP Evidence." },
      { step: 7, name: "Dependency Check", status: "Completed", details: "Corroborated by online booking portal showing diagnostic tests offered." },
      { step: 8, name: "Statutory Rules Verification", status: "Completed", details: "Valuation rules for IP commercial suits verified under Section 12 CCA." },
      { step: 9, name: "Confidence Score & Verdict", status: "Completed", details: "Evidence Authenticity Score: 79.2%." }
    ],

    knowledgeGraph: {
      nodes: [
        { id: "node-p", label: "Nexus MedTech Solutions", type: "party", x: 150, y: 150 },
        { id: "node-d", label: "V-Health Diagnostic Labs", type: "party", x: 600, y: 150 },
        { id: "node-lic", label: "Single-Site License Agreement", type: "contract", x: 370, y: 100 },
        { id: "node-logs", label: "48 Branch Telemetry Logs", type: "evidence", x: 370, y: 260 },
        { id: "node-inj", label: "Mandatory Injunction (Sec 38 SRA)", type: "statute", x: 240, y: 420 },
        { id: "node-damages", label: "₹8.20 Cr Unpaid Royalties", type: "monetary", x: 500, y: 420 }
      ],
      edges: [
        { from: "node-p", to: "node-lic", label: "Granted License" },
        { from: "node-d", to: "node-lic", label: "Signed License" },
        { from: "node-d", to: "node-logs", label: "Executed on 48 Servers" },
        { from: "node-logs", to: "node-lic", label: "Breaches Cl. 3.1" },
        { from: "node-logs", to: "node-inj", label: "Justifies Takedown" },
        { from: "node-logs", to: "node-damages", label: "Calculates Unpaid Dues" }
      ]
    },

    precedents: [
      {
        citation: "Microsoft Corporation vs. D. Sengupta 2014 SCC OnLine Del 3412",
        relevance: "95% Similarity",
        holding: "Commercial software piracy across corporate branches justifies ex-parte appointment of local commissioner and punitive damages."
      }
    ],

    keyIssues: [
      {
        id: "ISSUE-1",
        issue: "Whether unauthorized deployment of software across remote branches without license upgrade constitutes copyright infringement under Section 51 Copyright Act?",
        burden: "On Plaintiff — Discharged via Server IP logs",
        statutoryDefense: "Defendant must show authorized multi-site license amendment."
      }
    ],

    debatePrompts: [
      "Move urgent application for appointment of Local Commissioner to inspect server hard drives",
      "Argue calculation of reasonable royalty damages under Section 55 Copyright Act"
    ]
  }
];
