export const useComment = () => {
  const commentChuncks = ref([]);
  const comment = ref("");

  const addComment = async (userId, projectId, text) => {
    try {
      const commentChunk = await $fetch(
        `http://localhost:8080/api/v1/comment/addComment?userId=${userId}&projectId=${projectId}&text=${text}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (commentChunk) {
        commentChuncks.value.push(commentChunk);
      }
    } catch (e) {
      console.error(e);
      return;
    }
  };

  const addReply = async (parentId, userId, projectId, text) => {
    try {
      const reply = await $fetch(
        `http://localhost:8080/api/v1/comment/addReply?userId=${userId}&projectId=${projectId}&text=${text}&parentId=${parentId}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (reply) {
        const commentChunk = commentChuncks.value.find((commentChunk) => {
          return commentChunk.id === parentId;
        });
        commentChunk.children.push(reply);
      }
    } catch (e) {
      console.error(e);
      return;
    }
  };

  return {
    commentChuncks,
    comment,
    addComment,
    addReply,
  };
};
