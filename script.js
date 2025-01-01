// Default expenses data
const defaultExpenses = [
    { description: "Erie Insurance", amount: 100.67 },
    { description: "Erie Insurance", amount: 13.67 },
    { description: "T-mobile Phone", amount: 130.00 },
    { description: "Electricity", amount: 170.00 },
    { description: "Town of Cary", amount: 75.00 },
    { description: "Dominion Gas", amount: 55.00 },
    { description: "Mortgage", amount: 1184.00 }
];

// Initialize the app
document.addEventListener('DOMContentLoaded', () => {
    // Load default expenses
    defaultExpenses.forEach(expense => {
        addExpenseToTable(expense.description, expense.amount);
    });
    updateTotals();
});

// Helper function to format currency
function formatCurrency(amount) {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD'
    }).format(amount);
}

// Add income to the table
function addIncome() {
    const description = document.getElementById('income-desc').value;
    const amount = parseFloat(document.getElementById('income-amount').value);

    if (description && amount > 0) {
        addIncomeToTable(description, amount);
        document.getElementById('income-desc').value = '';
        document.getElementById('income-amount').value = '';
        updateTotals();
    } else {
        alert('Please enter valid description and amount');
    }
}

// Add expense to the table
function addExpense() {
    const description = document.getElementById('expense-desc').value;
    const amount = parseFloat(document.getElementById('expense-amount').value);

    if (description && amount > 0) {
        addExpenseToTable(description, amount);
        document.getElementById('expense-desc').value = '';
        document.getElementById('expense-amount').value = '';
        updateTotals();
    } else {
        alert('Please enter valid description and amount');
    }
}

// Add income entry to table
function addIncomeToTable(description, amount) {
    const tbody = document.querySelector('#income-list tbody');
    const row = document.createElement('tr');
    row.innerHTML = `
        <td>${description}</td>
        <td>${formatCurrency(amount)}</td>
        <td><button class="delete-btn" onclick="this.closest('tr').remove(); updateTotals();">Delete</button></td>
    `;
    tbody.appendChild(row);
}

// Add expense entry to table
function addExpenseToTable(description, amount) {
    const tbody = document.querySelector('#expense-list tbody');
    const row = document.createElement('tr');
    row.innerHTML = `
        <td>${description}</td>
        <td>${formatCurrency(amount)}</td>
        <td><button class="delete-btn" onclick="this.closest('tr').remove(); updateTotals();">Delete</button></td>
    `;
    tbody.appendChild(row);
}

// Calculate totals and update display
function updateTotals() {
    const totalIncome = calculateTotal('#income-list');
    const totalExpenses = calculateTotal('#expense-list');
    const remainingBalance = totalIncome - totalExpenses;

    document.getElementById('total-income').textContent = formatCurrency(totalIncome);
    document.getElementById('total-expenses').textContent = formatCurrency(totalExpenses);
    document.getElementById('remaining-balance').textContent = formatCurrency(remainingBalance);

    updateInsights(totalIncome, totalExpenses, remainingBalance);
}

// Calculate total from a table
function calculateTotal(tableId) {
    let total = 0;
    const rows = document.querySelectorAll(`${tableId} tbody tr`);
    rows.forEach(row => {
        const amountText = row.cells[1].textContent;
        const amount = parseFloat(amountText.replace(/[$,]/g, ''));
        total += amount;
    });
    return total;
}

// Generate and update financial insights
function updateInsights(totalIncome, totalExpenses, remainingBalance) {
    const insights = [];
    const expenseRatio = totalIncome > 0 ? (totalExpenses / totalIncome) * 100 : 0;
    const savingsRatio = totalIncome > 0 ? (remainingBalance / totalIncome) * 100 : 0;

    // Calculate housing expenses (Mortgage)
    const housingExpenses = Array.from(document.querySelectorAll('#expense-list tbody tr'))
        .filter(row => row.cells[0].textContent.toLowerCase().includes('mortgage'))
        .reduce((sum, row) => {
            const amount = parseFloat(row.cells[1].textContent.replace(/[$,]/g, ''));
            return sum + amount;
        }, 0);
    
    const housingRatio = totalIncome > 0 ? (housingExpenses / totalIncome) * 100 : 0;

    // Generate insights based on financial ratios
    if (expenseRatio > 70) {
        insights.push(`• Warning: Your expenses are taking up ${expenseRatio.toFixed(1)}% of your income. The recommended maximum is 70%. Consider reducing non-essential expenses.`);
    }

    if (savingsRatio < 20) {
        insights.push(`• Your current savings rate is ${savingsRatio.toFixed(1)}%. Financial experts recommend saving at least 20% of your income. Try to increase your savings by reducing discretionary spending.`);
    }

    if (housingRatio > 30) {
        insights.push(`• Your housing costs are ${housingRatio.toFixed(1)}% of your income, which is above the recommended 30%. Consider ways to reduce housing expenses or increase income.`);
    } else if (housingRatio > 0) {
        insights.push(`• Your housing costs are ${housingRatio.toFixed(1)}% of your income, which is within the recommended range of under 30%.`);
    }

    if (remainingBalance < 0) {
        insights.push('• Critical: You are spending more than you earn. Create a plan to reduce expenses or increase income to avoid debt.');
    } else if (remainingBalance < totalIncome * 0.1) {
        insights.push('• Your remaining balance is low. Build an emergency fund of 3-6 months of expenses to protect against unexpected costs.');
    }

    if (insights.length === 0) {
        insights.push('• Your budget appears healthy! Continue maintaining your current financial habits.');
        if (savingsRatio >= 20) {
            insights.push(`• Excellent savings rate of ${savingsRatio.toFixed(1)}%! Consider investing your savings for long-term growth.`);
        }
    }

    // Update insights display
    document.getElementById('insights').innerHTML = insights.join('<br>');
}
