// data.ts

export interface LoanApplication {
  id: number;
  applicant: string;
  amount: string; // 可以改为 number，如果你想存储数字金额
  status: 'pending' | 'under_review' | 'flagged';
  createdAt: string; // ISO 时间字符串
}

export const loanApplications: LoanApplication[] = [
  {
    id: 1,
    applicant: "John Smith",
    amount: "$50,000",
    status: "pending",
    createdAt: "2025-01-10T10:00:00.000Z",
  },
  {
    id: 2,
    applicant: "Sarah Johnson",
    amount: "$150,000",
    status: "under_review",
    createdAt: "2025-01-08T10:00:00.000Z",
  },
  {
    id: 3,
    applicant: "Michael Chen",
    amount: "$500,000",
    status: "pending",
    createdAt: "2025-01-05T10:00:00.000Z",
  },
  {
    id: 4,
    applicant: "Emily Williams",
    amount: "$1,000,000",
    status: "flagged",
    createdAt: "2025-01-03T10:00:00.000Z",
  },
];