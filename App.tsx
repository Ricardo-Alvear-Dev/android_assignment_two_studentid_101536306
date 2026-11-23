
import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Pressable,
  ScrollView,
  StyleSheet,
  Alert,
} from "react-native";

export default function App() {
  const [hours, setHours] = useState("");
  const [hourlyRate, setHourlyRate] = useState("");
  const [taxRate, setTaxRate] = useState("");

  const [pay, setPay] = useState(0);
  const [overtimePay, setOvertimePay] = useState(0);
  const [totalPay, setTotalPay] = useState(0);
  const [tax, setTax] = useState(0);
  const [calculated, setCalculated] = useState(false);

  const calculatePay = () => {
    const h = Number(hours);
    const rate = Number(hourlyRate);
    const taxPercent = Number(taxRate);

    if (
      hours.trim() === "" ||
      hourlyRate.trim() === "" ||
      taxRate.trim() === "" ||
      !Number.isFinite(h) ||
      !Number.isFinite(rate) ||
      !Number.isFinite(taxPercent) ||
      h < 0 ||
      rate < 0 ||
      taxPercent < 0 ||
      taxPercent > 100
    ) {
      setCalculated(false);
      Alert.alert(
        "Invalid Input",
        "Enter valid positive values. Tax rate must be between 0 and 100."
      );
      return;
    }

    let regularPay = 0;
    let overtime = 0;

    if (h <= 40) {
      regularPay = h * rate;
    } else {
      regularPay = 40 * rate;
      overtime = (h - 40) * rate * 1.5;
    }

    const total = regularPay + overtime;
    const calculatedTax = regularPay * (taxPercent / 100);

    setPay(regularPay);
    setOvertimePay(overtime);
    setTotalPay(total);
    setTax(calculatedTax);
    setCalculated(true);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Pay Calculator</Text>
      <Text style={styles.subtitle}>
        Calculate your regular and overtime pay
      </Text>

      <View style={styles.card}>
        <Text style={styles.label}>Hours Worked</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter hours worked"
          keyboardType="decimal-pad"
          value={hours}
          onChangeText={setHours}
        />

        <Text style={styles.label}>Hourly Rate ($)</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter hourly rate"
          keyboardType="decimal-pad"
          value={hourlyRate}
          onChangeText={setHourlyRate}
        />

        <Text style={styles.label}>Tax Rate (%)</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter tax rate (e.g. 15)"
          keyboardType="decimal-pad"
          value={taxRate}
          onChangeText={setTaxRate}
        />

        <Pressable style={styles.button} onPress={calculatePay}>
          <Text style={styles.buttonText}>Calculate Pay</Text>
        </Pressable>
      </View>

      {calculated && (
        <View style={styles.card}>
          <Text style={styles.resultTitle}>Pay Summary</Text>

          <Text style={styles.result}>
            Pay: ${pay.toFixed(2)}
          </Text>

          <Text style={styles.result}>
            Overtime Pay: ${overtimePay.toFixed(2)}
          </Text>

          <Text style={styles.result}>
            Total Pay: ${totalPay.toFixed(2)}
          </Text>

          <Text style={styles.result}>
            Tax: ${tax.toFixed(2)}
          </Text>
        </View>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 24,
    paddingTop: 60,
    backgroundColor: "#F3F4F6",
  },
  title: {
    fontSize: 30,
    fontWeight: "bold",
    textAlign: "center",
    color: "#111827",
  },
  subtitle: {
    fontSize: 14,
    textAlign: "center",
    color: "#6B7280",
    marginTop: 8,
    marginBottom: 24,
  },
  card: {
    backgroundColor: "#FFFFFF",
    padding: 20,
    borderRadius: 12,
    marginBottom: 20,
    elevation: 3,
  },
  label: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 8,
    color: "#374151",
  },
  input: {
    borderWidth: 1,
    borderColor: "#D1D5DB",
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    marginBottom: 18,
    color: "#111827",
  },
  button: {
    backgroundColor: "#2563EB",
    padding: 16,
    borderRadius: 8,
    alignItems: "center",
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "bold",
  },
  resultTitle: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 16,
    color: "#111827",
  },
  result: {
    fontSize: 17,
    marginBottom: 12,
    color: "#374151",
  },
});
