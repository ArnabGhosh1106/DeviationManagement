export type Risk = "Low" | "Medium" | "High" | "Critical";
export type DeviationStatus =
  | "Open"
  | "Under Investigation"
  | "AI Review"
  | "QA Review"
  | "Closed";

export interface Deviation {
  id: string;
  description: string;
  area: string;
  equipment: string;
  batch: string;
  risk: Risk;
  status: DeviationStatus;
  created: string;
  classification: string;
  reporter: string;
}

export const AREAS = [
  "Manufacturing Area 1",
  "Manufacturing Area 2",
  "Manufacturing Area 3",
  "Packaging Area 1",
  "Utilities",
];

export const EQUIPMENT = [
  "Reactor R-102",
  "Reactor R-204",
  "Filter Unit F-12",
  "CIP-101",
  "Filling Line FL-03",
];

export const SOPS = [
  { id: "SOP-102", title: "Reactor Temperature Monitoring" },
  { id: "SOP-115", title: "Batch Processing Procedure" },
  { id: "SOP-204", title: "Equipment Cleaning" },
  { id: "SOP-301", title: "Calibration Procedure" },
  { id: "SOP-405", title: "Environmental Monitoring" },
];

export const CAPAS = [
  { id: "CAPA-2041", title: "Temperature monitoring improvement" },
  { id: "CAPA-2018", title: "Filter integrity test frequency revision" },
  { id: "CAPA-1997", title: "Operator cleaning training refresh" },
];

export const DEVIATIONS: Deviation[] = [
  {
    id: "DEV-1023",
    description: "Temperature Excursion",
    area: "Manufacturing Area 3",
    equipment: "Reactor R-102",
    batch: "B12318",
    risk: "High",
    status: "AI Review",
    created: "Aug 25, 2026",
    classification: "Temperature Excursion",
    reporter: "John Smith",
  },
  {
    id: "DEV-1024",
    description: "Pressure Deviation",
    area: "Manufacturing Area 2",
    equipment: "Reactor R-204",
    batch: "B12319",
    risk: "Medium",
    status: "Under Investigation",
    created: "Aug 24, 2026",
    classification: "Process Parameter Deviation",
    reporter: "Anita Rao",
  },
  {
    id: "DEV-1025",
    description: "Filter Integrity Failure",
    area: "Manufacturing Area 1",
    equipment: "Filter Unit F-12",
    batch: "B12321",
    risk: "High",
    status: "QA Review",
    created: "Aug 23, 2026",
    classification: "Equipment Failure",
    reporter: "Marcus Feld",
  },
  {
    id: "DEV-1022",
    description: "Cleaning cycle conductivity out of limit",
    area: "Manufacturing Area 1",
    equipment: "CIP-101",
    batch: "B12310",
    risk: "Medium",
    status: "Under Investigation",
    created: "Aug 21, 2026",
    classification: "Cleaning Deviation",
    reporter: "Priya Nair",
  },
  {
    id: "DEV-1021",
    description: "Fill weight outside acceptance range",
    area: "Packaging Area 1",
    equipment: "Filling Line FL-03",
    batch: "B12305",
    risk: "Medium",
    status: "AI Review",
    created: "Aug 20, 2026",
    classification: "In-Process Control Deviation",
    reporter: "Laura Chen",
  },
  {
    id: "DEV-1020",
    description: "Environmental monitoring excursion in Grade C corridor",
    area: "Manufacturing Area 2",
    equipment: "Filter Unit F-12",
    batch: "B12298",
    risk: "Critical",
    status: "Open",
    created: "Aug 18, 2026",
    classification: "Environmental Excursion",
    reporter: "Daniel Okoye",
  },
  {
    id: "DEV-1019",
    description: "Batch record entry missing operator signature",
    area: "Manufacturing Area 3",
    equipment: "Reactor R-102",
    batch: "B12291",
    risk: "Low",
    status: "Closed",
    created: "Aug 14, 2026",
    classification: "Documentation Deviation",
    reporter: "John Smith",
  },
  {
    id: "DEV-1018",
    description: "Agitator speed drift during dispersion step",
    area: "Manufacturing Area 3",
    equipment: "Reactor R-204",
    batch: "B12284",
    risk: "Medium",
    status: "Closed",
    created: "Aug 11, 2026",
    classification: "Equipment Failure",
    reporter: "Anita Rao",
  },
  {
    id: "DEV-1017",
    description: "Calibration overdue on temperature transmitter",
    area: "Utilities",
    equipment: "Reactor R-102",
    batch: "B12277",
    risk: "High",
    status: "Under Investigation",
    created: "Aug 8, 2026",
    classification: "Calibration Deviation",
    reporter: "Marcus Feld",
  },
  {
    id: "DEV-1016",
    description: "Line clearance not documented before changeover",
    area: "Packaging Area 1",
    equipment: "Filling Line FL-03",
    batch: "B12270",
    risk: "Low",
    status: "Closed",
    created: "Aug 5, 2026",
    classification: "Documentation Deviation",
    reporter: "Laura Chen",
  },
  {
    id: "DEV-1015",
    description: "Purified water TOC trending near action limit",
    area: "Utilities",
    equipment: "CIP-101",
    batch: "B12262",
    risk: "Medium",
    status: "QA Review",
    created: "Aug 2, 2026",
    classification: "Utility Deviation",
    reporter: "Priya Nair",
  },
];

