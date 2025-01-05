'use strict';
var __awaiter =
  (this && this.__awaiter) ||
  function (thisArg, _arguments, P, generator) {
    function adopt(value) {
      return value instanceof P
        ? value
        : new P(function (resolve) {
            resolve(value);
          });
    }
    return new (P || (P = Promise))(function (resolve, reject) {
      function fulfilled(value) {
        try {
          step(generator.next(value));
        } catch (e) {
          reject(e);
        }
      }
      function rejected(value) {
        try {
          step(generator['throw'](value));
        } catch (e) {
          reject(e);
        }
      }
      function step(result) {
        result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
      }
      step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
  };
var __generator =
  (this && this.__generator) ||
  function (thisArg, body) {
    var _ = {
        label: 0,
        sent: function () {
          if (t[0] & 1) throw t[1];
          return t[1];
        },
        trys: [],
        ops: [],
      },
      f,
      y,
      t,
      g = Object.create((typeof Iterator === 'function' ? Iterator : Object).prototype);
    return (
      (g.next = verb(0)),
      (g['throw'] = verb(1)),
      (g['return'] = verb(2)),
      typeof Symbol === 'function' &&
        (g[Symbol.iterator] = function () {
          return this;
        }),
      g
    );
    function verb(n) {
      return function (v) {
        return step([n, v]);
      };
    }
    function step(op) {
      if (f) throw new TypeError('Generator is already executing.');
      while ((g && ((g = 0), op[0] && (_ = 0)), _))
        try {
          if (
            ((f = 1),
            y && (t = op[0] & 2 ? y['return'] : op[0] ? y['throw'] || ((t = y['return']) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done)
          )
            return t;
          if (((y = 0), t)) op = [op[0] & 2, t.value];
          switch (op[0]) {
            case 0:
            case 1:
              t = op;
              break;
            case 4:
              _.label++;
              return { value: op[1], done: false };
            case 5:
              _.label++;
              y = op[1];
              op = [0];
              continue;
            case 7:
              op = _.ops.pop();
              _.trys.pop();
              continue;
            default:
              if (!((t = _.trys), (t = t.length > 0 && t[t.length - 1])) && (op[0] === 6 || op[0] === 2)) {
                _ = 0;
                continue;
              }
              if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) {
                _.label = op[1];
                break;
              }
              if (op[0] === 6 && _.label < t[1]) {
                _.label = t[1];
                t = op;
                break;
              }
              if (t && _.label < t[2]) {
                _.label = t[2];
                _.ops.push(op);
                break;
              }
              if (t[2]) _.ops.pop();
              _.trys.pop();
              continue;
          }
          op = body.call(thisArg, _);
        } catch (e) {
          op = [6, e];
          y = 0;
        } finally {
          f = t = 0;
        }
      if (op[0] & 5) throw op[1];
      return { value: op[0] ? op[1] : void 0, done: true };
    }
  };
Object.defineProperty(exports, '__esModule', { value: true });
var client_1 = require('@prisma/client');
var prisma = new client_1.PrismaClient();
function main() {
  return __awaiter(this, void 0, void 0, function () {
    var userId,
      financeAccounts,
      categories,
      savedFinanceAccounts,
      savedCategories,
      startDate,
      transactions,
      i,
      currentDate,
      isExpense,
      amount,
      payee,
      category,
      amount,
      payee,
      category,
      seededTransactions;
    return __generator(this, function (_a) {
      switch (_a.label) {
        case 0:
          userId = '677a99a8f1dbdd8fd1837a5c';
          // First, delete all existing records to start fresh
          return [4 /*yield*/, prisma.transaction.deleteMany({ where: { financeAccount: { userId: userId } } })];
        case 1:
          // First, delete all existing records to start fresh
          _a.sent();
          return [4 /*yield*/, prisma.category.deleteMany({ where: { userId: userId } })];
        case 2:
          _a.sent();
          return [4 /*yield*/, prisma.financeAccount.deleteMany({ where: { userId: userId } })];
        case 3:
          _a.sent();
          console.log('Deleted all existing records.');
          return [
            4 /*yield*/,
            prisma.financeAccount.createMany({
              data: [
                { name: 'Savings Account', userId: userId },
                { name: 'Checking Account', userId: userId },
                { name: 'Credit Card', userId: userId },
                { name: 'Business Account', userId: userId },
              ],
            }),
          ];
        case 4:
          financeAccounts = _a.sent();
          console.log('Seeded '.concat(financeAccounts.count, ' FinanceAccounts.'));
          return [
            4 /*yield*/,
            prisma.category.createMany({
              data: [
                { name: 'Groceries', userId: userId },
                { name: 'Rent', userId: userId },
                { name: 'Utilities', userId: userId },
                { name: 'Entertainment', userId: userId },
                { name: 'Travel', userId: userId },
                { name: 'Health & Wellness', userId: userId },
                { name: 'Dining Out', userId: userId },
                { name: 'Education', userId: userId },
                { name: 'Income', userId: userId }, // Added category for Income
              ],
            }),
          ];
        case 5:
          categories = _a.sent();
          console.log('Seeded '.concat(categories.count, ' Categories.'));
          return [4 /*yield*/, prisma.financeAccount.findMany({ where: { userId: userId } })];
        case 6:
          savedFinanceAccounts = _a.sent();
          return [4 /*yield*/, prisma.category.findMany({ where: { userId: userId } })];
        case 7:
          savedCategories = _a.sent();
          startDate = new Date('2024-11-01');
          transactions = [];
          for (i = 0; i < 90; i++) {
            currentDate = new Date(startDate);
            currentDate.setDate(startDate.getDate() + i);
            isExpense = Math.random() > 0.5;
            if (isExpense) {
              amount = -Math.floor(Math.random() * 500) - 50;
              payee = ['Supermarket', 'Landlord', 'Electric Company', 'Restaurant', 'Gym'].sort(function () {
                return 0.5 - Math.random();
              })[0];
              category = savedCategories.find(function (cat) {
                return ['Groceries', 'Rent', 'Utilities', 'Dining Out', 'Health & Wellness'].includes(cat.name);
              });
              transactions.push({
                amount: amount,
                payee: payee,
                notes: ''.concat(payee, ' payment'),
                date: currentDate,
                financeAccountId: savedFinanceAccounts[Math.floor(Math.random() * savedFinanceAccounts.length)].id,
                categoryId: category === null || category === void 0 ? void 0 : category.id,
              });
            } else {
              amount = Math.floor(Math.random() * 2000) + 1000;
              payee = ['Freelance Project', 'Salary', 'Business Income'].sort(function () {
                return 0.5 - Math.random();
              })[0];
              category = savedCategories.find(function (cat) {
                return cat.name === 'Income';
              });
              transactions.push({
                amount: amount,
                payee: payee,
                notes: ''.concat(payee, ' payment'),
                date: currentDate,
                financeAccountId: savedFinanceAccounts[Math.floor(Math.random() * savedFinanceAccounts.length)].id,
                categoryId: category === null || category === void 0 ? void 0 : category.id,
              });
            }
          }
          return [
            4 /*yield*/,
            prisma.transaction.createMany({
              data: transactions,
            }),
          ];
        case 8:
          seededTransactions = _a.sent();
          console.log('Seeded '.concat(seededTransactions.count, ' Transactions.'));
          return [2 /*return*/];
      }
    });
  });
}
main()
  .then(function () {
    return __awaiter(void 0, void 0, void 0, function () {
      return __generator(this, function (_a) {
        switch (_a.label) {
          case 0:
            return [4 /*yield*/, prisma.$disconnect()];
          case 1:
            _a.sent();
            return [2 /*return*/];
        }
      });
    });
  })
  .catch(function (e) {
    return __awaiter(void 0, void 0, void 0, function () {
      return __generator(this, function (_a) {
        switch (_a.label) {
          case 0:
            console.error(e);
            return [4 /*yield*/, prisma.$disconnect()];
          case 1:
            _a.sent();
            process.exit(1);
            return [2 /*return*/];
        }
      });
    });
  });
