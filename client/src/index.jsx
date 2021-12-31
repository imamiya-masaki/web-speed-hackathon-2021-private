import { h, render } from 'preact';
import me from './hooks/me';
import { AppContainer } from './containers/AppContainer';
  window.user = me();
  render(
      <AppContainer />,
    document.getElementById('app'),
  );
