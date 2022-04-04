// If needed, add more constants
import nookies from 'nookies';

export const headers = {
  'Authorization': `Bearer ${nookies.get(null)?.token}`,
  'Content-Type': 'application/json',
};
