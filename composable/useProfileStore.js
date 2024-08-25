export const useProfileStore = (userId) => {
  const userCommentCount = ref(0);
  const userAcceptCount = ref(0);
  const userDetail = ref({});

  onMounted(async () => {
    userCommentCount.value = await countUserComment(userId);
    userAcceptCount.value = await countUserAccept(userId);
    userDetail.value = await getUser(userId);
    console.log(userDetail.value);
  });

  const countUserComment = async (userId) => {
    const d = await $fetch(
      "http://localhost:8080/api/v1/users/countUserComments",
      {
        method: "GET",
        params: {
          userId: userId,
        },
      }
    );
    return d;
  };

  const countUserAccept = async (userId) => {
    const d = await $fetch("http://localhost:8080/api/v1/users/countAccept", {
      method: "GET",
      params: {
        userId: userId,
      },
    });
    return d;
  };

  const getUser = async (userId) => {
    const d = await $fetch(`http://localhost:8080/api/v1/users/${userId}`, {
      method: "GET",
    });
    return d;
  };
  return {
    userAcceptCount,
    userCommentCount,
    userDetail,
    countUserAccept,
    countUserComment,
  };
};
