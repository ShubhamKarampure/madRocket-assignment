import { Helmet } from 'react-helmet-async';

import { CONFIG } from 'src/config-global';
import { StudentsView } from 'src/sections/user/view';
// ----------------------------------------------------------------------

export default function Page() {
  return (
    <>
      <Helmet>
        <title> {`Student Page - ${CONFIG.appName}`}</title>
      </Helmet>

      <StudentsView />
    </>
  );
}
