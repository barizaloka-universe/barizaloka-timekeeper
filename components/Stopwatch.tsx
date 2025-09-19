import React, { useState, useRef, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { purpleTheme } from '../styles';

const Stopwatch: React.FC = () => {
  const [time, setTime] = useState<number>(0);
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [laps, setLaps] = useState<number[]>([]);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, []);

  const startStopwatch = () => {
    if (!isRunning) {
      setIsRunning(true);
      timerRef.current = setInterval(() => {
        setTime(prevTime => prevTime + 1);
      }, 1000);
    }
  };

  const stopStopwatch = () => {
    if (isRunning && timerRef.current) {
      clearInterval(timerRef.current);
      setIsRunning(false);
    }
  };

  const resetStopwatch = () => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
    }
    setIsRunning(false);
    setTime(0);
    setLaps([]);
  };

  const lapStopwatch = () => {
    if (isRunning) {
      setLaps(prevLaps => [time, ...prevLaps]);
    }
  };

  const formatTime = (seconds: number): string => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    const formattedMinutes = String(minutes).padStart(2, '0');
    const formattedSeconds = String(remainingSeconds).padStart(2, '0');
    return `${formattedMinutes}:${formattedSeconds}`;
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>⏱️ Stopwatch</Text>
      <Text style={styles.timerText}>{formatTime(time)}</Text>
      <View style={styles.infoContainer}>
        <Text style={styles.infoText}>
          {isRunning ? '🟢 Berjalan' : '⏸️ Berhenti'}
        </Text>
        <Text style={styles.infoText}>
          ⏳ Total waktu: <Text style={styles.bold}>{formatTime(time)}</Text>
        </Text>
        <Text style={styles.infoText}>
          🏁 Lap: <Text style={styles.bold}>{laps.length}</Text>
        </Text>
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={startStopwatch}>
          <Text style={styles.buttonText}>▶️ Mulai</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={stopStopwatch}>
          <Text style={styles.buttonText}>⏹️ Stop</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={resetStopwatch}>
          <Text style={styles.buttonText}>🔄 Reset</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, !isRunning && styles.buttonDisabled]}
          onPress={lapStopwatch}
          disabled={!isRunning}
        >
          <Text style={styles.buttonText}>🏷️ Lap</Text>
        </TouchableOpacity>
      </View>
      {laps.length > 0 && (
        <View style={styles.lapContainer}>
          <Text style={styles.lapTitle}>🏁 Laps</Text>
          {laps.map((lap, idx) => (
            <Text key={idx} style={styles.lapText}>
              {`#${laps.length - idx} - ${formatTime(lap)}`}
            </Text>
          ))}
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: purpleTheme.background,
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: purpleTheme.primary,
    marginBottom: 10,
  },
  timerText: {
    fontSize: 80,
    color: purpleTheme.text,
    marginBottom: 20,
    fontWeight: 'bold',
  },
  infoContainer: {
    marginBottom: 20,
    alignItems: 'center',
  },
  infoText: {
    fontSize: 18,
    color: purpleTheme.text,
    marginVertical: 2,
  },
  bold: {
    fontWeight: 'bold',
    color: purpleTheme.primary,
  },
  buttonContainer: {
    flexDirection: 'row',
    marginBottom: 20,
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  button: {
    backgroundColor: purpleTheme.primary,
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 10,
    marginHorizontal: 5,
    marginVertical: 5,
    minWidth: 90,
    alignItems: 'center',
  },
  buttonDisabled: {
    backgroundColor: purpleTheme.disabled || '#ccc',
  },
  buttonText: {
    color: purpleTheme.buttonText,
    fontSize: 18,
    fontWeight: 'bold',
  },
  lapContainer: {
    marginTop: 20,
    width: '100%',
    alignItems: 'center',
  },
  lapTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: purpleTheme.primary,
    marginBottom: 5,
  },
  lapText: {
    fontSize: 16,
    color: purpleTheme.text,
    marginVertical: 2,
  },
});

export default Stopwatch;