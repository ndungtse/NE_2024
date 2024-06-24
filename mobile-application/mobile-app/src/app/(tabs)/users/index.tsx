import { View, Text, ScrollView } from "react-native";
import React from "react";
import { ThemedView } from "@/components/ThemedView";
import { ThemedText } from "@/components/ThemedText";
import { useGet } from "@/hooks/useGet";
import { User } from "@/types/schema";
import { useHeaderHeight } from "@react-navigation/elements";
import { isIos } from "@/utils/constants";

const Users = () => {
  const headerHeight = useHeaderHeight();
  const { data: users } = useGet<User[]>("/user", { initialData: [] });

  const manyUsers = new Array(20).fill(users?.[0]);
  return (
    <ThemedView className="flex-1 pt-3">
      <ScrollView
        className="flex-col px-3"
        style={{ paddingTop: isIos ? headerHeight : 0 }}
        keyboardDismissMode="on-drag"
        contentContainerStyle={{ paddingBottom: 100 }}
      >
        {manyUsers?.map((user, i) => (
          <ThemedView key={i} className="flex border mt-3">
            <ThemedText>{user?.fullName}</ThemedText>
            <ThemedText>{user?.email}</ThemedText>
          </ThemedView>
        ))}
      </ScrollView>
    </ThemedView>
  );
};

export default Users;
