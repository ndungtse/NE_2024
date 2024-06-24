import { useAuth } from "@/contexts/AuthProvider";
import { Post } from "@/types/schema";
import { AntDesign } from "@expo/vector-icons";
import { Avatar, Layout, Popover, Spinner } from "@ui-kitten/components";
import { Link, router } from "expo-router";
import React from "react";
import { Text, StyleSheet, Pressable } from "react-native";
import { Colors } from "react-native/Libraries/NewAppScreen";
import { ThemedText } from "../ThemedText";

interface Props {
  //   visible: boolean;
  //   setVisible: (visible: boolean) => void;
  post: Post;
  refetch?: () => void;
}

const PostOptionPopup = ({ post, refetch }: Props) => {
  const [visible, setVisible] = React.useState(false);
  const [deleting, setDeleting] = React.useState(false);
  const { AuthApi } = useAuth();

  const onDelete = async () => {
    setDeleting(true);
    try {
      await AuthApi.delete(`/posts/${post.id}`);
      refetch?.();
    } catch (error) {
      console.log(error);
    }
    setDeleting(false);
  };

  const renderAnchor = () => (
    <Pressable className="" onPress={() => setVisible(!visible)}>
      <AntDesign name="ellipsis1" size={24} color={Colors.primary} />
    </Pressable>
  );
  return (
    <Popover
      visible={visible}
      anchor={renderAnchor}
      onBackdropPress={() => setVisible(false)}
    >
      <Layout style={styles.content}>
        <Pressable
          className="flex-row w-full items-start text-star  px-2"
          //   href={`/user/${post?.author?.id}`}
          onPress={() => router.push(`/user/${post?.author?.id}`)}
        >
          <ThemedText>View Profile</ThemedText>
        </Pressable>
        {post.isMine && (
          <Pressable
            onPress={onDelete}
            className="flex-row items-center w-full p-2"
          >
            {deleting ? (
              <Spinner style={{ borderColor: "red" }} />
            ) : (
              <AntDesign name="delete" size={20} color="red" />
            )}
            <Text className="ml-2 text-red-500">Delete</Text>
          </Pressable>
        )}
      </Layout>
    </Popover>
  );
};

const styles = StyleSheet.create({
  content: {
    flexDirection: "column",
    alignItems: "center",
    paddingHorizontal: 4,
    paddingVertical: 8,
    width: 150,
  },
});

export default PostOptionPopup;