export interface Investigation {
  id: string;
  deviationId: string;
  currentAgent: string;
  progress: number;
  risk: Risk;
  started: string;
  status: "Running" | "Completed" | "Pending" | "Failed";
}

export const INVESTIGATIONS: Investigation[] = [
  {
    id: "INV-2026-1023",
    deviationId: "DEV-1023",
    currentAgent: "Impact Assessment Agent",
    progress: 75,
    risk: "High",
    started: "Aug 26, 2026",
    status: "Running",
  },
  {
    id: "INV-2026-1021",
    deviationId: "DEV-1021",
    currentAgent: "QA Recommendation Agent",
    progress: 100,
    risk: "Medium",
    started: "Aug 25, 2026",
    status: "Completed",
  },
  {
    id: "INV-2026-1025",
    deviationId: "DEV-1025",
    currentAgent: "Historical Investigation Agent",
    progress: 50,
    risk: "High",
    started: "Aug 24, 2026",
    status: "Running",
  },
  {
    id: "INV-2026-1020",
    deviationId: "DEV-1020",
    currentAgent: "Deviation Understanding Agent",
    progress: 25,
    risk: "Critical",
    started: "Aug 22, 2026",
    status: "Running",
  },
  {
    id: "INV-2026-1017",
    deviationId: "DEV-1017",
    currentAgent: "QA Recommendation Agent",
    progress: 100,
    risk: "High",
    started: "Aug 19, 2026",
    status: "Completed",
  },
  {
    id: "INV-2026-1015",
    deviationId: "DEV-1015",
    currentAgent: "Impact Assessment Agent",
    progress: 60,
    risk: "Medium",
    started: "Aug 12, 2026",
    status: "Failed",
  },
];

export type ChangeStatus =
  | "Draft"
  | "Impact Assessment"
  | "QA Review"
  | "Approved"
  | "Implemented";

export interface ChangeControl {
  id: string;
  description: string;
  area: string;
  equipment: string;
  risk: Risk;
  status: ChangeStatus;
  created: string;
  category: string;
  requestedBy: string;
}

