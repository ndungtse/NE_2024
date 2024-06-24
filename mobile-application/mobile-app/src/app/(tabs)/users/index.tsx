import { View, Text, ScrollView, Image, RefreshControl } from "react-native";
import React from "react";
import { ThemedView } from "@/components/ThemedView";
import { ThemedText } from "@/components/ThemedText";
import { useGet } from "@/hooks/useGet";
import { User } from "@/types/schema";
import { useHeaderHeight } from "@react-navigation/elements";
import { isIos } from "@/utils/constants";
import { Colors } from "@/utils/constants/Colors";

const Users = () => {
  const headerHeight = useHeaderHeight();
  const { data: users, loading, getData } = useGet<User[]>("/users", { initialData: [] });
  console.log('users', users?.[0]);

  // const manyUsers = new Array(20).fill(users?.[0]);
  return (
    <ThemedView className="flex-1 pt-3">
      <ScrollView
        className="flex-col px-3"
        style={{ paddingTop: isIos ? headerHeight : 0 }}
        keyboardDismissMode="on-drag"
        contentContainerStyle={{ paddingBottom: 100 }}
        refreshControl={
          <RefreshControl
            tintColor={Colors.primary}
            colors={[Colors.primary]}
            refreshing={loading}
            onRefresh={getData}
          />}
      >
          {loading && (
          <View className="flex-col items-center justify-center">
            <Text>Loading users...</Text>
          </View>
        )}
        {loading}
        {users?.map((user, i) => (
          <ThemedView key={i} className="flex-row">
            <Image
              source={{
                uri:
                  `https://ui-avatars.com/api/?name=${user.name}`,
              }}
              width={40}
              height={40}
              className="w-10 h-10 rounded-full"
              resizeMode="cover"
            />
            <ThemedView key={i} className="flex-col font-semibold mt-3">
              <ThemedText className=" font-semibold" style={{fontWeight: 600}}>{user?.username}</ThemedText>
              <ThemedText>{user?.email}</ThemedText>
            </ThemedView>
          </ThemedView>
        ))}
      </ScrollView>
    </ThemedView>
  );
};

export default Users;