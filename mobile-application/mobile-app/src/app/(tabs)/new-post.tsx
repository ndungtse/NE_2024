import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import CustomInput from "@/components/core/inputs/CustomInput";
import { useAuth } from "@/contexts/AuthProvider";
import { api, getResError } from "@/utils/fetch";
import { Spinner } from "@ui-kitten/components";
import React, { useState } from "react";
import { Pressable, Text, View } from "react-native";
import { Toast } from "react-native-toast-notifications";

const NewPost = () => {
  const [data, setData] = useState({
    title: "",
    body: "",
    userId: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const { AuthApi } = useAuth();

  const onSubmit = async () => {
    setError("");
    if (!data.title || !data.body) {
      Toast.show("Please fill all fields", { type: "danger" });
      setError("Please fill all fields");
      return;
    }
    try {
      const res = await api.post("/posts", data);
      console.log(res.data);
      Toast.show("Post created successfully", { type: "success" });
      setData({ title: "", body: "", userId: "" });
    } catch (error) {
      console.log(error);
      Toast.show(getResError(error), { type: "danger" });
    }
  };

  // creating social media form to
  return (
    <ThemedView className="flex-1 flex-col p-4">
      <View className="flex flex-row items-center ">
        <ThemedText className=" text-lg font-bold">Place</ThemedText>
        <Text className=" text-lg text-primary font-bold">Hub</Text>
      </View>
      <ThemedText className="text-xl font-bold text-center">
        Create a new post
      </ThemedText>
      {error && <Text className="text-red-500">{error}</Text>}
      <CustomInput
        label="Title"
        value={data.title}
        onChangeText={(title) => setData({ ...data, title })}
        placeholder="Title"
      />
      <CustomInput
        label="body"
        value={data.body}
        onChangeText={(body) => setData({ ...data, body })}
        editable
        numberOfLines={6}
        maxLength={400}
        textAlignVertical="top"
        autoCapitalize="sentences"
        placeholder="body"
        multiline
      />
      <CustomInput
        label="User id"
        value={data.userId}
        onChangeText={(userId) => setData({ ...data, userId })}
        placeholder="User Id"
      />
      {/* <Text className="text-sm text-gray-500">Optional</Text> */}

      <Pressable onPress={onSubmit} className="bg-primary p-3 rounded-md mt-2">
        <Text className="text-white text-center text-base font-semibold">
          {loading ? <Spinner /> : "Create Post"}
        </Text>
      </Pressable>
    </ThemedView>
  );
};

export default NewPost;
