import AsyncStorage from '@react-native-async-storage/async-storage';

/** 비민감 화면 설정 저장용. 로그인 토큰은 expo-secure-store를 사용하세요. */
export const storage = {
  async getJson<T>(key: string): Promise<T | null> {
    const value = await AsyncStorage.getItem(key);
    return value ? (JSON.parse(value) as T) : null;
  },
  setJson<T>(key: string, value: T): Promise<void> { return AsyncStorage.setItem(key, JSON.stringify(value)); },
  remove(key: string): Promise<void> { return AsyncStorage.removeItem(key); },
};
