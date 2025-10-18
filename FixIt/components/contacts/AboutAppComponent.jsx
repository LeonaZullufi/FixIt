import { View, Text, StyleSheet } from "react-native";
import {
  MaterialIcons,
  Entypo,
  FontAwesome5,
  Ionicons,
} from "@expo/vector-icons";

const AboutAppComponent = () => {
  return (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>🛠 Si të përdorni aplikacionin</Text>

      <View style={styles.step}>
        <MaterialIcons name="account-circle" size={22} color="#17cbebff" />
        <Text style={styles.stepTitle}> 1. Krijo një llogari / Hyr</Text>
      </View>
      <Text style={styles.bullet}>
        • Hap aplikacionin dhe regjistrohu duke përdorur emailin ose rrjetet
        sociale.
      </Text>
      <Text style={styles.bullet}>
        • Nëse tashmë ke një llogari, shtyp “Hyr”.
      </Text>

      <View style={styles.step}>
        <Entypo name="camera" size={20} color="#17cbebff" />
        <Text style={styles.stepTitle}> 2. Raporto një problem</Text>
      </View>
      <Text style={styles.bullet}>• Shtyp butonin “Kamera” në navbar.</Text>
      <Text style={styles.bullet}>
        • Shto një titull, përshkrim dhe nëse dëshiron, ngarko një foto të
        problemit.
      </Text>
      <Text style={styles.bullet}>
        • Mund të përdorësh edhe vendndodhjen GPS për të shënuar ku ndodhet
        problemi.
      </Text>

      <View style={styles.step}>
        <MaterialIcons name="send" size={20} color="#17cbebff" />
        <Text style={styles.stepTitle}> 3. Dërgo raportin</Text>
      </View>
      <Text style={styles.bullet}>
        • Pasi të kesh plotësuar të gjitha detajet, shtyp “Dërgo”.
      </Text>
      <Text style={styles.bullet}>
        • Raporti do t’i dërgohet departamentit lokal të mirëmbajtjes.
      </Text>

      <View style={styles.step}>
        <FontAwesome5 name="tasks" size={20} color="#17cbebff" />
        <Text style={styles.stepTitle}> 4. Ndiq progresin</Text>
      </View>
      <Text style={styles.bullet}>
        • Shko te seksioni “Raportimet e mia” për të parë nëse raporti yt është
        Në pritje, Në proces apo I rregulluar.
      </Text>

      <View style={styles.step}>
        <Ionicons name="help-buoy-outline" size={20} color="#17cbebff" />
        <Text style={styles.stepTitle}> 5. Kontakto mbështetjen</Text>
      </View>
      <Text style={styles.bullet}>
        • Vizito seksionin “Informacione Kontakti” për t’i dërguar mesazh ekipit
        të mbështetjes FixIt.
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  section: {
    marginVertical: 15,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#231fa2ff",
    marginBottom: 8,
  },
  step: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
  },
  stepTitle: {
    fontSize: 15,
    fontWeight: "500",
    color: "black",
    marginLeft: 5,
  },
  bullet: {
    fontSize: 14,
    color: "#333",
    marginLeft: 30,
    lineHeight: 20,
  },
});

export default AboutAppComponent;
