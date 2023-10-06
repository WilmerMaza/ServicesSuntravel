import { INavData } from '@coreui/angular';


export class NavItem {

  public Admin: INavData[] = [
    {
      name: 'Servicios',
      url: '/servicios',
      iconComponent: { name: 'add_circle_outline' },
      badge: {
        color: 'info',
        text: 'NEW',
      },
    }
  ];

}
