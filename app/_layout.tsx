import { NavigationIndependentTree } from '@react-navigation/native';
import Router from '../src/router';

const AppNavigator = () => {
  return (
    <NavigationIndependentTree>
      <Router />
    </NavigationIndependentTree>
  );
};

export default AppNavigator;
