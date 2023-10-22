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
    },
    {
      name: 'Configuración',
      iconComponent: { name: 'settings' },
      children: [
        {
          name: 'Tip. servicios',
          url: '/',
          iconComponent: { name: 'none' },
          badge: {
            color: 'info',
            text: 'NEW',
          },
        },
        {
          name: 'Categorias',
          url: '/',
          iconComponent: { name: 'none' },
          badge: {
            color: 'info',
            text: 'NEW',
          },
        },
        {
          name: 'Atributos',
          url: '/',
          iconComponent: { name: 'none' },
          badge: {
            color: 'info',
            text: 'NEW',
          },
        },
        {
          name: 'Destinos',
          url: '/',
          iconComponent: { name: 'none' },
          badge: {
            color: 'info',
            text: 'NEW',
          },
        },
      ],
      badge: {
        color: 'info',
        text: 'NEW',
      },
    },
    {
      name: 'Seguridad',
      url: '/',
      iconComponent: { name: 'lock' },
      children: [
        {
          name: 'Usuarios',
          url: '/',
          iconComponent: { name: 'none' },
          badge: {
            color: 'info',
            text: 'NEW',
          },
        },
      ],
      badge: {
        color: 'info',
        text: 'NEW',
      },
    },
  ];
}
