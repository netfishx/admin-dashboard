import Welcome from './Welcome';
import DataOverview from './DataOverview';
import QuickAccess from './QuickAccess';

export default function DashboardPage() {
  const userInfo = {
    name: '张三', 
    data: {
      value1: 1,
      value2: 2,
      value3: 3,
      value4: 4,
    } 
  }
  return <div>
    <Welcome user={userInfo} />
    <DataOverview />
    <QuickAccess />
  </div>;
}
