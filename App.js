import { createAppContainer, createSwitchNavigator} from 'react-navigation';
import HomeScreen from './src/screens/HomeScreen';
import WorkScreen from './src/screens/WorkScreen';

const MainNavigator = createSwitchNavigator({
  Home: {screen: HomeScreen},
  Work: {screen: WorkScreen}
});

const App = createAppContainer(MainNavigator);

export default App; 