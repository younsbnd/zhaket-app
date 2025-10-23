// Table headers configuration for invoices table
export const INVOICES_TABLE_HEADERS = [
  { key: 'number', label: 'شماره' },
  { key: 'status', label: 'وضعیت' },
  { key: 'date', label: 'تاریخ' },
  { key: 'amount', label: 'مبلغ' },
  { key: 'action', label: '' }
];

// Order status configuration
export const ORDER_STATUS_CONFIG = {
  PENDING: { 
    text: "در انتظار پرداخت", 
    color: "bg-[#FEF3E2] text-[#ff9900]", 
    button: "پرداخت", 
    buttonColor: "text-white bg-amber-500 hover:bg-yellow-600" 
  },
  COMPLETED: { 
    text: "تکمیل شده", 
    color: "bg-[#E8F5E8] text-[#22c55e]", 
    button: "تکمیل شده", 
    buttonColor: "text-white disabled bg-green-400 hover:bg-green-500" 
  },
  CANCELLED: { 
    text: "لغو شده", 
    color: "bg-[#FEE2E2] text-[#ef4444]", 
    button: "لغو شده", 
    buttonColor: "text-white bg-red-500 hover:bg-red-600" 
  },
  PAID: { 
    text: "پرداخت شده", 
    color: "bg-[#E0F2FE] text-[#0ea5e9]", 
    button: "پرداخت شده", 
    buttonColor: "text-white disabled bg-blue-500 hover:bg-blue-600" 
  }
};

// Helper function to get status info
export const getStatusInfo = (status) => {
  return ORDER_STATUS_CONFIG[status] || ORDER_STATUS_CONFIG.PENDING;
};
