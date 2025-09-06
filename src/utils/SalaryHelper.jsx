const columns = [
  { name: 'SNo', selector: row => row.SNo },
  { name: 'Employee ID', selector: row => row.employeeId, sortable: true },
  { name: 'Salary', selector: row => row.salary, sortable: true},
  { name: 'Allowance', selector: row => row.allowance, sortable: true},
  { name: 'Deduction', selector: row => row.deduction, sortable: true },
  { name: 'Pay Date', selector: row => new Date(row.payDate).toLocaleDateString('en-GB') },
];

export{
    columns
}