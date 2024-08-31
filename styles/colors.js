const colorsDefault = (theme) => {
    switch (theme) {
        case 'light':
            const themeLight = {
                primary: '#4D3EFC',
                secondary: '#8C83ED',
                background: '#F6FCFF',
                text: '#130E4A',
                button: '#4D3EFC'
            };
            return themeLight

        case 'light':
            const themeDark = {
                primary: '#4D3EFC',
                secondary: '#8C83ED',
                background: '#130E4A',
                text: '#F6FCFF',
                button: '#4D3EFC'
            };
            return themeDark

        default:
            break;
    }
}
export default colorsDefault;
