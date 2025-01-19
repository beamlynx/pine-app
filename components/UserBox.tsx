import { UserButton, useUser } from '@clerk/nextjs';
import { Box, IconButton } from '@mui/material';
import { observer } from 'mobx-react-lite';
import { useStores } from '../store/store-container';
import { useTheme } from '../store/theme-context';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';

const UserAuthComponent = observer(() => {
  const { user } = useUser();
  const { global: store } = useStores();

  if (user) {
    const email = user?.emailAddresses?.[0]?.emailAddress || '';
    store.setEmail(email);
  }

  return <UserButton userProfileMode="modal" />;
});

const UserBox = observer(() => {
  const { isDarkMode, toggleTheme } = useTheme();
  const isDevelopment = process.env.NODE_ENV === 'development';

  return (
    <Box sx={{ m: 1, ml: 2, display: 'flex', alignItems: 'center', gap: 1 }}>
      <IconButton onClick={toggleTheme} color="inherit">
        {isDarkMode ? <Brightness7Icon /> : <Brightness4Icon />}
      </IconButton>
      {!isDevelopment && <UserAuthComponent />}
    </Box>
  );
});

export default UserBox;
