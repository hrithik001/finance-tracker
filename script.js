
        const transactionForm = document.getElementById('transactionForm');
        const transactionType = document.getElementById('transactionType');
        const amount = document.getElementById('amount');
        const category = document.getElementById('category');
        const date = document.getElementById('date');
        const changename=document.getElementById('changename');
        const transactionsContainer = document.getElementById('transactions');
        const balanceContainer = document.getElementById('balance');

        let transactions = [];

        transactionForm.addEventListener('submit', function (event) {
            changename.innerHTML="Add Transaction";
            event.preventDefault();

            const newTransaction = {
                id: generateId(),
                type: transactionType.value,
                amount: parseFloat(amount.value),
                category: category.value,
                date: date.value
            };

            transactions.push(newTransaction);
            renderTransactions();
            updateBalance();

            transactionForm.reset();
        });

        function renderTransactions() {
            transactionsContainer.innerHTML = '';

            transactions.forEach(function (transaction) {
                const transactionItem = document.createElement('div');
                transactionItem.className = 'transaction-item';

                const transactionInfo = document.createElement('div');
                transactionInfo.className = 'transaction-info';

                const transactionType = document.createElement('span');
                transactionType.className = 'transaction-type';
                transactionType.textContent = transaction.type.toUpperCase();

                const transactionAmount = document.createElement('span');
                transactionAmount.textContent = 'Rs.' + transaction.amount.toFixed(2);

                const transactionCategory = document.createElement('span');
                transactionCategory.textContent = transaction.category;

                const transactionDate = document.createElement('span');
                transactionDate.textContent = formatDate(transaction.date);

                const transactionActions = document.createElement('div');
                transactionActions.className = 'transaction-actions';

                const editButton = document.createElement('button');
                editButton.textContent = 'Edit';
                editButton.addEventListener('click', function () {
                    changename.innerHTML="Updating Transaction";
                    editTransaction(transaction.id);
                    
                });
                changename.innerHTML="Add Transaction";
                const deleteButton = document.createElement('button');
                deleteButton.textContent = 'Delete';
                deleteButton.addEventListener('click', function () {
                    deleteTransaction(transaction.id);
                });

                transactionInfo.appendChild(transactionType);
                transactionInfo.appendChild(transactionAmount);
                transactionInfo.appendChild(transactionCategory);
                transactionInfo.appendChild(transactionDate);

                transactionActions.appendChild(editButton);
                transactionActions.appendChild(deleteButton);

                transactionItem.appendChild(transactionInfo);
                transactionItem.appendChild(transactionActions);

                transactionsContainer.appendChild(transactionItem);
            });
        }

        function updateBalance() {
            let totalIncome = 0;
            let totalExpense = 0;
           
            transactions.forEach(function (transaction) {
                if (transaction.type === 'income') {
                    totalIncome += transaction.amount;
                } else {
                    totalExpense += transaction.amount;
                }
            });

            const currentBalance = totalIncome - totalExpense;
            balanceContainer.textContent = 'Current Balance: Rs.' + currentBalance.toFixed(2);
        }

        function editTransaction(id) {
           
            const transactionIndex = transactions.findIndex(function (transaction) {
                return transaction.id === id;
            });

            if (transactionIndex !== -1) {
                const transaction = transactions[transactionIndex];
                transactionType.value = transaction.type;
                amount.value = transaction.amount;
                category.value = transaction.category;
                date.value = transaction.date;

                transactions.splice(transactionIndex, 1);
                renderTransactions();
                updateBalance();
            }
        }

        function deleteTransaction(id) {
            const transactionIndex = transactions.findIndex(function (transaction) {
                return transaction.id === id;
            });

            if (transactionIndex !== -1) {
                transactions.splice(transactionIndex, 1);
                renderTransactions();
                updateBalance();
            }
        }

        function generateId() {
            return '_' + Math.random().toString(36).substr(2, 9);
        }

        function formatDate(dateString) {
            const options = { year: 'numeric', month: 'long', day: 'numeric' };
            return new Date(dateString).toLocaleDateString(undefined, options);
        }
