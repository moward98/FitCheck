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
        color: 'white',
    },
    navBar: {
        flex: 0.125,
        justifyContent: 'flex-end',
        flexDirection: "row",
        backgroundColor: "white",
    }
})

export { homepageStyle }