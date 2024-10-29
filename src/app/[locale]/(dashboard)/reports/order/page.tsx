import ListFilter from './list-filter';
import List from './list';

export default function Page() {
  return (
    <div className="flex flex-col gap-2 w-full">
      {/* 筛选条件 */}
      <ListFilter />
      {/* 表格 */}
      <List />
    </div>
  );
}
