# 🏦 Banking System API

A high-integrity financial backend designed to handle secure peer-to-peer money transfers with automated audit trails.

## 🧠 System Logic: Double-Entry Accounting
To ensure accuracy, this system doesn't just "change a number" in a database. It follows the **Double-Entry** principle:
1. **The Ledger:** Every transaction creates two entries.
2. **The Debit:** Money leaving an account (e.g., -500).
3. **The Credit:** Money entering an account (e.g., +500).
4. **The Balance:** Calculated by summing all ledger entries, ensuring the math always adds up.



## 🛠 API Endpoints

### Authentication
| Method | Endpoint | Description |
| :--- | :--- | :--- |
| POST | `/api/auth/register` | Create a new account |
| POST | `/api/auth/login` | Authenticate user & receive JWT |
| POST | `/api/auth/logout` | Invalidate token (Blacklist) |

### Transactions
| Method | Endpoint | Description |
| :--- | :--- | :--- |
| POST | `/api/transactions/transfer` | Transfer money between users |
| GET | `/api/transactions/history` | View all past credits/debits |
| GET | `/api/accounts/balance` | Get current verified balance |

## 🛡 Security Features
* **ACID Transactions:** Uses MongoDB sessions. If the email fails or the server crashes mid-transfer, the database "rolls back" to prevent money from disappearing.
* **JWT Security:** All transaction routes are protected. You can only send money from your own authenticated account.
* **App Passwords:** Secure SMTP integration for real-time transaction alerts.

## 🚀 Deployment
This project is configured for deployment on **Render**.
* **Root Directory:** `project-1 (BankingSystem)`
* **Node Version:** 18.x or higher