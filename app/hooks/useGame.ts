import { useState, useEffect } from "react";
import { Direction } from "@/src/gen/protobuf/game_pb";

export default function useGame(client: any) {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [roomID, setRoomID] = useState<string | null>(null);
  const [serverName, setServerName] = useState<string | null>(null);
  const [userID, setUserID] = useState<number | null>(null);
  console.log(
    `[useGame] roomID:${roomID} serverName:${serverName} userID:${userID}`,
  );

  useEffect(() => {
    const checkGameAlive = async (roomID: string, serverName: string) => {
      // const response = await fetch(
      //   `https://api.sample.com/check?roomID=${roomID}`
      // );
      // const data = await response.json();
      // console.log("checkGameAlive", data);
      console.log(`[checkGameAlive] roomID:${roomID} serverName:${serverName}`);
      const data = { isAlive: true };
      const isAlive = data.isAlive;

      return isAlive;
    };

    const registerPlayer = async (roomID: string, serverName: string) => {
      // const response = await fetch(
      //   `https://api.sample.com/register?roomID=${roomID}&serverName=${serverName}`
      // );
      // const data = await response.json();
      // console.log("registerPlayer", data);
      console.log(`[registerPlayer] roomID:${roomID} serverName:${serverName}`);
      const data = { userID: 1 };
      const userID = data.userID;
      localStorage.setItem("roomID", roomID);
      localStorage.setItem("userID", userID.toString());
      return userID;
    };

    const initialize = async () => {
      const url = new URL(window.location.href);
      const paramRoomID = url.searchParams.get("roomID") || null;
      const paramServerName = url.searchParams.get("serverName") || null;
      console.log("paramRoomID", paramRoomID);
      console.log("paramServerName", paramServerName);

      if (paramRoomID === null) {
        setIsLoading(false);
        setError("roomID is required");
        return;
      }
      if (paramServerName === null) {
        setIsLoading(false);
        setError("serverName is required");
        return;
      }

      const isGameAlive = await checkGameAlive(paramRoomID, paramServerName);
      if (!isGameAlive) {
        setIsLoading(false);
        setError("Game is not alive");
        return;
      }

      // localStorageから情報を取得
      const storedRoomID = localStorage.getItem("roomID");
      const storedUserIDString = localStorage.getItem("userID");
      const storedUserID = storedUserIDString
        ? parseInt(storedUserIDString)
        : null;

      if (storedRoomID === paramRoomID && storedUserID !== null) {
        setRoomID(paramRoomID);
        setServerName(paramServerName);
        setUserID(storedUserID);
        setIsLoading(false);
        return;
      }

      const fetchedPlayerID = await registerPlayer(
        paramRoomID,
        paramServerName,
      );

      if (!fetchedPlayerID) {
        setIsLoading(false);
        setError("Failed to register player");
        return;
      }

      setRoomID(paramRoomID);
      setServerName(paramServerName);
      setUserID(fetchedPlayerID);
      setIsLoading(false);
    };

    initialize();
  }, [setIsLoading, setError, setRoomID, setServerName, setUserID]);

  const handleMove = async ({
    userID,
    direction,
    roomID,
  }: {
    userID: number;
    direction: Direction;
    roomID: string;
  }) => {
    try {
      const request = {
        userId: userID,
        direction: direction,
        roomId: roomID,
      };

      // Moveメソッドを呼び出す
      const response = await client.move(request);

      // レスポンスを保存
      console.log("Move Response:", response); // コンソールにレスポンスを表示
    } catch (error) {
      console.error("Error calling Move:", error); // エラーハンドリング
    }
  };

  const onArrowButtonTouchStart = (direction: Direction) => {
    if (!userID) {
      setError("userID is null");
      return;
    }
    if (!roomID) {
      setError("roomID is null");
      return;
    }
    handleMove({
      userID: userID,
      direction: 0,
      roomID: roomID,
    });
    console.log("onArrowButtonTouchStart", direction);
  };

  return {
    isLoading,
    error,
    userID: userID || 0,
    onArrowButtonTouchStart,
  };
}
