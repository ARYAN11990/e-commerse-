import AIKpiCards from '../components/AI/AIKpiCards';
import UsersRevenueStatistics from '../components/AI/UsersRevenueStatistics';
import APITokenUsages from '../components/AI/APITokenUsages';
import UserAnalytics from '../components/AI/UserAnalytics';
import ProjectsAnalytics from '../components/AI/ProjectsAnalytics';
import AIRecentTransactions from '../components/AI/AIRecentTransactions';

const AI = () => {
  return (
    <>
      {/* Top Row: 4 KPI Cards */}
      <AIKpiCards />

      {/* Second Row: 8/4 Split (Stats and Donut Chart) */}
      <div className="grid grid-cols-12 gap-4 md:gap-6 2xl:gap-7.5 mb-4 md:gap-6 2xl:mb-7.5">
        <div className="col-span-12 xl:col-span-8 flex flex-col">
          <UsersRevenueStatistics />
        </div>
        <div className="col-span-12 xl:col-span-4 flex flex-col">
          <APITokenUsages />
        </div>
      </div>

      {/* Third Row: 50/50 Split (Analytics Cards) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 2xl:gap-7.5 mb-4 md:gap-6 2xl:mb-7.5">
        <div className="flex flex-col">
          <UserAnalytics />
        </div>
        <div className="flex flex-col">
          <ProjectsAnalytics />
        </div>
      </div>

      {/* Bottom Row: Full-width Table */}
      <div className="grid grid-cols-12">
        <div className="col-span-12">
          <AIRecentTransactions />
        </div>
      </div>
    </>
  );
};

export default AI;
