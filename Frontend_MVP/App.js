// App.js — SkillSwap 5‑Screen MVP (Expo + React Navigation)
// Modern, clean UI with cards, shadows, and rounded corners.
// -----------------------------------------------------------
// To run:
// 1) npm i -g expo-cli (if needed)
// 2) npx create-expo-app skillswap-mvp
// 3) cd skillswap-mvp && replace App.js with this file's content
// 4) npm i @react-navigation/native @react-navigation/native-stack @react-navigation/bottom-tabs react-native-safe-area-context react-native-screens
// 5) npm i @expo/vector-icons
// 6) npx expo start

import React, { useMemo, useState, useCallback, createContext, useContext } from 'react';
import { SafeAreaView, View, Text, TextInput, TouchableOpacity, FlatList, StyleSheet, Image, ScrollView, StatusBar, Platform, Alert } from 'react-native';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';

// ---------- Fake Data Store (in‑memory) ----------
const StoreContext = createContext();
const useStore = () => useContext(StoreContext);

const seedOffers = [
  { id: '1', title: 'Data Structures Tutoring', user: 'Aisha', rating: 4.9, category: 'CS', duration: 60, avatar: 'https://i.pravatar.cc/100?img=5', desc: 'One‑hour crash help with trees, graphs, Big‑O, and practice questions.', slots: ['2025-09-27 15:00', '2025-09-28 11:00'] },
  { id: '2', title: 'Public Speaking Coaching', user: 'Bilal', rating: 4.8, category: 'Soft Skills', duration: 45, avatar: 'https://i.pravatar.cc/100?img=12', desc: 'Structure a speech, control nerves, and get live feedback.', slots: ['2025-09-27 18:00', '2025-09-29 14:30'] },
  { id: '3', title: 'Poster Design in Figma', user: 'Hira', rating: 4.7, category: 'Design', duration: 50, avatar: 'https://i.pravatar.cc/100?img=31', desc: 'Make crisp posters for club events. Learn layout, color, and export.', slots: ['2025-09-28 10:00', '2025-09-30 16:00'] },
  { id: '4', title: 'Guitar Basics', user: 'Usman', rating: 4.6, category: 'Music', duration: 40, avatar: 'https://i.pravatar.cc/100?img=47', desc: 'Chords, strumming, and a simple song in one session.', slots: ['2025-09-27 19:30'] },
];

// ---------- UI Primitives ----------
const AppButton = ({ title, onPress, style, icon }) => (
  <TouchableOpacity accessibilityRole="button" onPress={onPress} style={[styles.btn, style]}>
    {icon}
    <Text style={styles.btnText}>{title}</Text>
  </TouchableOpacity>
);

const GhostButton = ({ title, onPress, style, icon }) => (
  <TouchableOpacity accessibilityRole="button" onPress={onPress} style={[styles.btnGhost, style]}>
    {icon}
    <Text style={styles.btnGhostText}>{title}</Text>
  </TouchableOpacity>
);

const Card = ({ children, onPress }) => (
  <TouchableOpacity activeOpacity={onPress ? 0.9 : 1} onPress={onPress} style={styles.card}>
    {children}
  </TouchableOpacity>
);

const Tag = ({ label, selected, onPress }) => (
  <TouchableOpacity onPress={onPress} style={[styles.tag, selected && styles.tagSelected]}>
    <Text style={[styles.tagText, selected && styles.tagTextSelected]}>{label}</Text>
  </TouchableOpacity>
);

