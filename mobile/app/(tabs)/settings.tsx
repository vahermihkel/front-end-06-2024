import Ionicons from '@expo/vector-icons/Ionicons';
import { Button, StyleSheet, TextInput, TextInputProps } from 'react-native';

import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { useRef, useState } from 'react';

type Profile = {
  email: string,
  firstName: string,
  lastName: string
}

export default function TabThreeScreen() {
  // const emailRef = useRef<TextInput>(null); product 10x
  const [profile, setProfile] = useState<Profile>({email: "", firstName: "", lastName: ""});

  const changeProfile = (event: any) => {
    console.log(event.target.id);
    if (event.target === null) {
      return;
    }
    // profile[email]        =      "m@m.ee"
    profile[event.target.id as keyof Profile] = event.target.value;
    setProfile({...profile})
  }

  const save = () => {
    localStorage.setItem("profile", JSON.stringify(profile));
    console.log("profile");
  }

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#D0D0D0', dark: '#353636' }}
      headerImage={<Ionicons size={310} name="settings" style={styles.headerImage} />}
      >
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">Settings</ThemedText>
      </ThemedView>
      <ThemedText>This page lets you change your preferred settings</ThemedText>

      <TextInput
        id="email"
        onChange={changeProfile}
        placeholder="Email"
        value={profile.email}
      />

      <TextInput
        id="firstName"
        onChange={changeProfile}
        placeholder="First Name"
        value={profile.firstName}
      />

      <TextInput
        id="lastName"
        onChange={changeProfile}
        placeholder="Last Name"
        value={profile.lastName}
      />

      <Button
        onPress={save}
        title="Save"
        color="#841584"
        accessibilityLabel="Learn more about this purple button"
      />
      
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  headerImage: {
    color: '#808080',
    bottom: -90,
    left: -35,
    position: 'absolute',
  },
  titleContainer: {
    flexDirection: 'row',
    gap: 8,
  },
});
