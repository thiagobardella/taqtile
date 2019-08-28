import { StyleSheet } from 'react-native';
import { Colors } from 'react-native/Libraries/NewAppScreen';



export const COMPONENTS_STYLES = StyleSheet.create({
    formItemLabel: {
        color: 'blue',
        fontWeight: 'bold',
        fontSize: 20,
        paddingVertical: 10,
        marginLeft: 5
    },
    formItemError: {
        flex: 1,
        height: '100%',
        color: 'red'
    },
    wrapper: {
        width: '100%',
        alignItems: 'center',
        alignSelf: 'center',
        backgroundColor: Colors.white,
        paddingHorizontal: 30,
        paddingVertical: 20
    },
    button: {
        width: '100%',
        alignItems: 'center',
        alignSelf: 'center',
        backgroundColor: 'blue',
        borderColor: Colors.black,
        borderWidth: 2,
        borderRadius: 5,
        paddingVertical: 10,
        margin: 30
    },
    buttonText: {
        color: Colors.white,
        fontWeight: 'bold',
        fontSize: 20,
    },
    picker: {
        width: '100%',
        color: 'black',
        fontWeight: 'bold',
        fontSize: 20
    }
});
