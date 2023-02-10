import Menu, { SubMenu, Item as MenuItem } from 'rc-menu';
import 'rc-menu/assets/index.css';

//import styles from './menu.module.css';

export default function App( props ) {
	console.log('Menu')

  function onOpenChange(value) {
    // console.log('onOpenChange', value);
  }

  return (
    <>
      <Menu
        onClick={ (info) => props.handleMenu(info) }
        triggerSubMenuAction={ props.triggerSubMenuAction }
        onOpenChange={ onOpenChange }
        mode={ props.mode }
        motion={ props.openAnimation }
        defaultOpenKeys={ props.defaultOpenKeys }
      >
        <MenuItem key="1">Home</MenuItem>
        <SubMenu title={ <span className="submenu-title-wrapper">Resultados</span> } key="2">
          <MenuItem key="2-2">Buscar</MenuItem>
        </SubMenu>
        <SubMenu title={ <span className="submenu-title-wrapper">Tests</span> } key="3">
        <MenuItem key="3-1">IC</MenuItem>
        <MenuItem key="3-2">DISC</MenuItem>
        <MenuItem key="3-3">Asignar test</MenuItem>
        </SubMenu>
        <SubMenu title={ <span className="submenu-title-wrapper">Administración</span> } key="4">
          <SubMenu title={ <span className="submenu-title-wrapper">Usuario</span> } key="4-1">
            <MenuItem key="4-1-1">Listar</MenuItem>
            <MenuItem key="4-1-2">Crear</MenuItem>
          </SubMenu>
          <SubMenu title={ <span className="submenu-title-wrapper">Postulante</span> } key="4-2">
            <MenuItem key="4-2-1">Listar</MenuItem>
            <MenuItem key="4-2-2">Crear</MenuItem>
          </SubMenu>
        </SubMenu>
        <SubMenu title={ <span className="submenu-title-wrapper">Salir</span> } key="5">
          <MenuItem key="5-2">Salida del Sistema</MenuItem>
        </SubMenu>
      </Menu>
    </>
  );
}

// App.propTypes = {
// 	mode: PropTypes.string,
// 	openAnimation: PropTypes.oneOfType([ PropTypes.string, PropTypes.object ]),
// 	triggerSubMenuAction: PropTypes.string,
// 	defaultOpenKeys: PropTypes.arrayOf(PropTypes.string),
// 	updateChildrenAndOverflowedIndicator: PropTypes.bool,
// 	onLogOut: PropTypes.func
// };