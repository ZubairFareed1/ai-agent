export function transformConversationData(data) {
    // Check if the data is an array and has at least one element
    if (!data || typeof data !== 'object') {
      return [];
    }
    const { query = [], response = [] } = data;
  
    // Combine and map queries and responses into the desired format
    const messages = [
      ...query.map((q, index) => ({
        id: index * 2 + 1, // Odd IDs for user queries
        timestamp: q.timestamp,
        role: "user",
        message: q.query_data,
      })),
      ...response.map((r, index) => ({
        id: index * 2 + 2, // Even IDs for assistant responses
        timestamp: r.timestamp,
        role: "assistant",
        message: r.conversation_data,
      })),
    ];
  
    // Sort the messages by timestamp to maintain the chronological order
    return messages.sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp));
  }
  