// ---------- Auth Screens ----------
function LoginScreen({ navigation }) {
  const [email, setEmail] = useState('test@student.com');
  const [password, setPassword] = useState('12345');
  const { setUser } = useStore();

  const handleLogin = () => {
    if (!email || !password) return Alert.alert('Missing info', 'Enter email and password');
    setUser({ name: 'You', email, avatar: 'https://i.pravatar.cc/100?img=68', skills: ['React Native', 'Photography'], bio: 'Student who loves building apps.' });
    navigation.replace('AppTabs');
  };

  return (
    <SafeAreaView style={styles.containerCenter}>
      <StatusBar barStyle="dark-content" />
      <View style={{ alignItems: 'center', marginBottom: 24 }}>
        <Ionicons name="swap-horizontal" size={48} />
        <Text style={styles.h1}>SkillSwap</Text>
        <Text style={styles.muted}>Trade skills. Learn faster. No money.</Text>
      </View>

      <View style={styles.inputWrap}>
        <Text style={styles.label}>Email</Text>
        <TextInput value={email} onChangeText={setEmail} placeholder="you@uni.edu" keyboardType="email-address" style={styles.input} />
        <Text style={styles.label}>Password</Text>
        <TextInput value={password} onChangeText={setPassword} placeholder="••••••" secureTextEntry style={styles.input} />
        <AppButton title="Log in" onPress={handleLogin} icon={<Ionicons name="log-in" size={18} style={{ marginRight: 8 }} />} />
        <TouchableOpacity onPress={() => navigation.navigate('Signup')} style={{ marginTop: 12 }}>
          <Text style={styles.link}>New here? Create an account</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

function SignupScreen({ navigation }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { setUser } = useStore();

  const handleSignup = () => {
    if (!name || !email || !password) return Alert.alert('Missing info', 'Fill all fields');
    setUser({ name, email, avatar: 'https://i.pravatar.cc/100?img=16', bio: 'Excited to learn and teach.' });
    navigation.replace('AppTabs');
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={[styles.h2, { marginVertical: 8 }]}>Create account</Text>
      <View style={styles.inputWrap}>
        <Text style={styles.label}>Name</Text>
        <TextInput value={name} onChangeText={setName} placeholder="Your Name" style={styles.input} />
        <Text style={styles.label}>Email</Text>
        <TextInput value={email} onChangeText={setEmail} placeholder="you@uni.edu" keyboardType="email-address" style={styles.input} />
        <Text style={styles.label}>Password</Text>
        <TextInput value={password} onChangeText={setPassword} placeholder="••••••" secureTextEntry style={styles.input} />
        <AppButton title="Sign up" onPress={handleSignup} icon={<Ionicons name="person-add" size={18} style={{ marginRight: 8 }} />} />
        <GhostButton title="Back to Login" onPress={() => navigation.replace('Login')} icon={<Ionicons name="arrow-back" size={18} style={{ marginRight: 8 }} />} />
      </View>
    </SafeAreaView>
  );
}

// ---------- Core Screens ----------
function HomeScreen({ navigation }) {
  const { offers } = useStore();
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('All');
  const categories = ['All', 'CS', 'Design', 'Soft Skills', 'Music'];

  const filtered = useMemo(() => offers.filter(o => {
    const matchQ = o.title.toLowerCase().includes(query.toLowerCase()) || o.user.toLowerCase().includes(query.toLowerCase());
    const matchC = category === 'All' || o.category === category;
    return matchQ && matchC;
  }), [offers, query, category]);

  const renderItem = ({ item }) => (
    <Card onPress={() => navigation.navigate('OfferDetails', { id: item.id })}>
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <Image source={{ uri: item.avatar }} style={styles.avatarLg} />
        <View style={{ flex: 1, marginLeft: 12 }}>
          <Text style={styles.h3}>{item.title}</Text>
          <Text style={styles.muted}>{item.user} • {item.category} • {item.duration}m</Text>
          <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 6 }}>
            <Ionicons name="star" size={16} />
            <Text style={{ marginLeft: 4, fontWeight: '600' }}>{item.rating.toFixed(1)}</Text>
          </View>
        </View>
        <Ionicons name="chevron-forward" size={20} />
      </View>
    </Card>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.searchRow}>
        <Ionicons name="search" size={18} style={{ marginRight: 8 }} />
        <TextInput value={query} onChangeText={setQuery} placeholder="Search skills, people" style={{ flex: 1 }} />
        <TouchableOpacity onPress={() => setQuery('')}>
          <MaterialIcons name="close" size={18} />
        </TouchableOpacity>
      </View>

      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ marginVertical: 8 }}>
        {categories.map(c => (
          <Tag key={c} label={c} selected={category === c} onPress={() => setCategory(c)} />
        ))}
      </ScrollView>

      <FlatList data={filtered} keyExtractor={i => i.id} renderItem={renderItem} contentContainerStyle={{ paddingBottom: 120 }} />
    </SafeAreaView>
  );
}

