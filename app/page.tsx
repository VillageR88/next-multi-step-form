import LayoutHome from './home/layout';
import YourInfo from './home/YourInfo';
import SelectPlan from './home/SelectPlan';
import Addons from './home/Addons';

export default function Home() {
  return (
    <LayoutHome>
      <YourInfo />
      <SelectPlan />
      <Addons />
    </LayoutHome>
  );
}
