import OverViewCard from "../components/OverViewCard";
import StatisticsCard from "../components/StatisticsCard";
import PieChart from "../components/Charts/PieChart";
import SalesChart from "../components/Charts/SalesChart";

const Home = () => {
  return (
    <div className="bg-gray-100 rounded-xl p-5">
      <OverViewCard />
      <div className="grid grid-cols-2  pt-5">
        <div className="pr-5">
          <StatisticsCard />
        </div>
        <div className="">
          <PieChart />
        </div>
      </div>
      <SalesChart />
    </div>
  );
};

export default Home;
