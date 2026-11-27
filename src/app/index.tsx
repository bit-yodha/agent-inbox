import { StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { MaxContentWidth, Spacing } from '@/theme';

/**
 * Placeholder home route for the Gate 1 foundation scaffold.
 * It intentionally shows no agents, providers or simulated connection states;
 * real screens follow docs/screens/ once their gate work starts.
 */
export default function HomeScreen() {
  return (
    <ThemedView style={styles.container}>
      <SafeAreaView style={styles.safeArea}>
        <ThemedText type="subtitle" accessibilityRole="header">
          Agent Inbox
        </ThemedText>
        <ThemedText>All your agents. One inbox.</ThemedText>
        <ThemedText type="small" themeColor="textSecondary">
          Foundation build. No agents are connected yet.
        </ThemedText>
      </SafeAreaView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  safeArea: {
    flex: 1,
    maxWidth: MaxContentWidth,
    justifyContent: 'center',
    alignItems: 'center',
    gap: Spacing.three,
    paddingHorizontal: Spacing.four,
  },
});