function OfferDetailsScreen({ route }) {
  const { id } = route.params;
  const { offers, addSession } = useStore();
  const offer = offers.find(o => o.id === id);

  const book = (slot) => {
    addSession({ offerId: offer.id, tutorId: offer.user, start: slot, duration: offer.duration, status: 'confirmed' });
    Alert.alert('Booked', `Session booked on ${slot}`);
  };

  if (!offer) return <SafeAreaView style={styles.containerCenter}><Text>Offer not found.</Text></SafeAreaView>;

  return (
    <SafeAreaView style={styles.container}>
      <Card>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Image source={{ uri: offer.avatar }} style={styles.avatarXl} />
          <View style={{ marginLeft: 12, flex: 1 }}>
            <Text style={styles.h2}>{offer.title}</Text>
            <Text style={styles.muted}>{offer.user} • {offer.category} • {offer.duration}m</Text>
            <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 6 }}>
              <Ionicons name="star" size={16} />
              <Text style={{ marginLeft: 4, fontWeight: '600' }}>{offer.rating.toFixed(1)}</Text>
            </View>
          </View>
        </View>
        <Text style={{ marginTop: 12 }}>{offer.desc}</Text>
      </Card>

      <Text style={[styles.label, { marginTop: 8 }]}>Available slots</Text>
      {offer.slots.map(s => (
        <AppButton key={s} title={s} onPress={() => book(s)} icon={<Ionicons name="calendar" size={18} style={{ marginRight: 8 }} />} />
      ))}
    </SafeAreaView>
  );
}

function CreateOfferScreen() {
  const { addOffer, user } = useStore();
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('CS');
  const [duration, setDuration] = useState('60');
  const [desc, setDesc] = useState('');

  const submit = () => {
    if (!title || !desc) return Alert.alert('Missing info', 'Please add a title and description');
    const newOffer = {
      id: Date.now().toString(),
      title,
      user: user?.name || 'You',
      rating: 5.0,
      category,
      duration: parseInt(duration) || 60,
      avatar: user?.avatar,
      desc,
      slots: [],
    };
    addOffer(newOffer);
    Alert.alert('Posted', 'Your offer is live');
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.inputWrap}>
        <Text style={styles.label}>Title</Text>
        <TextInput value={title} onChangeText={setTitle} placeholder="e.g., SQL Crash Session" style={styles.input} />
        <Text style={styles.label}>Category</Text>
        <TextInput value={category} onChangeText={setCategory} placeholder="CS / Design / Music" style={styles.input} />
        <Text style={styles.label}>Duration (mins)</Text>
        <TextInput value={duration} onChangeText={setDuration} keyboardType="numeric" style={styles.input} />
        <Text style={styles.label}>Description</Text>
        <TextInput value={desc} onChangeText={setDesc} style={[styles.input, { height: 100 }]} multiline placeholder="What will learners get?" />
        <AppButton title="Post Offer" onPress={submit} icon={<Ionicons name="send" size={18} style={{ marginRight: 8 }} />} />
      </View>
    </SafeAreaView>
  );
}

function ProfileScreen({ navigation }) {
  const { user, sessions, offers, setUser } = useStore();
  if (!user) return <SafeAreaView style={styles.containerCenter}><Text>Not logged in.</Text></SafeAreaView>;

  const logout = () => {
    setUser(null); // This will reveal the Login/Signup stack
    Alert.alert('Logged out', 'See you soon!');
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
        <Text style={styles.h2}>Profile</Text>
        <GhostButton title="Logout" onPress={logout} icon={<Ionicons name="log-out" size={16} style={{ marginRight: 6 }} />} />
      </View>

      <Card>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Image source={{ uri: user.avatar }} style={styles.avatarXl} />
          <View style={{ marginLeft: 12 }}>
            <Text style={styles.h2}>{user.name}</Text>
            <Text style={styles.muted}>{user.email}</Text>
          </View>
        </View>
        <Text style={{ marginTop: 12 }}>{user.bio}</Text>
      </Card>

      <Text style={[styles.label, { marginTop: 8 }]}>Your offers</Text>
      {offers.filter(o => o.user === user.name).length === 0 ? (
        <Text style={styles.muted}>No offers yet. Create one from the Create tab.</Text>
      ) : (
        offers.filter(o => o.user === user.name).map(o => (
          <Card key={o.id}><Text style={styles.h3}>{o.title}</Text><Text style={styles.muted}>{o.category} • {o.duration}m</Text></Card>
        ))
      )}

      <Text style={[styles.label, { marginTop: 8 }]}>Upcoming sessions</Text>
      {sessions.length === 0 ? (
        <Text style={styles.muted}>Nothing scheduled.</Text>
      ) : (
        sessions.map((s, idx) => (
          <Card key={idx}>
            <Text style={styles.h3}>{s.offerId} • {s.start}</Text>
            <Text style={styles.muted}>{s.status} • {s.duration}m</Text>
          </Card>
        ))
      )}
    </SafeAreaView>
  );
}

