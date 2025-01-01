describe('Budget Calculator', () => {
    beforeEach(() => {
        cy.visit('../../index.html');
    });

    it('loads with default expenses', () => {
        cy.get('#expense-list tbody tr').should('have.length', 7);
        cy.get('#total-expenses').should('contain', '$1,728.34');
    });

    it('can add and remove income', () => {
        // Add income
        cy.get('#income-desc').type('Salary');
        cy.get('#income-amount').type('5000');
        cy.contains('button', 'Add Income').click();

        // Verify income was added
        cy.get('#income-list tbody tr').should('have.length', 1);
        cy.get('#total-income').should('contain', '$5,000.00');

        // Remove income
        cy.get('#income-list tbody tr').find('.delete-btn').click();
        cy.get('#income-list tbody tr').should('have.length', 0);
        cy.get('#total-income').should('contain', '$0.00');
    });

    it('can add and remove expenses', () => {
        // Add new expense
        cy.get('#expense-desc').type('Groceries');
        cy.get('#expense-amount').type('200');
        cy.contains('button', 'Add Expense').click();

        // Verify expense was added to existing default expenses
        cy.get('#expense-list tbody tr').should('have.length', 8);
        cy.get('#total-expenses').should('contain', '$1,928.34');

        // Remove the added expense
        cy.get('#expense-list tbody tr').contains('Groceries').parent('tr').find('.delete-btn').click();
        cy.get('#expense-list tbody tr').should('have.length', 7);
        cy.get('#total-expenses').should('contain', '$1,728.34');
    });

    it('calculates remaining balance correctly', () => {
        // Add income
        cy.get('#income-desc').type('Salary');
        cy.get('#income-amount').type('5000');
        cy.contains('button', 'Add Income').click();

        // Verify remaining balance
        cy.get('#remaining-balance').should('contain', '$3,271.66');
    });

    it('validates input fields', () => {
        // Try to add income with empty fields
        cy.contains('button', 'Add Income').click();
        cy.on('window:alert', (text) => {
            expect(text).to.equal('Please enter valid description and amount');
        });

        // Try to add expense with empty fields
        cy.contains('button', 'Add Expense').click();
        cy.on('window:alert', (text) => {
            expect(text).to.equal('Please enter valid description and amount');
        });
    });

    it('updates financial insights', () => {
        // Add income that will trigger expense ratio warning
        cy.get('#income-desc').type('Salary');
        cy.get('#income-amount').type('2000');
        cy.contains('button', 'Add Income').click();

        // Verify expense ratio warning
        cy.get('#insights').should('contain', 'Warning: Your expenses are taking up');
        cy.get('#insights').should('contain', '86.4%');

        // Add more income to improve ratio
        cy.get('#income-desc').type('Bonus');
        cy.get('#income-amount').type('3000');
        cy.contains('button', 'Add Income').click();

        // Verify improved financial health message
        cy.get('#insights').should('not.contain', 'Warning');
        cy.get('#insights').should('contain', 'Your housing costs are');
    });

    it('handles mortgage-specific insights', () => {
        // Add income
        cy.get('#income-desc').type('Salary');
        cy.get('#income-amount').type('3000');
        cy.contains('button', 'Add Income').click();

        // Verify housing ratio insight
        cy.get('#insights').should('contain', 'Your housing costs are 39.5% of your income');
        cy.get('#insights').should('contain', 'above the recommended 30%');
    });
});
