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
    }
});
