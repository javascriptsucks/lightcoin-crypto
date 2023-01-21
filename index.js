class Account {

  constructor(username) {
    this.username = username;
    this.transactions = [];
  }
  get balance() {
    return this.transactions.reduce((prev, curv) => prev + (curv instanceof Deposit ? curv.amount : -curv.amount), 0);
  }
  addTransaction(transaction) {
    this.transactions.push(transaction);
  }
}

class Transaction {

  constructor(amount, account) {
    this.amount  = amount;
    this.account = account;
  }

  commit() {
    // Keep track of the time of the transaction
    this.time = new Date();
    // Add the transaction to the account
    if (this instanceof Withdrawal && this.amount > this.account.balance) {
      console.log('There is not enough balance for the withdrawal amount.');
      return false;
    }
    this.account.addTransaction(this);
  }

}

class Deposit extends Transaction {

  get value() {
    return this.amount;
  }

}

class Withdrawal extends Transaction {

  get value() {
    return -this.amount;
  }

}

// DRIVER CODE BELOW

const myAccount = new Account('billybob');

console.log('Starting Balance:', myAccount.balance);

const t1 = new Deposit(120.00, myAccount);
t1.commit();

const t2 = new Withdrawal(50.00, myAccount);
t2.commit();

const t3 = new Withdrawal(150.00, myAccount);
t3.commit();

console.log('Ending Balance:', myAccount.balance);
console.log('Transaction:', myAccount.transactions);
console.log('Ending Balance:', myAccount.balance);
