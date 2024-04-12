import { useFonts, 
    Montserrat_700Bold,
    Montserrat_400Regular
} from "@expo-google-fonts/montserrat";

export function useMontserrat() {
    const [fontsLoaded] = useFonts({
        Montserrat_700Bold:Montserrat_700Bold,
        Montserrat_400Regular:Montserrat_400Regular,
    });
    return fontsLoaded;
}
