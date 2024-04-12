import { ScrollView, StyleSheet, Text, View, Alert } from 'react-native';
import React, { useState } from 'react';
import { useHeaderHeight } from '@react-navigation/elements';
import colors from '../misc/colors';
import CheckBtn from './CheckBtn';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNotes } from './context/NoteProvider';
import NodeInputModel from './NodeInputModel';
import { useMontserrat } from '../components/context/montserrat'


// Function to format date into normal variant
const formatDate = ms => {
    const date = new Date(ms);
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    const hrs = date.getHours();
    const min = date.getMinutes();
    const sec = date.getSeconds();
    
    return `${day}/${month}/${year} - ${hrs}:${min}:${sec}`;
};

// NoteDetail component
const NoteDetail = (props) => {
    
    const fontsloaded = useMontserrat();

    // State variables
    const [note, setNote] = useState(props.route.params.note);
    const headerHeight = useHeaderHeight();
    const { setNotes } = useNotes();
    const [showModal, setShowModal] = useState(false);
    const [isEdit, setIsEdit] = useState(false);

    // Function to display delete alert
    const displayDeleteAlert = () => {
        Alert.alert(
          'Are You Sure?',
          'This action will delete your note permanently!',
          [
            {
              text: 'Delete',
              onPress: deleteNote,
            },
            {
              text: 'No Thanks',
              onPress: () => console.log('no thanks'),
            },
          ],
          {
            cancelable: true,
          }
        );
    };

    // Function to delete note
    const deleteNote = async () => {
        const result = await AsyncStorage.getItem('notes');
        let notes = [];
        if (result !== null) notes = JSON.parse(result);
    
        const newNotes = notes.filter(n => n.id !== note.id);
        setNotes(newNotes);
        await AsyncStorage.setItem('notes', JSON.stringify(newNotes));
        props.navigation.goBack();
    };

    // Function to handle note update
    const handleUpdate = async (title, desc, selectedValue, time) => {
        const result = await AsyncStorage.getItem('notes');
        let notes = [];
        if (result !== null) notes = JSON.parse(result);
    
        const newNotes = notes.filter(n => {
          if (n.id === note.id) {
            n.title = title;
            n.desc = desc;
            n.selectedValue = selectedValue;
            n.isUpdated = true;
            n.time = time;
    
            setNote(n);
          }
          return n;
        });
    
        setNotes(newNotes);
        await AsyncStorage.setItem('notes', JSON.stringify(newNotes));
    };
    
    // Function to close modal(Form)
    const handleOnClose = () => setShowModal(false);
    
    // Function to open edit modal(Form)
    const openEditModal = () => {
        setIsEdit(true);
        setShowModal(true);
    }; 

    return (
        <>
        <ScrollView style={[styles.container, { paddingTop: headerHeight }]} >
            {/* Time */}
            <Text style={styles.time}>
            {note.isUpdated
                ? `Updated At ${formatDate(note.time)}`
                : `Created At ${formatDate(note.time)}`}
            </Text>
            {/* Title */}
            <Text style={styles.title}>{note.title}</Text>
            {/* Description */}
            <Text style={styles.desc}>{note.desc}</Text>
            {/* Importance */}
            <Text style={[styles.status, styles.text]}>Importance: {note.selectedValue}</Text>

        </ScrollView>
            {/* Buttons container */}
            <View style={styles.btnContainer}>
                {/* Delete button */}
                <CheckBtn
                antIconName='delete'
                size={30}
                style={{ backgroundColor: colors.RED, marginBottom: 15 }}
                onPress={displayDeleteAlert}
                />
                {/* Edit button */}
                <CheckBtn antIconName='edit' size={30} onPress={openEditModal}/>
            </View>
            {/* Edit modal */}
            <NodeInputModel
                isEdit={isEdit}
                note={note} 
                onClose={handleOnClose}
                onSubmit={handleUpdate}
                visible={showModal}
            />
            
        </>
    );
}

const styles = StyleSheet.create({
    container:{
         paddingHorizontal: 15, 
    },
    title:{
        fontSize: 30,
        fontWeight: 'bold',
        color: colors.BLUE,
        fontFamily: 'Montserrat_700Bold'
    },
    desc: {
        fontSize: 20,
        opacity: 0.6,
        fontFamily: 'Montserrat_400Regular'
    },
    status:{
        fontStyle: 'italic',
        fontSize: 20,
        color: '#F45B69',
        fontFamily: 'Montserrat_400Regular'
    },
    time: {
        textAlign: 'right',
        fontSize: 13,
        opacity: 0.5,
        fontFamily: 'Montserrat_400Regular'
    },
    btnContainer: {
        position: 'absolute', 
        right: 15,
        bottom: 50, 
    },
    text: {
        color: '#F45B69', 
        fontFamily: 'Montserrat_400Regular'
    }
});

export default NoteDetail;
