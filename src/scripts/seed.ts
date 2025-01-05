import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const userId = '6779a593d996b7c8b361a950'; // Replace with the actual userId

  // First, delete all existing records to start fresh
  await prisma.transaction.deleteMany({ where: { financeAccount: { userId } } });
  await prisma.category.deleteMany({ where: { userId } });
  await prisma.financeAccount.deleteMany({ where: { userId } });

  console.log('Deleted all existing records.');

  // Seed FinanceAccounts
  const financeAccounts = await prisma.financeAccount.createMany({
    data: [
      { name: 'Savings Account', userId },
      { name: 'Checking Account', userId },
      { name: 'Credit Card', userId },
      { name: 'Business Account', userId },
    ],
  });

  console.log(`Seeded ${financeAccounts.count} FinanceAccounts.`);

  // Seed Categories
  const categories = await prisma.category.createMany({
    data: [
      { name: 'Groceries', userId },
      { name: 'Rent', userId },
      { name: 'Utilities', userId },
      { name: 'Entertainment', userId },
      { name: 'Travel', userId },
      { name: 'Health & Wellness', userId },
      { name: 'Dining Out', userId },
      { name: 'Education', userId },
      { name: 'Income', userId }, // Added category for Income
    ],
  });

  console.log(`Seeded ${categories.count} Categories.`);

  // Fetch the created FinanceAccounts and Categories
  const savedFinanceAccounts = await prisma.financeAccount.findMany({ where: { userId } });
  const savedCategories = await prisma.category.findMany({ where: { userId } });

  // Generate transactions for 90 days starting from a specific date
  const startDate = new Date('2024-11-01');
  const transactions = [];

  for (let i = 0; i < 90; i++) {
    const currentDate = new Date(startDate);
    currentDate.setDate(startDate.getDate() + i);

    // Randomly choose between income and expense
    const isExpense = Math.random() > 0.5; // 50% chance for expense or income

    if (isExpense) {
      // Expense transaction
      const amount = -Math.floor(Math.random() * 500) - 50; // Random expense between 50 and 500
      const payee = ['Supermarket', 'Landlord', 'Electric Company', 'Restaurant', 'Gym'].sort(() => 0.5 - Math.random())[0];
      const category = savedCategories.find((cat) => ['Groceries', 'Rent', 'Utilities', 'Dining Out', 'Health & Wellness'].includes(cat.name));
      transactions.push({
        amount,
        payee,
        notes: `${payee} payment`,
        date: currentDate,
        financeAccountId: savedFinanceAccounts[Math.floor(Math.random() * savedFinanceAccounts.length)].id,
        categoryId: category?.id,
      });
    } else {
      // Income transaction
      const amount = Math.floor(Math.random() * 2000) + 1000; // Random income between 1000 and 3000
      const payee = ['Freelance Project', 'Salary', 'Business Income'].sort(() => 0.5 - Math.random())[0];
      const category = savedCategories.find((cat) => cat.name === 'Income');
      transactions.push({
        amount,
        payee,
        notes: `${payee} payment`,
        date: currentDate,
        financeAccountId: savedFinanceAccounts[Math.floor(Math.random() * savedFinanceAccounts.length)].id,
        categoryId: category?.id,
      });
    }
  }

  // Seed Transactions for the 90 days
  const seededTransactions = await prisma.transaction.createMany({
    data: transactions,
  });

  console.log(`Seeded ${seededTransactions.count} Transactions.`);
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
