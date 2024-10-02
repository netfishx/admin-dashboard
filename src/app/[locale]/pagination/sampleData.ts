// sampleData.ts

// 定义 Invoice 接口，包括用于树形结构的 parentInvoice 字段
export interface Invoice {
    invoice: string;
    parentInvoice?: string; // 父级发票，用于构建树形结构
    date: string;
    customer: string;
    paymentStatus: string;
    paymentMethod: string;
    dueDate: string;
    tax: string;
    discount: string;
    totalAmount: string;
    notes: string;
    extra1: string;
    extra2: string;
    extra3: string;
  }
  
  // 示例数据，包含树形结构
  export const invoices: Invoice[] = [
    {
      invoice: 'INV001',
      date: '2023-10-01',
      customer: '客户A',
      paymentStatus: 'Paid',
      paymentMethod: 'Credit Card',
      dueDate: '2023-11-01',
      tax: '$25.00',
      discount: '$10.00',
      totalAmount: '$250.00',
      notes: '无',
      extra1: '备注信息1',
      extra2: '备注信息2',
      extra3: '备注信息3',
    },
    {
      invoice: 'INV002',
      parentInvoice: 'INV001',
      date: '2023-10-05',
      customer: '客户B',
      paymentStatus: 'Unpaid',
      paymentMethod: 'Bank Transfer',
      dueDate: '2023-11-05',
      tax: '$15.00',
      discount: '$5.00',
      totalAmount: '$150.00',
      notes: '紧急',
      extra1: '备注信息4',
      extra2: '备注信息5',
      extra3: '备注信息6',
    },
    {
      invoice: 'INV003',
      parentInvoice: 'INV001',
      date: '2023-10-10',
      customer: '客户C',
      paymentStatus: 'Paid',
      paymentMethod: 'Cash',
      dueDate: '2023-11-10',
      tax: '$35.00',
      discount: '$15.00',
      totalAmount: '$350.00',
      notes: '无',
      extra1: '备注信息7',
      extra2: '备注信息8',
      extra3: '备注信息9',
    },
    {
      invoice: 'INV004',
      parentInvoice: 'INV002',
      date: '2023-10-15',
      customer: '客户D',
      paymentStatus: 'Overdue',
      paymentMethod: 'Credit Card',
      dueDate: '2023-11-15',
      tax: '$45.00',
      discount: '$20.00',
      totalAmount: '$450.00',
      notes: '需要提醒',
      extra1: '备注信息10',
      extra2: '备注信息11',
      extra3: '备注信息12',
    },
    {
      invoice: 'INV005',
      parentInvoice: 'INV003',
      date: '2023-10-20',
      customer: '客户E',
      paymentStatus: 'Paid',
      paymentMethod: 'Bank Transfer',
      dueDate: '2023-11-20',
      tax: '$55.00',
      discount: '$25.00',
      totalAmount: '$550.00',
      notes: '无',
      extra1: '备注信息13',
      extra2: '备注信息14',
      extra3: '备注信息15',
    },
    {
      invoice: 'INV006',
      date: '2023-10-25',
      customer: '客户F',
      paymentStatus: 'Unpaid',
      paymentMethod: 'Cash',
      dueDate: '2023-11-25',
      tax: '$65.00',
      discount: '$30.00',
      totalAmount: '$650.00',
      notes: '需要跟进',
      extra1: '备注信息16',
      extra2: '备注信息17',
      extra3: '备注信息18',
    },
    {
      invoice: 'INV007',
      date: '2023-10-30',
      customer: '客户G',
      paymentStatus: 'Paid',
      paymentMethod: 'Credit Card',
      dueDate: '2023-11-30',
      tax: '$75.00',
      discount: '$35.00',
      totalAmount: '$750.00',
      notes: '无',
      extra1: '备注信息19',
      extra2: '备注信息20',
      extra3: '备注信息21',
    },
    // 可以继续添加更多数据项，确保字段名与列配置中的 dataIndex 一致
  ];
  