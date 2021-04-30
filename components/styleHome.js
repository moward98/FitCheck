import { StyleSheet } from 'react-native'

const homepageStyle = StyleSheet.create({
    container: {
        flex: 1,
    },
    camera: {
        flex: 1,
    },
    button: {
        flex: 0.1,
        justifyContent: 'center'
    },
    text: {
        fontSize: 18,
        color: 'black',
    },
    navBar: {
        flex: 0.125,
        justifyContent: 'space-around',
        flexDirection: "row",
        backgroundColor: "black",
    }
})

export { homepageStyle }