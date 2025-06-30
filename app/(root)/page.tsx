import HeaderBox from "@/components/HeaderBox";
import RecentTransactions from "@/components/RecentTransactions";
import RightSidebar from "@/components/RightSidebar";
import TotalBalanceBox from "@/components/TotalBalanceBox";
import TransactionsTable from "@/components/TransactionsTable";
import { getAccount, getAccounts } from "@/lib/actions/bank.actions";
import { getLoggedInUser } from "@/lib/actions/user.actions";

import { mockTransactions } from "@/lib/mock-transactions";



const Home = async ({ searchParams: { id, page } }: SearchParamProps) => {
  const currentPage = Number(page as string) || 1;
  const loggedIn = await getLoggedInUser();

  const accounts = await getAccounts({
    userId: loggedIn.$id,
  });

  if (!accounts) return;

  const accountsData = accounts?.data;
  const appwriteItemId = (id as string) || accountsData[0]?.appwriteItemId;

  const account = await getAccount({ appwriteItemId });

  return (
    <section className="home">
      <div className="home-content">
        <header className="home-header">
          <HeaderBox
            type="greeting"
            title="Welcome"
            user={loggedIn?.firstName || "Guest"}
            subtext="Access and manage your account and transactions efficiently."
          />

          <TotalBalanceBox
            accounts={accountsData}
            totalBanks={accounts?.totalBanks}
            totalCurrentBalance={accounts?.totalCurrentBalance}
          />
        </header>

        {/* <RecentTransactions accounts={[]} transactions={[]} appwriteItemId={""} page={0}          // accounts={accountsData}
          // transactions={transactiions}
          // appwriteItemId={appwriteItemId}
          // page={1}
        /> */}

        {/* import { mockTransactions } from "@/lib/mock-transactions"; */}

        <TransactionsTable 
          transactions={mockTransactions} 
        />

      </div>

      <RightSidebar
        user={loggedIn}
        // transactions={account?.transactions}
        // banks={accountsData?.slice(0, 2)}
        transactions={[]}
        banks={[{ currentBalance: 175000.50}, { currentBalance: 500.50}]}
      />
    </section>
  );
};

export default Home;
