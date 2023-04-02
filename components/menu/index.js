import { useState, useEffect } from "react";
import Menu, { SubMenu, Item as MenuItem } from 'rc-menu';

import Cookie from '../../utils/Cookie'

import 'rc-menu/assets/index.css';

//import styles from './menu.module.css';

export default function App( props ) {
	console.log('Menu')

  const [ showMenuUsers, setShowMenuUsers ] = useState(false)

  useEffect(() => {
    const user = Cookie.getUser()
    setShowMenuUsers(user.profile == process.env.NEXT_PUBLIC_PROFILE_ADMIN_ID)
  }, []);

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
        <SubMenu title={ <span className="submenu-title-wrapper">Tests</span> } key="2">
          <MenuItem key="2-1">Buscar</MenuItem>
          <MenuItem key="2-2">Asignar test</MenuItem>
        </SubMenu>
        {showMenuUsers ? 
        <SubMenu title={ <span className="submenu-title-wrapper">Usuarios</span> } key="3">
          <MenuItem key="3-1">Listar</MenuItem>
            <MenuItem key="3-2">Crear</MenuItem>
        </SubMenu>
        :
        ''}
        <SubMenu title={ <span className="submenu-title-wrapper">Postulantes</span> } key="4">
          <MenuItem key="4-1">Listar</MenuItem>
            <MenuItem key="4-2">Crear</MenuItem>
        </SubMenu>
        <SubMenu title={ <span className="submenu-title-wrapper">Salir</span> } key="6">
          <MenuItem key="6-1">Salida del Sistema</MenuItem>
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