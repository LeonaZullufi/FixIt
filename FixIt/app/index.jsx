import React from "react";
import { View, Text, StyleSheet, ScrollView, Image } from "react-native";
import bannerImage from "../assets/explore.png";

const ExploreScreen = () => {
  const stats = [
    {
      id: 1,
      label: "Probleme të zgjidhura",
      value: 124,
      color: "#27B4E2",
      emoji: "✅",
    },
    { id: 2, label: "Në pritje", value: 37, color: "#FF6663", emoji: "🕓" },
    {
      id: 3,
      label: "Në lagjen tënde",
      value: 12,
      color: "#003F91",
      emoji: "📍",
    },
    {
      id: 4,
      label: "Përdorues aktivë",
      value: 45,
      color: "#2D2D2D",
      emoji: "👥",
    },
  ];

  const facts = [
    "Çdo raportim i vogël ndihmon ta bëjmë lagjen më të pastër 🌍.",
    "Përdoruesit e FixIt kanë zgjidhur mbi 1000 probleme këtë vit!",
  ];

  return (
    <View style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <Image source={bannerImage} style={styles.banner} />

        <View style={styles.welcomeContainer}>
          <Text style={styles.welcome}>Mirë se erdhe!</Text>
        </View>

        <View style={styles.cardContainer}>
          {stats.map((item) => (
            <View
              key={item.id}
              style={[styles.card, { backgroundColor: item.color }]}
            >
              <Text style={styles.cardTitle}>
                {item.emoji} {item.label}
              </Text>
              <Text style={styles.cardValue}>{item.value}</Text>
            </View>
          ))}
        </View>

        <View style={styles.successSection}>
          <Text style={styles.successTitle}>Sukseset e fundit</Text>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={styles.successScroll}
          >
            <View style={styles.successCard}>
              <Text style={styles.successText}>
                💡 Drita e rrugës në “Rr. Dëshmorët” është rregulluar
              </Text>
            </View>
            <View style={styles.successCard}>
              <Text style={styles.successText}>
                🚮 Pastrimi i mbeturinave në “Rr. Iliria” u krye
              </Text>
            </View>
            <View style={styles.successCard}>
              <Text style={styles.successText}>
                💧 Uji është rikthyer në “Lagjja Kalabria”
              </Text>
            </View>
          </ScrollView>
        </View>
        <View style={styles.factBox}>
          <Text style={styles.factTitle}>Thënie motivuese ose Fun Fact</Text>
          <Text style={styles.factText}>
            {facts[Math.floor(Math.random() * facts.length)]}
          </Text>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F4F7F9",
  },
  scrollContent: {
    padding: 16,
    paddingBottom: 100,
  },
  banner: {
    width: "100%",
    height: 220,
    resizeMode: "contain",
    alignSelf: "center",
    marginTop: 10,
    marginBottom: 20,
  },
  welcomeContainer: {
    alignItems: "center",
    backgroundColor: "#004A8F",
    marginBottom: 20,
    borderRadius: 10,
    paddingVertical: 12,
  },
  welcome: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#fff",
  },
  cardContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  card: {
    width: "48%",
    borderRadius: 12,
    padding: 15,
    marginBottom: 12,
    minHeight: 100,
    justifyContent: "center",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },

  cardTitle: {
    fontSize: 14,
    color: "#fff",
    fontWeight: "500",
  },
  cardValue: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#fff",
    marginTop: 4,
  },
  successSection: {
    marginTop: 10,
    paddingTop: 10,
    padding: 20,
    borderRadius: 12,
    backgroundColor: "white",
    marginBottom: 20,
  },
  successTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#004A8F",
    marginBottom: 10,
    textAlign: "center",
  },
  successScroll: {
    paddingLeft: 5,
  },
  successCard: {
    backgroundColor: "#E6F7FF",
    padding: 12,
    borderRadius: 12,
    marginRight: 10,
    width: 180,
    height: 100,
    justifyContent: "center",
  },
  successText: {
    fontSize: 13,
    color: "#004A8F",
    padding: 5,
  },
  factBox: {
    backgroundColor: "#e6f7ff",
    borderRadius: 10,
    padding: 20,
    marginHorizontal: 20,
    marginBottom: 30,
  },
  factTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#007AFF",
    marginBottom: 10,
    textAlign: "center",
  },
  factText: {
    fontSize: 15,
    color: "#333",
    textAlign: "center",
  },
});

export default ExploreScreen;
