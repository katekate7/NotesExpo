import { Modal, StatusBar, StyleSheet, Text, TextInput, TouchableWithoutFeedback, View, Keyboard } from 'react-native'
import { Picker } from '@react-native-picker/picker';
import React, {useState, useEffect} from 'react'
import colors from '../misc/colors'
import CheckBtn from './CheckBtn';
import { useMontserrat } from '../components/context/montserrat'


const NodeInputModel = ({ visible, onClose, onSubmit, note, isEdit }) => {
    const [title, setTitle] = useState('')
    const [desc, setDesc] = useState('')
    const [selectedValue, setSelectedValue] = useState('Normal');

    const fontsloaded = useMontserrat();

    useEffect(() => {
        if (isEdit){
            setTitle(note.title)
            setDesc(note.desc)
            setSelectedValue(note.selectedValue)
        }
    }, [isEdit])

    const handleModalClose = () => {
        Keyboard.dismiss();
    }

    const handleOnChangeText = (text, valueFor) =>{
        if (valueFor === 'title') setTitle(text);
        if (valueFor === 'desc') setDesc(text);
    }

    const handleSubmit = () => {
        if (!title.trim() && !desc.trim()) return onClose()

        if (isEdit) {
            onSubmit(title, desc, selectedValue, Date.now())
        } else {
            onSubmit(title, desc, selectedValue)
            setTitle('')
            setDesc('')
        }
        onClose()
    }

    const closeModal = () => {
        if (!isEdit) {
            setTitle('')
            setDesc('')
        }
        onClose()
    }


  return (
    <>
        <StatusBar hidden/>
        <Modal visible={visible} animationType='slide' style={styles.container}>
            <View style={styles.container}>
                <TextInput 
                    value={title} 
                    onChangeText={(text) => handleOnChangeText(text, 'title')} 
                    placeholder='Title' 
                    placeholderTextColor='black'
                    style={[styles.input, styles.title ]}
                />
                <TextInput value={desc} 
                    onChangeText={(text) => handleOnChangeText(text, 'desc')}
                    multiline placeholder='Note'
                    placeholderTextColor='black'
                    style={[styles.input, styles.decs, 
                    //styles.text, {color: 'black'}
            ]}/>
                <Text>Select Priority:</Text>
                <Picker
                    selectedValue={selectedValue}
                    style={{ height: 50, width: 250, marginBottom: 120, fontFamily: 'Montserrat_400Regular' }}
                    onValueChange={(itemValue, itemIndex) => setSelectedValue(itemValue)}
                >
                    <Picker.Item label="Important" value="Important" style={{ fontFamily: 'Montserrat_400Regular' }} />
                    <Picker.Item label="Normal" value="Normal" style={{ fontFamily: 'Montserrat_400Regular' }} />
                    <Picker.Item label="Not Important" value="Not Important" style={{ fontFamily: 'Montserrat_400Regular' }} />
                </Picker>
                <View style={styles.btnContainer}>
                    <CheckBtn antIconName='check' size={30} onPress={handleSubmit}/>
                    { title.trim() || desc.trim() ? ( <CheckBtn antIconName='close' size={30} style={{marginLeft: 15}} onPress={closeModal}/> ) : null} 
                </View>
            </View>
            <TouchableWithoutFeedback onPress={handleModalClose}>
                <View style={[styles.modalB, StyleSheet.absoluteFillObject]}>
                </View>
            </TouchableWithoutFeedback>
        </Modal>

    </>
  )
}

export default NodeInputModel

const styles = StyleSheet.create({
    container:{
        paddingHorizontal: 20,
        paddingTop: 15,
    },
    input:{
        borderBottomWidth: 2,
        borderBottomColor: colors.BLUE,
        fontSize: 25,
        color: 'black',
    },
    title:{
        marginTop:40,
        height: 50,
        marginBottom: 15,
        fontWeight: 'bold',
        color: 'black',
        fontFamily: 'Montserrat_400Regular'
    },
    decs:{
        height: 150,
        color: 'black',
        fontFamily: 'Montserrat_400Regular'
    },
    modalB:{
        flex: 1,
        zIndex: -1,
    },
    btnContainer:{
        flexDirection: 'row',
        justifyContent: 'center',
    }
})