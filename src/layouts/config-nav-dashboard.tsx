import { Label } from 'src/components/label';
import { SvgColor } from 'src/components/svg-color';

// ----------------------------------------------------------------------

const icon = (name: string) => (
  <SvgColor width="100%" height="100%" src={`/assets/icons/navbar/${name}.svg`} />
);

export const navData = [
  {
    title: 'Student Page',
    path: '/',
    icon: icon('ic-user'),
  },
  {
    title: 'Log out',
    path: '/logout-user',
    icon: icon('ic-disabled'),
  }
];
