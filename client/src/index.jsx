import { h, render } from 'preact';
import me from './hooks/me';
import { AppContainer } from './containers/AppContainer';
  render(
      <AppContainer />,
    document.getElementById('app'),
  );
