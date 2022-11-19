// defining all themes here

const darkTheme = {
    label: "Dark",
    background: 'black',
    title: 'pink',
    typeBoxText: 'grey',
    stats: 'green'
}

const redTheme = {
    label: 'Red Theme',
    background: 'red',
    title: 'white',
    typeBoxText: 'blue',
    stats: 'purple'
}

// exporting an array 
// value is the theme object
// exporting this way because it will be easy to put react select for themes as react select takes an array, and then it maps values and labels in the options 
export const themeOptions = [
    {value: darkTheme, label: 'Dark'},
    {value: redTheme, label: 'Red Theme'}
]