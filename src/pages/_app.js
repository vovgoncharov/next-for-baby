import 'styles/globals.css'
import { App } from 'components/App';
import { UserProvider } from 'providers/UserProvider';

function MyApp({ Component, pageProps }) {
  return (
    <UserProvider>
      <App>
        <Component {...pageProps} />
      </App>
    </UserProvider>
  )
}

export default MyApp
