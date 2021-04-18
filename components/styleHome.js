import { StyleSheet } from 'react-native'

const homepageStyle = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "row"
    },
    camera: {
        flex: 1,
    },
    buttonContainer: {
        flex: 1,
        backgroundColor: 'transparent',
        margin: 20,
    },
    button: {
        flex: 0.1,
        alignSelf: 'flex-end',
        alignItems: 'center',
    },
    text: {
        fontSize: 18,
        color: 'white',
    },
    navBar: {
        color: 'black',
        justifyContent: 'flex-end'
    }
})

export { homepageStyle }