export const CHANGE_CONTROLS: ChangeControl[] = [
  {
    id: "CHG-2041",
    description: "Replace temperature sensor",
    area: "Manufacturing Area 3",
    equipment: "Reactor R-102",
    risk: "Medium",
    status: "Impact Assessment",
    created: "Aug 25, 2026",
    category: "Equipment Change",
    requestedBy: "John Smith",
  },
  {
    id: "CHG-2042",
    description: "Update cleaning procedure",
    area: "Manufacturing Area 1",
    equipment: "CIP-101",
    risk: "Low",
    status: "QA Review",
    created: "Aug 24, 2026",
    category: "Procedural Change",
    requestedBy: "Priya Nair",
  },
  {
    id: "CHG-2043",
    description: "Increase filter integrity test frequency",
    area: "Manufacturing Area 1",
    equipment: "Filter Unit F-12",
    risk: "Medium",
    status: "Approved",
    created: "Aug 20, 2026",
    category: "Procedural Change",
    requestedBy: "Marcus Feld",
  },
  {
    id: "CHG-2044",
    description: "Qualify new fill nozzle assembly",
    area: "Packaging Area 1",
    equipment: "Filling Line FL-03",
    risk: "High",
    status: "Impact Assessment",
    created: "Aug 17, 2026",
    category: "Equipment Change",
    requestedBy: "Laura Chen",
  },
  {
    id: "CHG-2045",
    description: "Revise agitator speed setpoint range",
    area: "Manufacturing Area 3",
    equipment: "Reactor R-204",
    risk: "Medium",
    status: "Implemented",
    created: "Aug 10, 2026",
    category: "Process Change",
    requestedBy: "Anita Rao",
  },
];

export const DEVIATION_TREND = [
  { month: "Mar", deviations: 18, highRisk: 3 },
  { month: "Apr", deviations: 22, highRisk: 4 },
  { month: "May", deviations: 19, highRisk: 3 },
  { month: "Jun", deviations: 26, highRisk: 6 },
  { month: "Jul", deviations: 24, highRisk: 5 },
  { month: "Aug", deviations: 27, highRisk: 5 },
];

export const DEVIATION_CATEGORIES = [
  { category: "Temperature", count: 14 },
  { category: "Equipment", count: 11 },
  { category: "Documentation", count: 9 },
  { category: "Cleaning", count: 7 },
  { category: "Environmental", count: 6 },
  { category: "Calibration", count: 5 },
];

export const EQUIPMENT_FREQUENCY = [
  { equipment: "Reactor R-102", count: 12 },
  { equipment: "Filter Unit F-12", count: 9 },
  { equipment: "Reactor R-204", count: 7 },
  { equipment: "Filling Line FL-03", count: 5 },
  { equipment: "CIP-101", count: 4 },
];

export const RISK_DISTRIBUTION = [
  { name: "Low", value: 9 },
  { name: "Medium", value: 14 },
  { name: "High", value: 9 },
  { name: "Critical", value: 3 },
];

export const AI_ACTIVITY = [
  {
    agent: "Deviation Understanding",
    deviation: "DEV-1023",
    state: "Completed" as const,
    time: "10:44 AM",
  },
  {
    agent: "Historical Investigation",
    deviation: "DEV-1023",
    state: "Completed" as const,
    time: "10:46 AM",
  },
  {
    agent: "Impact Assessment",
    deviation: "DEV-1023",
    state: "Running" as const,
    time: "10:48 AM",
  },
  {
    agent: "QA Recommendation",
    deviation: "DEV-1023",
    state: "Pending" as const,
    time: "—",
  },
];

export const AI_PATTERNS = [
  "Temperature-related deviations have increased by 18% over the last three months.",
  "Reactor R-102 appears in 4 historical deviations.",
  "SOP-102 is associated with 6 deviation investigations.",
  "CAPA-2041 has not reduced recurrence of temperature excursions in Area 3.",
];

export function findDeviation(id: string) {
  return DEVIATIONS.find((d) => d.id === id);
}

export function findInvestigation(id: string) {
  return INVESTIGATIONS.find((i) => i.id === id);
}

export function findChange(id: string) {
  return CHANGE_CONTROLS.find((c) => c.id === id);
}