// ---------- Navigation ----------
const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function AppTabs() {
  const { user } = useStore();
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarShowLabel: true,
        tabBarStyle: { height: 70, paddingBottom: 12, paddingTop: 8 },
        tabBarIcon: ({ color, size }) => {
          if (route.name === 'Home') return <Ionicons name="home" size={size} color={color} />;
          if (route.name === 'Create') return <Ionicons name="add-circle" size={size} color={color} />;
          if (route.name === 'Profile') return <Ionicons name="person" size={size} color={color} />;
          return null;
        },
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Create" component={CreateOfferScreen} options={{ title: 'Create' }} />
      <Tab.Screen name="Profile" component={ProfileScreen} options={{ title: user?.name || 'Profile' }} />
    </Tab.Navigator>
  );
}

// ---------- Root App ----------
export default function App() {
  const [offers, setOffers] = useState(seedOffers);
  const [sessions, setSessions] = useState([]);
  const [user, setUser] = useState(null);

  const addOffer = useCallback((o) => setOffers(prev => [o, ...prev]), []);
  const addSession = useCallback((s) => setSessions(prev => [s, ...prev]), []);

  const store = useMemo(() => ({ offers, addOffer, sessions, addSession, user, setUser }), [offers, sessions, user]);

  const THEME = {
    ...DefaultTheme,
    colors: { ...DefaultTheme.colors, background: '#F7F7FA' },
  };

  return (
    <StoreContext.Provider value={store}>
      <NavigationContainer theme={THEME}>
        <Stack.Navigator>
          {!user ? (
            <>
              <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
              <Stack.Screen name="Signup" component={SignupScreen} options={{ title: 'Sign up' }} />
            </>
          ) : (
            <Stack.Screen name="AppTabs" component={AppTabs} options={{ headerShown: false }} />
          )}
          <Stack.Screen name="OfferDetails" component={OfferDetailsScreen} options={{ title: 'Offer Details' }} />
        </Stack.Navigator>
      </NavigationContainer>
    </StoreContext.Provider>
  );
}

// ---------- Styles ----------
const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, paddingTop: Platform.OS === 'android' ? 32 : 0 },
  containerCenter: { flex: 1, alignItems: 'center', justifyContent: 'center', padding: 16 },
  h1: { fontSize: 32, fontWeight: '800', marginTop: 8 },
  h2: { fontSize: 22, fontWeight: '700' },
  h3: { fontSize: 16, fontWeight: '700' },
  muted: { color: '#6b7280' },
  inputWrap: { backgroundColor: 'white', padding: 16, borderRadius: 16, width: '100%', gap: 8, shadowColor: '#000', shadowOpacity: 0.06, shadowOffset: { width: 0, height: 6 }, shadowRadius: 12, elevation: 2 },
  label: { fontWeight: '600', marginTop: 8, marginBottom: 4 },
  input: { backgroundColor: '#F2F3F7', borderRadius: 12, paddingHorizontal: 12, paddingVertical: 12 },
  btn: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', backgroundColor: '#111827', paddingVertical: 12, borderRadius: 14, marginTop: 12 },
  btnText: { color: 'white', fontWeight: '700' },
  btnGhost: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', backgroundColor: 'transparent', paddingVertical: 10, borderRadius: 12, marginTop: 10, borderWidth: 1, borderColor: '#11182720' },
  btnGhostText: { color: '#111827', fontWeight: '700' },
  link: { color: '#2563eb', textAlign: 'center' },
  card: { backgroundColor: 'white', padding: 16, borderRadius: 18, marginVertical: 8, shadowColor: '#000', shadowOpacity: 0.08, shadowOffset: { width: 0, height: 10 }, shadowRadius: 16, elevation: 3 },
  avatarLg: { width: 56, height: 56, borderRadius: 28 },
  avatarXl: { width: 72, height: 72, borderRadius: 36 },
  tag: { backgroundColor: '#eef2ff', paddingHorizontal: 12, paddingVertical: 8, borderRadius: 999, marginRight: 8 },
  tagSelected: { backgroundColor: '#111827' },
  tagText: { color: '#374151', fontWeight: '600' },
  tagTextSelected: { color: 'white' },
  searchRow: { backgroundColor: 'white', flexDirection: 'row', alignItems: 'center', borderRadius: 16, paddingHorizontal: 12, paddingVertical: 10, shadowColor: '#000', shadowOpacity: 0.05, shadowOffset: { width: 0, height: 6 }, shadowRadius: 12, elevation: 2 },
});
